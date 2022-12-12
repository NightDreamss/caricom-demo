import Image from "next/image";
import Layout from "../components/Layout";
import { useState } from "react";
import { motion } from "framer-motion";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { DefaultButton } from "../components/modules/Button";

// Framer motion animation
const cardVariants = {
  selected: {
    rotateY: 360,
    transition: { duration: 0.35 },
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
  notSelected: {
    rotateY: 0,
    transition: { duration: 0.35 },
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
};

export default function Home() {
  const [register, setRegister] = useState(false); // sign in and sign out state
  const router = useRouter(); // Route management
  const { status } = useSession(); // Session state

  // Handle session routing
  if (typeof window === "undefined") return null;

  if (status === "authenticated") {
    router.replace("/dashboard");
  }

  if (status === "unauthenticated")
    return (
      <Layout>
        <div className="container relative mx-auto flex min-h-screen px-4 sm:px-6">
          <div className="mt-12 flex flex-1 flex-col lg:mt-0 lg:flex-none lg:justify-center lg:pr-20 xl:pr-24">
            <div className="m-auto w-full max-w-lg lg:w-[32rem]">
              <div>
                <motion.div
                  className="relative z-10 rounded-lg bg-white p-6 shadow-md"
                  variants={cardVariants}
                  animate={register ? "selected" : "notSelected"}
                >
                  <div className="relative mx-8 mb-6 md:mx-16">
                    <Image
                      priority
                      height={60}
                      width={200}
                      className="w-full"
                      src="/Impacs.png"
                      alt="Caricom Impacs"
                    />
                  </div>

                  {!register ? (
                    <SignIn />
                  ) : (
                    <SignUp setRegister={setRegister} />
                  )}
                  {!register ? (
                    <div className="mx-auto mt-4 inline-flex w-full justify-center font-Poppin md:text-lg">
                      <p>Don't have an account?</p>{" "}
                      <DefaultButton
                        type="button"
                        onClick={() => {
                          setRegister(true);
                        }}
                        buttonStyle="ml-1 font-Poppin text-blue-800 underline hover:text-blue-900"
                        title="Sign up here!"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto mt-4 inline-flex w-full justify-center font-Poppin md:text-lg">
                      <p>Have an account?</p>{" "}
                      <DefaultButton
                        type="button"
                        onClick={() => {
                          setRegister(false);
                        }}
                        buttonStyle="ml-1 font-Poppin text-blue-800 underline hover:text-blue-900"
                        title="Sign in here!"
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <Image
          height={1080}
          width={1920}
          priority
          className="absolute inset-0 z-0 block h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1582300857444-5ddd87c86797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100"
          alt=""
        />
      </Layout>
    );
}
