"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Phone, Mail, MapPin, Check, Send, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import api from '../../lib/api';

function RequestQuote() {
  const t = useTranslations('quote');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '', telephone: '', email: '', message: '',
    projectType: 'residential', budget: 'under-10k', timeline: 'flexible'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/quotes', formData, locale);
      setShowSuccessPopup(true);
      setFormData({ name: '', telephone: '', email: '', message: '', projectType: 'residential', budget: 'under-10k', timeline: 'flexible' });
    } catch {
      alert('Error submitting quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none transition-all duration-300 bg-white text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <>
      <section id="request-quote-section" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <Image src="/Home/bg.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80" />
        </div>

        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 lg:gap-20 items-center">
            <motion.div
              className="text-center lg:text-start"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-700 mb-6 relative">
                {t('title')}
                <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-transparent" />
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-blue-500 mb-8 lg:mx-0 mx-auto rounded-full" />

              <p className="text-2xl text-slate-700 leading-relaxed mb-8 font-light">
                {t('subtitle')}
              </p>

              <div className="space-y-4 text-start">
                {['consultation', 'management', 'quality', 'delivery'].map((key, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 text-lg font-medium">{t(`features.${key}`)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-blue-700 mb-4">{t('contactInfo')}</h3>
                <div className="space-y-3 text-slate-700">
                  <div className="flex items-center gap-3"><Phone className="text-blue-700 w-5 h-5" /><p>+966 507 314 206</p></div>
                  <div className="flex items-center gap-3"><Mail className="text-blue-700 w-5 h-5" /><p>islaaaza@gmail.com</p></div>
                  <div className="flex items-center gap-3"><MapPin className="text-blue-700 w-5 h-5" /><p>Riyadh - Al-Wadi District, 13313, KSA</p></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-blue-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-3xl font-bold text-blue-700 text-center mb-8">{t('formTitle')}</h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('fullName')} *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className={inputClass} placeholder={t('fullName')} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('telephone')} *</label>
                  <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required
                    className={inputClass} placeholder={t('telephone')} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('email')} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    className={inputClass} placeholder={t('email')} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('projectType')} *</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} required className={inputClass}>
                    <option value="residential">{t('residential')}</option>
                    <option value="commercial">{t('commercial')}</option>
                    <option value="renovation">{t('renovation')}</option>
                    <option value="new-construction">{t('newConstruction')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('budget')}</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                    <option value="under-10k">Under SAR 10,000</option>
                    <option value="10k-50k">SAR 10,000 - 50,000</option>
                    <option value="50k-100k">SAR 50,000 - 100,000</option>
                    <option value="100k-500k">SAR 100,000 - 500,000</option>
                    <option value="500k-plus">SAR 500,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('timeline')}</label>
                  <select name="timeline" value={formData.timeline} onChange={handleChange} className={inputClass}>
                    <option value="immediately">{t('immediately')}</option>
                    <option value="1-3 months">1-3 Months</option>
                    <option value="3-6 months">3-6 Months</option>
                    <option value="6-12 months">6-12 Months</option>
                    <option value="flexible">{t('flexible')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('projectDetails')} *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4}
                    className={`${inputClass} resize-none`} placeholder={t('projectDetails')} />
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 px-6 rounded-xl font-bold text-lg cursor-pointer flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('submitting')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('submit')}</span>
                      <Send className="text-lg w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-slate-500 text-sm">{t('privacy')}</p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-blue-100"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-3xl text-emerald-600 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('success')}</h3>
                <p className="text-slate-600 mb-6">{t('successMessage')}</p>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default RequestQuote;