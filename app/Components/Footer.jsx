"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#001C73] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="relative w-32 h-12 mb-3">
              <Image
                src="/logos/white.png"
                alt="RBS Construction"
                fill
                sizes="(max-width: 768px) 120px, 150px"
                className="object-contain object-center md:object-left"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm md:max-w-none">
              Building dreams with precision across the Kingdom of Saudi Arabia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h4 className="text-base font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/Pages/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/Pages/whyUs" className="hover:text-white transition-colors">Why Us</Link></li>
              <li><Link href="/Pages/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/Pages/contactus" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h4 className="text-base font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300 flex flex-col items-center md:items-start">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FaMapMarkerAlt className="flex-shrink-0" />
                <span>Riyadh - Al-Wadi District, 13313, KSA</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FaPhone className="flex-shrink-0" />
                <span>+966 507 314 206</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="flex-shrink-0" />
                <span>islaaaza@gmail.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h4 className="text-base font-semibold mb-3">Business Info</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><span className="text-gray-400">C.R:</span> 7054335729</li>
              <li><span className="text-gray-400">VAT:</span> 314792788300003</li>
            </ul>
            <div className="flex justify-center md:justify-start gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#001C73] transition-all duration-300">
                <FaFacebook className="w-3 h-3" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#001C73] transition-all duration-300">
                <FaTwitter className="w-3 h-3" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#001C73] transition-all duration-300">
                <FaLinkedin className="w-3 h-3" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#001C73] transition-all duration-300">
                <FaInstagram className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400 text-center md:text-left">
          <p>© 2024 RBS Construction. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;