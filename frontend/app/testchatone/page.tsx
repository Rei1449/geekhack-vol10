"use client"

import { useState } from "react";

// ランダムにユーザー名を生成
const username = Math.random().toString(32).substring(2)
console.log(username)

// バックエンド側のWebSocketサーバーに接続
// エラーが出たためコメントアウト
//const ws = new WebSocket(`ws://localhost:8080/ws/${username}`)

export default function WebSocketPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])
  const [receiverName, setReceiverName] = useState("")

  const handleChangeMessage = (e:any) => {
    setMessage(e.target.value)
  }
  
  const handleChangeReceiverName = (e:any) => {
    setReceiverName(e.target.value)
  }


  // バックエンド側からのメッセージを受信する
  // websocketのメッセージは全てonmessageにくるため
  // 個人向け・全体向け・部屋向けのメッセージを分ける必要がある
  // エラーが出たためコメントアウト
  // ws.onmessage = function(event) {
  //   const data = JSON.parse(event.data);
  //   console.log(data)
  //     switch(data.type) {
  //       case "unicast":
  //         // 全体向けのメッセージ処理
  //         console.log(data)
  //         setMessages(prevMessages => [...prevMessages, `${data.user_name} : ${ data.message }`]);
  //         break;
  //       default:
  //         console.log(data.type)
  // }};

  // バックエンドの特定のメソッドに送る用のもの
  // ping確認に使うのが良いかも
  // function sendMessage() {
  //   ws.send(message)
  // }

  function sendMessageOne() {
    const res = fetch(`http://localhost:8080/chat/user/${receiverName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "unicast",
        client_name: username,
        message: message,
      }),
    })
    console.log(res)
  }

  return (
    <>
      <input type="text" onChange={handleChangeMessage} placeholder="メッセージを入力してね" value={message}/>
      <input type="text" onChange={handleChangeReceiverName} placeholder="送る相手の名前を入力してね" value={receiverName}/>
      <button onClick={sendMessageOne}>{receiverName}にメッセージを送信</button>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>
  )
}
