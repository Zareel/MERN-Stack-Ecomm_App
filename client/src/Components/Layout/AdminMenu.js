import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <aside className="w-full    sm:w-60 bg-[#111111] dark:text-gray-100 py-16">
      <nav className="space-y-8 text-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracki uppercase text-gray-400   pb-6  ">
            Admin Panel
          </h2>
          <div className="flex flex-col space-y-1 text-lg gap-4">
            <Link
              to="/dashboard/admin/create-collection"
              className="text-xl text-gray-500 hover:text-gray-300 cursor-pointer"
            >
              Create Collection
            </Link>
            <Link
              to="/dashboard/admin/create-product"
              className="text-xl text-gray-500 hover:text-gray-300 cursor-pointer"
            >
              Create Product
            </Link>
            <Link
              to="/dashboard/admin/users"
              className="text-xl text-gray-500 hover:text-gray-300 cursor-pointer"
            >
              Users
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default AdminMenu;
