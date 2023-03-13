import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // navigate("/");
      window.location.href = "/";
    }
  }, []);
  return (
    <main>
      <h1 className="flex justify-center items-center">AuthPage</h1>
      <SignUpForm setUser={setUser} />
      <LoginForm setUser={setUser} />
    </main>
  );
}
