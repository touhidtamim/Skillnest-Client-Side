import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Users, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  // Steps data with icon, title, description and accent color for styling
  const steps = [
    {
      id: 1,
      title: "Post Your Project",
      description:
        "Create a detailed project brief and receive competitive bids from skilled professionals within hours.",
      icon: <ClipboardList size={48} className="text-[#F4C22C]" />,
      accentColor: "bg-[#F4C22C]/10",
    },
    {
      id: 2,
      title: "Evaluate Talent",
      description:
        "Review portfolios, ratings, and proposals to select the perfect freelancer for your needs.",
      icon: <Users size={48} className="text-[#F4C22C]" />,
      accentColor: "bg-[#F4C22C]/10",
    },
    {
      id: 3,
      title: "Collaborate Securely",
      description:
        "Work together through our platform with milestone payments and dedicated support.",
      icon: <CheckCircle size={48} className="text-[#F4C22C]" />,
      accentColor: "bg-[#F4C22C]/10",
    },
  ];

  return (
    <section className="bg-[#FAF7F5] rounded-2xl py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section header with fade-in animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#43727A] mb-4">
            Simple, Transparent Process
          </h2>
          <p className="text-[#1E1E1E] text-lg max-w-3xl mx-auto">
            Three easy steps to connect with top talent and get your projects
            completed
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* Hover background accent */}
              <div
                className={`absolute -inset-1 rounded-2xl ${step.accentColor} opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm`}
              ></div>

              {/* Step card container */}
              <div className="relative bg-white rounded-2xl p-8 h-full flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
                {/* Icon wrapper */}
                <div className="mb-6 p-4 rounded-full bg-[#FAF7F5]">
                  {step.icon}
                </div>

                {/* Step number badge */}
                <div className="flex items-center justify-center w-10 h-10 bg-[#43727A] text-white rounded-full font-bold absolute -top-5">
                  {step.id}
                </div>

                {/* Step title */}
                <h3 className="text-2xl font-semibold text-[#43727A] mb-4">
                  {step.title}
                </h3>

                {/* Step description */}
                <p className="text-[#1E1E1E] mb-6">{step.description}</p>

                {/* Progress bar */}
                <div className="mt-auto w-full">
                  <div className="h-1 bg-[#F4C22C]/30 w-full rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="h-full bg-[#F4C22C]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
