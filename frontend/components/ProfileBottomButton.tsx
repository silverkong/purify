import React from "react"
import styles from "../styles/Profile.module.css"

type ProfileBottomButtonProps = {
  className: string
  onClick: () => void
  content: string
}

const ProfileBottomButton = ({
  className,
  onClick,
  content,
}: ProfileBottomButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  )
}

export default ProfileBottomButton
