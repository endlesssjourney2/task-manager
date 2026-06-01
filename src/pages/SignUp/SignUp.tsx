import { useState } from "react";
import s from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import AuthInputs from "../../features/auth/AuthInputs/AuthInputs";
import { getAuthErrorSignUpMessage } from "../../features/auth/helpers/authErrors";
import useNotify from "../../hooks/useNotify";
import { supabase } from "../../supabase/supabaseClient";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

const SignUp = () => {
  const notify = useNotify();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (loading) return;

    if (password.length < 6) {
      notify.error("Password must be at least 6 characters long", {
        duration: 2.5,
        key: "signup-error",
      });
      console.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      notify.error(getAuthErrorSignUpMessage(error), {
        duration: 2.5,
        key: "signup-error",
      });
      console.error("Sign up error:", error.message);
      setLoading(false);
      return;
    }
    setLoading(false);

    if (data.user) {
      notify.success("Account created successfully!", {
        duration: 2,
      });
      navigate("/");
    }
  };

  return (
    <div className={s.signUp}>
      <div className={s.content}>
        <div className={s.header}>
          <CustomHeader title="Sign Up" />
        </div>
        <div className={s.inputs}>
          <AuthInputs
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
        <button className={s.button} onClick={handleSignUp} disabled={loading}>
          Sign Up
        </button>
        <div className={s.footer}>
          <span className={s.text}>Already have an account? </span>
          <Link className={s.link} to={"/signin"}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
