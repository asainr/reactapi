import "./App.css";
import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";


function App() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [error, setError] = useState<any>(false);
  const [success, setSuccess] = useState<any>(false);

  const refreshToken = async () => {
    try {
      const res:any = await axios.post("/refresh", { token: user.refreshToken });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config:any) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode<any>(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers.authorization = "Bearer" + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { username, password });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id:any) => {
    setSuccess(false);
    setError(false);
    try {
      await axiosJWT.delete("/users/" + id, {
        headers: { authorization: "Bearer " + user.accessToken },
      });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

console.log(user)
  return (
    <div className="container">
      {user ? (
        <div className="home">
          <span>
            Welcome to the dashboard
            <b>{user.username}</b>.
          </span>
          <span>Delete Users:</span>
          <button className="deleteButton" onClick={() => handleDelete(3)}>
            Delete
          </button>
          <button className="deleteButton" onClick={() => handleDelete(2)}>
            Delete 
          </button>
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle">Lama Login</span>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;