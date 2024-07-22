"use client"

import { useState } from "react";

// ランダムにユーザー名を生成
const username = Math.random().toString(32).substring(2)

// バックエンド側のWebSocketサーバーに接続
const ws = new WebSocket(`ws://localhost:8080/ws/${username}/room/1`)

console.log(username)

export default function WebSocketPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])

  console.log(message)

  const handleChange = (e:any) => {
    setMessage(e.target.value)
  }

  // バックエンド側からのメッセージを受信する
  // websocketのメッセージは全てonmessageにくるため
  // 個人向け・全体向け・部屋向けのメッセージを分ける必要がある
  ws.onmessage = function(event) {
    setMessages([...messages, event.data])
    console.log(event.data)
  };

  function sendMessage() {
      ws.send(message)
  }


  return (
    <>
      <input type="text" onChange={handleChange} placeholder="メッセージを入力してね" value={message}/>
      <button onClick={sendMessage}>送信</button>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>
  )
}
