import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaUser,
  FaEnvelope,
  FaClock,
  FaCode,
  FaArrowLeft,
  FaCheckCircle,
  FaRegClock,
  FaChartLine,
  FaFileAlt,
  FaTag,
} from "react-icons/fa";
import { motion } from "framer-motion";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidLoading, setBidLoading] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");

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

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  // Load task and bids from localStorage when component mounts
  useEffect(() => {
    const fetchTaskData = async () => {
      setLoading(true);
      try {
        // For demo purposes, we'll use mock data
        const mockTask = {
          _id: id,
          title: "Website Development Project",
          description:
            "We need a professional website built with React and Node.js. The website should have a modern design, responsive layout, and integrate with our existing API. Key features needed:\n\n- User authentication system\n- Product catalog\n- Shopping cart functionality\n- Admin dashboard\n\nPlease provide details about your experience with similar projects in your bid.",
          budget: 1500,
          category: "Web Development",
          skillsRequired: ["React", "Node.js", "MongoDB", "CSS", "JavaScript"],
          deadline: new Date(
            Date.now() + 10 * 24 * 60 * 60 * 1000
          ).toISOString(),
          createdAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
          status: "open",
          name: "Sarah Johnson",
          email: "sarah@techcompany.com",
          company: "Tech Solutions Inc",
          urgency: "high",
          estimatedDuration: "3-5 weeks",
          image:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        };

        setTask(mockTask);

        // Load bids from localStorage
        const savedBids = localStorage.getItem(`task_${id}_bids`);
        if (savedBids) {
          setBids(JSON.parse(savedBids));
        } else {
          // Initialize with some sample bids if none exist
          const initialBids = [
            {
              _id: "1",
              amount: 1200,
              message:
                "I have 5 years of experience building e-commerce sites with React and Node. I can deliver this project within 4 weeks.",
              bidderName: "Alex Chen",
              createdAt: new Date(
                Date.now() - 1 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            {
              _id: "2",
              amount: 1350,
              message:
                "Our team specializes in MERN stack applications. We can provide ongoing maintenance after project completion.",
              bidderName: "DevTeam Solutions",
              createdAt: new Date(
                Date.now() - 12 * 60 * 60 * 1000
              ).toISOString(),
            },
          ];
          setBids(initialBids);
          localStorage.setItem(`task_${id}_bids`, JSON.stringify(initialBids));
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [id]);

  // Save bids to localStorage whenever bids change
  useEffect(() => {
    if (task) {
      localStorage.setItem(`task_${id}_bids`, JSON.stringify(bids));
    }
  }, [bids, id, task]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!bidAmount || isNaN(bidAmount)) {
      toast.error("Please enter a valid bid amount");
      return;
    }

    const amount = parseFloat(bidAmount);
    if (amount <= 0) {
      toast.error("Bid amount must be greater than 0");
      return;
    }

    if (task.budget && amount > task.budget) {
      toast.error(`Bid amount cannot exceed budget of $${task.budget}`);
      return;
    }

    if (!bidMessage.trim()) {
      toast.error("Please enter a proposal message");
      return;
    }

    setBidLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Create new bid object
      const newBid = {
        _id: Date.now().toString(),
        amount: amount,
        message: bidMessage.trim(),
        bidderName: "You",
        createdAt: new Date().toISOString(),
      };

      // Update bids list with the new bid
      setBids((prevBids) => [...prevBids, newBid]);

      setBidAmount("");
      setBidMessage("");
      toast.success("Bid placed successfully!");
    } catch (err) {
      console.error("Bid submission error:", err);
      toast.error("An error occurred while placing your bid");
    } finally {
      setBidLoading(false);
    }
  };

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-xl mx-auto px-4 py-20 text-center"
      >
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Task
          </h2>
          <p className="text-red-500">{error}</p>
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center mx-auto"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Calculate days remaining
  const daysRemaining = task.deadline
    ? Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="min-h-screen bg-gray-50 py-12"
    >
      <ToastContainer position="top-center" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button */}
        <motion.div
          variants={item}
          className="flex justify-between items-center mb-8"
        >
          <motion.button
            onClick={handleBack}
            whileHover={{ x: -5 }}
            className="flex items-center text-teal-600 hover:text-teal-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Tasks
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
          <div className="w-5"></div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Task Details */}
          <div className="lg:col-span-2">
            <motion.div
              variants={scaleUp}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              {/* Task Header */}
              <motion.div
                variants={fadeIn}
                className="bg-gradient-to-r from-teal-600 to-teal-700 p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800 mb-2"
                    >
                      <FaTag className="mr-1" />
                      {task.category}
                    </motion.span>
                    <motion.h2
                      whileHover={{ x: 5 }}
                      className="text-2xl font-bold text-white"
                    >
                      {task.title}
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center mt-2 text-teal-100"
                    >
                      <FaUser className="mr-1" />
                      <span className="text-sm">
                        {task.username || task.name}
                      </span>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-right"
                  >
                    <p className="text-2xl font-bold text-white flex items-center justify-end">
                      <FaDollarSign className="mr-1" size={18} />
                      {task.budget.toLocaleString()}
                    </p>
                    <p className="text-teal-100">Project Budget</p>
                    {task.status === "open" ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                      >
                        <FaCheckCircle className="mr-1" />
                        Active
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <FaRegClock className="mr-1" />
                        Closed
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* Task Body */}
              <div className="p-6">
                {/* Image */}
                {task.image && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6 rounded-lg overflow-hidden"
                  >
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                )}

                {/* Task Stats */}
                <motion.div
                  variants={container}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg"
                >
                  {[
                    { label: "Proposals", value: bids.length || 0 },
                    { label: "Urgency", value: task.urgency || "medium" },
                    {
                      label: "Posted",
                      value: new Date(task.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      ),
                    },
                    {
                      label: "Deadline",
                      value: task.deadline
                        ? new Date(task.deadline).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "Flexible",
                      extra:
                        daysRemaining > 0 && `${daysRemaining} days remaining`,
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      className="text-center"
                    >
                      <div className="text-gray-500 text-sm">{stat.label}</div>
                      <div className="text-xl font-bold text-teal-600">
                        {stat.value}
                      </div>
                      {stat.extra && (
                        <div className="text-xs text-gray-500 mt-1">
                          {stat.extra}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Description */}
                <motion.div variants={slideUp} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaFileAlt className="mr-2 text-teal-500" />
                    Description
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">
                      {task.description}
                    </p>
                  </div>
                </motion.div>

                {/* Requirements */}
                <motion.div
                  variants={container}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                  <motion.div variants={item}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <FaCode className="mr-2 text-teal-500" />
                      Skills Required
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {task.skillsRequired?.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div variants={item}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <FaChartLine className="mr-2 text-teal-500" />
                      Project Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <FaCalendarAlt className="mr-2 text-gray-500" />
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "Flexible deadline"}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaClock className="mr-2 text-gray-500" />
                        {task.estimatedDuration || "Not specified"}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Client Information */}
                <motion.div
                  variants={slideUp}
                  className="border-t border-gray-200 pt-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaUser className="mr-2 text-teal-500" />
                    Client Information
                  </h3>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-gray-500">
                      {task.name?.charAt(0) || "A"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {task.name || "Anonymous"}
                      </p>
                      <p className="text-gray-600 text-sm flex items-center">
                        <FaEnvelope className="mr-1" />
                        {task.email || "Email not provided"}
                      </p>
                      {task.company && (
                        <p className="text-gray-600 text-sm mt-1">
                          {task.company}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Bidding Section */}
          <div className="space-y-6">
            {/* Place Bid Form */}
            <motion.div
              variants={scaleUp}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaDollarSign className="mr-2 text-teal-500" />
                Place Your Bid
              </h3>

              <form onSubmit={handleBidSubmit}>
                <motion.div variants={item} className="mb-4">
                  <label
                    htmlFor="bidAmount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Bid Amount (USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDollarSign className="text-gray-500" />
                    </div>
                    <input
                      type="number"
                      id="bidAmount"
                      min="1"
                      max={task.budget}
                      step="0.01"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="pl-7 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder={`Max $${task.budget.toLocaleString()}`}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    The client's budget is ${task.budget.toLocaleString()}
                  </p>
                </motion.div>

                <motion.div variants={item} className="mb-4">
                  <label
                    htmlFor="bidMessage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Proposal Message
                  </label>
                  <textarea
                    id="bidMessage"
                    rows="4"
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Explain why you're the best fit for this project..."
                    required
                  ></textarea>
                </motion.div>

                <motion.button
                  variants={item}
                  type="submit"
                  disabled={bidLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full cursor-pointer py-3 px-4 rounded-lg font-medium text-white transition-colors flex items-center justify-center ${
                    bidLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  }`}
                >
                  {bidLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Bid"
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Existing Bids */}
            <motion.div
              variants={scaleUp}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaUser className="mr-2 text-teal-500" />
                  Existing Bids ({bids.length})
                </h3>
                {bids.length > 0 && (
                  <span className="text-sm text-gray-500">
                    Lowest: $
                    {Math.min(...bids.map((b) => b.amount)).toLocaleString()}
                  </span>
                )}
              </div>

              {bids.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg"
                >
                  No bids yet. Be the first to bid!
                </motion.div>
              ) : (
                <motion.div variants={container} className="space-y-4">
                  {bids
                    .sort((a, b) => a.amount - b.amount)
                    .map((bid, index) => (
                      <motion.div
                        key={bid._id || index}
                        variants={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900 flex items-center">
                              <FaDollarSign
                                className="mr-1 text-teal-500"
                                size={14}
                              />
                              {bid.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              by {bid.bidderName || "Anonymous"}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(bid.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {bid.message && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Proposal:
                            </p>
                            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded line-clamp-3">
                              {bid.message}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaskDetails;
