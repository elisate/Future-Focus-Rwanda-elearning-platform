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
import AddProgram from "./AddProgram";
import Notiflix from "notiflix";
import axios from "axios";

function Programsd() {
  const { program, setProgram } = mycontext(); // Assuming `setProgram` is available to update state
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
          />
        ),
        id: "select",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.original._id)}
            onChange={() => handleSelect(row.original._id)}
          />
        ),
      },
      {
        Header: "ID",
        accessor: (row, i) => i + 1,
      },
      {
        Header: "Program Name",
        accessor: "program_title",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <FaEye
              className="text-[#ea7b30] cursor-pointer"
              onClick={() => handleView(row.original)}
            />
            <FaEdit
              className="text-[#4caf50] cursor-pointer"
              onClick={() => handleEdit(row.original)}
            />
            <FaTrash
              className="text-[#f44336] cursor-pointer"
              onClick={() => handleDelete(row.original._id)} // Pass the correct ID
            />
          </div>
        ),
      },
    ],
    [selectedRows, selectAll] // Add selectAll as a dependency
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
    setSelectedRows(checked ? program.map((row) => row._id) : []);
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
      data: program,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  const [addProgram, setAddProgram] = useState(false);

  const handleProgram = () => {
    setAddProgram(!addProgram);
  };

  const handleDelete = async (id) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const token = userToken?.user?.tokens?.accessToken;
    try {
      Notiflix.Confirm.show(
        "Confirm Delete Program",
        "Do you want to delete this program?",
        "Yes",
        "No",
        async () => {
          await axios.delete(
            `http://localhost:5000/program/deleteProgram/${id}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Update the program list after deletion
          setProgram((prevPrograms) =>
            prevPrograms.filter((program) => program._id !== id)
          );
          Notiflix.Notify.success("Program deleted successfully");
        },
        () => {
          Notiflix.Notify.info("Delete action canceled");
        }
      );
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure("Failed to delete program");
    }
  };

  return (
    <div className="pt-20 pl-12 md:pl-24 lg:pl-48">
      {addProgram && <AddProgram handleProgram={handleProgram} />}
      <div className="pl-4 md:pl-8 pt-4 md:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-11/12 text-sm md:text-lg">
        <button
          type="button"
          className="bg-[#ea7b30] text-white rounded-lg border border-transparent py-2 px-4 text-sm md:text-base cursor-pointer transition-colors duration-300 hover:bg-[#4f1930]"
          onClick={handleProgram}
        >
          Add Program
        </button>
        <div className="mt-2 md:mt-0">{program.length} programs</div>
      </div>
      <div className="m-2 md:m-5 font-sans">
        <table
          className="w-full md:w-11/12 mx-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 border-b border-gray-200 text-gray-700 bg-gray-100 text-left text-sm font-semibold"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="text-sm hover:bg-gray-100"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="p-3 border-b border-gray-200"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row justify-between md:justify-end pr-4 md:pr-12 pt-4 items-center gap-4 md:gap-8 mt-2">
          <span className="text-sm flex items-center">
            Rows per page:{" "}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="ml-2 px-2 py-1 border border-gray-300 rounded"
            >
              {[5, 10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
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
            {Math.min((pageIndex + 1) * pageSize, program.length)} of{" "}
            {program.length}
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="text-gray-600 disabled:text-gray-300"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="text-gray-600 disabled:text-gray-300"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Programsd;
