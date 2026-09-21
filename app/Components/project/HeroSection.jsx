"use client"
import { motion } from 'framer-motion';
import { FaStar, FaBolt, FaClock } from 'react-icons/fa';

const HeroSection = ({ onScrollToProjects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 min-h-[580px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] flex items-center justify-center w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Projects/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/80 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#001C73]/10 via-[#001C73]/5 to-transparent"></div>
      </div>
      
      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-5xl mx-auto flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6 md:mb-8"
            variants={itemVariants}
          >
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-[#001C73] to-[#0038FF] rounded-full"></div>
            <span className="text-xs sm:text-sm font-bold text-[#001C73] tracking-widest uppercase bg-[#001C73]/10 px-4 py-2 rounded-full border border-[#001C73]/20">
              Our Portfolio
            </span>
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-[#001C73] to-[#0038FF] rounded-full"></div>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight text-gray-900"
            variants={itemVariants}
          >
            <span>Our</span>{" "}
            <motion.span 
              className="bg-gradient-to-r from-[#001C73] to-[#0038FF] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Projects
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-[#001C73] to-[#0038FF] rounded-full mb-6 md:mb-8 shadow-lg"
            variants={itemVariants}
          />
          
          <motion.p 
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-800 max-w-3xl leading-relaxed font-semibold mb-8 md:mb-10 px-2"
            variants={itemVariants}
          >
            Discover <span className="text-[#001C73] font-bold">exceptional construction projects</span> showcasing innovation and quality craftsmanship
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-4xl"
            variants={itemVariants}
          >
            {[
              { text: "Premium Quality", icon: <FaStar className="w-3.5 h-3.5" /> },
              { text: "Innovative Design", icon: <FaBolt className="w-3.5 h-3.5" /> },
              { text: "Timely Delivery", icon: <FaClock className="w-3.5 h-3.5" /> }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 shadow-md border border-gray-200/60 min-w-[180px] justify-center sm:justify-start"
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 15px 30px rgba(0, 28, 115, 0.12)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#001C73] to-[#0038FF] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-gray-800 font-bold text-xs sm:text-sm whitespace-nowrap">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      <motion.div
        className="absolute top-1/4 left-10 w-4 h-4 bg-[#001C73]/20 rounded-full hidden sm:block"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-16 w-6 h-6 bg-[#0038FF]/15 rounded-full hidden sm:block"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-20 w-3 h-3 bg-[#001C73]/25 rounded-full hidden sm:block"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </section>
  );
};

HeroSection.defaultProps = {
  onScrollToProjects: null
};

export default HeroSection;