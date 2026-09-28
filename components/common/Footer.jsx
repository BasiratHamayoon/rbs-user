'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/about`, label: tNav('about') },
    { href: `/${locale}/why-us`, label: tNav('whyUs') },
    { href: `/${locale}/projects`, label: tNav('projects') },
    { href: `/${locale}/contact`, label: tNav('contact') }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="relative w-32 h-12 mb-4">
              <Image
                src="/logos/white.png"
                alt="Vision Roweiyat Logo"
                fill
                sizes="150px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">{t('description')}</p>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">{t('contactTitle')}</h4>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{locale === 'ar' ? 'الرياض - حي الوادي، 13313' : 'Riyadh - Al-Wadi District, 13313, KSA'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+966 507 314 206</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>islaaaza@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4">{t('businessInfo')}</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><span className="text-blue-300">C.R:</span> 7054335729</li>
              <li><span className="text-blue-300">VAT:</span> 314792788300003</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blue-300">
          <p>© {new Date().getFullYear()} {tBrand('name')}. {t('rights')}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}