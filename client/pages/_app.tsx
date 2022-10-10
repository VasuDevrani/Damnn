import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../Layout/Layout";

import { store } from "../context/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
