"use client"

import { ObjectEnumValue } from "@prisma/client/runtime/library";
import { userData } from "agora-react-uikit";
import { useState } from "react";
import UserDataCard from "./components/UserDataCard";

// ランダムにユーザー名を生成
const username = Math.random().toString(32).substring(2)

// バックエンド側のWebSocketサーバーに接続
// エラーが出たためコメントアウト
const ws = new WebSocket(`ws://localhost:8080/ws/${username}`)

console.log(username)

interface UserData {
  username: string,
  x: number,
  y: number
}

export default function WebSocketPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])
  const [receiverName, setReceiverName] = useState("")
  const [activeUser, setActiveUser] = useState<UserData[]>([])

  console.log(message)

  const handleChangeMessage = (e:any) => {
    setMessage(e.target.value)
  }
  
  const handleChangeReceiverName = (e:any) => {
    setReceiverName(e.target.value)
  }

  // const testUserData = document.getElementById("testUserData")

  // バックエンド側からのメッセージを受信する
  // websocketのメッセージは全てonmessageにくるため
  // 個人向け・全体向け・部屋向けのメッセージを分ける必要がある
  // エラーが出たためコメントアウト
  ws.onmessage = function(event) {
    // setMessages([...messages, event.data])
    const data = JSON.parse(event.data)
    console.log(data)

    switch (data.status){
      case "add_newuser":
        console.log("他のユーザーが参加しました。")
        setActiveUser([...activeUser,{username:data.user_name, x:data.x, y:data.y}])
        break
      case "all_user":
        let intoData = []
        console.log("現在参加しているユーザーです。")
        for (const key of Object.keys(data.user_locations)) {
          console.log(`ユーザーnameは${key}、位置は x:${data.user_locations[key]['x']} y:${data.user_locations[key]['y']}`)
          intoData.push({username:key, x: data.user_locations[key]['x'], y: data.user_locations[key]['y']})
        }
        setActiveUser(intoData)
        break
      case "update_location":
        let updateUserData = activeUser
        updateUserData.forEach((user, index) => {
          if(user.username == data.user_name){
            updateUserData.splice(index, 1)
            updateUserData.unshift({username:data.user_name,x:data.x,y:data.y})
            // breackさせたいがforEachでは出来ないので書き換えたい
          }
        })
        setActiveUser(updateUserData)
        break
      case "drop_user":
        console.log("dropユーザー",data.user_name)
        let dropUserData = activeUser
        dropUserData.forEach((user, index) => {
          if(user.username == data.user_name){
            updateUserData.splice(index, 1)
            updateUserData.unshift({username:data.user_name,x:data.x,y:data.y})
            // breackさせたいがforEachでは出来ないので書き換えたい
          }
        })
        setActiveUser(dropUserData)
        break
      default:
        console.log("Other")
    }
    // setActiveUser(event.data)
  };

  // バックエンドの特定のメソッドに送る用のもの
  // ping確認に使うのが良いかも
  // function sendMessage() {
  //   ws.send(message)
  // }

  function sendMessageAll() {
    const res = fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_name: username,
        message: message,
      }),
    })
    console.log(res)
  }

  function sendMessageOne() {
    const res = fetch(`http://localhost:8080/chat/user/${receiverName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_name: username,
        message: message,
      }),
    })
    console.log(res)
  }

  return (
    <>
    <div>
      <input type="text" onChange={handleChangeMessage} placeholder="メッセージを入力してね" value={message}/>
      <button onClick={sendMessageAll}>全員にメッセージを送信</button>
      <input type="text" onChange={handleChangeReceiverName} placeholder="送る相手の名前を入力してね" value={receiverName}/>
      <button onClick={sendMessageOne}>{receiverName}にメッセージを送信</button>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
    <div id="testUserData" className="m-10"> 
      {activeUser.map(user => {
        return(
          // <UserDataCard username={'test'} x={100} y={200} />
          <div key={user.username}>
            {user.username}  {user.x}   {user.y}
          </div>
        )
        })
      }
    </div>
    <button onClick={()=>console.log(activeUser)}>ボタン</button>
    </>
  )
}
