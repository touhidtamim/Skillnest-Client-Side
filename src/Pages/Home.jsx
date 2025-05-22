import React from "react";
import PlatformStats from "../Components/PlatformStats";
import HowItWorks from "../Components/HowItWorks";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <div>
      <div className=" my-2 md:my-4 lg:my-8">
        <HowItWorks></HowItWorks>
      </div>
      <div className=" mb-2 md:mb-4 lg:mb-8">
        <Testimonials></Testimonials>
      </div>
      <PlatformStats></PlatformStats>
    </div>
  );
};

export default Home;
