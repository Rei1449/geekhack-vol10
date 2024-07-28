"use client";

import Video from "@/components/Video";
import useDraggable from "@/utils/dragdrop/useDraggble";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface UserData {
	username: string;
	x: number;
	y: number;
	nickname: string;
	img: string;
}

// testwebsocket/pageから移植
// const username = Math.random().toString(32).substring(2);
// const ws = new WebSocket(
// 	// `wss://geekcampvol10-khr7sj2gqq-an.a.run.app/ws/${username}`
// 	`ws://localhost:8080/ws/${username}`
// );
// console.log(username);

export default function Page({
	searchParams,
}: {
	searchParams: { id: string };
}) {
	// const username = Math.random().toString(32).substring(2);
	// const ws = new WebSocket(
	// 	// `wss://geekcampvol10-khr7sj2gqq-an.a.run.app/ws/${username}`
	// 	`ws://localhost:8080/ws/${username}`
	// );
	const username = Math.random().toString(32).substring(2);
	useEffect(() => {
		const ws = new WebSocket(
			// `wss://geekcampvol10-khr7sj2gqq-an.a.run.app/ws/${username}`
			`ws://localhost:8080/ws/${searchParams.id}`
		);
		ws.onmessage = function (event) {
			// setMessages([...messages, event.data])
			const data = JSON.parse(event.data);
			console.log(data);

			switch (data.status) {
				case "add_newuser":
					console.log("他のユーザーが参加しました。");
					setActiveUser([
						...activeUser,
						{
							username: data.user_name,
							x: data.x,
							y: data.y,
							nickname: data.nickname,
							img: data.img,
						},
					]);
					break;
				case "all_user":
					let intoData = [];
					console.log("現在参加しているユーザーです。");
					for (const key of Object.keys(data.user_locations)) {
						console.log(
							`ユーザーnameは${key}、位置は x:${data.user_locations[key]["x"]} y:${data.user_locations[key]["y"]}`
						);
						intoData.push({
							username: key,
							x: data.user_locations[key]["x"],
							y: data.user_locations[key]["y"],
							nickname: data.user_locations[key]["nickname"],
							img: data.user_locations[key]["img"],
						});
					}
					setActiveUser(intoData);
					break;
				case "update_location":
					let updateUserData = activeUser;
					updateUserData.forEach((user, index) => {
						if (user.username == data.user_name) {
							updateUserData.splice(index, 1);
							updateUserData.unshift({
								username: data.user_name,
								x: data.x,
								y: data.y,
								nickname: data.nickname,
								img: data.img,
							});
							// breackさせたいがforEachでは出来ないので書き換えたい
						}
					});
					setActiveUser(updateUserData);
					break;
				// case "drop_user":
				// 	console.log("dropユーザー",data.user_name)
				// 	let dropUserData = activeUser
				// 	dropUserData.forEach((user, index) => {
				// 		if(user.username == data.user_name){
				// 			updateUserData.splice(index, 1)
				// 			updateUserData.unshift({username:data.user_name,x:data.x,y:data.y})
				// 			// breackさせたいがforEachでは出来ないので書き換えたい
				// 		}
				// 	})
				// 	setActiveUser(dropUserData)
				// 	break
				default:
					console.log("Other");
			}
			// setActiveUser(event.data)
		};
	}, []);
	const { data } = useSession();
	const authId = data?.user.id;
	const authImage = data?.user.image;
	console.log("image", data?.user.id);
	const [draggingElementStatus, handleDown] = useDraggable();
	const [videocall, setVideocall] = useState<number>(0);
	const [activeUser, setActiveUser] = useState<UserData[]>([]); // フロントで保持するuserData
	const params = useParams(); // const sendData = async () => {
	console.log("param", params);
	// 	const res = await fetch(
	// 		`http://localhost:8080/user/addprofile/${username}`,
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				nickname: authName,
	// 				img: authImage,
	// 			}),
	// 		}
	// 	);
	// 	const data = await res.json();
	// 	console.log("data です", data);
	// };
	const sendData = async () => {
		const res = await fetch(`http://localhost:8080/location`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				client_name: searchParams.id,
				x: Number(draggingElementStatus.translate.x),
				y: Number(draggingElementStatus.translate.y),
			}),
		});
		const data = await res.json();
		console.log("data です", data);
	};
	useEffect(() => {
		// const ws = new WebSocket(`ws://localhost:8080/ws/${username}/addpfofile?nickname=${searchParams.nickname}&img=${searchParams.img}`)
		// console.log(username)
		console.log("型チェックしたい");
		// console.log("name", username, searchParams.nickname, searchParams.img);
		sendData();
	}, [draggingElementStatus]);

	const checkOverlap = () => {
		const dragElement = document.getElementById("user-1");

		[1, 2, 3, 4, 5].forEach((room_id: number) => {
			const dropArea = document.getElementById(`room${room_id}`);

			if (!dragElement || !dropArea) return;

			const dragRect = dragElement.getBoundingClientRect();
			const dropRect = dropArea.getBoundingClientRect();

			// const dropAreaWithId = {
			// 	...dropRect,
			// 	room_id,
			// };

			const isCurrentlyOverlapping =
				dragRect.left < dropRect.right &&
				dragRect.right > dropRect.left &&
				dragRect.top < dropRect.bottom &&
				dragRect.bottom > dropRect.top;

			console.log("isCurrentlyOverlapping", isCurrentlyOverlapping);
			if (isCurrentlyOverlapping) {
				console.log(`${room_id}の部屋に入った`);
				setVideocall(room_id);
				console.log("videocall", videocall);
			} else if (!isCurrentlyOverlapping && room_id !== videocall) {
				console.log(`${room_id}の部屋から抜けた`);
				//setVideocall(0);
			}
		});
	};
	useEffect(() => {
		checkOverlap();
	}, [draggingElementStatus]);

	const testProfile = () => {
		console.log("collect");
	};
	function Admin() {
		const { status } = useSession({
			required: true,
			onUnauthenticated() {
				// The user is not authenticated, handle it here.
			},
		});
		if (status === "loading") {
			return "Loading or not authenticated...";
		}
		console.log("User is logged in");
		// return "User is logged in"
	}
	// ランダムにユーザー名を生成

	// バックエンド側のWebSocketサーバーに接続
	// エラーが出たためコメントアウト
	//const ws = new WebSocket(`ws://localhost:8080/ws/${username}`)

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<string[]>([]);
	const [receiverName, setReceiverName] = useState("");
	const handleChangeMessage = (e: any) => {
		setMessage(e.target.value);
	};

	function sendMessageAll() {
		const res = fetch("http://localhost:8080/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				types: "broadcast",
				client_name: String(username),
				message: message,
			}),
		});
	}
	return (
		<div>
			<div className="container">
				<input
					type="text"
					onChange={handleChangeMessage}
					placeholder="メッセージを入力してね"
					value={message}
				/>
				<button onClick={sendMessageAll}>全員にメッセージを送信</button>
				{messages.map((message, index) => (
					<div key={index}>{message}</div>
				))}
				<div className="dragging-element-status">
					{/* <p className="text-4xl font-bold">debug area</p>
					<div className="dragging-element">{`draggingElement: ${
						draggingElementStatus.draggingElement &&
						draggingElementStatus.draggingElement.id
					}`}</div>
					<div
						className="translate "
						onMouseDown={
							handleDown
						}>{`x: ${draggingElementStatus.translate.x}, y: ${draggingElementStatus.translate.y}`}</div>
					<div className="mouse-status">
						{`isDown: ${draggingElementStatus.mouseStatus.isDown}, isMove: ${draggingElementStatus.mouseStatus.isMove}, isUp: ${draggingElementStatus.mouseStatus.isUp}`}
					</div> */}

					{/* activeuserのひょうじ */}
					<div id="testUserData" className="m-10">
						{activeUser.map((user) => {
							return (
								// <UserDataCard username={'test'} x={100} y={200} />
								<div key={user.username}>
									{user.username} {user.x} {user.y} {user.nickname} {user.img}
								</div>
							);
						})}
					</div>
				</div>
				<h2 className="ml-5 font-bold text-4xl">{params.techname}の部屋</h2>
				<Video videocall={videocall} setVideocall={setVideocall} />

				<div className="draggables w-full relative">
					<div
						id="room1"
						className="fixed top-[150px] left-[250px] m-auto w-[200px] h-[200px] bg-black text-white p-5">
						room1
					</div>
					<div
						id="room2"
						className="fixed top-[150px] right-[250px]  m-auto w-[200px] h-[200px] bg-gray-400 text-white p-5">
						room2
					</div>
					<div
						id="room3"
						className="fixed top-[500px] right-[250px]  m-auto w-[200px] h-[200px] bg-gray-700 text-white p-5">
						room3
					</div>
					<div
						id="room4"
						className="fixed top-[500px] left-[250px]  m-auto w-[200px] h-[200px] bg-gray-300 text-white p-5">
						room4
					</div>
					<div
						id="user-1"
						className="element-1 draggable w-[90px]  h-[90px] bg-green-800 rounded-md"
						onMouseDown={handleDown}
						onMouseEnter={testProfile}></div>
					{/* <div
						id="user-2"
						className="element-1 draggable w-[90px] h-[90px] rounded-full bg-blue-800"
						onMouseDown={handleDown}
						onMouseEnter={Admin}></div> */}
				</div>
			</div>
		</div>
	);
}
