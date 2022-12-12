import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";
const getInitialProps = createGetInitialProps();

export default class extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html lang="en">
        {/* external meta data and google fonts */}
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather&family=Poppins:wght@300&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="theme-color" content="#6d28d9" />
        </Head>
        <body className="min-h-screen bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
