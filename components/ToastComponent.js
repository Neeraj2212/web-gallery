import React from "react"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

const ToastComponent = (message) => {
  const [showToast, setShowToast] = useState(true)
  const notify = () => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    setShowToast(false)
  }
  return (
    <div>
      {showToast && notify()}
      <ToastContainer />
    </div>
  )
}

export default ToastComponent
