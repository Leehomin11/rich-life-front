import { useState, useEffect } from "react";
import "./content.css";

function Content() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("코인 공부를 통해 150%수익 달성");
  const [body, setBody] = useState("그랬으면 좋겠네");
  const [tempTitle, setTempTitle] = useState(title);
  const [tempBody, setTempBody] = useState(body);

  const [coinPrice, setCoinPrice] = useState("₩94,280,000");

  useEffect(() => {
    const interval = setInterval(() => {
      const offset = Math.floor(Math.random() * 200000 - 100000);
      const newPrice = 94280000 + offset;
      setCoinPrice(`₩${newPrice.toLocaleString()}`);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setTitle(tempTitle);
      setBody(tempBody);
    } else {
      // 수정 시작 시 기존 값 복사
      setTempTitle(title);
      setTempBody(body);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="content">
      {isEditing ? (
        <>
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            className="news-input"
            placeholder="제목을 입력하세요"
          />
          <textarea
            value={tempBody}
            onChange={(e) => setTempBody(e.target.value)}
            className="news-textarea"
            placeholder="내용을 입력하세요"
          />
        </>
      ) : (
        <>
          <h2 className="news-title">{title}</h2>
          <p className="news-body">{body}</p>
        </>
      )}
      <div className="coin-info">
        <span className="coin-label">오늘의 코인 시세</span>
        <span className="coin-price">{coinPrice}</span>
      </div>
      <div className="news-actions">
        <button className="news-btn" onClick={handleEditToggle}>
          {isEditing ? "저장" : "수정"}
        </button>
        {!isEditing && (
          <button
            className="news-btn"
            onClick={() => {
              setTempTitle("");
              setTempBody("");
              setIsEditing(true);
            }}
          >
            작성
          </button>
        )}
      </div>
    </div>
  );
}

export default Content;
