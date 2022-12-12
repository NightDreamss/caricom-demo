import "../styles/globals.css";
import mailgo from "mailgo";
import SEO from "../libs/next-seo.config";
import { useEffect } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { DefaultSeo } from "next-seo";
import { init } from "../libs/ga";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

// Configuration for mailgo popup
const mailgoConfig = {
  showFooter: false,
  actions: {
    yahoo: false,
    skype: false,
  },
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  /* 
  Initializer for Mailgo & Google tags manager.
  Google tags is commented out for demo as it requires a analytic ID 
  */
  useEffect(() => {
    mailgo(mailgoConfig);
    // init(process.env.NEXT_PUBLIC_G);
  });
  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <DefaultSeo {...SEO} />
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, maximum-scale=5, viewport-fit=cover"
          />
        </Head>
        <NextNProgress color="#6d28d9" height={2} showOnShallow={true} />
        <NotificationsProvider
          position="top-center"
          zIndex={999999}
          limit={5}
          autoClose={5000}
        >
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
