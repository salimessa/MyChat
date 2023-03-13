import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoader, ShowLoader } from "../../redux/loaderSlice";
import * as usersService from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      dispatch(ShowLoader());
      const user = await usersService.login(credentials);
      dispatch(HideLoader());
      toast.success("Logged in successfully");
      navigate("/");
      // window.location.href = "/";
      // setUser(user);
    } catch (error) {
      dispatch(HideLoader());
      toast.error("Failed to log in");
      console.log(error);
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-orange-500">
            LOG IN
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
