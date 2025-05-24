import React, { useState } from "react";
import { motion } from "framer-motion";

const topUsers = [
  {
    id: 1,
    name: "Aisha Khan",
    role: "Premium Client",
    photo:
      "https://i.postimg.cc/nzv0Yg3t/young-asian-woman-with-winning-gesture-isolated-yellow-wall-231208-901.jpg",
    stats: "180+ Creative Projects",
    badge: "Diamond Partner",
    rating: 4.9,
    specialties: ["UI/UX Design", "Branding", "Content Strategy"],
  },
  {
    id: 2,
    name: "Rafid Chowdhury",
    role: "Lead Developer",
    photo:
      "https://i.postimg.cc/5NxVHnDQ/happy-south-asian-man-smiling-cheerfully-indoor-close-up-portrait-photo.jpg",
    stats: "150+ Deployed Apps",
    badge: "Top 1% Talent",
    rating: 5.0,
    specialties: ["React Native", "Node.js", "AWS Architecture"],
  },
  {
    id: 3,
    name: "Tahmina Haque",
    role: "Enterprise Client",
    photo:
      "https://i.postimg.cc/FKfmrz8P/close-up-portrait-of-asian-girl-with-perfect-healthy-smile-and-natural-beautiful-face-looks-happy-at.jpg",
    stats: "$250k+ Projects Sponsored",
    badge: "Visionary Buyer",
    rating: 4.8,
    specialties: ["SaaS Development", "AI Solutions", "Team Scaling"],
  },
  {
    id: 4,
    name: "Zayan Ahmed",
    role: "Creative Director",
    photo: "https://i.postimg.cc/gJJhkVdC/image.jpg",
    stats: "95% Client Retention",
    badge: "Industry Innovator",
    rating: 4.7,
    specialties: ["Motion Design", "3D Modeling", "AR Experiences"],
  },
];

const TopFreelancersClients = () => {
  const [activeCard, setActiveCard] = useState(null);

  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-${
            i <= Math.floor(rating) ? "amber-400" : "gray-300"
          }`}
        >
          {i <= rating ? (
            i === Math.ceil(rating) && rating % 1 !== 0 ? (
              <span className="relative">
                <span className="text-gray-300">★</span>
                <span
                  className="absolute left-0 overflow-hidden"
                  style={{ width: `${(rating % 1) * 100}%` }}
                >
                  ★
                </span>
              </span>
            ) : (
              "★"
            )
          ) : (
            "★"
          )}
        </span>
      );
    }
    return <div className="flex space-x-1 text-sm">{stars}</div>;
  };

  return (
    <section
      id="find-talent-section"
      className="bg-[#FAF7F5] rounded-2xl py-20 px-6 sm:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#43727A] mb-4">
            Top Freelancers & Clients
          </h2>
          <p className="text-lg text-[#1E1E1E] max-w-2xl mx-auto">
            Meet our community's most trusted professionals and clients
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {topUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setActiveCard(user.id)}
              onHoverEnd={() => setActiveCard(null)}
              className={`relative bg-white rounded-xl p-6 shadow-sm transition-all duration-300 overflow-hidden ${
                activeCard === user.id
                  ? "shadow-xl border-t-4 border-teal-500 transform scale-[1.02]"
                  : ""
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>

              {activeCard === user.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-teal-50/20 to-transparent pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="relative mb-4 group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 blur-sm opacity-70 group-hover:opacity-100 transition-all -z-10"></div>
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-all group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center mb-2">
                  <StarRating rating={user.rating} />
                  <span className="ml-1 text-xs text-gray-500">
                    ({user.rating})
                  </span>
                </div>

                <motion.h3
                  className="text-gray-900 font-semibold text-xl mb-1 hover:text-teal-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {user.name}
                </motion.h3>

                <p className="text-teal-600 text-sm font-medium mb-2 px-3 py-1 bg-teal-50 rounded-full">
                  {user.role}
                </p>

                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  {user.stats}
                </p>

                <motion.span
                  className="inline-block bg-gradient-to-r from-teal-100 to-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full border border-teal-200 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  {activeCard === user.id && (
                    <motion.span
                      className="absolute top-0 left-0 h-full w-8 bg-white/30 -skew-x-12"
                      initial={{ x: -50 }}
                      animate={{ x: 300 }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                  {user.badge}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            className="relative cursor-pointer px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View All Profiles</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TopFreelancersClients;
