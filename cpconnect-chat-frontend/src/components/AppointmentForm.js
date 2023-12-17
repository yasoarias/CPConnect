// AppointmentForm.js

import React, { useState } from "react";
import axios from "axios";
import "./AppointmentForm.css";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    phoneNumber: "",
    purpose: "",
    preferredDate: "",
    alternativeDates: "",
    duration: "",
  });
  const baseURL = `http://${window.location.hostname}:5001`;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/api/appointments`,
        formData
      );
      console.log(response.data);
      navigate("/allappointment");
    } catch (error) {
      console.error("Error submitting appointment:", error.message);
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Appointment Form</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group input-container">
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group input-container">
          <label>
            Student ID:
            <input
              type="number"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group input-container">
          <label>
            Phone Number:
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group input-container">
          <label>
            Purpose:
            <textarea
              className="purpose"
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group input-container">
          <label>
            Preferred Date:
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group input-container">
          <label>
            Duration (in hours):
            <input
              placeholder="for example: 12:00 am"
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              pattern="^(0?[1-9]|1[0-2]):[0-5][0-9] (am|pm)$"
              title="Please enter a valid time in the format HH:mm am/pm"
              required
            />
          </label>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
