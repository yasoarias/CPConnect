import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppointmentForm from "../components/AppointmentForm";
import "./Appointment.css";

const Appointment = () => {
  return (
    <Container>
      <Row>
        <Col md={5}>
          <AppointmentForm />
        </Col>
        <Col md={7} className="sayawsayaw"></Col>
      </Row>
    </Container>
  );
};

export default Appointment;
