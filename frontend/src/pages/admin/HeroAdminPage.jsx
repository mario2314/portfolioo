import SingletonManager from '../../components/admin/SingletonManager';

const fields = [
  { name: 'name', label: 'Nama' },
  { name: 'profession', label: 'Profesi' },
  { name: 'headline', label: 'Headline' },
  { name: 'subheadline', label: 'Subheadline', type: 'textarea' },
  { name: 'photoUrl', label: 'Foto Profil', type: 'image' },
  { name: 'backgroundUrl', label: 'Background', type: 'image' },
  { name: 'cvUrl', label: 'File CV (PDF)', type: 'pdf' },
];

export default function HeroAdminPage() {
  return (
    <SingletonManager title="Hero Section" endpoint="/hero" fields={fields} />
  );
}
