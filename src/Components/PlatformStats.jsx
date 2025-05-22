import React from "react";

const PlatformStats = () => {
  return (
    <section class="bg-[#FAF7F5] rounded-2xl  py-16 px-4 sm:px-8 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#43727A] mb-4">
          Platform Stats
        </h2>
        <p class="text-[#1E1E1E] text-base sm:text-lg mb-12">
          Here's what we've accomplished so far on SkillNest
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white shadow-md rounded-2xl p-6">
            <h3 class="text-4xl font-extrabold text-[#F4C22C] mb-2">+200</h3>
            <p class="text-[#43727A] text-lg font-medium">Tasks Posted</p>
          </div>

          <div class="bg-white shadow-md rounded-2xl p-6">
            <h3 class="text-4xl font-extrabold text-[#F4C22C] mb-2">+100</h3>
            <p class="text-[#43727A] text-lg font-medium">Active Freelancers</p>
          </div>

          <div class="bg-white shadow-md rounded-2xl p-6">
            <h3 class="text-4xl font-extrabold text-[#F4C22C] mb-2">+150</h3>
            <p class="text-[#43727A] text-lg font-medium">Bids Submitted</p>
          </div>

          <div class="bg-white shadow-md rounded-2xl p-6">
            <h3 class="text-4xl font-extrabold text-[#F4C22C] mb-2">+98%</h3>
            <p class="text-[#43727A] text-lg font-medium">
              Client Satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
