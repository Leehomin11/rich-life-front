import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post("/api/users/login", {
          email: form.email,
          password: form.password,
        });
        console.log("로그인 응답:", res.data);

        const { id } = res.data;
        if (id) {
          console.log("저장할 userId:", id);
          // ✅ 여기 수정됨: userId로 저장
          localStorage.setItem("userId", id);
          setLoading(false);
          navigate("/diary");
        } else {
          throw new Error("사용자 ID가 응답에 포함되지 않았습니다.");
        }
      } else {
        const res = await api.post("/api/users/signup", {
          email: form.email,
          name: form.name,
          password: form.password,
        });
        console.log("회원가입 성공:", res.data);
        alert("회원가입이 완료되었습니다. 로그인해주세요.");
        setIsLogin(true);
        setForm({ email: "", name: "", password: "" });
        setLoading(false);
      }
    } catch (err) {
      console.error("로그인 오류:", err.response?.status, err.response?.data);
      const serverMsg =
        err.response?.data?.message || err.response?.data || err.message;
      setError(
        typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg)
      );
      setLoading(false);
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
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading
              ? isLogin
                ? "로그인 중..."
                : "회원가입 중..."
              : isLogin
              ? "로그인"
              : "회원가입"}
          </button>
        </form>
        <p className="auth-toggle">
          {isLogin ? (
            <>
              계정이 없으신가요?{" "}
              <span
                onClick={() => {
                  setError("");
                  setIsLogin(false);
                }}
                style={{ cursor: "pointer", color: "skyblue" }}
              >
                회원가입
              </span>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{" "}
              <span
                onClick={() => {
                  setError("");
                  setIsLogin(true);
                }}
                style={{ cursor: "pointer", color: "skyblue" }}
              >
                로그인
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;
