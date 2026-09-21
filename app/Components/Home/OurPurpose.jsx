"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaAngleRight, FaPlay, FaSpinner, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import videoThumbnail from '../../../public/Home/thumbnail.jpg';
import Loader from '../Loader';

function OurPurpose() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [videoSource, setVideoSource] = useState("/Home/video.mp4");
  const videoRef = useRef(null);
  const router = useRouter();

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
    setIsVideoLoading(true); 
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoadStart = () => {
    setIsVideoLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
  };

  const handleReadMore = () => {
    setIsPageLoading(true);
    setTimeout(() => {
      router.push('/Pages/whyUs');
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const slideUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 40
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

  const thumbnailVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const playButtonVariants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  };

  const textLinkVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
      {isPageLoading && <Loader />}
      
      <section 
        ref={ref}
        className='text-black overflow-hidden grid lg:grid-cols-2 grid-cols-1 lg:px-40 px-6 py-20 gap-12 lg:gap-20 justify-center items-start bg-gray-50 min-h-[80vh]'
      >
        <motion.div 
          className='flex flex-col items-center lg:items-start h-full justify-between w-full max-w-full'
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className='w-full max-w-full overflow-hidden'>
            <motion.div
              className='relative cursor-pointer'
              variants={thumbnailVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              onClick={handleVideoOpen}
            >
              <Image 
                src={videoThumbnail} 
                alt="Video Thumbnail"
                sizes="(max-width: 768px) 100vw, 50vw"
                className='w-full max-w-lg rounded-2xl shadow-xl transition-all duration-500'
                priority
              />
              
              <motion.div 
                className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center"
                variants={playButtonVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <div
                  className="bg-white/95 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#001C73]/30"
                >
                  <FaPlay className="text-[#001C73] text-xl sm:text-2xl ml-1" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center gap-3 w-full justify-center lg:justify-start pt-6"
            variants={slideUpVariants}
          >
            <motion.div
              className="w-2 h-2 bg-[#001C73] rounded-full"
              animate={inView ? {
                scale: [1, 1.5, 1],
                opacity: [1, 0.7, 1]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <p className='text-gray-700 text-lg font-semibold flex items-center gap-2'>
              <FaPlay className="text-[#001C73] text-sm" />
              Watch our Video
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className='flex flex-col h-full justify-between space-y-8 w-full max-w-full'
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className='space-y-8'>
            <motion.div 
              className='space-y-6'
              variants={slideUpVariants}
            >
              <h1 className='text-2xl font-bold text-[#001C73] leading-tight tracking-wide uppercase'>
                Why us?
              </h1>
              
              <h2 className='text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight'>
                Our purpose is to improve people's lives through building the facilities and infrastructure that communities need
              </h2>
            </motion.div>

            <motion.div
              onClick={handleReadMore}
              variants={textLinkVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="inline-flex items-center gap-3 text-gray-700 font-semibold text-lg cursor-pointer group relative pb-1"
            >
              <span>Read more</span>
              <span>
                <FaAngleRight className="w-5 h-5" />
              </span>
              <div
                className="h-0.5 bg-[#001C73] absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-300"
              />
            </motion.div>
          </div>

          <motion.div 
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pt-8 w-full max-w-full"
            variants={containerVariants}
          >
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '25+', label: 'Years Experience' },
              { number: '98%', label: 'Client Satisfaction' }
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-white shadow-lg border border-gray-100"
              >
                <div className="text-2xl font-bold text-[#001C73]">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="relative bg-black rounded-2xl overflow-hidden max-w-4xl w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                onClick={handleVideoClose}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes className="text-xl" />
              </motion.button>

              <div className="relative aspect-video w-full">
                {isVideoLoading && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div
                      className="animate-spin"
                    >
                      <FaSpinner className="text-white text-4xl" />
                    </div>
                    <p className="absolute bottom-10 text-white text-lg font-semibold">
                      Loading video...
                    </p>
                  </motion.div>
                )}

                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  onLoadStart={handleVideoLoadStart}
                  onCanPlay={handleVideoCanPlay}
                  onError={handleVideoError}
                >
                  <source src={videoSource} type="video/mp4" />
                  <source src="/Home/video.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default OurPurpose;