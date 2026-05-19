import type { Metadata } from 'next';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'dotnet.learn — .NET Developer Field Guide',
  description: 'Practical, no-fluff knowledge for .NET developers. Docker, DI, Clean Code, Azure, Terraform.',
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const validLangs = ['en', 'pt-br'];
  const activeLang = validLangs.includes(lang) ? lang : 'en';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header lang={activeLang} />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
