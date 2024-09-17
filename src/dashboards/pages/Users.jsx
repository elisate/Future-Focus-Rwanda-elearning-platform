import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import {
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
} from "react-icons/fa";
import { mycontext } from "../../fetch/ContextProvider";
import CreateUser from "./CreateUser";

function Users() {
  const { users = [] } = mycontext();

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
        Header: "Firstname",
        accessor: "firstname",
      },
      {
        Header: "Lastname",
        accessor: "lastname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "User role",
        accessor: "role",
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
            {/* <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(row.original)}
            /> */}
          </div>
        ),
      },
    ],
    [selectedRows, selectAll]
  );

  const handleView = (user) => {
    console.log("View", user);
    // Implement view logic here
  };

  const handleEdit = (user) => {
    console.log("Edit", user);
  };

  const handleDelete = (user) => {
    console.log("Delete", user);
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
    setSelectedRows(checked ? users.map((row) => row._id) : []);
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
      data: users,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
    );
  const [adduser, setAdduser] = useState(false);
  const handleadd=() => {
    setAdduser(!adduser)
  }

  return (
    <div className="pt-20 ml-12 lg:ml-48">
      {adduser && <CreateUser handleadd={handleadd} />}
      <div className="pt-5 pl-3">
        <button
          type="button"
          className="bg-[#ea7b30] text-white rounded-lg border border-transparent py-2 px-4 text-sm md:text-base cursor-pointer transition-colors duration-300 hover:bg-[#4f1930]"
          onClick={handleadd}
        >
          Add Isntructor
        </button>
      </div>

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
                className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm"
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
              {Math.min((pageIndex + 1) * pageSize, users.length)} of{" "}
              {users.length}
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
  );
}

export default Users;
