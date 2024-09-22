import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";

// Create context
const statement = createContext();

export const Appcontext = ({ children }) => {
  const [program, setProgram] = useState([]);
  const [student, setStudent] = useState([]);
  const [users, setUsers] = useState([]);
  const [contact, setContact] = useState([]);
  const [course, setCourse] = useState([]);
  const [inscourse, setInscourse] = useState([]);
  useEffect(() => {
    const getprogram = async () => {
      try {
        const response = await axios.get(
          "https://future-focus-rwanada.onrender.com/program/getPrograms"
        );
        console.log(response.data);
        setProgram(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getprogram();
  }, []);

    useEffect(() => {
      const getstudent = async () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"));
        const token = userToken?.user?.tokens?.accessToken;
      
        try {
          const response = await axios.get(
            "https://future-focus-rwanada.onrender.com/student/getAllStudents",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(response.data);
          setStudent(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getstudent();
    }, []);
  
   useEffect(() => {
     const getusers = async () => {
       const userToken = JSON.parse(localStorage.getItem("userToken"));
       const token = userToken?.user?.tokens?.accessToken;

       try {
         const response = await axios.get(
           "https://future-focus-rwanada.onrender.com/user/getAllUsers",
           { headers: { Authorization: `Bearer ${token}` } }
         );
         console.log(response.data);
         setUsers(response.data);
       } catch (error) {
         console.log(error);
       }
     };
     getusers();
   }, []);
  
  
    useEffect(() => {
      const getcontact = async () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"));
        const token = userToken?.user?.tokens?.accessToken;

        try {
          const response = await axios.get(
            "https://future-focus-rwanada.onrender.com/contact/getAllContacts",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(response.data);
          setContact(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getcontact();
    }, []);
    
   useEffect(() => {
     const getcourse = async () => {
       const userToken = JSON.parse(localStorage.getItem("userToken"));
       const token = userToken?.user?.tokens?.accessToken;

       try {
         const response = await axios.get(
           "https://future-focus-rwanada.onrender.com/course/getCourses",
           { headers: { Authorization: `Bearer ${token}` } }
         );
         console.log(response.data);
         setCourse(response.data);
       } catch (error) {
         console.log(error);
       }
     };
     getcourse();
   }, []);
  
 
  return (
    <statement.Provider value={{
      program, setProgram, student, setStudent,
      users, setUsers,contact,setContact,course,setCourse
    }}>
      {children}
    </statement.Provider>
  );
};

export const mycontext = () => useContext(statement);
