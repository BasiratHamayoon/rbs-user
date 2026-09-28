"use client";
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, User, Mail, Phone, Edit, Send, Check } from 'lucide-react';
import api from '../../lib/api';

const GeneralEnquiries = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [enquiryType, setEnquiryType] = useState('General Inquiry');
  const [preferredContact, setPreferredContact] = useState('email');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // Map backend enum values to translated UI labels
  const enquiryOptions = [
    { value: 'General Inquiry', label: t('generalInquiry') },
    { value: 'Project Consultation', label: t('projectConsultation') },
    { value: 'Partnership Opportunity', label: t('partnership') },
    { value: 'Career Opportunities', label: t('career') },
    { value: 'Media Inquiry', label: t('media') },
    { value: 'Technical Support', label: t('support') },
    { value: 'Other', label: t('other') }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) return;

    setIsSubmitting(true);
    try {
      const enquiryData = {
        name: formData.name,
        email: formData.email,
        telephone: formData.phone,
        message: formData.message,
        enquiryType: enquiryType,
        preferredContact: preferredContact
      };

      await api.post('/enquiries', enquiryData, locale);
      setShowSuccessPopup(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setEnquiryType('General Inquiry');
      setPreferredContact('email');
      setAcceptTerms(false);
    } catch (error) {
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white text-slate-700 font-medium placeholder-slate-400 shadow-sm text-sm sm:text-base";

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 flex items-center gap-3">
          <div className="p-2 bg-blue-700 text-white rounded-lg">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          {t('enquiriesLabel')}
        </h3>
        <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
          {t('enquiriesSubtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="w-full">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                {t('name')} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={inputClass}
                placeholder={t('namePlaceholder')}
              />
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-700" />
                {t('email')} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={inputClass}
                placeholder={t('emailPlaceholder')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="w-full">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                {t('enquiryType')} *
              </label>
              <select 
                value={enquiryType}
                onChange={(e) => setEnquiryType(e.target.value)}
                required
                className={inputClass}
              >
                {enquiryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-700" />
                {t('phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={inputClass}
                placeholder={t('phonePlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Edit className="w-4 h-4 text-blue-700" />
              {t('message')} *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder={t('messagePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-700" />
              {t('responsePreference')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[
                { val: 'email', label: t('respondEmail') },
                { val: 'phone', label: t('respondPhone') },
                { val: 'write', label: t('respondWrite') },
                { val: 'do not', label: t('respondNone') }
              ].map((item) => {
                const checked = preferredContact === item.val;
                return (
                  <label 
                    key={item.val}
                    className={`flex items-center gap-2 cursor-pointer p-3 rounded-xl border-2 transition-all ${
                      checked 
                        ? 'border-blue-700 bg-blue-50/50 text-blue-700 font-bold' 
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={item.val}
                      checked={checked}
                      onChange={(e) => setPreferredContact(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      checked ? 'border-blue-700' : 'border-slate-400'
                    }`}>
                      {checked && <div className="w-2 h-2 bg-blue-700 rounded-full" />}
                    </div>
                    <span className="text-xs sm:text-sm">{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded text-blue-700 border-slate-300"
            />
            <span className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {t('termsText')}
            </span>
          </label>

          <button
            type="submit"
            disabled={!acceptTerms || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t('sending')}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>{t('send')}</span>
              </>
            )}
          </button>
        </form>
      </div>

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
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('success')}</h3>
                <p className="text-slate-600 mb-6">{t('successMessage')}</p>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
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
};

export default GeneralEnquiries;