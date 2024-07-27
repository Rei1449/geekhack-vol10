import React from 'react'

const UserDataCard = (username:string, x:number, y:number) => {
  return (
    <div>
        {username} : x座標-{x} , y座標-{y} 
    </div>
  )
}

export default UserDataCard