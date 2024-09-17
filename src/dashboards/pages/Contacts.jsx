import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { FaChevronLeft, FaChevronRight, FaEye, FaReply, FaTrash } from "react-icons/fa";
import { mycontext } from "../../fetch/ContextProvider";
import { ImReply } from "react-icons/im";

function Courses() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { contact } = mycontext();

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
        Header: "Names",
        accessor: "names",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "subject",
        accessor: "subject",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <FaEye
              className="text-orange-500 cursor-pointer"
              onClick={() => handleView(row.original)}
            />
            <ImReply
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
    [selectedRows, selectAll]
  );

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
    setSelectedRows(checked ? contact.map((row) => row._id) : []);
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
      data: contact,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <div className="pt-20 ml-48">
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
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Rows per page:
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="ml-2 border border-gray-300 rounded"
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
              {Math.min((pageIndex + 1) * pageSize, contact.length)} of{" "}
              {contact.length}
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="p-2 text-gray-600 disabled:text-gray-400 cursor-pointer"
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
  );
}

export default Courses;
