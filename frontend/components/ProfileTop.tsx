import React from "react"
import styles from "../styles/Profile.module.css"

const ProfileTop = () => {
  return (
    <section className={styles.section_profile_top}>
      <div className={styles.box_profile_img}>프로필 이미지</div>
      <div className={styles.box_profile_info}>
        <div className={styles.box_profile_info_top}>
          <h2>unnamed</h2>
          <span>icp id</span>
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
