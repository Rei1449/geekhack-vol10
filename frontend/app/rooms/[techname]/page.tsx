"use client";
import React from "react";

import { useParams } from "next/navigation";

import Link from "next/link";

export default function Page() {
	const params = useParams();
	return (
		<div className="min-h-screen">
			<h1 className="text-4xl font-bold">{params.techname}</h1>

			<Link href={`/rooms/${params.techname}/1`}>room1</Link>
			<Link href={`/rooms/${params.techname}/2`}>room2</Link>
		</div>
	);
}
