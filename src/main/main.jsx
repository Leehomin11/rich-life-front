import "./main.css";
import mainimage from "../img/other/logo.png";
import Main2 from "../main2/main2";

import { useNavigate } from "react-router-dom";
import useMoveScrool from "./useMoveScroll";
function Main() {
  const navigate = useNavigate();
  const { element, onMoveToElement } = useMoveScrool();
  const GoDiary = () => {
    navigate("/diary");
  };
  return (
    <div className="main-wallpaper">
      <div className="wallpaper">
        <div className="title-box">
          <h1 className="title">
            코인 일정을
            <br /> 꼼꼼하게,{" "}
            <span className="righteous-regular">"RichLife"</span>
            <div className="main-button-cont">
              <button className="custom-btn btn-3" onClick={GoDiary}>
                <span>당신의 일상을 가치있게 만들러 가기</span>
              </button>
            </div>
            <p className="small-text">
              {`
              코인 거래는 가격 변동성이 크고, 레버리지 사용 시 손실이 확대될 수있습니다.
              투자 전에는 코인의 특성과 시장 리스크를 충분히 이해하고, 원금 손실 가능성을 항상 염두에 두세요.
              또한, 지갑과 계정 정보는 안전하게 관리하며, 신뢰할 수 있는 거래소를 이용하는 것이 중요합니다.`}
            </p>
          </h1>
        </div>
        <div className="image-box">
          <img src={mainimage} width="550px" height="650px" alt="mainimage" />
        </div>
      </div>
      <Main2 ref={element} />
    </div>
  );
}
export default Main;
