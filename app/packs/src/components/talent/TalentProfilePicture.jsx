import React from 'react'
import DefaultProfilePicture from "images/default-profile-icon.jpg"

const TalentProfilePicture = ({ src, height, greyscale }) => {
  const imgSrc = src || DefaultProfilePicture
  const grey = greyscale ? " image-greyscale" : ""
  return (<img className={`rounded-circle${grey}`} src={imgSrc} height={height} alt="Profile Picture" />)
}

export default TalentProfilePicture