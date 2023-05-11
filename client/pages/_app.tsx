import { useApollo } from "@/lib/apolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/router";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const restrictedRoutes = ["/login", "/signup"];

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const isRestricted = restrictedRoutes.includes(router.pathname);
  const getLayout = Component.getLayout || (page => page);

  const apolloClient = useApollo(pageProps);
  return getLayout(
    <ApolloProvider client={apolloClient}>
      <Toaster />
      {!isRestricted && <Navbar />}
      <Component {...pageProps} />
      {!isRestricted && <Footer />}
    </ApolloProvider>
  );
}
