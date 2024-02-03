import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#111111] text-gray-500">
      <Header />
      <main className="w-full min-h-[70vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
