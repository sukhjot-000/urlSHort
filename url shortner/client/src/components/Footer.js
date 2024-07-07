import React from 'react'
import { useSelector } from "react-redux";

function Footer() {
  const { userName } = useSelector((state) => state.userReducer);
  return (
    <div>
      {userName}
    </div>
  )
}

export default Footer
