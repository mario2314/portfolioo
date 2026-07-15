import { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import DataTable from './DataTable';
import ResourceForm from './ResourceForm';

export default function ResourceManager({ config }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(config.listEndpoint || config.endpoint, { params: { page, limit: 10, search } });
      setData(res.data.data);
      setTotalPages(res.data.meta?.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, page, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAdd = () => { setEditingItem(null); setModalOpen(true); };
  const openEdit = (item) => { setEditingItem(item); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleDelete = async (item) => {
    const label = item.name || item.title || 'data ini';
    if (!window.confirm(`Hapus "${label}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await api.delete(`${config.endpoint}/${item.id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus data');
    }
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const payload = { ...formData };
      config.fields.forEach((f) => {
        if (f.type === 'tags' && typeof payload[f.name] === 'string') {
          payload[f.name] = payload[f.name].split(',').map((t) => t.trim()).filter(Boolean);
        }
        if (f.type === 'checkbox') {
          payload[f.name] = !!payload[f.name];
        }
        if (f.type === 'url' && payload[f.name] === '') {
          payload[f.name] = null;
        }
      });

      if (editingItem) {
        await api.put(`${config.endpoint}/${editingItem.id}`, payload);
      } else {
        await api.post(config.endpoint, payload);
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data');
    } finally {
      setSubmitting(false);
    }
  };

  const buildDefaultValues = () => {
    if (!editingItem) {
      return config.fields.reduce((acc, f) => {
        acc[f.name] = f.type === 'number' ? 0 : '';
        return acc;
      }, {});
    }
    return config.fields.reduce((acc, f) => {
      let val = editingItem[f.name];
      if (f.type === 'tags' && Array.isArray(val)) val = val.join(', ');
      if (f.type === 'date' && val) val = String(val).slice(0, 10);
      acc[f.name] = val ?? (f.type === 'number' ? 0 : '');
      return acc;
    }, {});
  };

  return (
    <div className="space-y-4">
      <DataTable
        title={config.title}
        columns={config.columns}
        data={data}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <ResourceForm
          title={editingItem ? `Edit ${config.title}` : `Tambah ${config.title}`}
          fields={config.fields}
          defaultValues={buildDefaultValues()}
          onSubmit={handleSubmit}
          onClose={closeModal}
          submitting={submitting}
        />
      )}
    </div>
  );
}
