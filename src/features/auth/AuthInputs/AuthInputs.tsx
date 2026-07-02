import { Input } from "antd";
import { type FC } from "react";
import s from "./AuthInputs.module.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

type Props = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

const AuthInputs: FC<Props> = ({ email, setEmail, password, setPassword }) => {
  return (
    <div className={s.inputs}>
      <Input
        className={s.authInput}
        size="large"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        className={s.authInput}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="large"
        count={{
          show: password.length > 0,
        }}
        iconRender={(visible) =>
          visible ? (
            <EyeTwoTone twoToneColor="#fff" />
          ) : (
            <EyeInvisibleOutlined style={{ color: "#fff" }} />
          )
        }
      />
    </div>
  );
};

export default AuthInputs;
