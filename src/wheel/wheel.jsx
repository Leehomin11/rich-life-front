import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./wheel.css";

function DiaryCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ textAlign: "left", marginTop: "50px" }} className="all-diary">
      <Calendar onChange={setDate} value={date} />
      <p>선택된 날짜: {date.toDateString()}</p>
    </div>
  );
}

export default DiaryCalendar;
