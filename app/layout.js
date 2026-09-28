export const metadata = {
  title: 'رؤية رعوية | Vision Roweiyat',
  description: 'Vision Roweiyat Almakkatul Arabiya Saudia'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}