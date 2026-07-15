import SingletonManager from '../../components/admin/SingletonManager';

const fields = [
  { name: 'title', label: 'Judul' },
  { name: 'photoUrl', label: 'Foto', type: 'image' },
  { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 5 },
  { name: 'careerGoal', label: 'Tujuan Karier', type: 'textarea' },
  { name: 'vision', label: 'Visi', type: 'textarea' },
  { name: 'mission', label: 'Misi', type: 'textarea' },
];

export default function AboutAdminPage() {
  return (
    <SingletonManager title="About Me" endpoint="/about" fields={fields} />
  );
}
