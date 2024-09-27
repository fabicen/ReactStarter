import EditCell from "./EditCell";
import {
    createColumnHelper,
  } from "@tanstack/react-table";
import TableCell from "./TableCell";
const columnHelper = createColumnHelper();
/**
 * @typedef {Object} ColumnMeta
 * @property {string} [type]
 * @property {Option[]} [options]
 */
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
  export default columns;