'use  client'
import React from 'react'

interface UserInfo {
	x: number;
	y: number;
	nickname: string;
	img: string;
}

const UserIcon = ({
    x,
    y,
    nickname,
    img
}:UserInfo) => {
  return (
    <div
        className="element-1 draggable w-[90px]  h-[90px] bg-slate-600 rounded-full absolute -z-10" 
        style={{transform: `translate3d(${x}px, ${y-90}px, 1px)`}}
    ></div>
  )
}

export default UserIcon