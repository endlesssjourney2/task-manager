import { useState } from "react";
import Header from "../../../components/Header/Header";
import s from "./SignIn.module.css";
import { supabase } from "../../../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import AuthInputs from "../AuthInputs/AuthInputs";

const SignIn = () => {
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
      console.error("Sign in error:", error.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    if (data.user) {
      navigate("/");
    }
  };

  return (
    <div className={s.signIn}>
      <div className={s.content}>
        <div className={s.header}>
          <Header title="Sign In" />
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
      </div>
    </div>
  );
};

export default SignIn;
