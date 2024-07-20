"use client";
import React, { CSSProperties, useState } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import { useParams } from "next/navigation";

const Videocall = () => {
	const [videocall, setVideocall] = useState(true);
	const [isHost, setHost] = useState(true);
	const [isPinned, setPinned] = useState(false);
	const [username, setUsername] = useState("");

	const params = useParams();
	const video_id = params.video_id;
	const techname = params.teckname;

	return (
		<div style={styles.container}>
			<div style={styles.videoContainer}>
				<h1 style={styles.heading}>Agora Web UI Kit</h1>
				{videocall ? (
					<>
						<div style={styles.nav}>
							<p style={{ fontSize: 20, width: 200 }}>
								You {isHost ? "a host" : "an audience"}
							</p>
							<p style={styles.btn} onClick={() => setHost(!isHost)}>
								Change Role
							</p>
							<p style={styles.btn} onClick={() => setPinned(!isPinned)}>
								Change Layout
							</p>
						</div>
						<AgoraUIKit
							rtcProps={{
								appId: "7e7137512f254b568961f83f85198bff",
								channel: `test${video_id}${techname}`,
								token: null, //add your token if using app in secured mode
								role: isHost ? "host" : "audience",
								layout: isPinned ? layout.pin : layout.grid,
							}}
							rtmProps={{ username: username || "user", displayUsername: true }}
							callbacks={{
								EndCall: () => setVideocall(false),
							}}
						/>
					</>
				) : (
					<div style={styles.nav}>
						<input
							style={styles.input}
							placeholder="nickname"
							type="text"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
						<h3 style={styles.btn} onClick={() => setVideocall(true)}>
							Start Call
						</h3>
					</div>
				)}
			</div>
		</div>
	);
};

const styles = {
	container: {
		width: "50vw",
		height: "50vh",
		display: "flex",
		flex: 1,
		backgroundColor: "#007bff22",
	},
	heading: { textAlign: "center" as const, marginBottom: 0 },
	videoContainer: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
	} as CSSProperties,
	nav: { display: "flex", justifyContent: "space-around" },
	btn: {
		backgroundColor: "#007bff",
		cursor: "pointer",
		borderRadius: 5,
		padding: "4px 8px",
		color: "#ffffff",
		fontSize: 20,
	},
	input: { display: "flex", height: 24, alignSelf: "center" } as CSSProperties,
};

export default Videocall;