"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

function SubscriptionSection() {
  const t = useTranslations('subscription');

  const socialLinks = [
    { icon: <Instagram className="text-2xl lg:text-3xl w-6 h-6 lg:w-8 lg:h-8" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Facebook className="text-2xl lg:text-3xl w-6 h-6 lg:w-8 lg:h-8" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <MessageCircle className="text-2xl lg:text-3xl w-6 h-6 lg:w-8 lg:h-8" />, href: "https://wa.me/966507314206", label: "WhatsApp" },
  ];

  const cards = [
    { type: t('residential'), title: t('residentialTitle'), image: '/Home/img1.jpg', description: t('residentialDesc') },
    { type: t('commercial'), title: t('commercialTitle'), image: '/Home/img2.jpg', description: t('commercialDesc') },
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