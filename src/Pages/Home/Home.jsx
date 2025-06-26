import React from "react";
import FeaturedTasks from "./FeaturedTask";
import TopFreelancersClients from "./MentionTopRated";
import PlatformStats from "./PlatformStats";
import Testimonials from "./Testimonials";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import HeroSlide from "./../../Components/Slider/HeroSlide";

const Home = () => {
  return (
    <div>
      <div className="mt-2 lg:mt-4">
        <HeroSlide />
      </div>

      <div className="mt-2 lg:mt-4">
        <FeaturedTasks />
      </div>

      <div className="mt-2 md:mt-4 lg:mt-8">
        <TopFreelancersClients />
      </div>

      <div className="my-2 md:my-4 lg:my-8">
        <HowItWorks />
      </div>

      <div className="mb-2 md:mb-4 lg:mb-8">
        <Testimonials />
      </div>

      <PlatformStats />
    </div>
  );
};

export default Home;
