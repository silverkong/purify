import React from "react";
import lgFriendTech from "../assets/lg_friend_tech.png";
import "../styles/ListWallet.css";

const ListWalletAddress = ({ walletAddress }) => {
    // , friendList
  // walletAddress가 friendList에 있는지 확인
//   const isFriend = friendList.includes(walletAddress);

  return (
    <div className="ListWalletAddressBox">
      <div className="friendTechBox">
        <img src={lgFriendTech} alt="friend tech" style={{ width: "100%", height: "100%", borderRadius: "30%" }} />
      </div>
      {isFriend ? (
        <>
          <span style={{ marginLeft: "1rem" }}>pingping</span>  {/* 임시이름 */}
          <span style={{ marginLeft: "0.63rem" }}>@beakerjin</span> {/* 임시이름 */}
        </>
      ) : (
        <span style={{ marginLeft: "1rem" }}>Unknown</span>
      )}
      <button className="detail-btn">detail</button>
    </div>
  );
};

export default ListWalletAddress;
