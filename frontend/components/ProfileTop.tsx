import React from "react"
import styles from "../styles/Profile.module.css"
import like from "../image/like.png"
import dislike from "../image/dislike.png"

const thumbStyle = {
  color: "#444",
  fontFamily: "Poppins",
  fontSize: "1.125rem",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "0.9375rem",
  marginLeft: "0.94rem",
  marginRight: "1.88rem",
}

const ProfileTop = ({ name, pfp, principal }) => {
  return (
    <section className={styles.section_profile_top}>
      {pfp === "" ? (
        <div className={styles.box_profile_img}>프로필이미지 </div>
      ) : (
        <div className={styles.box_profile_img}>
          <img src={pfp} alt="프로필이미지" />
        </div>
      )}
      <div className={styles.box_profile_info}>
        <div className={styles.box_profile_info_top}>
          {name === "" ? <h2>unnamed</h2> : <h2>{name}</h2>}
          <span>{principal}</span>
        </div>
        <div className={styles.box_profile_info_bottom}>
          <h1>0</h1>
          <span>point</span>
          <img src={like} style={{ marginLeft: "1.88rem" }} />
          <span style={thumbStyle}>3</span>
          <img src={dislike} />
          <span style={thumbStyle}>1</span>
        </div>
      </div>
    </section>
  )
}

export default ProfileTop
