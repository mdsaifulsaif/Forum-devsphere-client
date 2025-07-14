import axios from "axios";
import React, { use } from "react";

const axiosSecure = axios.create({
  baseURL: "https://forum-server-psi.vercel.app",
  withCredentials: true,
});

function UseAxiosSecure() {
  return axiosSecure;
}

export default UseAxiosSecure;
