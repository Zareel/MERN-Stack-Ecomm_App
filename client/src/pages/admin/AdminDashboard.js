import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import AuthContext from "../../context/authContext";

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Layout>
      <div className="w-full h-full py-16">
        <div className="max-w-7xl mx-auto flex gap-10">
          <div>
            <AdminMenu />
          </div>
          <div className="py-6">
            <h1 className="text-xl  text-gray-400">
              Admin Name:
              <span className=" text-2xl font-semibold tracki uppercase ml-6">
                {auth.user.name}
              </span>
            </h1>
            <h1 className="text-xl  text-gray-400">
              Admin Email:
              <span className=" text-xl font-semibold tracki lowercase ml-6">
                {auth.user.email}
              </span>
            </h1>
            <h1 className="text-xl  text-gray-400">
              Admin Contact:
              <span className=" text-xl font-semibold tracki uppercase ml-6">
                {auth.user.phone}
              </span>
            </h1>
            <h1 className="text-xl  text-gray-400">
              Admin Address:
              <span className=" text-xl font-semibold tracki uppercase ml-6">
                {auth.user.address}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
