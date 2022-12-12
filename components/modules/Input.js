import "react-phone-input-2/lib/bootstrap.css";
import {
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  Select,
  TextInput,
} from "@mantine/core";
import PhoneInput from "react-phone-input-2";
import { CountryDropdown } from "react-country-region-selector";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { questions } from "../../libs/arrays";

export const Input = ({
  form,
  disable,
  required,
  css,
  title,
  placeholder,
  label,
}) => {
  return (
    <div>
      <TextInput
        label={label}
        size="sm"
        required={required}
        disabled={disable}
        placeholder={placeholder}
        {...form.getInputProps(title)}
        classNames={{
          root: "w-full relative",
          wrapper: "relative",
          error: "hidden",
          input: `bg-white autofill:bg-white ring-0 w-full text-sm text-gray-900 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${css}`,
          label:
            "absolute font-Merriweather -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
        }}
      />
    </div>
  );
};

export const SelectInput = ({ form, disable }) => {
  return (
    <div>
      <Select
        required
        styles={() => ({
          item: {
            // applies styles to selected item
            "&[data-selected]": {
              "&, &:hover": {
                backgroundColor: "#e4e4e7",
              },
            },
            "&[data-hovered]": {
              backgroundColor: "#e4e4e7",
            },
          },
        })}
        label="Security Question"
        {...form.getInputProps("question")}
        data={questions}
        size="sm"
        placeholder="Select An Option"
        zIndex={2001}
        disabled={disable}
        classNames={{
          root: "relative rounded-lg border shadow-base focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 border-zinc-300 ",
          label:
            "absolute font-Merriweather -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
          input:
            "w-full text-zinc-900 text-sm md:text-base bg-white border-none focus-within:border-none focus-within:ring-0 rounded-full placeholder:text-zinc-400",
          dropdown: "bg-white rounded-xl p-2 border-zinc-200",
          item: "text-black flex rounded-xl px-3 my-1 py-2 hover:bg-zinc-200",
          icon: "text-white fill-white",
          withIcon: "text-white fill-white",
          error: "hidden",
        }}
      />

      {form?.errors?.question && (
        <span className="block font-Poppin text-xs text-red-500 md:text-sm">
          {form?.errors?.question}
        </span>
      )}
    </div>
  );
};

export const Country = ({ form, disable }) => {
  return (
    <div>
      <div
        className={`${
          form?.errors?.phone ? "border-red-500" : "border-gray-300"
        } shadow-base relative rounded-lg border`}
      >
        <label className="absolute -top-2.5 left-2 -mt-1 inline-block bg-white px-1 font-Merriweather text-sm font-semibold text-gray-700">
          Country <span className="mr-1 text-sm font-bold text-red-500">*</span>
        </label>
        <CountryDropdown
          disabled={disable}
          value={form.values.country}
          onChange={(val) => form.setFieldValue("country", val)}
          classes="border-none w-full rounded-lg focus-within:border-blue-700 focus-within:ring-1 z-0 focus-within:ring-blue-700 py-2 px-3"
        />
      </div>
      {form?.errors?.country && (
        <span className="mt-1 block font-Poppin text-sm tracking-wide text-red-500">
          {form?.errors?.country}
        </span>
      )}
    </div>
  );
};

export const Phone = ({ form, disable }) => {
  return (
    <div>
      <div
        className={`${
          form?.errors?.phone ? "border-red-500" : "border-gray-300"
        } shadow-base relative z-20 rounded-lg border px-3 py-1 focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700`}
      >
        <label className="absolute -top-2.5 left-2 -mt-1 inline-block bg-white px-1 font-Merriweather text-sm font-semibold text-gray-700">
          Phone Number{" "}
          <span className="mr-1 text-sm font-bold text-red-500">*</span>
        </label>

        <PhoneInput
          onChange={(event) => form.setFieldValue("phone", event)}
          defaultMask="............"
          value={form?.values?.phone}
          enableTerritories={true}
          disabled={disable}
          dropdownClass="z-20 focus:outline-none focus:ring-none ring-none disabled:cursor-not-allowed text-gray-900 bg-white border-transparent hover:border-transparent focus:border-transparent shadow-none hover:shadow-none transition duration-300 tracking-wide"
          inputClass="block w-full border-0 bg-white py-0.5 text-gray-800 placeholder-gray-500 text-sm focus:outline-none disabled:cursor-not-allowed focus:ring-0 tracking-wide"
        />
      </div>
      {form?.errors?.phone && (
        <span className="mt-1 block font-Poppin text-sm tracking-wide text-red-500">
          {form?.errors?.phone}
        </span>
      )}
    </div>
  );
};

const PasswordRequirement = ({ meets, label }) => {
  return (
    <Text
      color={meets ? "green" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <CheckCircleIcon
          className="my-auto h-5 w-5 flex-shrink-0 text-green-500"
          aria-hidden="true"
        />
      ) : (
        <XCircleIcon
          className="my-auto h-5 w-5 flex-shrink-0 text-red-500"
          aria-hidden="true"
        />
      )}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};
const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[~`! @#$%^&*()_|;"'<:,>.?/+={[}-]/, label: "Includes special symbol" },
];
function getStrength(password) {
  let multiplier = password?.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export const Password = ({
  form,
  disable,
  popoverOpened,
  setPopoverOpened,
  confirmOpened,
  setConfirmOpened,
  newPassword,
  confirmPassword,
  password,
  required,
}) => {
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(
        password ? form?.values?.password : form?.values?.confirmPassword
      )}
    />
  ));

  const strength = getStrength(
    password ? form?.values?.password : form?.values?.confirmPassword
  );
  const color = strength === 100 ? "blue" : strength > 50 ? "blue" : "red";
  return (
    <Popover
      opened={popoverOpened || confirmOpened}
      position="bottom-start"
      withArrow
      styles={{ popover: { width: "100%" } }}
      classNames={{
        root: "w-full",
        dropdown: "bg-gray-100 border-gray-700 border border-gray-300 ",
        arrow: "border border-gray-300 bg-gray-100",
      }}
      transition="pop-top-left"
    >
      <Popover.Target>
        <div
          onFocusCapture={() =>
            newPassword || password
              ? setPopoverOpened(true)
              : setConfirmOpened(true)
          }
          onBlurCapture={() =>
            newPassword || password
              ? setPopoverOpened(false)
              : setConfirmOpened(false)
          }
        >
          <PasswordInput
            autoComplete={newPassword ? "new-Password" : "off"}
            label={password ? "Password" : "Confirm Password"}
            placeholder={password ? "Your password" : "Confirm Password"}
            {...form.getInputProps(password ? "password" : "confirmPassword")}
            disabled={disable}
            aria-label={password ? "Your password" : "Confirm Password"}
            size="md"
            required={required}
            classNames={{
              root: "w-full relative",
              visibilityToggle: "rounded-lg hover:bg-gray-300 text-gray-900",
              innerInput: "bg-white ring-0 text-black text-sm border-none",
              icon: "",
              wrapper: "relative",
              error: "font-Poppin",
              input: `rounded-lg w-full bg-white border px-3 py-0.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 ${
                password
                  ? form?.errors?.password
                    ? "border-red-500"
                    : "border-gray-300"
                  : form?.errors?.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`,
              label:
                "absolute font-Merriweather -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
            }}
          />
        </div>
      </Popover.Target>
      {newPassword || confirmPassword ? (
        <Popover.Dropdown>
          <Progress
            color={color}
            value={strength}
            size={7}
            style={{ marginBottom: 10 }}
          />
          <PasswordRequirement
            label="Includes at least 8 characters"
            meets={
              password
                ? form?.values?.password?.length > 7
                : form?.values?.confirmPassword.length > 7
            }
          />
          {checks}
        </Popover.Dropdown>
      ) : null}
    </Popover>
  );
};
