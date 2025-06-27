import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TaskCard = ({ task }) => {
  // Destructure with fallbacks
  const {
    _id = "",
    title = "Untitled Task",
    budget = 0,
    category = "General",
    deadline = "",
    image = null,
    status = "open",
  } = task || {};

  // Format deadline if exists
  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Flexible";

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  const statusVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      variants={cardVariants}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      {/* Image section */}
      <motion.div
        variants={imageVariants}
        className="relative aspect-video bg-gray-50 flex-shrink-0 overflow-hidden"
      >
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-task.jpg";
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
          >
            <span className="text-gray-400 text-sm">No preview</span>
          </motion.div>
        )}
        {/* Status badge */}
        <motion.span
          variants={statusVariants}
          className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${
            status === "open"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status === "open" ? "Active" : "Closed"}
        </motion.span>
      </motion.div>

      {/* Content section */}
      <motion.div
        variants={contentVariants}
        className="p-4 flex-1 flex flex-col"
      >
        {/* Title and Budget */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-start gap-2 mb-3 min-h-[3.5rem]"
        >
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {title}
          </h3>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="bg-teal-50 text-teal-700 font-bold px-2.5 py-1 rounded-lg text-sm whitespace-nowrap flex-shrink-0"
          >
            ${budget.toLocaleString()}
          </motion.span>
        </motion.div>

        {/* Category and Deadline */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2 text-sm mb-4"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg"
          >
            {category}
          </motion.span>
          <motion.span className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {formattedDeadline}
          </motion.span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          className="mt-auto"
        >
          <Link
            to={`/all-tasks/${_id}`}
            className="block w-full py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-center rounded-lg font-medium transition-all"
          >
            View Details
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TaskCard;
