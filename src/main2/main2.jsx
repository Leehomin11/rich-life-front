import "./main2.css";
import { useState } from "react";
import trading from "../img/coinview.png";
import trade from "../img/cointrade.png";
import profileimg from "../img/profile/profile.png";
function Main2() {
  const [activeTab, setActiveTab] = useState("text1");
  const [activeTab2, setActiveTab2] = useState("font1");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("김정윤");
  const [desc, setDesc] = useState("i can do everything");
  const [tempName, setTempName] = useState(name);
  const [tempDesc, setTempDesc] = useState(desc);

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
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="main2-cont">
      <div className="main2-head">RichLife</div>
      <div className="spa-cont">
        <div className="spa-btn">
          <button
            onClick={() => setActiveTab("text1")}
            className={`tab-button ${activeTab === "text1" ? "active" : ""}`}
          >
            코인 구매
          </button>
          <button
            onClick={() => setActiveTab("text2")}
            className={`tab-button ${activeTab === "text2" ? "active" : ""}`}
          >
            코인 선물
          </button>
          <button
            onClick={() => setActiveTab("text3")}
            className={`tab-button ${activeTab === "text3" ? "active" : ""}`}
          >
            코인 일기
          </button>
        </div>
        <div className="spa-text">
          {activeTab === "text1" && (
            <div>
              <img src={trading} alt="coin" width={700} height={300} />
              <p className="spa-text-font">
                암호화폐 시장은 수요와 공급, 그리고 글로벌 경제 환경에 따라
                시세가 실시간으로 변동됩니다.
              </p>
              <p className="spa-text-font">
                시장에서 직접 코인을 구매하고 거래함으로써, 다양한 투자 기회를
                경험할 수 있습니다.
              </p>
            </div>
          )}
          {activeTab === "text2" && (
            <div>
              <img src={trade} alt="coin" width={700} height={300} />
              <p className="spa-text-font">
                가격 상승뿐만 아니라 하락 시에도 수익을 얻을 수 있는 양방향
                거래가 가능합니다.
              </p>
              <p className="spa-text-danger">
                ※손실이 일정 수준을 초과하면 거래가 자동 청산될 수 있어, 원금
                전부를 잃을 수 있습니다.
              </p>
            </div>
          )}
          {activeTab === "text3" && (
            <div className="spa2-cont">
              <div className="spa2-btn">
                <button
                  onClick={() => setActiveTab2("font1")}
                  className={`tab2-button ${
                    activeTab2 === "font1" ? "active" : ""
                  }`}
                >
                  사용가능한 코인
                </button>
                <button
                  onClick={() => setActiveTab2("font2")}
                  className={`tab2-button ${
                    activeTab2 === "font2" ? "active" : ""
                  }`}
                >
                  로그인
                </button>
                <button
                  onClick={() => setActiveTab2("font3")}
                  className={`tab2-button ${
                    activeTab2 === "font3" ? "active" : ""
                  }`}
                >
                  코인일기3
                </button>
              </div>
              <div className="spa2-text">
                {activeTab2 === "font1" && (
                  <div className="spa2-item">
                    <p>저희 서비스에서 사용가능한 코인입니다.</p>
                    <div className="service-coin-cont">
                      {/* <a href="https://bitcoin.org/en/">
                        <svg
                          width={25}
                          height={25}
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#F7931A"
                          className="bit-svg"
                        >
                          <title>Bitcoin</title>
                          <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
                        </svg>
                      </a> */}
                      <a href="https://ethereum.org/">
                        <svg
                          width={25}
                          height={25}
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#3C3C3D"
                          className="eth-svg"
                        >
                          <title>Ethereum</title>
                          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                        </svg>
                      </a>
                      <a href="https://solana.com/">
                        <svg
                          width={25}
                          height={25}
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#9945FF"
                          className="sol-svg"
                        >
                          <title>Solana</title>
                          <path d="m23.8764 18.0313-3.962 4.1393a.9201.9201 0 0 1-.306.2106.9407.9407 0 0 1-.367.0742H.4599a.4689.4689 0 0 1-.2522-.0733.4513.4513 0 0 1-.1696-.1962.4375.4375 0 0 1-.0314-.2545.4438.4438 0 0 1 .117-.2298l3.9649-4.1393a.92.92 0 0 1 .3052-.2102.9407.9407 0 0 1 .3658-.0746H23.54a.4692.4692 0 0 1 .2523.0734.4531.4531 0 0 1 .1697.196.438.438 0 0 1 .0313.2547.4442.4442 0 0 1-.1169.2297zm-3.962-8.3355a.9202.9202 0 0 0-.306-.2106.941.941 0 0 0-.367-.0742H.4599a.4687.4687 0 0 0-.2522.0734.4513.4513 0 0 0-.1696.1961.4376.4376 0 0 0-.0314.2546.444.444 0 0 0 .117.2297l3.9649 4.1394a.9204.9204 0 0 0 .3052.2102c.1154.049.24.0744.3658.0746H23.54a.469.469 0 0 0 .2523-.0734.453.453 0 0 0 .1697-.1961.4382.4382 0 0 0 .0313-.2546.4444.4444 0 0 0-.1169-.2297zM.46 6.7225h18.7815a.9411.9411 0 0 0 .367-.0742.9202.9202 0 0 0 .306-.2106l3.962-4.1394a.4442.4442 0 0 0 .117-.2297.4378.4378 0 0 0-.0314-.2546.453.453 0 0 0-.1697-.196.469.469 0 0 0-.2523-.0734H4.7596a.941.941 0 0 0-.3658.0745.9203.9203 0 0 0-.3052.2102L.1246 5.9687a.4438.4438 0 0 0-.1169.2295.4375.4375 0 0 0 .0312.2544.4512.4512 0 0 0 .1692.196.4689.4689 0 0 0 .2518.0739z" />
                        </svg>
                      </a>
                      <a href="https://ripple.com/">
                        <svg
                          width={25}
                          height={25}
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#25A768"
                          className="xrp-svg"
                        >
                          <title>XRP</title>
                          <path d="M5.52 2.955A3.521 3.521 0 001.996 6.48v2.558A2.12 2.12 0 010 11.157l.03.562-.03.561a2.12 2.12 0 011.996 2.121v2.948a3.69 3.69 0 003.68 3.696v-1.123a2.56 2.56 0 01-2.557-2.558v-2.963a3.239 3.239 0 00-1.42-2.682 3.26 3.26 0 001.42-2.682V6.48A2.412 2.412 0 015.52 4.078h.437V2.955zm12.538 0v1.123h.437a2.39 2.39 0 012.386 2.401v2.558a3.26 3.26 0 001.42 2.682 3.239 3.239 0 00-1.42 2.682v2.963a2.56 2.56 0 01-2.557 2.558v1.123a3.69 3.69 0 003.68-3.696V14.4A2.12 2.12 0 0124 12.281l-.03-.562.03-.561a2.12 2.12 0 01-1.996-2.12V6.478a3.518 3.518 0 00-3.509-3.524zM6.253 7.478l3.478 3.259a3.393 3.393 0 004.553 0l3.478-3.26h-1.669l-2.65 2.464a2.133 2.133 0 01-2.886 0L7.922 7.478zm5.606 4.884a3.36 3.36 0 00-2.128.886l-3.493 3.274h1.668l2.667-2.495a2.133 2.133 0 012.885 0l2.65 2.495h1.67l-3.494-3.274a3.36 3.36 0 00-2.425-.886z" />
                        </svg>
                      </a>
                      <a href="https://dogecoin.com/">
                        <svg
                          width={25}
                          height={25}
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#C2A633"
                          className="doge-svg"
                        >
                          <title>Dogecoin</title>
                          <path d="M12.288 7.908h-1.715v3.38h2.697v1.415h-2.697v3.38h1.799c.462 0 3.794.052 3.789-3.933-.005-3.984-3.232-4.242-3.873-4.242zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.472 18.481H8.126v-5.778H6.594v-1.415h1.532V5.511h3.73c.882 0 6.727-.183 6.727 6.594-.001 6.888-6.111 6.376-6.111 6.376z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
                {activeTab2 === "font2" && (
                  <div className="spa2-item">
                    <p className="spa-text-font">
                      로그인을 하시고 나만의 코인일기를 남겨보세요.
                    </p>
                    <div className="profile-container2">
                      {!isLoggedIn ? (
                        // 로그인 안했을 때
                        <div className="login-prompt2">
                          <p className="login-text2">
                            로그인 후 프로필을 확인할 수 있습니다.
                          </p>
                          <button className="login-btn2" onClick={handleLogin}>
                            로그인
                          </button>
                        </div>
                      ) : (
                        // 로그인 했을 때
                        <>
                          <img
                            src={profileimg}
                            alt="profile"
                            className="profile-img2"
                          />
                          <div className="profile-texts2">
                            {isEditing ? (
                              <>
                                <input
                                  type="text"
                                  value={tempName}
                                  onChange={(e) => setTempName(e.target.value)}
                                  onKeyDown={handleKeyDown}
                                  className="profile-input2"
                                  autoFocus
                                />
                                <input
                                  type="text"
                                  value={tempDesc}
                                  onChange={(e) => setTempDesc(e.target.value)}
                                  onKeyDown={handleKeyDown}
                                  className="profile-input2"
                                />
                              </>
                            ) : (
                              <>
                                <h2 className="profile-name2">{name}</h2>
                                <p className="profile-desc2">{desc}</p>
                              </>
                            )}
                          </div>
                          <div className="profile-setting2">
                            <button
                              className="profile-edit2"
                              onClick={handleEdit}
                            >
                              {isEditing ? "저장" : "수정"}
                            </button>
                            <button
                              className="profile-logout2"
                              onClick={handleLogout}
                            >
                              로그아웃
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
                {activeTab2 === "font3" && (
                  <div className="spa2-item">
                    <p>3</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Main2;
