import { z } from "zod";
import protectAPI from "../middleware/protectAPI";
import { connect } from "../../../libs/mysqlDB";
import bcrypt from "bcryptjs";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import rateLimit from "../../../libs/rateLimit";
import { questions } from "../../../libs/arrays";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 1000, // Max 500 users per second
});

const handler = async (req, res) => {
  const { password, question, answer } = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    try {
      if (req.method === "POST") {
        const schema = z.object({
          question: z.string(z.enum(questions)).min(2).max(100),
          answer: z.string().min(2).max(100),
          password: z
            .string()
            .trim()
            .regex(
              /^(?:(?=.{8,})(?=.*[~`! @#$%^&*()_|;"'<:,>.?/+={[}-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/
            )
            .min(1),
        });
        const verify = await schema.parse({
          question,
          answer,
          password,
        });

        try {
          const query = `SELECT securityQuestion, securityAnswer FROM user WHERE email = ?`;
          const values = [`${session.user.email}`];

          const [checkResults] = await connect({ query, values });

          if (
            checkResults.securityAnswer === verify.answer &&
            checkResults.securityQuestion === verify.question
          ) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(verify.password, salt);
            const query = `UPDATE user SET password = ?`;
            const values = [`${hash}`];

            const results = await connect({ query, values });
            return res.status(200).json(results);
          } else {
            await limiter.check(res, 3, session.user.email); // 3 requests per minute
            return res.status(500).json("Invalid Security Answer");
          }
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      } else {
        return res
          .status(400)
          .json({ message: `HTTP method ${req.method} is not supported.` });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: `Not Authenticated.` });
  }
  res.end();
};
export default process.env.NODE_ENV === "development"
  ? handler
  : protectAPI(handler);
