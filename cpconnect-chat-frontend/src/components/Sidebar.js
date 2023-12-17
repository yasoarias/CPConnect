import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./Sidebar.css";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    //dispatch for notifications
    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("General");
      getRooms();
      socket.emit("join-room", "General");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://" + window.location.hostname + ":5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }

  if (!user) {
    return <></>;
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <i
          className="fas fa-building"
          style={{ fontSize: "24px", marginRight: "10px" }}
        ></i>
        <h2
          style={{
            marginTop: "10px", // Adjust the margin as needed
          }}
        >
          Departamental
        </h2>
      </div>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            onClick={() => joinRoom(room)}
            active={room === currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[room]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <br />

      <div style={{ display: "flex", alignItems: "center" }}>
        <i
          className="fas fa-users"
          style={{ fontSize: "24px", marginRight: "10px" }}
        ></i>
        <h2>Members</h2>
      </div>
      <ListGroup>
        {members.map((member) => (
          <ListGroup.Item
            key={member._id}
            onClick={() => handlePrivateMemberMsg(member)}
            active={privateMemberMsg?._id === member?._id}
            disabled={member._id === user._id}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center", // Align items vertically
              justifyContent: "space-between",
            }}
          >
            <img
              alt="member-status-img"
              src={member.picture}
              n
              className="member-status-img"
              style={{
                width: 35,
                height: 35,
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            <div style={{ flex: 1 }}>
              <div>
                {member.name}
                {member._id === user?._id && " (You)"}
                {member.status === "offline" && " (Offline)"}
                <span
                  className="badge rounded-pill bg-primary"
                  style={{
                    marginLeft: "5px", // Adjust the margin as needed
                  }}
                >
                  {user.newMessages[orderIds(member._id, user._id)]}
                </span>
              </div>
            </div>
            <i
              className={`fas fa-circle${
                member.status === "online"
                  ? " sidebar-online-status"
                  : " sidebar-offline-status"
              }`}
              style={{
                marginLeft: "5px", // Adjust the margin as needed
                marginBottom: "5px", // Adjust the margin as needed
              }}
            ></i>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
