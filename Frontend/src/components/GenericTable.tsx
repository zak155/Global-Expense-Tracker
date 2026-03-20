//import React from 'react';
import './GenericTable.css'; // optional CSS for styling

// Column definition for generic table
interface Column<T> {
  key: keyof T;      // ensures key exists on T
  label: string;     // column header
}

interface Props<T extends { id: number }> {
  data: T[];         // array of generic data
  columns: Column<T>[]; // columns configuration
}

function GenericTable<T extends { id: number }>({ data, columns }: Props<T>) {
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
          {data.map((row) => (
            <tr key={row.id} className="row-hover">
              {columns.map((col) => (
                <td key={String(col.key)}>{String(row[col.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenericTable;