import SingletonManager from '../../components/admin/SingletonManager';

const fields = [
  { name: 'email', label: 'Email' },
  { name: 'whatsapp', label: 'Nomor WhatsApp' },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'url' },
  { name: 'github', label: 'GitHub URL', type: 'url' },
  { name: 'instagram', label: 'Instagram URL', type: 'url' },
  { name: 'githubUsername', label: 'Username GitHub (untuk stats)' },
  { name: 'location', label: 'Lokasi' },
  { name: 'mapEmbedUrl', label: 'Google Maps Embed URL' },
  { name: 'logoUrl', label: 'Logo', type: 'image' },
  { name: 'footerCopyright', label: 'Teks Copyright Footer' },
  { name: 'seoTitle', label: 'SEO Title' },
  { name: 'seoDescription', label: 'SEO Description', type: 'textarea' },
  { name: 'seoKeywords', label: 'SEO Keywords (pisahkan koma)' },
  { name: 'ogImage', label: 'Open Graph Image', type: 'image' },
  { name: 'twitterCard', label: 'Twitter Card Type' },
  { name: 'canonicalUrl', label: 'Canonical URL', type: 'url' },
];

export default function SettingsAdminPage() {
  return (
    <SingletonManager title="Site Settings" endpoint="/settings" fields={fields} />
  );
}
