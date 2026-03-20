import './GenericTable.css';

interface Column<T> {
  key: keyof T;
  label: string;
  // NEW: Optional custom renderer for professional formatting
  render?: (value: any, item: T) => React.ReactNode;
}

interface Props<T extends { id: number | string }> {
  data: T[];
  columns: Column<T>[];
}

function GenericTable<T extends { id: number | string }>({ data, columns }: Props<T>) {
  return (
    <div className="table-container">
      <table className="generic-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="row-hover">
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {/* Use custom render if available, otherwise default to string */}
                    {col.render 
                      ? col.render(row[col.key], row) 
                      : String(row[col.key])
                    }
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GenericTable;