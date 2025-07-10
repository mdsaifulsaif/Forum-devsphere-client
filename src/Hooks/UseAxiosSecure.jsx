import axios from "axios";
import React, { use } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

function UseAxiosSecure() {
  return axiosSecure;
}

export default UseAxiosSecure;
