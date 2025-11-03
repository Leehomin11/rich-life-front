import { useState, useEffect } from "react";
import axios from "axios";
import "./content.css";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

function Content({ selectedDate, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [diary, setDiary] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempBody, setTempBody] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("ETH");
  const [tempMood, setTempMood] = useState(3);
  const [tempNewsLink, setTempNewsLink] = useState("");
  const [coinPrice, setCoinPrice] = useState("");
  const [error, setError] = useState("");

  const moodEmojis = {
    1: "😢",
    2: "😕",
    3: "😐",
    4: "😊",
    5: "😄",
  };

  // ✅ 다이어리 가져오기
  useEffect(() => {
    console.log("📅 Content가 불러오는 날짜:", selectedDate.toISOString());
    const fetchDiaries = async () => {
      if (!userId) {
        setError("사용자 ID가 없습니다. 다시 로그인해주세요.");
        return;
      }

      if (!selectedDate || isNaN(new Date(selectedDate))) {
        console.log("selectedDate가 아직 초기화되지 않음, fetch 중단");
        return;
      }

      // ✅ 날짜가 바뀌면 기존 상태 먼저 리셋
      setDiary(null);
      setTempTitle("");
      setTempBody("");
      setCoinSymbol("ETH");
      setTempMood(3);
      setTempNewsLink("");
      setError("");

      try {
        const res = await api.get(`/api/diaries/user/${userId}`);
        let diaries = res.data.diaries || res.data;

        const selectedDateStr = `${selectedDate.getFullYear()}-${(
          selectedDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${selectedDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;

        const foundDiary = diaries.find((d) => d.entryDate === selectedDateStr);

        if (foundDiary) {
          setDiary(foundDiary);
          setTempTitle(foundDiary.title);
          setTempBody(foundDiary.content);
          setCoinSymbol(foundDiary.coinSymbol);
          setTempMood(foundDiary.mood);
          setTempNewsLink(foundDiary.newsLink || "");
        } else {
          setDiary(null);
          setTempTitle("");
          setTempBody("");
          setCoinSymbol("ETH");
          setTempMood(3);
          setTempNewsLink("");
        }
      } catch (err) {
        setError("다이어리를 불러오지 못했습니다.");
        console.error("다이어리 조회 실패:", err);
      }
    };

    fetchDiaries();
  }, [selectedDate, userId]);

  // ✅ 코인 시세 가져오기
  useEffect(() => {
    const fetchCoinPrice = async () => {
      if (!coinSymbol) return;
      try {
        console.log("코인 시세 요청:", `/api/coins/price/${coinSymbol}`);
        const res = await api.get(`/api/coins/price/${coinSymbol}`);
        setCoinPrice(`$${Number(res.data.price).toLocaleString()}`);
      } catch (err) {
        console.error("코인 시세 조회 실패:", err);
        setCoinPrice("시세 조회 실패");
      }
    };

    fetchCoinPrice();
    const interval = setInterval(fetchCoinPrice, 30000);
    return () => clearInterval(interval);
  }, [coinSymbol]);

  // ✅ 다이어리 수정 및 저장
  const handleEditToggle = async () => {
    if (isEditing) {
      if (!userId) {
        setError("사용자 ID가 없습니다. 다시 로그인해주세요.");
        return;
      }
      try {
        const selectedDateStr = selectedDate.toISOString().split("T")[0];
        const requestData = {
          coinSymbol,
          entryDate: selectedDateStr,
          title: tempTitle,
          content: tempBody,
          mood: tempMood,
        };
        if (tempNewsLink) requestData.newsLink = tempNewsLink;

        const res = await api.post(`/api/diaries/user/${userId}`, requestData);
        setDiary(res.data);
        setError("");
      } catch (err) {
        console.error("다이어리 저장 실패:", err);
        setError("다이어리 저장에 실패했습니다.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleNewDiary = () => {
    setTempTitle("");
    setTempBody("");
    setCoinSymbol("ETH");
    setTempMood(3);
    setTempNewsLink("");
    setIsEditing(true);
  };

  return (
    <div className="content">
      {error && <p className="error-text">{error}</p>}

      {isEditing ? (
        <>
          <select
            value={coinSymbol}
            onChange={(e) => setCoinSymbol(e.target.value)}
            className="coin-select"
          >
            <option value="ETH">ETH</option>
            <option value="XRP">XRP</option>
            <option value="SOL">SOL</option>
            <option value="DOGE">DOGE</option>
          </select>

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
          <input
            type="text"
            value={tempNewsLink}
            onChange={(e) => setTempNewsLink(e.target.value)}
            className="news-input"
            placeholder="정보 링크 (선택)"
          />

          <div className="mood-select">
            <label>기분: </label>
            {[1, 2, 3, 4, 5].map((m) => (
              <button
                key={m}
                className={`mood-btn ${tempMood === m ? "selected" : ""}`}
                onClick={() => setTempMood(m)}
              >
                {moodEmojis[m]}
              </button>
            ))}
          </div>
        </>
      ) : diary ? (
        <>
          <h2 className="news-title">{diary.title}</h2>
          <p className="news-body">{diary.content}</p>
          {diary.newsLink && (
            <div className="news-link">
              <a
                href={diary.newsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                관련 정보 링크
              </a>
            </div>
          )}
          <div className="mood-display">기분: {moodEmojis[diary.mood]}</div>
          <div className="created-at">
            작성일: {new Date(diary.createdAt).toLocaleString()}
          </div>
        </>
      ) : (
        <p className="no-diary">이 날짜에 작성된 다이어리가 없습니다.</p>
      )}

      <div className="coin-info">
        <span className="coin-label">오늘의 {coinSymbol} 시세</span>
        <span className="coin-price">{coinPrice}</span>
      </div>

      <div className="news-actions">
        <button className="news-btn" onClick={handleEditToggle}>
          {isEditing ? "저장" : diary ? "수정" : "작성"}
        </button>
      </div>
    </div>
  );
}

export default Content;
