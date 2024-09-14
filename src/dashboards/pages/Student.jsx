import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import {
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { mycontext } from "../../fetch/ContextProvider";

function Student() {
  const { student = [] } = mycontext(); // Default to empty array if undefined
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="form-checkbox"
          />
        ),
        id: "select",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.original._id)}
            onChange={() => handleSelect(row.original._id)}
            className="form-checkbox"
          />
        ),
      },
      {
        Header: "Reg num",
        accessor: "regNumber",
      },
      {
        Header: "Firstname",
        accessor: "student_firstname",
      },
      {
        Header: "Lastname",
        accessor: "student_lastname",
      },
      {
        Header: "Email",
        accessor: "student_email",
      },
      {
        Header: "Gender",
        accessor: "student_gender",
      },
      {
        Header: "Programs",
        accessor: (row) => {
          const isExpanded = expandedRows.has(row._id);
          const programTitles = row.program_enrolled_in
            .map((program) => program.program_title)
            .join(", ");

          const maxLength = 20; // Set a maximum length for the string

          return (
            <div>
              {isExpanded
                ? programTitles
                : programTitles.length > maxLength
                ? `${programTitles.slice(0, maxLength)}...`
                : programTitles}
              {programTitles.length > maxLength && (
                <button
                  onClick={() => toggleExpand(row._id)}
                  className="text-orange-500 ml-2"
                >
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              )}
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <FaEye
              className="text-orange-500 cursor-pointer"
              onClick={() => handleView(row.original)}
            />
            <FaEdit
              className="text-green-500 cursor-pointer"
              onClick={() => handleEdit(row.original)}
            />
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(row.original)}
            />
          </div>
        ),
      },
    ],
    [selectedRows, selectAll, expandedRows]
  );

  const toggleExpand = (rowId) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId);
      } else {
        newExpandedRows.add(rowId);
      }
      return newExpandedRows;
    });
  };

  const handleView = (student) => {
    console.log("View", student);
    // Implement view logic here
  };

  const handleEdit = (student) => {
    console.log("Edit", student);
  };

  const handleDelete = (student) => {
    console.log("Delete", student);
  };

  const handleSelect = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setSelectAll(checked);
    setSelectedRows(checked ? student.map((row) => row._id) : []);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageOptions,
    state: { pageIndex, pageSize },
    setPageSize,
  } = useTable(
    {
      columns,
      data: student,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <div className="pt-20 ml-48 ">
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="border-b border-gray-200"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 text-left text-sm font-bold text-orange-500 bg-gray-100"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-3 text-sm">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col items-end pt-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Rows per page:
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="ml-2 border border-gray-300 rounded py-1 px-2 text-sm"
                >
                  {[5, 10, 15, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </span>
              <span className="text-sm text-gray-600">
                {selectedRows.length} row{selectedRows.length !== 1 ? "s" : ""}{" "}
                selected
              </span>
              <span className="text-sm text-gray-600">
                {pageIndex * pageSize + 1}-
                {Math.min((pageIndex + 1) * pageSize, student.length)} of{" "}
                {student.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="p-2 text-gray-600 disabled:text-gray-400"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="p-2 text-gray-600 disabled:text-gray-400"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
