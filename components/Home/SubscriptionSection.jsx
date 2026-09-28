"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Clean inline social SVGs (100% reliable, no missing module exports)
const InstagramIcon = ({ className = "w-6 h-6 lg:w-8 lg:h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className = "w-6 h-6 lg:w-8 lg:h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-6 h-6 lg:w-8 lg:h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.031 0C5.406 0 .031 5.375.031 12c0 2.125.563 4.188 1.625 6L.031 24l6.188-1.594c1.75 1 3.781 1.594 5.813 1.594 6.625 0 12-5.375 12-12s-5.375-12-12-12zm6.969 16.969c-.281.781-1.438 1.469-2.344 1.656-.625.125-1.438.25-4.156-.875-3.469-1.438-5.719-5-5.906-5.25-.156-.219-1.406-1.875-1.406-3.563s.875-2.531 1.219-2.875c.344-.344.75-.438 1-.438s.5 0 .719.031c.25.031.563-.094.875.656.344.781 1.156 2.813 1.25 3.031.125.219.188.469.063.75-.125.281-.219.438-.438.688-.219.25-.469.563-.656.75-.219.219-.469.469-.219.906.281.438 1.219 2.031 2.656 3.281 1.844 1.625 3.375 2.156 3.844 2.375.469.219.75.188 1.031-.125.281-.344 1.219-1.438 1.563-1.938.313-.469.656-.406 1.094-.25.438.156 2.813 1.344 3.281 1.594.5.219.813.344.938.563.125.219.125 1.25-.156 2.031z" />
  </svg>
);

function SubscriptionSection() {
  const t = useTranslations('subscription');

  const socialLinks = [
    { icon: <InstagramIcon />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FacebookIcon />, href: "https://facebook.com", label: "Facebook" },
    { icon: <WhatsAppIcon />, href: "https://wa.me/966507314206", label: "WhatsApp" },
  ];

  const cards = [
    { 
      type: t('residential'), 
      title: t('residentialTitle'), 
      image: '/Home/img1.jpg', 
      description: t('residentialDesc') 
    },
    { 
      type: t('commercial'), 
      title: t('commercialTitle'), 
      image: '/Home/img2.jpg', 
      description: t('commercialDesc') 
    },
  ];

  const scrollToQuote = () => {
    const quoteSection = document.getElementById('request-quote-section');
    if (quoteSection) quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-20 bg-white overflow-hidden">
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-blue-700 mb-6 relative inline-block">
            {t('title')}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-700 to-transparent" />
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-blue-700 to-blue-500 mx-auto mb-8 mt-8 rounded-full" />

          <p className="text-2xl text-slate-600 max-w-2xl mx-auto font-light">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center items-center gap-8 lg:gap-12 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="bg-white p-5 rounded-3xl text-blue-700 cursor-pointer relative overflow-hidden group shadow-xl border-2 border-blue-100 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative z-10">{social.icon}</div>
            </a>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-16 w-full">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white px-10 py-10 flex flex-col gap-10 justify-between text-slate-800 rounded-3xl shadow-xl relative overflow-hidden group h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-center relative z-10">
                <h3 className="text-2xl font-light mb-3 text-slate-600">{t('weProvide')}</h3>
                <span className="block font-bold text-3xl mb-3 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                  {card.title}
                </span>
                <p className="text-xl font-medium text-slate-500">{t('solutions')}</p>
              </div>

              <div className="w-full overflow-hidden rounded-2xl flex-1 min-h-[250px] max-h-[280px] relative">
                <Image
                  src={card.image}
                  alt={card.type}
                  width={500}
                  height={280}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-6 left-6 bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {card.type}
                </div>
              </div>

              <div className="text-center flex-1 px-4">
                <p className="text-slate-700 text-lg lg:text-xl leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>

              <button
                onClick={scrollToQuote}
                className="border-2 border-blue-700 px-4 py-3 rounded-xl cursor-pointer text-lg relative overflow-hidden group/btn text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-300 font-semibold"
              >
                {t('requestQuote')}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default SubscriptionSection;