import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentTable.css";

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const baseURL = `http://${window.location.hostname}:5001`;

  useEffect(() => {
    // Fetch all appointments on component mount
    axios
      .get(baseURL + "/api/appointments")
      .then((response) => {
        // Sort appointments by the createdAt in descending order
        const sortedAppointments = response.data.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Reverse the array to have the newest appointments first
        const reversedAppointments = sortedAppointments.reverse();

        console.log("Sorted and Reversed Appointments:", reversedAppointments);

        setAppointments(reversedAppointments);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const handleDelete = async (appointmentId) => {
    try {
      // Send a DELETE request to the server
      await axios.delete(`${baseURL}/api/appointments/${appointmentId}`);

      // Update the local state after successful deletion
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
    }
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

  return (
    <div>
      <h1>Manage Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Student ID</th>
            <th>Phone Number</th>
            <th>Purpose</th>
            <th>Preferred Date</th>
            <th>Duration (hours)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.fullName}</td>
              <td>{appointment.studentId}</td>
              <td>{appointment.phoneNumber}</td>
              <td>{appointment.purpose}</td>
              <td>{formatDate(appointment.preferredDate)}</td>
              <td>{appointment.duration}</td>
              <td style={{ color: getStatusColor(appointment.status) }}>
                {appointment.status}
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => {
                    handleDelete(appointment._id);
                  }}
                >
                  D
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointment;
