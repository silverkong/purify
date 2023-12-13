// import React from "react";
// import lgFriendTech from "../assets/lg_friend_tech.png";
// import "../styles/ListWallet.css";

// const ListWalletAddress = ({ walletAddress }) => {
//     // , friendList
//   // walletAddress가 friendList에 있는지 확인
// //   const isFriend = friendList.includes(walletAddress);

//   return (
//     <div className="ListWalletAddressBox">
//       <div className="friendTechBox">
//         <img src={lgFriendTech} alt="friend tech" style={{ width: "100%", height: "100%", borderRadius: "30%" }} />
//       </div>
//       {isFriend ? (
//         // 친구가 있을 때
//         <>
//           <span style={{ marginLeft: "1rem" }}>pingping</span>  {/* 임시이름 */}
//           <span style={{ marginLeft: "0.63rem" }}>@beakerjin</span> {/* 임시이름 */}
//         </>
//       ) : (
//         <span style={{ marginLeft: "1rem" }}>Unknown</span>
//       )}
//       <button className="detail-btn">detail</button>
//     </div>
//   );
// };

// export default ListWalletAddress;
import React from "react"
import { useNavigate } from "react-router-dom";
import lgFriendTech from "../assets/lg_friend_tech.png"
import "../styles/ListWallet.css"

const ListWalletAddress = ({walletAddress}) => {
  const navigate = useNavigate();

  const detailNavigate = () => {
    navigate("/searchDetail");
  };
  
  return (
    <div className="ListWalletAddressBox">
      <div className="friendTechBox">
        <img src={lgFriendTech} alt="friend tech" style={{width:"100%", height:"100%", borderRadius: "30%"}}/>
      </div>
      {/* <span>{name}</span> */}
      <span style={{marginLeft:"1rem"}}>pingping</span>  {/* walletAddress에 맞는 socialFi*/}
      <span style={{marginLeft:"0.63rem"}}>@beakerjin</span> {/* walletAddress에 맞는  */}
      <button className="detail-btn" onClick={detailNavigate}>
        detail
        {/* searchDetail로 가는 코드 추가해야됨 */}
      </button>
    </div>
  )
}

export default ListWalletAddress