import React from "react";
import dynamic from "next/dynamic";

const Videocall = dynamic(() => import("./videocall"), { ssr: false });

export default function page() {
	return (
		<div className="w-full min-h-screen">
			hi tet agora
			<Videocall />
		</div>
	);
}
