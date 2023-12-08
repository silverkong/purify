import React from "react"
import styles from "../styles/Profile.module.css"

const ProfileTop = ({ name, principal }) => {
  return (
    <section className={styles.section_profile_top}>
      <div className={styles.box_profile_img}>프로필이미지 </div>
      <div className={styles.box_profile_info}>
        <div className={styles.box_profile_info_top}>
          {name === "" ? (
            <div>
              <h2>unnamed</h2>
            </div>
          ) : (
            <div>
              <h2>{name}</h2>
            </div>
          )}
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
