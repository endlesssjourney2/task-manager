import { useState } from "react";
import Header from "../../../components/Header/Header";
import s from "./SignUp.module.css";
import { supabase } from "../../../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (loading) return;

    if (password.length < 6) {
      console.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign up error:", error.message);
      setLoading(false);
      return;
    }
    setLoading(false);

    if (data.user) {
      navigate("/");
    }
  };

  return (
    <div className={s.signUp}>
      <Header title="Sign Up" />
      <div className={s.content}>
        <div className={s.inputs}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={s.button} onClick={handleSignUp} disabled={loading}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
