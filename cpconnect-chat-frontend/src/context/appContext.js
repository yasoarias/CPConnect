import { io } from "socket.io-client";
import React from "react";
// import ip from "ip";

const SOCKET_URL = "http://192.168.225.117:5001";
// const SOCKET_URL = "http://" + window.location.hostname + ":5001";
export const socket = io(SOCKET_URL);
//app context
export const AppContext = React.createContext();
