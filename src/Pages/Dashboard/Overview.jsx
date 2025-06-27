import React, { useContext, useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiBox,
  FiList,
} from "react-icons/fi";
import { AuthContext } from "../../Provider/AuthProvider";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [totalItems, setTotalItems] = useState(0);
  const [myItems, setMyItems] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(true);
  const [loadingMy, setLoadingMy] = useState(true);
  const [errorTotal, setErrorTotal] = useState(null);
  const [errorMy, setErrorMy] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    const fetchTotalItems = async () => {
      setLoadingTotal(true);
      setErrorTotal(null);
      try {
        const res = await fetch(`${API_BASE}/tasks-count`);
        if (!res.ok) throw new Error("Failed to fetch total items");
        const data = await res.json();
        setTotalItems(data.total);
      } catch (err) {
        setErrorTotal(err.message);
      } finally {
        setLoadingTotal(false);
      }
    };

    const fetchMyItems = async () => {
      if (!user?.email) {
        setMyItems(0);
        setLoadingMy(false);
        return;
      }
      setLoadingMy(true);
      setErrorMy(null);
      try {
        const res = await fetch(
          `${API_BASE}/my-tasks-count?email=${user.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch your items");
        const data = await res.json();
        setMyItems(data.total);
      } catch (err) {
        setErrorMy(err.message);
      } finally {
        setLoadingMy(false);
      }
    };

    fetchTotalItems();
    fetchMyItems();
    setHasAnimated(true);
  }, [user?.email]);

  const statCards = [
    {
      title: "Total Items",
      value: totalItems,
      icon: <FiBox className="text-blue-500 text-2xl" />,
      description: "All products in the system",
      loading: loadingTotal,
      error: errorTotal,
    },
    {
      title: "My Items",
      value: myItems,
      icon: <FiList className="text-purple-500 text-2xl" />,
      description: "Items you created",
      loading: loadingMy,
      error: errorMy,
    },
    {
      title: "Revenue",
      value: 42890,
      prefix: "$",
      icon: <FiDollarSign className="text-green-500 text-2xl" />,
      description: "+8.2% from last quarter",
      loading: false,
      error: null,
    },
    {
      title: "Upcoming Events",
      value: 12,
      icon: <FiCalendar className="text-orange-500 text-2xl" />,
      description: "3 happening today",
      loading: false,
      error: null,
    },
  ];

  // Animation variants for consistent motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <motion.h1
          className="text-3xl font-bold text-gray-800"
          whileHover={{ scale: 1.01 }}
        >
          Dashboard Overview
        </motion.h1>
        <motion.p className="text-gray-600 mt-2" whileHover={{ x: 5 }}>
          Welcome back, {user?.displayName || user?.name || "User"}! Here's
          what's happening today.
        </motion.p>
      </motion.div>

      {/* User Info Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 max-w-md"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Info</h2>
        <p>
          <span className="font-medium text-gray-600">Name:</span>{" "}
          {user?.displayName || user?.name || "N/A"}
        </p>
        <p>
          <span className="font-medium text-gray-600">Email:</span>{" "}
          {user?.email || "N/A"}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            custom={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <div className="mt-2 text-3xl font-semibold text-gray-800">
                  {stat.loading ? (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="h-8 w-24 bg-gray-200 rounded"
                    />
                  ) : stat.error ? (
                    <span className="text-red-500 text-sm">{stat.error}</span>
                  ) : (
                    <>
                      {stat.prefix}
                      {hasAnimated ? (
                        <CountUp
                          end={stat.value}
                          duration={2.5}
                          separator=","
                          decimals={stat.title === "Revenue" ? 2 : 0}
                        />
                      ) : (
                        stat.value.toLocaleString()
                      )}
                    </>
                  )}
                </div>
              </div>
              <motion.div
                className="p-2 bg-gray-50 rounded-lg"
                whileHover={{ rotate: 10 }}
              >
                {stat.icon}
              </motion.div>
            </div>
            <motion.div
              className="mt-4 flex items-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FiTrendingUp className="mr-1 text-green-500" />
              <span>{stat.description}</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Activity Sections */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2"
          whileHover={{ y: -2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item * 0.1 }}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="bg-blue-100 p-2 rounded-lg mr-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiUsers className="text-blue-500" />
                </motion.div>
                <div>
                  <p className="font-medium text-gray-800">
                    New user registration
                  </p>
                  <p className="text-sm text-gray-500">
                    User #{item}234 just signed up
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          whileHover={{ y: -2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tasks Completed</span>
              <span className="font-medium">
                {hasAnimated ? <CountUp end={24} duration={2} /> : "24"}
                /50
              </span>
            </div>
            <motion.div
              className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "48%", transformOrigin: "left" }}
              />
            </motion.div>

            <div className="flex justify-between items-center pt-4">
              <span className="text-gray-600">Team Productivity</span>
              <span className="font-medium">
                {hasAnimated ? (
                  <CountUp end={82} duration={2} suffix="%" />
                ) : (
                  "82%"
                )}
              </span>
            </div>
            <motion.div
              className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "82%", transformOrigin: "left" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
