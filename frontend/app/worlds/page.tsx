// "use client";

import Link from "next/link";
import React from "react";

export default function Page() {
	return (
		<div className="grid grid-cols-6 gap-10 p-10">
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/python">
					<img src="./tech-icons/python.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">Python</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/javascript">
					<img src="./tech-icons/javascript.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">
						JavaScript
					</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/typascript">
					<img src="./tech-icons/typescript.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">
						TypeScript
					</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/rust">
					<img src="./tech-icons/rust.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">Rust</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/next">
					<img src="./tech-icons/next.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">next.js</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/fastapi">
					<img src="./tech-icons/fastapi.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">FastApi</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/github">
					<img src="./tech-icons/github.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">Github</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
			<div className="px-5 py-5 border border-gray-200 rounded-md">
				<Link href="/worlds/docker">
					<img src="./tech-icons/docker.svg" />
					<div className="font-bold text-2xl mt-10 m-auto w-fit">Docker</div>
					<p className="font-bold text-blue-950 w-fit m-auto mt-5 text-xs">
						部屋へ入る→
					</p>
				</Link>
			</div>
		</div>
	);
}
