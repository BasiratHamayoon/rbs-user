'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import Cookies from 'js-cookie';

export default function LanguageSwitcher({ variant = 'default' }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (newLocale) => {
    Cookies.set('NEXT_LOCALE', newLocale);
    const segments = pathname.split('/');
    segments[1] = newLocale;
    startTransition(() => router.push(segments.join('/')));
  };

  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-1 rounded-xl p-1 ${isWhite ? 'bg-white/10' : 'bg-slate-100'}`}>
      <Globe className={`w-4 h-4 mx-2 ${isWhite ? 'text-white/70' : 'text-slate-500'}`} />
      <button
        onClick={() => handleSwitch('en')}
        disabled={isPending}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          locale === 'en'
            ? isWhite ? 'bg-white text-blue-700 shadow-sm' : 'bg-white text-blue-700 shadow-sm'
            : isWhite ? 'text-white/70' : 'text-slate-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleSwitch('ar')}
        disabled={isPending}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          locale === 'ar'
            ? isWhite ? 'bg-white text-blue-700 shadow-sm' : 'bg-white text-blue-700 shadow-sm'
            : isWhite ? 'text-white/70' : 'text-slate-600'
        }`}
      >
        عربي
      </button>
    </div>
  );
}