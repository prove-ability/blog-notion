import React from "react";
import Footer from "./footer";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Header />
      {/* <main className="flex-1 px-8 py-4 mx-auto max-w-screen-2xl"> */}
      <main className="container flex-1 px-5 py-6 mx-auto sm:flex-row">
        {children}
      </main>
      <Footer />
    </div>
  );
}
