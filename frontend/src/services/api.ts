// api.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "http://127.0.0.1:8000"; // Replace with actual backend URL

export const loginUser = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const token = response.data.access_token;

  // Define a type for the expected JWT payload
  type MyJwtPayload = {
    role: string;
    sub: string;
    [key: string]: any;
  };

  // Decode JWT to get role and user id
  const decoded = jwtDecode<MyJwtPayload>(token);
  const userRole = decoded.role;
  const userId = decoded.sub;

  // Optionally store token + role
  localStorage.setItem("token", token);
  localStorage.setItem("userRole", userRole);
  localStorage.setItem("userId", userId);

  // Set default header
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return { token, userRole, userId };
};
