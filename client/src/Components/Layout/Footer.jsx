import React from "react";

const Footer = () => {
  return (
    <footer className="px-4 py-8  dark:text-gray-500">
      <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <h1 className="flex items-center p-2 text-4xl font-semibold text-cyan-400 hover:text-cyan-600 cursor-pointer">
            MERN Stack
          </h1>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
          <li>
            <p>Instagram</p>
          </li>
          <li>
            <p>Facebook</p>
          </li>
          <li>
            <p>Twitter</p>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
