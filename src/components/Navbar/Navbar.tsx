import { useNavigate } from "react-router-dom";
import s from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../supabase/supabaseClient";
import NavbarBtn from "./NavbarBtn/NavbarBtn";

const Navbar = () => {
  const { user, loading } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleNavigateSignIn = () => {
    navigate("/signin");
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <div className={s.navbar}>
      <div className={s.logo} onClick={handleClickLogo}>
        <span className={s.logoText}>Task Manager</span>
      </div>
      <div className={s.navLinks}>
        {!loading && user ? (
          <NavbarBtn text="Logout" onClick={handleLogout} />
        ) : (
          <>
            <NavbarBtn text="Sign In" onClick={handleNavigateSignIn} />
            <NavbarBtn text="Sign Up" onClick={handleNavigateSignUp} />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
