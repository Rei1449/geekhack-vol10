"use client"

import Video from '@/components/Video';
import useDraggable from '@/utils/dragdrop/useDraggble';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'


// ランダムにユーザー名を生成
const username = Math.random().toString(32).substring(2)

// バックエンド側のWebSocketサーバーに接続
// エラーが出たためコメントアウト
const ws = new WebSocket(`wss://geekcampvol10-khr7sj2gqq-an.a.run.app/ws/${username}/?nickname=testname`)

console.log(username)

interface UserData {
  username: string,
  x: number,
  y: number
}



const MainPage = () => {
	const [draggingElementStatus, handleDown] = useDraggable();
	const [videocall, setVideocall] = useState<number>(0);

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
	}
	function Admin() {
		const { status } = useSession({
			required: true,
			onUnauthenticated() {
				// The user is not authenticated, handle it here.
			},
		})
		if (status === "loading") {
			return "Loading or not authenticated..."
		}  
		console.log("User is logged in");
		// return "User is logged in"
	}

	return (
		<div>
			<div className="container">
				<div className="dragging-element-status border">
					<p className="text-4xl font-bold">debug area</p>
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
					</div>
				</div>
				<Video videocall={videocall} setVideocall={setVideocall} />

				<div className="draggables">
					<div
						id="room1"
						className="fixed top-[200px] right-0 left-0 m-auto w-[200px] h-[200px] bg-black text-white"></div>
					<div
						id="room2"
						className="fixed top-[200px] right-[50%] left-0 m-auto w-[200px] h-[200px] bg-gray-400 text-white"></div>
					<div
						id="room3"
						className="fixed top-[600px] right-[50%] left-0 m-auto w-[200px] h-[200px] bg-gray-700 text-white"></div>
					<div
						id="room4"
						className="fixed top-[600px] right-[20%] left-0 m-auto w-[200px] h-[200px] bg-gray-200 text-white"></div>
					<div
						id="user-1"
						className="element-1 draggable w-[90px]  h-[90px] bg-green-800"
						onMouseDown={handleDown}
						onMouseEnter={testProfile}></div>
					<div
						id="user-2"
						className="element-1 draggable w-[90px] h-[90px] rounded-full bg-blue-800"
						onMouseDown={handleDown}
						onMouseEnter={Admin}></div>
				</div>
			</div>
		</div>
	);
}

export default MainPage