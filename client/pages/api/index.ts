import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
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

export function login(payload: { email: string; password: string }) {
  return axios
    .post(authBase, payload, {
      withCredentials: true,
    })
    .then(res => res.data);
}

export function getMe() {
  return axios
    .get(userBase, {
      withCredentials: true,
    })
    .then(res => res.data)
    .catch(() => {
      return null;
    });
}
