/**
 * A comparison that is a real table for wide screens, search engines and
 * screen readers, and a stack of labelled cards on a phone, so nobody has to
 * scroll sideways.
 */
export function CompareTable({
  caption,
  columns,
  rows,
  note,
}: {
  caption: string;
  columns: string[];
  rows: React.ReactNode[][];
  note?: string;
}) {
  return (
    <figure className="m-0">
      <table className="w-full border-separate border-spacing-0 text-small md:overflow-hidden md:rounded-2xl md:border md:border-hair md:bg-card">
        <caption className="pb-3 text-left font-display text-h3 font-semibold">{caption}</caption>
        <thead className="sr-only md:not-sr-only">
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="md:border-b md:border-hair md:bg-surface-alt md:p-4 md:text-left md:font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, r) => (
            <tr key={r} className="mb-3 block rounded-2xl border border-hair bg-card p-4 md:mb-0 md:table-row md:rounded-none md:border-0 md:p-0">
              {cells.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="block pb-1 text-left text-body font-semibold md:table-cell md:w-[22%] md:border-b md:border-hair md:p-4 md:align-top md:text-small">
                    {cell}
                  </th>
                ) : (
                  <td key={c} className="block py-1.5 md:table-cell md:border-b md:border-hair md:p-4 md:align-top">
                    <span className="block text-caption font-semibold uppercase tracking-wider text-muted md:hidden">{columns[c]}</span>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {note && <figcaption className="mt-3 text-caption text-muted">{note}</figcaption>}
    </figure>
  );
}
