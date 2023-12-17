import React from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/LogoCPConnect.jpg";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    //  redirect to home page
    window.location.replace("/");
  }

  return (
    <Navbar expand="lg" className="nav-bg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt=""
              style={{
                width: 65,
                height: 65,
                marginRight: "10px", // Added spacing between logo and text
                borderRadius: "50%", // Adding border-radius for circular shape
                objectFit: "cover",
              }}
            />
            <span
              className="nav-text-a"
              style={{
                marginLeft: "5px",
                fontFamily: "New Roman",
                fontSize: "24px", // Adjust the font size as needed
                fontWeight: "bold", // Optionally, make it bold
              }}
            >
              CPConnect
            </span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/signup">
                <Nav.Link className="nav-link-bold">Signup</Nav.Link>
              </LinkContainer>
            )}
            {user && user.email !== "admin@gmail.com" && (
              <LinkContainer to="/allAppointment">
                <Nav.Link className="nav-link-bold">All Appointment</Nav.Link>
              </LinkContainer>
            )}

            {user && user.email === "admin@gmail.com" && (
              <LinkContainer to="/appointmentShow">
                <Nav.Link className="nav-link-bold">
                  Pending Appointment
                </Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <LinkContainer to="/chat">
                <Nav.Link className="nav-link-bold nav-link-chat">
                  Chat
                </Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <NavDropdown
                title={
                  <>
                    <img
                      alt="profile-pic"
                      src={user.picture}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    {user.name}
                  </>
                }
                id="basic-nav-dropdown"
              >
                {user && user.email !== "admin@gmail.com" && (
                  <NavDropdown.Item>
                    <LinkContainer to="/appointment">
                      <Nav.Link>Create Appointment</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                )}

                {user && user.email === "admin@gmail.com" && (
                  <NavDropdown.Item>
                    <LinkContainer to="/manageAppointment">
                      <Nav.Link>Manage Appointment</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                )}

                {/* <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
