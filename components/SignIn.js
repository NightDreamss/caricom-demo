import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Password } from "./modules/Input";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import { errorNotification, successNotification } from "./modules/Notification";
import { useRouter } from "next/router";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { email, password } from "../libs/schema";
import { DefaultButton } from "./modules/Button";

const schema = z.object({
  email: email,
  password: password,
}); // Field validation schema

const SignIn = () => {
  const [disable, setDisable] = useState(false); // Disable input to prevent abuse
  const [popoverOpened, setPopoverOpened] = useState(false); // Password popup for displaying criteria (Set to false as it is not required for sign in)
  const router = useRouter(); // Session state
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  }); // Form management

  const onSubmit = async (data) => {
    const { email, password } = data;
    setDisable(true); // Disable inputs to prevent resubmission and form alteration
    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.replace("/dashboard"); // Reroute to dashboard on successful login
        setDisable(false); // Enable inputs due to error
        successNotification({
          id: "signIn",
          title: "Success",
          message: `Sign In Successful`,
        }); // Shows notification for successful login
      } else {
        setDisable(false); // Enable inputs for changes due to error
        errorNotification({
          id: "signIn",
          title: "Error",
          message: "Invalid credentials",
        }); // Show error notification
      }
    });
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="space-y-6">
      <div>
        <TextInput
          label="Email"
          size="sm"
          disabled={disable}
          placeholder="Your Email"
          {...form.getInputProps("email")}
          classNames={{
            root: "w-full relative",
            wrapper: "relative",
            input: `bg-white ring-0 w-full text-sm text-gray-900 my-2 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
              form?.errors?.email ? "border-red-500" : "border-gray-300"
            }`,
            label:
              "absolute font-Merriweather -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
          }}
        />
        {form?.errors?.email && (
          <span className="block font-Poppin text-xs text-red-500 md:text-sm">
            {form?.errors?.email}
          </span>
        )}
      </div>

      <div>
        <Password
          popoverOpened={false}
          setPopoverOpened={setPopoverOpened}
          disable={disable}
          form={form}
          password
        />
      </div>

      <div>
        <DefaultButton
          type="submit"
          disabled={disable}
          icon={
            <ArrowLeftOnRectangleIcon
              className="my-auto mr-4 h-6 w-6 flex-shrink-0 text-white"
              aria-hidden="true"
            />
          }
          title="Sign in"
        />
      </div>
    </form>
  );
};

export default SignIn;
