// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";
import Appointment from "./pages/Appointment";
import AppointmentShow from "./pages/AppointmentShow";
import AllAppointmentShow from "./pages/AllAppoinmentShow";
import ManageAppointmentShow from "./pages/ManageAppointmentShow";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state.user);

  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        rooms,
        setRooms,
        newMessages,
        setNewMessages,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user && user.email === "admin@gmail.com" && (
            <Route
              path="/manageAppointment"
              element={<ManageAppointmentShow />}
            />
          )}
          {user && user.email === "admin@gmail.com" && (
            <Route path="/appointmentShow" element={<AppointmentShow />} />
          )}
          {user && user.email !== "admin@gmail.com" && (
            <Route path="/appointment" element={<Appointment />} />
          )}
          {user && user.email !== "admin@gmail.com" && (
            <Route path="/allAppointment" element={<AllAppointmentShow />} />
          )}
          {user && <Route path="/chat" element={<Chat />} />}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
