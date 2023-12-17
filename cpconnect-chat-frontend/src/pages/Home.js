import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        {!user && (
          <div>
            <h1>Cordova Public College</h1>
            <h4>
              <p>Connect With Us !</p>
            </h4>
            <LinkContainer to="/login">
              <Button variant="success">
                Get Started{" "}
                <i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          </div>
        )}
        {user && (
          <div>
            <h1>Cordova Public College</h1>
            <h4>
              <p>Connect With Us !</p>
            </h4>
            <LinkContainer to="/chat">
              <Button variant="success">
                Get Started{" "}
                <i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          </div>
        )}
      </Col>
      <Col md={6} className="home__bg"></Col>
    </Row>
  );
};

export default Home;
