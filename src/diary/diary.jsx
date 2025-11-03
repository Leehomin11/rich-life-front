import "./diary.css";
import Wheel from "../wheel/wheel";
import Profile from "../profile/profile";
import Content from "../Content/content";

function Diary() {
  return (
    <div className="background-diary">
      <div className="diary-container">
        <div className="left-section">
          <Profile />
          <Wheel />
        </div>
        <Content />
      </div>
    </div>
  );
}

export default Diary;
