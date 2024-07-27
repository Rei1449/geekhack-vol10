"use client";
import useDraggable from "@/utils/dragdrop/useDraggble";
import React, { useEffect, useState } from "react";

export default function Page() {
	const [draggingElementStatus, handleDown] = useDraggable();
	const [isOverlapping, setIsOverlapping] = useState(false);
	const checkOverlap = () => {
		const dragElement = document.getElementById("user-1");
		const dropArea = document.getElementById("room1");

		if (!dragElement || !dropArea) return;

		const dragRect = dragElement.getBoundingClientRect();
		const dropRect = dropArea.getBoundingClientRect();

		// if (
		// 	dragRect.left < dropRect.right &&
		// 	dragRect.right > dropRect.left &&
		// 	dragRect.top < dropRect.bottom &&
		// 	dragRect.bottom > dropRect.top
		// ) {
		// 	console.log("reactの布教の部屋に入った");
		// }
		const isCurrentlyOverlapping =
			dragRect.left < dropRect.right &&
			dragRect.right > dropRect.left &&
			dragRect.top < dropRect.bottom &&
			dragRect.bottom > dropRect.top;

		if (isCurrentlyOverlapping && !isOverlapping) {
			console.log("reactの部屋に入った");
			// 重なった際に実行する関数をここに追加
			setIsOverlapping(true);
			setVideocall(1);
		} else if (!isCurrentlyOverlapping && isOverlapping) {
			console.log("reactの部屋から抜けた");
			// 重ならなくなった際に実行する関数をここに追加
			setIsOverlapping(false);
			setVideocall(null);
		}
	};
	useEffect(() => {
		checkOverlap();
	}, [draggingElementStatus, isOverlapping]);

	const [videocall, setVideocall] = useState<number | null>(null);
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
						className="translate draggable"
						onMouseDown={
							handleDown
						}>{`x: ${draggingElementStatus.translate.x}, y: ${draggingElementStatus.translate.y}`}</div>
					{/* <div className="dragging-direction">
						{`horizontal: ${draggingElementStatus.draggingDirection.horizontal}, vertical: ${draggingElementStatus.draggingDirection.vertical}`}
					</div> */}
					<div className="mouse-status">
						{`isDown: ${draggingElementStatus.mouseStatus.isDown}, isMove: ${draggingElementStatus.mouseStatus.isMove}, isUp: ${draggingElementStatus.mouseStatus.isUp}`}
					</div>
				</div>
				<div className="draggables">
					<div
						id="room1"
						className="fixed top-[200px] right-0 left-0 m-auto w-[200px] h-[200px] bg-black text-white">
						reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！reactやろうぜ！
					</div>
					<div className="fixed top-[200px] right-[50%] left-0 m-auto w-[200px] h-[200px] bg-gray-400 text-white">
						vueから逃げるな！vueから逃げるな！vueから逃げるな！vueから逃げるな！vueから逃げるな！vueから逃げるな！vueから逃げるな！vueから逃げるな！
					</div>
					<div
						id="user-1"
						className="element-1 draggable w-[70px] rounded-full h-[70px] bg-green-800"
						onMouseDown={handleDown}></div>
					<div
						id="user-2"
						className="element-1 draggable w-[70px] h-[70px] rounded-full bg-blue-800"
						onMouseDown={handleDown}></div>
				</div>
			</div>
		</div>
	);
}
