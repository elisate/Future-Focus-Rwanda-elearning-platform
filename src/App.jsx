
import PageSet from "./components/PageSet";
import Landing from "./components/Landing";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Programs from "./components/Programs";
import { Appcontext } from "./fetch/ContextProvider";
import Programcourse from "./components/Programcourse";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import StudentRegistration from "./components/StudentRegistration";
import ViewCourse from "./components/ViewCourse";
import UserDashboard from "./components/Userview";
import Dashboardlayout from "./dashboards/pages/Dashboardlayout";
import Dashboard from "./dashboards/pages/Dashboard";
import Programsd from "./dashboards/pages/Programsd";
import Student from "./dashboards/pages/Student";
import Users from "./dashboards/pages/Users";
import Contacts from "./dashboards/pages/Contacts";
import Courses from "./dashboards/pages/Courses";


function App() {
  return (
    <Appcontext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageSet />}>
            <Route index element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/program" element={<Programs />} />
            <Route path="/sprogram/:Pid" element={<Programcourse />} />
            <Route
              path="/studentregistration/:Pid"
              element={<StudentRegistration />}
            />
            <Route path="/studentCourse" element={<UserDashboard/>} />
            <Route path="/viewCourse/:courseId" element={<ViewCourse />} />
            
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signIn" element={<SignUp />} />
          <Route path="/" element={<Dashboardlayout/>}>
          <Route index element={<Dashboard/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/programs" element={<Programsd />} />
            <Route path="/students" element={<Student />} />
            <Route path="/users" element={<Users />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/courses" element={<Courses/>}/>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </Appcontext>
  );
}

export default App;
