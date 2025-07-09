import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
function UseAxiosSecure() {
  return axiosSecure;
}

export default UseAxiosSecure;
