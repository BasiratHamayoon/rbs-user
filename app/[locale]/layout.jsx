import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import '../globals.css';
import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';
import { ProjectProvider } from 'context/ProjectContext';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'ar') {
    return { title: 'رؤية رعوية - المملكة العربية السعودية', description: 'رؤية رعوية للإنشاءات' };
  }
  return { title: 'Vision Roweiyat - Construction', description: 'Vision Roweiyat Almakkatul Arabiya Saudia' };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <NextIntlClientProvider messages={messages}>
      <ProjectProvider>
        <div dir={dir} className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </ProjectProvider>
    </NextIntlClientProvider>
  );
}