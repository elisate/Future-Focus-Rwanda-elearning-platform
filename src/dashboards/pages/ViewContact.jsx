import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CiBoxList } from "react-icons/ci";
import ReplyContact from "./ReplyContact";
import Notiflix from "notiflix";
import { ImReply } from "react-icons/im";
import { TbTrashX } from "react-icons/tb";

function ViewContact() {
  const { Pid } = useParams();
  const [contact, setContact] = useState([]);
  const [contactModal, setContactModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null); // Store selected contact ID

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
            `http://localhost:5000/contact/deleteContact/${Pid}`, // Pid used here, assuming single contact
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Instead of filtering, you just clear the contact since it's a single item
          setContact(null); // or reset it to initial empty state
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

  useEffect(() => {
    const singleContact = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const token = userToken?.user?.tokens?.accessToken;
      try {
        const res = await axios.get(
          `https://future-focus-rwanada.onrender.com/contact/getContactById/${Pid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setContact(res.data);
      } catch (error) {
        console.log("fetching errors", error);
      }
    };
    singleContact();
  }, [Pid]);

  const handleReplyModal = (id) => {
    setSelectedContactId(id); // Set the contact ID when opening the modal
    setContactModal(!contactModal); // Toggle modal visibility
  };

  return (
    <div className="ml-80 px-4 py-6 sm:px-8 lg:px-16 xl:px-24 pt-24">
      {contactModal && (
        <ReplyContact
          contactId={selectedContactId} // Pass the contact ID to the modal
          handlereplymodal={() => setContactModal(false)} // Pass a function to close the modal
        />
      )}
      <div className="flex flex-row gap-1 items-center pl-5 md:pl-10 lg:pl-5">
        <CiBoxList className="font-extralight text-2xl" />
        <div className="text-xl md:text-2xl font-extralight text-gray-800">
          View Contact
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="text-lg font-semibold text-gray-700">
            Name: <span className="font-normal">{contact?.names}</span>
          </div>
          <div className="text-lg font-semibold text-gray-700">
            Email: <span className="font-normal">{contact?.email}</span>
          </div>
        </div>

        <div className="mb-4 text-lg font-semibold text-gray-700">
          Subject: <span className="font-normal">{contact?.subject}</span>
        </div>

        <div className="mb-4 text-lg font-semibold text-gray-700">
          Message: <span className="font-normal">{contact?.message}</span>
        </div>

        <div className="flex space-x-4">
          <div
            className="flex flex-row gap-1 cursor-pointer hover:underline items-center text-green-500  hover:text-green-900 "
            onClick={() => handleReplyModal(contact._id)}
          >
            <ImReply
              className="text-green-500"
              onClick={() => handleReplyModal(contact._id)} // Pass contact ID to the handler
            />
            <span>Reply</span>
          </div>
          <div></div>
          <div
            className="flex flex-row  items-center gap-1 text-red-500 hover:text-red-400 hover:underline"
            onClick={handleDelete}
          >
            <TbTrashX className=" border-none " onClick={handleDelete} />
            <span>Trash</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewContact;
