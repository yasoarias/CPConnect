import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentTable.css";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
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
  const handleApprove = async (appointmentId) => {
    try {
      // await axios.patch(
      //   `http://localhost:5001/api/appointments/${appointmentId}`,
      //   { status: "Approved" }
      // );
      await axios.patch(`${baseURL}/api/appointments/${appointmentId}`, {
        status: "Approved",
      });

      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );
    } catch (error) {
      console.error("Error approving appointment:", error.message);
    }
  };
  const handleReject = async (appointmentId) => {
    try {
      await axios.patch(`${baseURL}/api/appointments/${appointmentId}`, {
        status: "Rejected",
      });
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );
    } catch (error) {
      console.error("Error approving appointment:", error.message);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  return (
    <div>
      <h1>Pending Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Student ID</th>
            {/* <th>Phone Number</th> */}
            <th>Purpose</th>
            <th>Preferred Date</th>
            <th>Duration (hours)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter((appointment) => appointment.status === "Pending")
            .map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.fullName}</td>
                <td>{appointment.studentId}</td>
                {/* <td>{appointment.phoneNumber}</td> */}
                <td>{appointment.purpose}</td>
                <td>{formatDate(appointment.preferredDate)}</td>
                <td>{appointment.duration}</td>
                <td>
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(appointment._id)}
                  >
                    A
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(appointment._id)}
                  >
                    R
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
