import Link from "next/link";

export const DefaultButton = ({
  icon,
  sr,
  buttonStyle,
  title,
  ...clickFunction
}) => (
  <button
    className={
      buttonStyle
        ? buttonStyle
        : "flex w-full justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 font-Merriweather text-sm font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 md:text-base"
    }
    {...clickFunction}
  >
    {sr && <span className="sr-only">{sr}</span>}
    {icon && icon}
    {title && (
      <p className="font-SansPro my-auto text-sm font-medium md:text-base">
        {title}
      </p>
    )}
  </button>
);

//Other button layout for icons only and links which was not required for the demo

// export const IconButton = ({ icon, sr, iconStyle, ...clickFunction }) => (
//   <button
//     className="mx-auto flex items-center justify-center rounded-full p-1 transition-all duration-300 hover:bg-gray-300"
//     {...clickFunction}
//   >
//     {sr && <span className="sr-only">{sr}</span>}
//     {icon}
//   </button>
// );

// export const LinkButton = ({ icon, textColor, title, href, ...aProps }) => (
//   <Link href={href} prefetch={false} {...aProps}>
//     {icon}
//     <p
//       className={`${
//         icon ? "ml-2" : ""
//       } my-auto font-Merriweather text-sm md:text-base`}
//     >
//       {title}
//     </p>
//   </Link>
// );
