import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaReply,
  FaTrash,
} from "react-icons/fa";
import { mycontext } from "../../fetch/ContextProvider";
import { ImReply } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notiflix from "notiflix";
import { Notify } from "notiflix";
import DirectReply from "./DirectReply";
import { IoMdCloudDownload, IoMdPrint } from "react-icons/io";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import the autoTable plugin for jsPDF

function Contact() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { contact, setContact } = mycontext();

  const [reply, setReply] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/view-contact/${id}`);
  };

  // Function to print the contact list
  const handlePrint = () => {
    window.print();
  };

  // Function to download the contact list as a PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Contact List", 14, 16);

    const tableColumn = ["Names", "Email", "Subject", "Status"];
    const tableRows = [];

    contact.forEach((cont) => {
      const contactData = [cont.names, cont.email, cont.subject, cont.status];
      tableRows.push(contactData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("contact-list.pdf");
  };

  // Define the table columns using useMemo to prevent unnecessary re-renders
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
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => {
          const status = cell.value;
          const statusColor =
            status === "Pending"
              ? "text-orange-500"
              : status === "Replied"
              ? "text-green-500"
              : "text-gray-500";

          return <span className={statusColor}>{status}</span>;
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <FaEye
              className="text-orange-500 cursor-pointer"
              onClick={() => handleView(row.original._id)}
            />
            <ImReply
              className="text-green-500 cursor-pointer"
              onClick={() => handleReply(row.original)}
            />
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(row.original._id)}
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
            `http://localhost:5000/contact/deleteContact/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setContact((prevContact) =>
            prevContact.filter((contact) => contact._id !== id)
          );
          Notiflix.Notify.success("Contact deleted successfully");
        },
        () => {
          Notiflix.Notify.info("Delete action canceled");
        }
      );
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure("Failed to delete Contact");
    }
  };

  const handleReply = (contact) => {
    setSelectedContactId(contact._id); // Set the selected contact's ID
    setReply(true); // Open the modal
  };

  return (
    <div className="pt-20 ml-48">
      <div className="ml-0 pr-11 md:pl-8 pt-4 md:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-11/12 text-sm md:text-lg ">
        <div className="flex flex-row gap-4 items-center">
          <div
            className="flex flex-row items-center gap-1 text-green-500 cursor-pointer hover:underline"
            onClick={handlePrint} // Print functionality
          >
            <IoMdPrint className="text-sm md:text-base cursor-pointer transition-colors duration-300 " />
            <span>Print Lists</span>
          </div>
          <div>
            <div
              className="flex flex-row items-center gap-1 text-green-500 cursor-pointer hover:underline"
              onClick={handleDownloadPDF} // Download PDF functionality
            >
              <IoMdCloudDownload className="text-sm md:text-base cursor-pointer transition-colors duration-300 " />
              <span>Download as PDF</span>
            </div>
          </div>
        </div>

        <div className="mt-2 md:mt-0 font-extralight">
          {contact.length} Contact
        </div>
      </div>

      {reply && (
        <DirectReply
          contactId={selectedContactId} // Pass selected contact ID to DirectReply
          handlereplymodal={() => setReply(false)} // Function to close the modal
        />
      )}

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
      </div>
    </div>
  );
}

export default Contact;
