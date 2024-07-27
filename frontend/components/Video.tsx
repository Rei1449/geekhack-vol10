"use client";
import React, { useState } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import { useParams } from "next/navigation";

export default function Video({
	videocall,
	setVideocall,
}: {
	videocall: number;
	setVideocall: (value: number) => void;
}) {
	console.log(videocall);
	const [isHost, setHost] = useState(true);
	const [isPinned, setPinned] = useState(false);
	const [username, setUsername] = useState("");

	const params = useParams();

	const techname = params.techname;

	return (
		<div className="fixed right-0 ">
			<div>
				<h1>room {videocall}</h1>
				{videocall !== 0 ? (
					<>
						{console.log(
							"video開始video開始video開始video開始video開始video開始video開始"
						)}
						<div>
							<p style={{ fontSize: 20, width: 200 }}>
								You {isHost ? "a host" : "an audience"}
							</p>
						</div>
						<AgoraUIKit
							rtcProps={{
								appId: "7e7137512f254b568961f83f85198bff",
								channel: `room${videocall}${techname}`,
								token: null, //add your token if using app in secured mode
								role: isHost ? "host" : "audience",
								layout: isPinned ? layout.pin : layout.grid,
							}}
							rtmProps={{ username: username || "user", displayUsername: true }}
							callbacks={{
								EndCall: () => setVideocall(0),
							}}
						/>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
