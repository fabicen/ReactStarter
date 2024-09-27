import { useState, useEffect } from "react";
import "./table.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

/**
 * @typedef {Object} Student
 * @property {number} studentId
 * @property {string} name
 * @property {string} dateOfBirth
 * @property {string} major
 */

/**
 * @typedef {Object} Option
 * @property {string} label
 * @property {string} value
 */

/** @type {Student[]} */
const defaultData = [
  {
    studentId: 1111,
    name: "Bahar Constantia",
    dateOfBirth: "1984-01-04",
    major: "Computer Science",
  },
  {
    studentId: 2222,
    name: "Harold Nona",
    dateOfBirth: "1961-05-10",
    major: "Communications",
  },
  {
    studentId: 3333,
    name: "Raginolf Arnulf",
    dateOfBirth: "1991-10-12",
    major: "Business",
  },
  {
    studentId: 4444,
    name: "Marvyn Wendi",
    dateOfBirth: "1978-09-24",
    major: "Psychology",
  },
];

/**
 * @typedef {Object} ColumnMeta
 * @property {string} [type]
 * @property {Option[]} [options]
 */

/**
 * @typedef {Object} TableMeta
 * @property {Object.<string, boolean>} editedRows
 * @property {function((old: Object.<string, boolean>) => Object.<string, boolean>): void} setEditedRows
 * @property {function(number, boolean): void} revertData
 * @property {function(number, string, string): void} updateData
 */

/**
 * TableCell component
 * @param {Object} props
 * @param {function(): any} props.getValue
 * @param {Object} props.row
 * @param {Object} props.column
 * @param {Object} props.table
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

/**
 * EditCell component
 * @param {Object} props
 * @param {Object} props.row
 * @param {Object} props.table
 */
const EditCell = ({ row, table }) => {
  /** @type {TableMeta} */
  const meta = table.options.meta;

  const setEditedRows = (e) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    if (elName !== "edit") {
      meta?.revertData(row.index, elName === "cancel");
    }
  };

  return (
    <div className="edit-cell-container">
      {meta?.editedRows[row.id] ? (
        <div className="edit-cell">
          <button onClick={setEditedRows} name="cancel">
            X
          </button>
          <button onClick={setEditedRows} name="done">
            ✔
          </button>
        </div>
      ) : (
        <button onClick={setEditedRows} name="edit">
          ✐
        </button>
      )}
    </div>
  );
};

const columnHelper = createColumnHelper();

/** @type {import('@tanstack/react-table').ColumnDef<Student>[]} */
const columns = [
  columnHelper.accessor("studentId", {
    header: "Student ID",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("name", {
    header: "Full Name",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("dateOfBirth", {
    header: "Date Of Birth",
    cell: TableCell,
    meta: {
      type: "date",
    },
  }),
  columnHelper.accessor("major", {
    header: "Major",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Communications", label: "Communications" },
        { value: "Business", label: "Business" },
        { value: "Psychology", label: "Psychology" },
      ],
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];

/**
 * Table component
 */
const Tester = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </>
  );
};
export default Tester;