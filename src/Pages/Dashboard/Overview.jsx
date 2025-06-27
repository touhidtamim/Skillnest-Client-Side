import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

const statCards = [
  {
    title: "Total Users",
    value: 1243,
    icon: <FiUsers className="text-blue-500 text-2xl" />,
    description: "+12% from last month",
  },
  {
    title: "Revenue",
    value: 42890,
    prefix: "$",
    icon: <FiDollarSign className="text-green-500 text-2xl" />,
    description: "+8.2% from last quarter",
  },
  {
    title: "Active Projects",
    value: 56,
    icon: <FiCheckCircle className="text-purple-500 text-2xl" />,
    description: "5 completed this week",
  },
  {
    title: "Upcoming Events",
    value: 12,
    icon: <FiCalendar className="text-orange-500 text-2xl" />,
    description: "3 happening today",
  },
];

const Overview = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <div className="mt-2">
                  <div className="text-3xl font-semibold text-gray-800">
                    {stat.prefix}
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      decimals={stat.title === "Revenue" ? 2 : 0}
                    />
                  </div>
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <FiTrendingUp className="mr-1 text-green-500" />
              <span>{stat.description}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <FiUsers className="text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    New user registration
                  </p>
                  <p className="text-sm text-gray-500">
                    User #{item}234 just signed up
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tasks Completed</span>
              <span className="font-medium">
                <CountUp end={24} duration={2} />
                /50
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "48%" }}
              ></div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <span className="text-gray-600">Team Productivity</span>
              <span className="font-medium">
                <CountUp end={82} duration={2} suffix="%" />
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "82%" }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
