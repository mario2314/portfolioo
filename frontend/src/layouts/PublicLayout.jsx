import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import api from '../services/api';

export default function PublicLayout() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>{settings?.seoTitle || 'Portfolio'}</title>
        {settings?.seoDescription && <meta name="description" content={settings.seoDescription} />}
        {settings?.seoKeywords && <meta name="keywords" content={settings.seoKeywords} />}
        {settings?.ogImage && <meta property="og:image" content={settings.ogImage} />}
        {settings?.canonicalUrl && <link rel="canonical" href={settings.canonicalUrl} />}
        <meta name="twitter:card" content={settings?.twitterCard || 'summary_large_image'} />
      </Helmet>

      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
