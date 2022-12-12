import { z } from "zod";
import protectAPI from "../middleware/protectAPI";
import { connect } from "../../../libs/mysqlDB";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  const {
    firstName,
    lastName,
    otherNames,
    country,
    email,
    phone,
    question,
    answer,
    password,
  } = req.body;
  try {
    if (req.method === "POST") {
      const schema = z.object({
        firstName: z.string().trim().min(2).max(100),
        lastName: z.string().trim().min(2).max(100),
        otherNames: z.string().nullable().optional(),
        country: z.string().trim().min(2),
        email: z
          .string()
          .trim()
          .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        phone: z.string().min(7),
        question: z.string().trim().min(2),
        answer: z.string().trim().min(2),
        password: z
          .string()
          .trim()
          .regex(
            /^(?:(?=.{8,})(?=.*[~`! @#$%^&*()_|;"'<:,>.?/+={[}-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/
          )
          .min(1),
      });
      const verify = await schema.parse({
        firstName,
        lastName,
        otherNames,
        country,
        email,
        phone,
        question,
        answer,
        password,
      });

      try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(verify.password, salt);
        const query = `INSERT INTO user values (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIME())`;
        const values = [
          `${verify.firstName}`,
          `${verify.lastName}`,
          `${verify.otherNames}`,
          `${verify.country}`,
          `${verify.email}`,
          `${verify.phone}`,
          `${hash}`,
          `https://avatars.dicebear.com/api/initials/${
            verify.firstName + " " + verify.lastName
          }.png`,
        ];

        const results = await connect({ query, values });
        return res.status(200).json(results);
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
};
export default process.env.NODE_ENV === "development"
  ? handler
  : protectAPI(handler);
