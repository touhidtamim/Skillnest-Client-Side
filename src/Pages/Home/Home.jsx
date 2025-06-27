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
      <div className="my-2 lg:my-4">
        <HeroSlide />
      </div>

      <FeaturedTasks />

      <TopFreelancersClients />

      <HowItWorks />

      <Testimonials />

      <PlatformStats />
    </div>
  );
};

export default Home;
