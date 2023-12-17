import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentTable.css";

const AllAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const baseURL = `http://${window.location.hostname}:5001`;

  useEffect(() => {
    axios
      // .get("http://localhost:5001/api/appointments")
      .get(baseURL + "/api/appointments")
      .then((response) => {
        const sortedAppointments = response.data.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        const reversedAppointments = sortedAppointments.reverse();

        console.log("Sorted and Reversed Appointments:", reversedAppointments);

        setAppointments(reversedAppointments);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-PH",
      options
    );
    return formattedDate;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Approved":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "black";
    }
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>CPC Appointment</h1>
      <div>
        <br />
        <label htmlFor="searchQuery">Search by Name or ID:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Student ID</th>
            {/* <th>Phone Number</th> */}
            <th>Purpose</th>
            <th>Preferred Date</th>
            <th>Duration (hours)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.fullName}</td>
              <td>{appointment.studentId}</td>
              {/* <td>{appointment.phoneNumber}</td> */}
              <td>{appointment.purpose}</td>
              <td>{formatDate(appointment.preferredDate)}</td>
              <td>{appointment.duration}</td>
              <td style={{ color: getStatusColor(appointment.status) }}>
                {appointment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppointment;
