import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const FreelancerDetails = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
  };

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/freelancers/${id}`);
        const data = await res.json();
        setFreelancer(data);
      } catch (error) {
        console.error("Error fetching freelancer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!freelancer)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        Freelancer not found
      </motion.p>
    );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div variants={item}>
        <Link
          to="/freelancers"
          className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Freelancers
        </Link>
      </motion.div>

      <motion.div
        variants={scaleUp}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Profile Header */}
        <motion.div
          variants={fadeIn}
          className="bg-gradient-to-r from-teal-50 to-gray-50 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src={freelancer.image}
                alt={freelancer.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {freelancer.available && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute bottom-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                >
                  Available
                </motion.div>
              )}
            </motion.div>

            <motion.div className="text-center md:text-left" variants={item}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2">
                <motion.h1
                  className="text-3xl font-bold text-gray-900"
                  whileHover={{ x: 5 }}
                >
                  {freelancer.name}
                </motion.h1>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-block bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {freelancer.rank}
                </motion.span>
              </div>

              <motion.p
                className="text-lg text-teal-600 font-medium mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {freelancer.speciality}
              </motion.p>

              <motion.div
                className="flex items-center justify-center md:justify-start mt-3 space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {i < Math.floor(freelancer.rating) ? "★" : "☆"}
                      </motion.span>
                    ))}
                  </div>
                  <span className="ml-1 text-gray-700">
                    ({freelancer.rating.toFixed(1)})
                  </span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-900 font-bold"
                >
                  ${freelancer.hourlyRate}/hr
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8"
          variants={container}
        >
          {/* Left Column - About */}
          <motion.div className="lg:col-span-2" variants={item}>
            <motion.h2
              className="text-xl font-semibold text-gray-900 mb-4"
              whileHover={{ x: 5 }}
            >
              About
            </motion.h2>
            <motion.p
              className="text-gray-700 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {freelancer.description}
            </motion.p>

            <motion.h2
              className="text-xl font-semibold text-gray-900 mb-4"
              whileHover={{ x: 5 }}
            >
              Skills & Technologies
            </motion.h2>
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {freelancer.technologies?.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={container}
            >
              <motion.div variants={item}>
                <h3 className="font-medium text-gray-900 mb-2">Experience</h3>
                <p className="text-gray-700">
                  {freelancer.experience}{" "}
                  {freelancer.experience === 1 ? "year" : "years"}
                </p>
              </motion.div>
              <motion.div variants={item}>
                <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                <p className="text-gray-700">
                  {freelancer.location || "Remote"}
                </p>
              </motion.div>
              <motion.div variants={item}>
                <h3 className="font-medium text-gray-900 mb-2">
                  Projects Completed
                </h3>
                <p className="text-gray-700">
                  {freelancer.projectsCompleted || "99+"}
                </p>
              </motion.div>
              <motion.div variants={item}>
                <h3 className="font-medium text-gray-900 mb-2">
                  Response Time
                </h3>
                <p className="text-gray-700">
                  {freelancer.responseTime || "Within 24 hours"}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact */}
          <motion.div
            variants={scaleUp}
            className="bg-gray-50 rounded-xl p-6 h-fit"
          >
            <motion.h2
              className="text-xl font-semibold text-gray-900 mb-4"
              whileHover={{ x: 5 }}
            >
              Contact {freelancer.name.split(" ")[0]}
            </motion.h2>

            {freelancer.available ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="space-y-4 mb-6">
                  <motion.div variants={item}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <motion.div variants={item}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                  <motion.div variants={item}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Details
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Describe your project..."
                    ></textarea>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    const name = document
                      .querySelector('input[placeholder="John Doe"]')
                      ?.value.trim();
                    const email = document
                      .querySelector('input[placeholder="john@example.com"]')
                      ?.value.trim();
                    const message = document
                      .querySelector(
                        'textarea[placeholder="Describe your project..."]'
                      )
                      ?.value.trim();

                    if (!name || !email || !message) {
                      Swal.fire({
                        icon: "error",
                        title: "Missing Fields",
                        text: "Please fill in all fields before sending a message.",
                        timer: 2500,
                        showConfirmButton: false,
                      });
                      return;
                    }

                    Swal.fire({
                      icon: "success",
                      title: "Message Sent!",
                      text: "Your message has been sent to the freelancer.",
                      timer: 2500,
                      showConfirmButton: false,
                    });

                    // Clear form
                    document.querySelector(
                      'input[placeholder="John Doe"]'
                    ).value = "";
                    document.querySelector(
                      'input[placeholder="john@example.com"]'
                    ).value = "";
                    document.querySelector(
                      'textarea[placeholder="Describe your project..."]'
                    ).value = "";
                  }}
                  className="w-full cursor-pointer py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all"
                >
                  Send Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center py-8"
              >
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </motion.svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Currently Unavailable
                </h3>
                <p className="text-gray-600">
                  {freelancer.name} is not accepting new projects at this time.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FreelancerDetails;
