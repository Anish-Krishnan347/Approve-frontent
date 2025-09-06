import "@/styles/globals.css";
import MainLayout from "../../Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import ActionProvider from "../../Context/globalActionContext";
import { CustomLoader } from "../../Components/ReusableElements/Loader";
import { useEffect, useState } from "react";


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (_url, { shallow }) => {
      if (!shallow) setLoading(true); // Only show loader for full navigations
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const noLayoutPages = ["/", "/register", "/404", "/forgot-password"];

  const getLayout = noLayoutPages.includes(router.pathname)
    ? (page) => page
    : (page) => (
        <ActionProvider>
          <MainLayout>{page}</MainLayout>;
        </ActionProvider>
      );

  return getLayout(
    <>
      <Head>
        <title>Approve</title>
        <meta name="description" content="Approve" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      {loading && <CustomLoader />} 
      <Component {...pageProps} />
    </>
  );
}
