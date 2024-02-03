import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout>
      <div className="w-full h-full py-16">
        <div className="max-w-7xl mx-auto flex gap-10">
          <div>
            <AdminMenu />
          </div>
          <div className="py-6">
            <h1>All Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
