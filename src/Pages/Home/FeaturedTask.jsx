import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TaskCard from "./../ExploreJobs/TaskCard";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/featured-tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured tasks:", err);
        setLoading(false);
      });
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-[#FAF7F5] py-8 sm:py-8 md:py-14 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-gray-500">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#43727A] mb-4 leading-tight">
            Featured <span className="text-teal-600">Tasks</span>
          </h2>
          <p className="text-base sm:text-lg text-[#1E1E1E] max-w-2xl mx-auto">
            Explore urgent tasks with the nearest deadlines.
          </p>
        </motion.div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {tasks.slice(0, 4).map((task) => (
              <motion.div
                key={task._id}
                variants={item}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="border border-gray-200 rounded-xl shadow-sm bg-white"
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-12 sm:pt-16 text-center"
        >
          <motion.button
            onClick={() => navigate("/all-tasks")}
            className="relative cursor-pointer px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Browse All Tasks</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTasks;
