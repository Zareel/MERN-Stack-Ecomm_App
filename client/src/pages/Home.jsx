import React, { useContext } from "react";
import Layout from "../Components/Layout/Layout";
import AuthContext from "../context/authContext";

const Home = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Layout>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
