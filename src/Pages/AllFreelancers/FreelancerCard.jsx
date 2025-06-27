import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FreelancerCard = ({ freelancer }) => {
  const { _id, name, image, speciality, hourlyRate, rating } = freelancer;

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
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
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
        delayChildren: 0.3,
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
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
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      <div className="relative pt-6 flex-shrink-0">
        <motion.div
          className="absolute inset-x-0 top-0 h-1 bg-teal-500"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        />
        <motion.div
          variants={imageVariants}
          whileHover="hover"
          className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white shadow-sm overflow-hidden"
        >
          <img
            src={image || "/default-avatar.png"}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
        </motion.div>
      </div>

      <motion.div
        variants={contentVariants}
        className="p-5 text-center flex-1 flex flex-col"
      >
        <motion.h3
          variants={itemVariants}
          className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]"
        >
          {name || "Anonymous Freelancer"}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="text-sm text-teal-600 font-medium mb-2 line-clamp-2 min-h-[2.5rem]"
        >
          {speciality || "General Specialist"}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center gap-4 my-3 h-6"
        >
          <div className="flex items-center text-amber-400">
            ★{" "}
            <span className="text-gray-700 ml-1 text-sm">
              {rating || "0.0"}
            </span>
          </div>
          <div className="text-gray-900 font-medium">
            ${hourlyRate?.toFixed(2) || "0.00"}/hr
          </div>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          className="mt-auto"
        >
          <Link
            to={`/freelancers/${_id}`}
            className="inline-block w-full py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all"
          >
            View Profile
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FreelancerCard;
