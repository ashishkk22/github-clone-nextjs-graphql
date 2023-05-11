import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const API = axios.create({
  baseURL: "http://localhost:5000",
  //   baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
export function registerUser(payload: {
  username: string;
  token: string;
  password: string;
}) {
  return API.post("/user/signup", payload).then(res => res.data);
}

export function loginUser(payload: { username: string; password: string }) {
  return API.post("/user/signin", payload).then(res => res.data);
}
