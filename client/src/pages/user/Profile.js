import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";

const Profile = () => {
  return (
    <Layout>
      <div className="w-full h-full py-16">
        <div className="max-w-7xl mx-auto flex gap-10">
          <div>
            <UserMenu />
          </div>
          <div className="py-6">
            <h1>Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
