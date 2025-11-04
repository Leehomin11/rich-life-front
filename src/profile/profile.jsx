import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import profileimg from "../img/profile/profile.png";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempBio, setTempBio] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      fetchUserInfo(userId);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setName("");
      setBio("");
      setTempName("");
      setTempBio("");
    }
  }, []);

  const fetchUserInfo = async (userId) => {
    try {
      const res = await api.get(`/api/users/${userId}`);
      console.log("사용자 정보:", res.data); // 디버깅용: { id, email, name, bio }
      setName(res.data.name || "");
      setBio(res.data.bio || "");
      setTempName(res.data.name || "");
      setTempBio(res.data.bio || "");
      setIsLoading(false);
    } catch (err) {
      console.error(
        "사용자 정보 조회 실패:",
        err.response?.status,
        err.response?.data
      );
      setError("사용자 정보를 불러오지 못했습니다. 다시 로그인해주세요.");
      setIsLoggedIn(false);
      setIsLoading(false);
      localStorage.removeItem("userId");
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const userId = localStorage.getItem("userId");
        const res = await api.patch(`/api/users/${userId}`, {
          name: tempName,
          bio: tempBio,
        });
        setName(res.data.name || "");
        setBio(res.data.bio || "");
        setError("");
      } catch (err) {
        console.error(
          "정보 수정 실패:",
          err.response?.status,
          err.response?.data
        );
        setError("프로필 수정에 실패했습니다.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEdit();
  };

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setName("");
    setBio("");
    setTempName("");
    setTempBio("");
    setError("");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {isLoading ? (
        <div className="loading">로딩 중...</div>
      ) : !isLoggedIn ? (
        <div className="login-prompt">
          <p className="login-text">로그인 후 프로필을 확인할 수 있습니다.</p>
          <button className="login-btn" onClick={handleLogin}>
            로그인
          </button>
        </div>
      ) : (
        <>
          {error && <p className="error-text">{error}</p>}
          <img src={profileimg} alt="profile" className="profile-img" />
          <div className="profile-texts">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="profile-input"
                  placeholder="이름"
                  autoFocus
                />
                <input
                  type="text"
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="profile-input"
                  placeholder="프로필 한줄 설명"
                />
              </>
            ) : (
              <>
                <h2 className="profile-name">{name}</h2>
                <p className="profile-desc">{bio}</p>
              </>
            )}
          </div>
          <div className="profile-setting">
            <button className="profile-edit" onClick={handleEdit}>
              {isEditing ? "저장" : "수정"}
            </button>
            <button className="profile-logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
