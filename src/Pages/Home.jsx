import React from "react";
import PlatformStats from "../Components/PlatformStats";
import HowItWorks from "../Components/HowItWorks";

const Home = () => {
  return (
    <div>
      <div className=" my-2 md:my-4 lg:my-8">
        <HowItWorks></HowItWorks>
      </div>
      <PlatformStats></PlatformStats>
    </div>
  );
};

export default Home;
