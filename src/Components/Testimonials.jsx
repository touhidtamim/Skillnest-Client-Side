import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

// Testimonial data with user info and feedback
const testimonials = [
  {
    id: 1,
    name: "Zarin Tasnim ",
    role: "UX/UI Designer",
    photo:
      "https://i.postimg.cc/8k48VT3q/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDI0-LTA4-L3-Jhd3-Bpe-GVs-X29m-Zmlj-ZV8z-NV9i-ZWF1d-Glmd-Wxfc21pb-Glu-Z195b3-Vu.jpg",
    quote:
      "SkillNest transformed my freelance career. The quality of clients and projects is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mirza Ashfaq",
    role: "Fullstack Developer",
    photo:
      "https://i.postimg.cc/8Pf70XXf/young-man-happy-expression-business-desk-company-concept-ai-generated-1194-589229.jpg",
    quote:
      "I doubled my income within 3 months thanks to SkillNest's premium projects.",
    rating: 5,
  },
  {
    id: 3,
    name: "Farzana Haque",
    role: "Digital Marketer",
    photo:
      "https://i.postimg.cc/bNr5ck1t/smiling-student-girl-formal-attire-isolated-background-920413-3043.jpg",
    quote:
      "The platform's intuitive interface saved me hours of client hunting each week.",
    rating: 4,
  },
  {
    id: 4,
    name: "Fahim Chowdhury",
    role: "Data Scientist",
    photo:
      "https://i.postimg.cc/DwjyfqN3/man-with-his-arms-crossed-shirt-that-says-hes-smiling-979520-165623.jpg",
    quote:
      "Secure payments and professional community make this my go-to platform.",
    rating: 5,
  },
];

// StarRating component to display rating stars dynamically
const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center mb-3">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [activeCard, setActiveCard] = useState(null); // Track hovered testimonial card

  // Show alert on Read More click
  const handleReadMoreClick = () => {
    Swal.fire({
      title: "More Stories Coming Soon!",
      text: "We're gathering more amazing success stories. Stay tuned!",
      icon: "info",
      confirmButtonColor: "#14b8a6",
      confirmButtonText: "Got it!",
    });
  };

  return (
    <section className="bg-[#FAF7F5] rounded-2xl py-20 px-6 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto ">
        {/* Section header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#43727A] mb-4">
            Voices of Success
          </h2>
          <p className="text-lg text-[#1E1E1E] max-w-2xl mx-auto">
            Hear from professionals who've transformed their careers with
            SkillNest
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setActiveCard(testimonial.id)}
              onHoverEnd={() => setActiveCard(null)}
              className={`bg-white rounded-xl p-6 shadow-sm transition-all duration-300 ${
                activeCard === testimonial.id
                  ? "shadow-lg border-t-4 border-teal-500"
                  : ""
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  {/* Checkmark icon on hover */}
                  {activeCard === testimonial.id && (
                    <div className="absolute -bottom-2 -right-2 bg-teal-500 rounded-full p-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Star rating display */}
                <StarRating rating={testimonial.rating} />

                {/* Quote text */}
                <p className="text-gray-700 italic mb-5 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* User name and role */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-teal-600 text-sm font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Read More button with fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={handleReadMoreClick}
            className="cursor-pointer px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Read More Stories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
