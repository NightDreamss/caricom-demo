import dynamic from "next/dynamic";
const Footer = dynamic(() => import("./Footer"), {});

const Layout = ({ children, dashboard }) => {
  return (
    <>
      <main
        className={`${
          dashboard
            ? "flex h-full min-h-screen w-full flex-1 flex-col bg-gray-100 md:pl-64"
            : ""
        }`}
      >
        {children}
      </main>
      <div className={`${dashboard ? "flex w-full md:pl-64 lg:pl-72" : ""}`}>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
