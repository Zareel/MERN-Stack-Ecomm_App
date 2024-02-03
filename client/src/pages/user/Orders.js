import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout>
      <div className="w-full h-full py-16">
        <div className="max-w-7xl mx-auto flex gap-10">
          <div>
            <UserMenu />
          </div>
          <div className="py-6">
            <h1>Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
