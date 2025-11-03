import { useState } from "react";
import "./login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("로그인 시도:", form);
    } else {
      console.log("회원가입 시도:", form);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? "로그인" : "회원가입"}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
              className="auth-input"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">
            {isLogin ? "로그인" : "회원가입"}
          </button>
        </form>
        <p className="auth-toggle">
          {isLogin ? (
            <>
              계정이 없으신가요?{" "}
              <span onClick={() => setIsLogin(false)}>회원가입</span>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{" "}
              <span onClick={() => setIsLogin(true)}>로그인</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
export default Login;
