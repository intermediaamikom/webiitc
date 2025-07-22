import AnalyticProvider from "@/components/pagetemplate/AnalyticProvider";
import "@/styles/globals.css";

import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
export default function App({ Component, pageProps }) {
  return (
    <>
      <AnalyticProvider>
        <Component {...pageProps} />
        <ProgressBar
          height="4px"
          color="#E9A319"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </AnalyticProvider>
    </>
  );
}
