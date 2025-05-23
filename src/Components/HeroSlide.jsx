import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
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
        textColor: "text-[#1E1E1E]",
      },
      {
        label: "Join as Freelancer",
        color: "bg-[#43727A] hover:bg-[#365c63]",
        textColor: "text-white",
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
        textColor: "text-[#1E1E1E]",
      },
      {
        label: "How It Works",
        color: "bg-white hover:bg-gray-100 border border-[#43727A]",
        textColor: "text-[#43727A]",
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
      },
      {
        label: "Learn More",
        color: "bg-white hover:bg-gray-100 border border-[#43727A]",
        textColor: "text-[#43727A]",
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

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <section className="w-full rounded-2xl relative overflow-hidden">
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="hero-swiper"
        onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`bg-gradient-to-r ${slide.bgGradient} h-full`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-center lg:text-left"
                >
                  <h1 className="text-4xl md:text-5xl font-extrabold text-[#43727A] leading-snug mb-6 max-w-2xl mx-auto lg:mx-0">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-[#1E1E1E] mb-8 max-w-xl mx-auto lg:mx-0">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    {slide.ctas.map((cta, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 cursor-pointer text-sm sm:text-base rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-300 ${cta.color} ${cta.textColor}`}
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
                  <div className="bg-white/60 p-4 rounded-2xl shadow-md">
                    <img
                      src={slide.img}
                      alt="Slide"
                      className="max-h-[350px] md:max-h-[450px] w-auto object-contain"
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
