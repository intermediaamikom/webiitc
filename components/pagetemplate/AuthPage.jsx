import React from "react";
import Container from "../molecules/Container";
import Head from "next/head";
import Image from "next/image";

const AuthPage = ({ children, title, onSubmit, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/png" href="images/LOGO/logofix2025.png" />
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/rianmz-genz/webiitc/main/public/images/LOGO/logofix2025.png"
        />
      </Head>
      <Container className="min-h-screen flex justify-center items-center">
        <main className="p-10 w-full gap-5 flex flex-col md:flex-row justify-between items-center">
          <form onSubmit={onSubmit} className="w-full md:w-1/2">
            {children}
          </form>
          <div className="relative w-full md:w-[400px] h-full flex justify-center items-center p-2">
            <div className="relative w-full min-h-[550px] bg-brown bg-opacity-50 rounded-xl">
              <div className="absolute bg-yellow-600 w-full h-full -top-3 -right-3 overflow-hidden rounded-xl">
                <Image
                  src="/images/bg-login.png"
                  alt="IIT Competition"
                  width={1000}
                  height={1000}
                  className="object-cover  rounded-xl"
                />
                <div className="absolute top-0 text-white p-5">
                  <p className="font-bold uppercase text-xs mb-5">
                    IIT COMPETITION 2025
                  </p>
                  <div className="text-white text-2xl md:text-3xl lg:text-4xl font-black">
                    Show your skills right now over here.
                  </div>
                  <div className="mt-2 text-sm md:text-base lg:text-lg">
                    Manifest your spirit through various events and get the
                    champion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </>
  );
};

export default AuthPage;
