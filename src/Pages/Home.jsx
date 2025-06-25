import React from "react";
import PlatformStats from "../Components/PlatformStats";
import HowItWorks from "../Components/HowItWorks";
import Testimonials from "../Components/Testimonials";
import TopFreelancersClients from "../Components/MentionTopRated";
import HeroSlide from "../Components/HeroSlide";
import FeaturedTasks from "../Components/FeaturedTask";

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
