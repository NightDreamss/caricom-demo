import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  successNotification,
  updateNotifications,
} from "./modules/Notification";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Password, SelectInput } from "./modules/Input";
import axios from "axios";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import { answer, password, question } from "../libs/schema";
import { DefaultButton } from "./modules/Button";

const schema = z
  .object({
    question: question,
    answer: answer,
    password: password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords did not match",
    path: ["confirmPassword"], // path of error
  }); // Field validation schema

const ResetPassword = () => {
  const [popoverOpened, setPopoverOpened] = useState(false); // Password popup for displaying criteria
  const [confirmOpened, setConfirmOpened] = useState(false); // Confirm Password popup for displaying criteria
  const [disable, setDisable] = useState(false); // Disable input to prevent abuse
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      question: "",
      answer: "",
      password: "",
      confirmPassword: "",
    },
  }); // Form management

  const checkKeyDown = (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode === 13) {
      e.preventDefault();
    }
  }; // Disable Enter key to ensure user presses submit

  const onSubmit = async (data) => {
    const { password, question, answer } = data;
    try {
      setDisable(true); // Disable inputs to prevent resubmission and form alteration
      successNotification({
        id: "updatePassword",
        title: "Processing",
        message: "Updating Password",
        loading: true,
      }); // Shows notification for updating password
      await axios
        .post(`/api/resetPassword`, {
          question,
          password,
          answer,
        })
        .then(() => {
          updateNotifications({
            id: "updatePassword",
            title: "Password Changed",
            message: "Password Successfully Updated!",
          }); // Show notification for password successfully changed
          setDisable(false); // Enable inputs on complete
          form.reset(); // Reset form fields to blank
        });
    } catch (error) {
      setDisable(false); // Enable inputs for changes due to error
      form.setFieldError(
        "answer",
        error?.response?.data.includes("Exceed")
          ? "Exceed Request Amount"
          : error?.response?.data
      ); // Shows notification for successful login
      updateNotifications({
        id: "updatePassword",
        title: "Error",
        error: true,
        message: error?.response?.data.includes("Exceed")
          ? "Exceed Request Amount"
          : error?.response?.data,
      }); // Show error notification
    }
  };
  return (
    <div className="my-4 rounded-lg bg-white p-4 shadow-md">
      <h1 className="font-Merriweather text-2xl capitalize text-gray-900">
        Reset Password
      </h1>
      <div className="mb-6 font-Poppin text-base text-gray-800">
        <p>Fill out the form to reset password.</p>
        <p>
          Required fields:
          <span className="mr-1 font-Merriweather text-xs font-bold text-red-500">
            *
          </span>
        </p>
      </div>
      <form
        onSubmit={form.onSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
        className="space-y-6"
      >
        <div className="space-y-6 lg:flex lg:w-full lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="w-full">
            <SelectInput form={form} disable={disable} />
          </div>

          <div className="w-full">
            <TextInput
              label="Security Answer"
              size="sm"
              required
              disabled={disable}
              placeholder="Your security answer"
              {...form.getInputProps("answer")}
              classNames={{
                root: "w-full relative",
                wrapper: "relative",
                input:
                  "bg-white ring-0 w-full text-sm text-gray-900 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative border-gray-300",
                label:
                  "absolute font-Merriweather -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
              }}
            />
          </div>
        </div>

        <div className="space-y-6 lg:flex lg:w-full lg:justify-between lg:space-y-0 lg:space-x-4">
          {/* Password */}
          <div className="w-full">
            <Password
              popoverOpened={popoverOpened}
              setPopoverOpened={setPopoverOpened}
              disable={disable}
              form={form}
              password
              newPassword
              required
            />
          </div>
          {/* Confirm Password */}
          <div className="w-full">
            <Password
              confirmOpened={confirmOpened}
              setConfirmOpened={setConfirmOpened}
              disable={disable}
              form={form}
              confirmPassword
              required
            />
          </div>
        </div>
        <div>
          <DefaultButton
            type="submit"
            disabled={disable}
            icon={
              <PencilSquareIcon
                className="my-auto mr-4 h-5 w-5 flex-shrink-0 text-white"
                aria-hidden="true"
              />
            }
            title="Reset Password"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
