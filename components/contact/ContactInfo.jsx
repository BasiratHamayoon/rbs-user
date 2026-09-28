"use client";
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Clock, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const ContactInfo = () => {
  const t = useTranslations('contact');

  const contactDetails = [
    {
      icon: Phone,
      title: t('phoneSupport'),
      description: t('phoneSupportDesc'),
      details: t('phoneDetails'),
      timing: t('phoneTiming'),
      color: "from-blue-700 to-blue-500"
    },
    {
      icon: Mail,
      title: t('emailUs'),
      description: t('emailUsDesc'),
      details: t('emailDetails'),
      timing: t('emailTiming'),
      color: "from-blue-700 to-blue-500"
    },
    {
      icon: MapPin,
      title: t('visitUs'),
      description: t('visitUsDesc'),
      details: t('visitDetails'),
      timing: t('visitTiming'),
      color: "from-blue-700 to-blue-500"
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8 w-full">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3">
        <div className="p-2 bg-blue-700 text-white rounded-lg">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        {t('infoTitle')}
      </h3>

      <p className="text-slate-600 mb-6 lg:mb-8 text-sm sm:text-base">
        {t('infoSubtitle')}
      </p>

      <div className="grid gap-4 sm:gap-6">
        {contactDetails.map((contact, index) => {
          const IconComponent = contact.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer w-full"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${contact.color} text-white shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors duration-300 truncate">
                    {contact.title}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm mb-2">
                    {contact.description}
                  </p>
                  <p className="text-slate-700 font-medium text-sm sm:text-base mb-1 break-words">
                    {contact.details}
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="break-words">{contact.timing}</span>
                  </div>
                </div>

                <div className="opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-700 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700">{t('emergencyLabel')}</div>
            <div className="text-xs text-slate-600">{t('emergencyDesc')}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700">{t('responseTimeLabel')}</div>
            <div className="text-xs text-slate-600">{t('responseTimeDesc')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;