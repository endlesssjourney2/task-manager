import { useState } from "react";
import s from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import AuthInputs from "../../features/auth/AuthInputs/AuthInputs";

import { getAuthErrorSignInMessage } from "../../features/auth/helpers/authErrors";
import useNotify from "../../hooks/useNotify";
import { supabase } from "../../supabase/supabaseClient";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

const SignIn = () => {
  const notify = useNotify();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (loading) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      notify.error(getAuthErrorSignInMessage(error), {
        duration: 2.5,
        key: "signin-error",
      });
      console.error("Sign in error:", error.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    if (data.user) {
      notify.success("Signed in successfully!", { duration: 2 });
      navigate("/app");
    }
  };

  return (
    <div className={s.signIn}>
      <div className={s.content}>
        <div className={s.left}>
          <div className={s.header}>
            <CustomHeader title="Sign In" />
          </div>
          <div className={s.inputs}>
            <AuthInputs
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
          <button className={s.button} onClick={handleSignIn}>
            Sign In
          </button>
          <div className={s.footer}>
            <span className={s.text}>Don't have an account? </span>
            <Link className={s.link} to={"/signup"}>
              Sign Up
            </Link>
          </div>
        </div>
        <div className={s.right}>CONTENT</div>
      </div>
    </div>
  );
};

export default SignIn;
