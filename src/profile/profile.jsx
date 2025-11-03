import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import "./profile.css";
import profileimg from "../img/profile/profile.png";

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("김정윤");
  const [desc, setDesc] = useState("i can do everything");
  const [tempName, setTempName] = useState(name);
  const [tempDesc, setTempDesc] = useState(desc);

  const navigate = useNavigate();

  const handleEdit = () => {
    if (isEditing) {
      setName(tempName);
      setDesc(tempDesc);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  const handleLogin = () => {
    navigate("/login"); // ✅ 로그인 페이지로 이동
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="profile-container">
      {!isLoggedIn ? (
        <div className="login-prompt">
          <p className="login-text">로그인 후 프로필을 확인할 수 있습니다.</p>
          <button className="login-btn" onClick={handleLogin}>
            로그인
          </button>
        </div>
      ) : (
        <>
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
                  autoFocus
                />
                <input
                  type="text"
                  value={tempDesc}
                  onChange={(e) => setTempDesc(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="profile-input"
                />
              </>
            ) : (
              <>
                <h2 className="profile-name">{name}</h2>
                <p className="profile-desc">{desc}</p>
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
