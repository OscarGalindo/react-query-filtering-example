import React from "react";

export const Backdrop = ({children, close}) => {
  return <div
    onClick={close}
    className="w-screen h-screen bg-black fixed overflow-hidden top-0 left-0 items-center justify-center flex z-40 bg-opacity-40">
    {children}
  </div>
}
export const Modal = ({children, onClose}) => {
  return <Backdrop close={onClose}>
    <div
      onClick={e => e.stopPropagation()}
      className="overflow-hidden outline-none p-6 bg-white w-2/4 rounded shadow-md z-50">
      {children}
    </div>
  </Backdrop>
}