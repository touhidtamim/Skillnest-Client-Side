import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Where Skills Meet Opportunity",
    subtitle:
      "Connect with top freelancers or start earning today — all in one trusted platform.",
    ctas: [
      {
        label: "Find Talent",
        color: "bg-[#F4C22C] hover:bg-[#e0b123]",
        textColor: "text-[#1E1E1E] dark:text-black",
        path: "find-talent-section",
      },
      {
        label: "Join as Freelancer",
        color: "bg-[#43727A] hover:bg-[#365c63]",
        textColor: "text-white",
        path: "/dashboard/add-task",
      },
    ],
    img: "/Images/Slide1.png",
    bgGradient: "from-[#F9F5F0] to-[#E8F4F7]",
  },
  {
    title: "Get Your Work Done by Experts",
    subtitle:
      "Post your task and hire verified freelancers to deliver high-quality results on time.",
    ctas: [
      {
        label: "Post a Task",
        color: "bg-[#F4C22C] hover:bg-[#e0b123]",
        textColor: "text-[#1E1E1E] dark:text-black",
        path: "/dashboard/add-task",
      },
      {
        label: "How It Works",
        color:
          "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-[#43727A]",
        textColor: "text-[#43727A]",
        path: "how-it-works-section",
      },
    ],
    img: "/Images/Slide2.png",
    bgGradient: "from-[#F0F9F5] to-[#F5F0F9]",
  },
  {
    title: "Turn Your Skills into Earnings",
    subtitle:
      "Join SkillNest to find meaningful tasks, build your portfolio, and grow your income.",
    ctas: [
      {
        label: "Start Freelancing",
        color: "bg-[#43727A] hover:bg-[#365c63]",
        textColor: "text-white",
        path: "/dashboard/add-task",
      },
    ],
    img: "/Images/Slide3.png",
    bgGradient: "from-[#F5F0F9] to-[#F0F5F9]",
  },
  {
    title: "Simple. Secure. SkillNest.",
    subtitle:
      "Enjoy a seamless freelance experience with secure payments, transparent reviews, and reliable support.",
    ctas: [
      {
        label: "Explore Marketplace",
        color: "bg-[#43727A] hover:bg-[#365c63]",
        textColor: "text-white",
        path: "/all-tasks",
      },
      {
        label: "Learn More",
        color:
          "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-[#43727A]",
        textColor: "text-[#43727A]",
        path: "",
      },
    ],
    img: "/Images/Slide4.png",
    bgGradient: "from-[#E8F4F7] to-[#F9F5F0]",
  },
];

const HeroSlide = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const swiperRef = useRef(null);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const handleCTAClick = (path) => {
    if (!path) {
      Swal.fire({
        icon: "info",
        title: "Coming Soon",
        text: "This feature is coming soon. Stay tuned!",
        confirmButtonColor: "#43727A",
      });
      return;
    }

    if (path.startsWith("/")) {
      window.location.href = path;
    } else {
      scroller.scrollTo(path, {
        duration: 800,
        smooth: "easeInOutQuart",
        offset: -70,
      });
    }
  };

  return (
    <section className="w-full relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500">
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`bg-gradient-to-r ${slide.bgGradient} dark:bg-[#1e1e1e] h-[60vh] flex items-center`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 sm:gap-6 lg:gap-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-6 sm:py-8 md:py-12 lg:py-16 h-full">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-center lg:text-left"
                >
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-[#43727A] dark:text-[#F4C22C] leading-snug mb-3 sm:mb-4 max-w-2xl mx-auto lg:mx-0">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-[#1E1E1E] dark:text-gray-300 mb-4 sm:mb-6 max-w-xl mx-auto lg:mx-0">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                    {slide.ctas.map((cta, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCTAClick(cta.path)}
                        className={`px-4 cursor-pointer py-2 sm:px-6 sm:py-3 text-xs sm:text-sm rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-300 ${cta.color} ${cta.textColor} dark:shadow-lg`}
                      >
                        {cta.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="flex justify-center"
                >
                  <div className="bg-white/60 dark:bg-gray-800 p-2 sm:p-4 rounded-2xl shadow-md">
                    <img
                      src={slide.img}
                      alt="Slide"
                      className="max-h-[150px] sm:max-h-[200px] md:max-h-[320px] w-auto object-contain"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>

      <style jsx global>{`
        .hero-swiper {
          --swiper-theme-color: #43727a;
          --swiper-navigation-size: 30px;
          --swiper-navigation-sides-offset: 20px;
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(66, 114, 122, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: #43727a;
          width: 30px;
          border-radius: 5px;
        }

        .autoplay-progress {
          position: absolute;
          right: 16px;
          bottom: 16px;
          z-index: 10;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #43727a;
        }

        .autoplay-progress svg {
          --progress: 0;
          position: absolute;
          left: 0;
          top: 0px;
          z-index: 10;
          width: 100%;
          height: 100%;
          stroke-width: 4px;
          stroke: #43727a;
          fill: none;
          stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
          stroke-dasharray: 125.6;
          transform: rotate(-90deg);
        }
      `}</style>
    </section>
  );
};

export default HeroSlide;
