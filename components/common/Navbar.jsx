'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/why-us`, label: t('whyUs') },
    { href: `/${locale}/projects`, label: t('projects') }
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-1 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-center gap-10 items-center h-8 text-xs font-medium">
            <span>islaaaza@gmail.com</span>
            <span dir="ltr">+966 507 314 206</span>
            <span>Riyadh, Saudi Arabia</span>
          </div>
        </div>

        <nav className="bg-white py-2 px-6 lg:px-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
            <Link href={`/${locale}`} className="flex items-center">
              <div className="relative w-32 h-12 sm:w-40 sm:h-14">
                <Image
                  src="/logos/blue.png"
                  alt="Vision Roweiyat Logo"
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-2 transition-all ${
                    isActive(link.href)
                      ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
                      : 'text-slate-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Link href={`/${locale}/contact`}>
                <button className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer">
                  {t('contact')}
                </button>
              </Link>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-700">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className={`fixed top-0 ${locale === 'ar' ? 'left-0' : 'right-0'} h-full w-80 bg-white z-50 transform transition-transform duration-300 md:hidden shadow-2xl ${
        mobileOpen ? 'translate-x-0' : locale === 'ar' ? '-translate-x-full' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="relative w-28 h-10">
            <Image
              src="/logos/blue.png"
              alt="Logo"
              fill
              sizes="112px"
              className="object-contain object-left"
            />
          </div>
          <button onClick={() => setMobileOpen(false)} className="p-2 text-slate-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              <div className={`py-3 px-4 rounded-xl text-base font-medium transition-all ${
                isActive(link.href) ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}>
                {link.label}
              </div>
            </Link>
          ))}
        </div>

        <div className="p-6 border-t border-slate-200">
          <LanguageSwitcher />
          <Link href={`/${locale}/contact`} onClick={() => setMobileOpen(false)}>
            <button className="w-full mt-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-md">
              {t('contact')}
            </button>
          </Link>
        </div>
      </div>

      <div className="h-16 md:h-24" />
    </>
  );
}