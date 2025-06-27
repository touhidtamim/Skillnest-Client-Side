import React from "react";
import { motion } from "framer-motion";

const stats = [
  {
    value: "100K+",
    label: "Projects Completed",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    value: "7K+",
    label: "Skilled Freelancers",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    value: "30K+",
    label: "Bids Submitted",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const PlatformStats = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  };

  return (
    <section className="bg-[#FAF7F5] py-8 sm:py-8 md:py-14 px-4 sm:px-8 md:px-12 lg:px-20 ">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-[#43727A] mb-4 leading-tight"
            whileInView={{ scale: [0.95, 1] }}
            transition={{ duration: 0.6 }}
          >
            Our Growing Community
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-[#1E1E1E] max-w-2xl mx-auto"
            whileInView={{ opacity: [0.5, 1] }}
            transition={{ duration: 0.8 }}
          >
            Join thousands of professionals and clients who trust SkillNest for
            their projects
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -10,
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              }}
              className="relative bg-white rounded-xl p-6 shadow-sm transition-all duration-300 overflow-hidden"
            >
              {/* Hover layers unchanged */}

              <div className="flex flex-col items-center text-center relative z-10">
                {/* Icon container with margin */}
                <motion.div
                  className="text-[#F4C22C] mb-4"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {stat.icon}
                </motion.div>

                {/* Value */}
                <motion.h3
                  className="text-4xl font-extrabold text-[#F4C22C] mb-2"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                >
                  {stat.value}
                </motion.h3>

                {/* Label */}
                <motion.p
                  className="text-[#43727A] text-lg font-medium"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.label}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <motion.button
            className="relative cursor-pointer px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(68, 180, 171, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Join Our Community</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

            <span className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 -skew-x-12 transform translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-500"></span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStats;
