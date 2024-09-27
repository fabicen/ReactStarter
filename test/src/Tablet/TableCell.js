import React from "react";
import { useState, useEffect } from "react";
import "../table.css";
/**
 * TableCell component
 * @param {Object} props
 * @param {function(): any} props.getValue
 * @param {Object} props.row
 * @param {Object} props.column
 * @param {Object} props.table
 */
/**
 * @typedef {Object} TableMeta
 * @property {Object.<string, boolean>} editedRows
 * @property {function((old: Object.<string, boolean>) => Object.<string, boolean>): void} setEditedRows
 * @property {function(number, boolean): void} revertData
 * @property {function(number, string, string): void} updateData
 */

const TableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    /** @type {ColumnMeta} */
    const columnMeta = column.columnDef.meta;
    /** @type {TableMeta} */
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    const onBlur = () => {
      tableMeta?.updateData(row.index, column.id, value);
    };
  
    const onSelectChange = (e) => {
      setValue(e.target.value);
      tableMeta?.updateData(row.index, column.id, e.target.value);
    };
  
    if (tableMeta?.editedRows[row.id]) {
      return columnMeta?.type === "select" ? (
        <select onChange={onSelectChange} value={initialValue}>
          {columnMeta?.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          type={columnMeta?.type || "text"}
        />
      );
    }
    return <span>{value}</span>;
  };
  export default TableCell;