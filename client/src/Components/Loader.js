import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-[#111111] text-gray-500">
      <h1 className="text-2xl">{`Redirecting in ${count} seconds`}</h1>
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    </div>
  );
};

export default Loader;
