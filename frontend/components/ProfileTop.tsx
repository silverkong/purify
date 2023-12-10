import React from "react"
import styles from "../styles/Profile.module.css"

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
        </div>
      </div>
    </section>
  )
}

export default ProfileTop
