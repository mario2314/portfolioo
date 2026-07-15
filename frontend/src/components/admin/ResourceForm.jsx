import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import FileUpload from './FileUpload';

export default function ResourceForm({ title, fields, defaultValues, onSubmit, onClose, submitting }) {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              {!['image', 'pdf'].includes(f.type) && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
              )}

              {(f.type === 'image' || f.type === 'pdf') && (
                <Controller
                  name={f.name}
                  control={control}
                  render={({ field }) => (
                    <FileUpload label={f.label} kind={f.type} value={field.value} onChange={field.onChange} />
                  )}
                />
              )}

              {f.type === 'textarea' && (
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(f.name, { required: f.required ? `${f.label} wajib diisi` : false })}
                />
              )}

              {f.type === 'select' && (
                <select
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(f.name, { required: f.required ? `${f.label} wajib diisi` : false })}
                >
                  {f.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}

              {f.type === 'checkbox' && (
                <input type="checkbox" className="rounded" {...register(f.name)} />
              )}

              {f.type === 'tags' && (
                <input
                  type="text"
                  placeholder="pisahkan dengan koma, mis: react, nodejs"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(f.name)}
                />
              )}

              {!['textarea', 'select', 'checkbox', 'tags', 'image', 'pdf'].includes(f.type) && (
                <input
                  type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : f.type === 'url' ? 'url' : 'text'}
                  step={f.type === 'number' ? 'any' : undefined}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(f.name, {
                    required: f.required ? `${f.label} wajib diisi` : false,
                    valueAsNumber: f.type === 'number',
                  })}
                />
              )}

              {errors[f.name] && <p className="text-xs text-red-600 mt-1">{errors[f.name].message}</p>}
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600">
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
            >
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
