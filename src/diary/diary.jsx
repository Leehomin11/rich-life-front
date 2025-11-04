import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import DiaryCalendar from "../wheel/wheel";
import Profile from "../profile/profile";
import Content from "../Content/content";
import "./diary.css";

function Diary() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="background-diary">
      <div className="diary-container">
        <div className="left-section">
          <Profile userId={userId} />
          <DiaryCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <Content selectedDate={selectedDate} userId={userId} />
      </div>
    </div>
  );
}

export default Diary;
