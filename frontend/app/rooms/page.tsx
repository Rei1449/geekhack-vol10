import React from "react";

import Link from "next/link";

// const Videocall = dynamic(() => import("./[techname]/video/videocall"), {
// 	ssr: false,
// });

export default function page() {
	return (
		<div className="w-full min-h-screen">
			<div className="grid grid-cols-3 gap-5">
				<div>
					<Link href="/rooms/javascript">javascript room </Link>
				</div>
				<div>
					<Link href="/rooms/python">python room</Link>
				</div>
			</div>
		</div>
	);
}
