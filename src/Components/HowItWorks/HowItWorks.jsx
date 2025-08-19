import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Users,
  CheckCircle,
  Award,
  Clock,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Post Your Task",
      description:
        "Create a detailed brief and receive competitive proposals quickly.",
      icon: <ClipboardList size={48} className="text-[#F4C22C]" />,
      accentColor: "bg-[#F4C22C]/10",
    },
    {
      id: 2,
      title: "Review Bids",
      description:
        "Evaluate freelancer profiles, ratings, and proposals to find your match.",
      icon: <Users size={48} className="text-[#F4C22C]" />,
      accentColor: "bg-[#F4C22C]/10",
    },
    {
      id: 3,
      title: "Start Working",
      description:
        "Begin your project with secure communication and file sharing.",
      icon: <Briefcase size={48} className="text-[#F4C22C]" />,
      accentColor: "bg-[#F4C22C]/10",
    },
    {
      id: 4,
      title: "Complete & Pay",
      description:
        "Release payment only when you're completely satisfied with the work.",
      icon: <CheckCircle size={48} className="text-[#F4C22C]" />,
      accentColor: "bg-[#F4C22C]/10",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const progressBar = {
    hidden: { width: 0 },
    show: {
      width: "100%",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="how-it-works-section"
      className="bg-[#FAF7F5] py-8 sm:py-8 md:py-14 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-gray-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#43727A] mb-4 leading-tight">
            Our 4-Step Process
          </h2>
          <p className="text-base sm:text-lg text-[#1E1E1E] max-w-2xl mx-auto">
            A streamlined approach to getting your projects done right
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={item}
              whileHover="hover"
              className="relative bg-white rounded-xl p-6 shadow-sm transition-all duration-300 border border-gray-200 hover:shadow-xl"
            >
              {/* Hover background */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
                className={`absolute -inset-1 rounded-xl ${step.accentColor} blur-sm pointer-events-none`}
              />

              {/* Content */}
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Icon with animation */}
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: step.id * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="mb-4 p-3 rounded-full bg-[#FAF7F5]"
                >
                  {step.icon}
                </motion.div>

                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: step.id * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center w-9 h-9 bg-[#43727A] text-white rounded-full font-semibold mb-3"
                >
                  {step.id}
                </motion.div>

                {/* Title with typing effect */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: step.id * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-xl font-semibold text-[#43727A] mb-2"
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: step.id * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-gray-800 text-sm mb-4"
                >
                  {step.description}
                </motion.p>

                {/* Progress bar */}
                <div className="w-full mt-auto">
                  <div className="h-1 bg-[#F4C22C]/30 w-full rounded-full overflow-hidden">
                    <motion.div
                      variants={progressBar}
                      custom={step.id}
                      className="h-full bg-[#F4C22C]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 sm:mt-16 text-center"
      >
        <Link to="/dashboard/add-task">
          <motion.button
            className="relative cursor-pointer px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(68, 180, 171, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Started Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

            {/* Shine effect */}
            <span className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 -skew-x-12 transform translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-500"></span>
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
