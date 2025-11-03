import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./wheel.css";

function DiaryCalendar({ selectedDate, setSelectedDate }) {
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div style={{ textAlign: "left", marginTop: "50px" }} className="all-diary">
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <p>선택된 날짜: {selectedDate.toDateString()}</p>
    </div>
  );
}

export default DiaryCalendar;
