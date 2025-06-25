import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const FAQ = () => {
  // State to track currently opened FAQ index
  const [activeIndex, setActiveIndex] = useState(null);
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  // State for selected FAQ category filter
  const [activeCategory, setActiveCategory] = useState("all");

  // FAQ categories list
  const faqCategories = [
    { id: "all", name: "All Categories" },
    { id: "account", name: "Account" },
    { id: "payments", name: "Payments" },
    { id: "hiring", name: "Hiring" },
    { id: "freelancing", name: "Freelancing" },
    { id: "safety", name: "Safety" },
  ];

  // All FAQs data
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click the 'Sign Up' button at the top right corner. You can register using your email, Google account, or Facebook. Verification is required for security purposes.",
      category: "account",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes! SkillNest has iOS and Android apps available in their respective app stores. All features are optimized for mobile use.",
      category: "account",
    },
    {
      question: "How do I change my account type?",
      answer:
        "Navigate to Account Settings > Profile Type. You can switch between client and freelancer modes at any time with no restrictions.",
      category: "account",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards (Visa, Mastercard, Amex), PayPal, bank transfers, and mobile money in selected countries.",
      category: "payments",
    },
    {
      question: "When do freelancers get paid?",
      answer:
        "Freelancers receive payment 1-3 business days after client approval. For hourly projects, payments are processed weekly.",
      category: "payments",
    },
    {
      question: "Are there any transaction fees?",
      answer:
        "Yes, we charge a 10% service fee for clients and 10-20% for freelancers depending on membership level. These fees cover payment processing and platform maintenance.",
      category: "payments",
    },
    {
      question: "How do I post a job?",
      answer:
        "After logging in, click 'Post a Job' and fill out the project details. Be specific about requirements, budget, and timeline to attract quality proposals.",
      category: "hiring",
    },
    {
      question: "Can I interview candidates?",
      answer:
        "Yes! Our platform includes messaging and video call features to interview candidates before hiring.",
      category: "hiring",
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer:
        "We offer a revision period and dispute resolution process. Funds are protected in escrow until you approve the work.",
      category: "hiring",
    },
    {
      question: "How do I build a strong profile?",
      answer:
        "Complete all profile sections, add portfolio samples, verify your skills, and gather client testimonials. A complete profile gets 5x more views.",
      category: "freelancing",
    },
    {
      question: "What are SkillNest Pro benefits?",
      answer:
        "Pro members get premium visibility, lower service fees, advanced analytics, and dedicated support. Pricing starts at $14.99/month.",
      category: "freelancing",
    },
    {
      question: "How do I increase my earnings?",
      answer:
        "Specialize in high-demand skills, maintain excellent ratings, respond quickly to inquiries, and build long-term client relationships.",
      category: "freelancing",
    },
    {
      question: "How does SkillNest ensure safety?",
      answer:
        "We use escrow payments, identity verification, workroom monitoring, and 24/7 fraud detection to protect all transactions.",
      category: "safety",
    },
    {
      question: "What's your refund policy?",
      answer:
        "Refunds are available for unused escrow funds. For completed work, refunds may be issued through our dispute resolution process.",
      category: "safety",
    },
    {
      question: "How do I report suspicious activity?",
      answer:
        "Use the 'Report' button on any profile or message, or contact our Trust & Safety team directly through the Help Center.",
      category: "safety",
    },
  ];

  // Toggle open/close FAQ item by index
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter FAQs by search term and category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-teal-600">
          Frequently Asked Questions
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Everything you need to know about SkillNest
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="mb-8">
        <div className="relative mb-6">
          {/* Search icon inside input */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search FAQs..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition ${
                activeCategory === category.id
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ list */}
      <div className="space-y-4 mb-12">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Question button */}
              <button
                className="w-full cursor-pointer px-6 py-5 text-left focus:outline-none flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h2>
                <span className="text-teal-600">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {/* Answer panel, toggle visibility */}
              <div
                className={`px-6 pb-5 pt-0 text-gray-600 transition-all duration-300 ${
                  activeIndex === index ? "block" : "hidden"
                }`}
              >
                <p className="mb-3">{faq.answer}</p>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                  {faqCategories.find((c) => c.id === faq.category)?.name}
                </span>
              </div>
            </div>
          ))
        ) : (
          // No FAQs match filter
          <div className="text-center py-10">
            <p className="text-gray-500">
              No FAQs found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Support call to action */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Still need help?
        </h3>
        <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
          Our support team is available 24/7 to answer your questions and help
          you get the most out of SkillNest.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/skillnest/contact"
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
