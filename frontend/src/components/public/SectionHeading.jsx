export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12">
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      {description && <p className="mt-3 text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  );
}
