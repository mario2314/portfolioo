export const skillCategoryOptions = [
  { value: 'PROGRAMMING_LANGUAGE', label: 'Programming Language' },
  { value: 'FRAMEWORK', label: 'Framework' },
  { value: 'DATABASE', label: 'Database' },
  { value: 'CLOUD', label: 'Cloud' },
  { value: 'TOOLS', label: 'Tools' },
  { value: 'AI', label: 'AI' },
  { value: 'ROBOTICS', label: 'Robotics' },
];

export const skillConfig = {
  title: 'Skills & Tech Stack',
  endpoint: '/skills',
  columns: [
    { key: 'name', label: 'Nama' },
    { key: 'category', label: 'Kategori' },
    { key: 'level', label: 'Level' },
  ],
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    { name: 'category', label: 'Kategori', type: 'select', required: true, options: skillCategoryOptions },
    { name: 'iconUrl', label: 'Icon', type: 'image' },
    { name: 'level', label: 'Level (0-100)', type: 'number' },
    { name: 'order', label: 'Urutan', type: 'number' },
  ],
};

export const educationConfig = {
  title: 'Education',
  endpoint: '/education',
  columns: [
    { key: 'school', label: 'Sekolah/Kampus' },
    { key: 'major', label: 'Jurusan' },
  ],
  fields: [
    { name: 'school', label: 'Nama Sekolah/Kampus', type: 'text', required: true },
    { name: 'major', label: 'Jurusan', type: 'text' },
    { name: 'logoUrl', label: 'Logo', type: 'image' },
    { name: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
    { name: 'endDate', label: 'Tanggal Selesai', type: 'date' },
    { name: 'gpa', label: 'IPK', type: 'text' },
    { name: 'description', label: 'Deskripsi', type: 'textarea' },
    { name: 'order', label: 'Urutan', type: 'number' },
  ],
};

export const certificationConfig = {
  title: 'Certifications',
  endpoint: '/certifications',
  columns: [
    { key: 'name', label: 'Nama Sertifikat' },
    { key: 'issuer', label: 'Penyelenggara' },
  ],
  fields: [
    { name: 'name', label: 'Nama Sertifikat', type: 'text', required: true },
    { name: 'issuer', label: 'Penyelenggara', type: 'text' },
    { name: 'date', label: 'Tanggal', type: 'date' },
    { name: 'imageUrl', label: 'Gambar Sertifikat', type: 'image' },
    { name: 'credentialUrl', label: 'Credential URL', type: 'url' },
    { name: 'order', label: 'Urutan', type: 'number' },
  ],
};

export const achievementConfig = {
  title: 'Achievements',
  endpoint: '/achievements',
  columns: [
    { key: 'name', label: 'Nama' },
    { key: 'category', label: 'Kategori' },
  ],
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    { name: 'category', label: 'Kategori', type: 'text' },
    { name: 'date', label: 'Tanggal', type: 'date' },
    { name: 'description', label: 'Deskripsi', type: 'textarea' },
    { name: 'imageUrl', label: 'Gambar', type: 'image' },
    { name: 'order', label: 'Urutan', type: 'number' },
  ],
};

export const testimonialConfig = {
  title: 'Testimonials',
  endpoint: '/testimonials',
  columns: [
    { key: 'name', label: 'Nama' },
    { key: 'company', label: 'Perusahaan' },
    { key: 'rating', label: 'Rating' },
  ],
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    { name: 'position', label: 'Jabatan', type: 'text' },
    { name: 'company', label: 'Perusahaan', type: 'text' },
    { name: 'photoUrl', label: 'Foto', type: 'image' },
    { name: 'content', label: 'Isi Testimoni', type: 'textarea', required: true },
    { name: 'rating', label: 'Rating (1-5)', type: 'number' },
    { name: 'order', label: 'Urutan', type: 'number' },
  ],
};

export const blogConfig = {
  title: 'Blog / Articles',
  endpoint: '/blog',
  listEndpoint: '/blog/admin/all',
  columns: [
    { key: 'title', label: 'Judul' },
    { key: 'category', label: 'Kategori' },
    {
      key: 'publishedAt',
      label: 'Status',
      render: (row) => (row.publishedAt ? 'Published' : 'Draft'),
    },
  ],
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true },
    { name: 'thumbnailUrl', label: 'Thumbnail', type: 'image' },
    { name: 'category', label: 'Kategori', type: 'text' },
    { name: 'tags', label: 'Tags', type: 'tags' },
    { name: 'content', label: 'Isi Artikel', type: 'textarea', required: true },
    { name: 'seoTitle', label: 'SEO Title', type: 'text' },
    { name: 'seoDescription', label: 'SEO Description', type: 'textarea' },
    { name: 'publishedAt', label: 'Tanggal Publish (kosongkan = draft)', type: 'date' },
  ],
};
