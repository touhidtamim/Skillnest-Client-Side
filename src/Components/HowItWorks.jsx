import React from "react";
import { ClipboardList, Users, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Post a Task",
      description:
        "Describe your project and post your task quickly to get bids.",
      icon: <ClipboardList size={40} className="text-[#F4C22C]" />,
    },
    {
      id: 2,
      title: "Get Bids from Freelancers",
      description:
        "Review offers from skilled freelancers and select the best one.",
      icon: <Users size={40} className="text-[#F4C22C]" />,
    },
    {
      id: 3,
      title: "Hire & Get Work Done",
      description:
        "Hire the freelancer, track progress, and complete your project smoothly.",
      icon: <CheckCircle size={40} className="text-[#F4C22C]" />,
    },
  ];

  return (
    <section className="bg-[#FAF7F5] rounded-2xl py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#43727A] mb-6">How It Works</h2>
        <p className="text-[#1E1E1E] mb-12 max-w-3xl mx-auto text-lg">
          Get started in just a few easy steps — manage your freelance projects
          effortlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
          {steps.map(({ id, title, description, icon }) => (
            <div
              key={id}
              className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="mb-6">{icon}</div>
              <h3 className="text-2xl font-semibold text-[#43727A] mb-3">
                {title}
              </h3>
              <p className="text-[#1E1E1E]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
