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
import ViewUserModal from "./ViewUserModal"; // Import the modal component
import { MdAddBox } from "react-icons/md";
import { IoMdCloudDownload, IoMdPrint } from "react-icons/io";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Users() {
  const { users = [] } = mycontext();

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [viewUser, setViewUser] = useState(null); // Modal state

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
        Cell: ({ row }) => {
          const { role, instructor_department } = row.original;
          return role === "isInstructor" && instructor_department
            ? `${role} (${instructor_department})`
            : role;
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
          </div>
        ),
      },
    ],
    [selectedRows, selectAll]
  );

  const handleView = (user) => {
    setViewUser(user); // Show modal with user details
  };

  const handleEdit = (user) => {
    console.log("Edit", user);
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
  const handleadd = () => {
    setAdduser(!adduser);
  };

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  // Function to download as PDF using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("User List", 20, 10);
    doc.autoTable({
      head: [["Firstname", "Lastname", "Email", "Gender", "User Role"]],
      body: users.map((user) => [
        user.firstname,
        user.lastname,
        user.email,
        user.gender,
        user.role,
      ]),
    });

    doc.save("users.pdf");
  };

  return (
    <div className="pt-20 ml-12 lg:ml-48">
      {adduser && <CreateUser handleadd={handleadd} />}
      <div className="pt-5 pl-3 flex flex-row items-center justify-between pr-2 pb-4">
        <div className="flex flex-row gap-4">
          <div
            className="text-green-500 flex flex-row gap-1 items-center cursor-pointer hover:underline"
            onClick={handleadd}
          >
            <MdAddBox
              type="button"
              className="text-sm md:text-base cursor-pointer transition-colors duration-300"
              onClick={handleadd}
            />
            <span> Add Instructor</span>
          </div>
          <div
            className="flex flex-row items-center gap-1 text-green-500 cursor-pointer hover:underline"
            onClick={handlePrint}
          >
            <IoMdPrint className="text-sm md:text-base cursor-pointer transition-colors duration-300" />
            <span>Print Lists</span>
          </div>

          <div
            className="flex flex-row items-center gap-1 text-green-500 cursor-pointer hover:underline"
            onClick={handleDownloadPDF}
          >
            <IoMdCloudDownload className="text-sm md:text-base cursor-pointer transition-colors duration-300" />
            <span>Download as PDF</span>
          </div>
        </div>

        <div>{users.length} Registered Users</div>
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

        {/* Pagination */}
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
              className="bg-gray-200 p-2 rounded disabled:opacity-50"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              <FaChevronLeft />
            </button>
            <span className="text-sm">
              {pageIndex + 1} of {pageOptions.length}
            </span>
            <button
              className="bg-gray-200 p-2 rounded disabled:opacity-50"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for viewing user details */}
      {viewUser && (
        <ViewUserModal user={viewUser} onClose={() => setViewUser(null)} />
      )}
    </div>
  );
}

export default Users;
