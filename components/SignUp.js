import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import axios from "axios";
import { Country, Input, Password, Phone, SelectInput } from "./modules/Input";
import { useState } from "react";
import { Anchor, Checkbox } from "@mantine/core";
import {
  successNotification,
  updateNotifications,
} from "./modules/Notification";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import {
  answer,
  country,
  email,
  name,
  otherNames,
  password,
  phone,
  question,
} from "../libs/schema";
import { DefaultButton } from "./modules/Button";

const schema = z
  .object({
    firstName: name,
    lastName: name,
    otherNames: otherNames,
    country: country,
    terms: z.boolean({
      required_error: "You must agree to terms of service",
      invalid_type_error: "You must agree to terms of service",
    }),
    email: email,
    confirmEmail: email,
    phone: phone,
    question: question,
    answer: answer,
    password: password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords did not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email did not match",
    path: ["confirmEmail"],
  }); // Field validation schema

const SignUp = ({ setRegister }) => {
  const [popoverOpened, setPopoverOpened] = useState(false); // Password popup for displaying criteria
  const [confirmOpened, setConfirmOpened] = useState(false); // Confirm Password popup for displaying criteria
  const [disable, setDisable] = useState(false); // Disable input to prevent abuse
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      firstName: "",
      lastName: "",
      otherNames: "",
      country: "",
      email: "",
      confirmEmail: "",
      question: "",
      answer: "",
      phone: "",
      password: "",
      terms: false,
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
    } = data;

    try {
      setDisable(true); // Disable inputs to prevent resubmission and form alteration
      successNotification({
        id: "signup",
        title: "Processing",
        message: "Creating Account",
        loading: true,
      }); // Shows notification for creating account
      await axios
        .post(`/api/signup`, {
          firstName,
          lastName,
          otherNames,
          country,
          email,
          phone,
          question,
          answer,
          password,
        })
        .then(() => {
          updateNotifications({
            id: "signup",
            title: "Success",
            message: "Account Created!",
          }); // Show notification for account created successfully
          setDisable(false); // Enable inputs on complete
          setRegister(false); // Send user back to login
        });
    } catch (error) {
      setDisable(false); // Enable inputs for changes due to error
      updateNotifications({
        id: "signup",
        title: "Error",
        error: true,
        message: "Unable to create account, please try again later",
      }); // Show error notification
    }
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
      <div className="mb-6 -mt-4 font-Poppin text-base text-gray-800">
        <p>Fill out the form to complete registration.</p>
        <p>
          Required fields:
          <span className="mr-1 font-Merriweather text-xs font-bold text-red-500">
            *
          </span>
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-6 lg:flex lg:w-full lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="w-full">
            <Input
              form={form}
              disable={disable}
              label="First Name"
              placeholder="Your First Name"
              required
              title="firstName"
              css={
                form?.errors?.firstName ? "border-red-500" : "border-gray-300"
              }
            />

            {form?.errors?.firstName && (
              <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                {form?.errors?.firstName}
              </span>
            )}
          </div>
          <div className="w-full">
            <Input
              form={form}
              disable={disable}
              label="Last Name"
              placeholder="Your Last Name"
              required
              title="lastName"
              css={
                form?.errors?.lastName ? "border-red-500" : "border-gray-300"
              }
            />

            {form?.errors?.lastName && (
              <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                {form?.errors?.lastName}
              </span>
            )}
          </div>
        </div>
        <div>
          <Input
            form={form}
            disable={disable}
            label="Other Names"
            placeholder="Other Names"
            title="otherNames"
          />

          {form?.errors?.otherNames && (
            <span className="block font-Poppin text-xs text-red-500 md:text-sm">
              {form?.errors?.otherNames}
            </span>
          )}
        </div>
        <div className="space-y-6 lg:flex lg:w-full lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="w-full">
            <Input
              form={form}
              disable={disable}
              label="Email"
              placeholder="Your Email"
              required
              title="email"
              css={form?.errors?.email ? "border-red-500" : "border-gray-300"}
            />

            {form?.errors?.email && (
              <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                {form?.errors?.email}
              </span>
            )}
          </div>
          <div className="w-full">
            <Input
              form={form}
              disable={disable}
              label="Confirm Email"
              placeholder="Confirm Your Email"
              required
              title="confirmEmail"
              css={
                form?.errors?.confirmEmail
                  ? "border-red-500"
                  : "border-gray-300"
              }
            />

            {form?.errors?.confirmEmail && (
              <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                {form?.errors?.confirmEmail}
              </span>
            )}
          </div>
        </div>
        <div>
          <Phone form={form} disable={disable} />
        </div>
        <div>
          <Country form={form} disable={disable} />
        </div>
        <div className="space-y-6 lg:flex lg:w-full lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="w-full">
            <SelectInput form={form} disable={disable} />
          </div>

          {form?.values?.question && (
            <div className="w-full">
              <Input
                form={form}
                disable={disable}
                label="Security Answer"
                placeholder={form?.values?.question}
                required
                title="answer"
                css={
                  form?.errors?.answer ? "border-red-500" : "border-gray-300"
                }
              />

              {form?.errors?.answer && (
                <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                  {form?.errors?.answer}
                </span>
              )}
            </div>
          )}
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
      </div>
      <div className="my-4 text-center font-Poppin text-[1rem] text-gray-700 md:text-lg">
        <Checkbox
          required
          disabled={disable}
          {...form.getInputProps("terms")}
          classNames={{
            input: "cursor-pointer",
          }}
          label={
            <>
              I agree to the{" "}
              <Anchor
                size="sm"
                href="#"
                target="_blank"
                className="text-blue-800 underline"
              >
                terms and conditions
              </Anchor>
            </>
          }
        />
      </div>

      <div>
        <DefaultButton
          type="submit"
          disabled={disable}
          icon={
            <DocumentPlusIcon
              className="my-auto mr-4 h-6 w-6 flex-shrink-0 text-white"
              aria-hidden="true"
            />
          }
          title="Sign up"
        />
      </div>
    </form>
  );
};

export default SignUp;
