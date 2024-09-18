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
import CreateCourse from "./CreateCourse";

function CourseI() {
  const { course } = mycontext();

  const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [coursemodal, setCoursemodal] = useState(false);

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
        Header: "Id",
        accessor: "_id",
      },
      {
        Header: "Course Title",
        accessor: "courseTitle",
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
    [selectedRows, selectAll]
  );

  const handleView = (course) => {
    console.log("View", course);
    // Implement view logic here
  };

  const handleEdit = (course) => {
    console.log("Edit", course);
  };

  const handleDelete = (course) => {
    console.log("Delete", course);
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
    setSelectedRows(checked ? course.map((row) => row._id) : []);
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
      data: course,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
        );
    const handleCourseModal = () => {
        setCoursemodal(!coursemodal)
        
    }

  return (
      <div className="pt-20 ml-48">
          {coursemodal && <CreateCourse handleCourseModal={handleCourseModal}/>}
      <div className="pt-5 pl-3">
        <button
          type="button"
                  className="bg-[#ea7b30] text-white rounded-lg border border-transparent py-2 px-4 text-sm md:text-base cursor-pointer transition-colors duration-300 hover:bg-[#4f1930]"
                  onClick={handleCourseModal}
        >
          Add Course
        </button>
      </div>
      <div className="m-5 font-sans">
        <table
          {...getTableProps()}
          className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 border-b border-gray-200 text-left bg-gray-100 text-orange-500 text-sm font-bold"
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
                <tr {...row.getRowProps()} className="text-sm">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="p-3 border-b border-gray-200 last:border-r-0"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-wrap items-center justify-end gap-8 mt-4 pr-12">
          <span className="flex items-center text-sm text-gray-600">
            Rows per page:{" "}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="ml-1 px-2 py-1 text-sm"
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
            {Math.min((pageIndex + 1) * pageSize, course.length)} of{" "}
            {course.length}
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="text-gray-600 disabled:text-gray-400"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="text-gray-600 disabled:text-gray-400"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseI;
