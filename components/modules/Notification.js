import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { showNotification, updateNotification } from "@mantine/notifications";

//Success notification module
export const successNotification = ({
  id,
  title,
  message,
  loading,
  autoClose,
}) =>
  showNotification({
    id: id,
    title: title,
    message: message,
    loading: loading,
    autoClose: autoClose,
    disallowClose: true,
    classNames: {
      root: "bg-gray-100 border-gray-300 rounded-lg",
      icon: "bg-green-700",
      title: "text-sm md:text-base text-gray-900 font-Merriweather",
      description: "text-gray-700 text-sm md:text-base text-Poppin",
    },
    color: "green",
    icon: (
      <CheckCircleIcon
        className="my-auto h-5 w-5 flex-shrink-0 text-green-300"
        aria-hidden="true"
      />
    ),
  });
//Error notification module
export const errorNotification = ({ id, title, message }) =>
  showNotification({
    id: id,
    title: title,
    message: message,
    disallowClose: true,
    classNames: {
      root: "bg-gray-100 border-gray-300 rounded-lg",
      icon: "bg-red-700",
      title: "text-sm md:text-base text-gray-900 font-Merriweather",
      description: "text-gray-700 text-sm md:text-base text-Poppin",
    },
    color: "red",
    icon: (
      <XCircleIcon
        className="my-auto h-5 w-5 flex-shrink-0 text-red-300"
        aria-hidden="true"
      />
    ),
  });
// State notification module
export const updateNotifications = ({ id, title, message, error }) =>
  updateNotification({
    id: id,
    title: title,
    message: message,
    disallowClose: true,
    classNames: {
      root: "bg-gray-100 border-gray-300 rounded-lg",
      icon: `${error ? "bg-red-500" : "bg-green-700"}`,
      title: "text-sm md:text-base text-gray-900 font-Merriweather",
      description: "text-gray-700 text-sm md:text-base text-Poppin",
    },
    color: error ? "red" : "green",
    icon: error ? (
      <XCircleIcon
        className="my-auto h-6 w-6 flex-shrink-0 text-red-300"
        aria-hidden="true"
      />
    ) : (
      <CheckCircleIcon
        className="my-auto h-5 w-5 flex-shrink-0 text-green-300"
        aria-hidden="true"
      />
    ),
  });
