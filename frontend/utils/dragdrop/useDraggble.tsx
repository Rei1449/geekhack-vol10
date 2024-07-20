"use client";

import React from "react";

const { useState, useRef, useCallback, useEffect } = React;

/*** types ***/
type Point = {
	x: number;
	y: number;
};

type DraggingDirection = {
	horizontal: "left" | "right" | null;
	vertical: "up" | "down" | null;
};

type Axis = "x" | "y";

type MouseStatus = {
	isDown: boolean;
	isMove: boolean;
	isUp: boolean;
};

type DraggingElementStatus = {
	translate: Point;
	mouseStatus: MouseStatus;
	draggingElement: (EventTarget & Element) | null;
	draggingDirection: DraggingDirection;
};

type Handler = (e: React.MouseEvent<EventTarget & HTMLElement>) => void;

/*** hooks ***/
const useDraggable = (
	isStyleTransform: boolean = true
): [DraggingElementStatus, Handler] => {
	// ドラッグしている要素の移動量
	const [translate, setTranslate] = useState<Point>({
		x: 0,
		y: 0,
	});

	// 現在のマウスイベントの状態
	const [mouseStatus, setMouseStatus] = useState<MouseStatus>({
		isDown: false,
		isMove: false,
		isUp: false,
	});

	// マウスを押し込んだときのカーソルの座標
	const startPoint = useRef<Point>({ x: 0, y: 0 });

	// 前回のtranslate
	const currentTranslate = useRef<Point>({ x: 0, y: 0 });

	// 前回のマウスの移動距離
	const prevDifference = useRef<Point>({ x: 0, y: 0 });

	// ドラッグしている要素
	const draggingElement = useRef<(EventTarget & HTMLElement) | null>(null);

	// ドラッグしている方向
	const draggingDirection = useRef<DraggingDirection>({
		horizontal: null,
		vertical: null,
	});

	// .draggableが追加されていない要素がドラッグされないようにする
	const isDraggable = (): boolean =>
		draggingElement.current
			? draggingElement.current.classList.contains("draggable")
			: false;

	// mousedownが発生したときに実行する関数
	const handleDown = useCallback(
		(e: React.MouseEvent<EventTarget & HTMLElement>): void => {
			// 押し込んだ要素を取得
			draggingElement.current = e.currentTarget;

			//ドラッグした要素に.draggableクラスが指定されていなければ終了
			if (!isDraggable()) return;

			// 押し込んだ要素のstyleから現在のtransform: translate()のx, y値を取得する
			const matrix = new DOMMatrix(
				getComputedStyle(draggingElement.current).transform
			);
			currentTranslate.current = {
				x: matrix.translateSelf().e,
				y: matrix.translateSelf().f,
			};

			// 一旦すべてのdraggableな要素のz-indexを1000に戻してから押し込んだ要素のz-indexを10001にする
			// z-indexはpositionプロパティの値が指定されていないと適用されない
			const draggableElements = document.getElementsByClassName(
				"draggable"
			) as HTMLCollectionOf<HTMLElement>;
			for (let i = 0; i < draggableElements.length; i++) {
				draggableElements[i].style.zIndex = `1000`;
			}
			draggingElement.current.style.position = "relative";
			draggingElement.current.style.zIndex = `1001`;

			// 押し込んだときのページの左上(0, 0)からのカーソルの座標
			const x = e.pageX;
			const y = e.pageY;
			startPoint.current = { x, y };

			// 押し込んでいることを示すisDownをtrueに切り替える
			setMouseStatus((prevMouseStatus) => ({
				...prevMouseStatus,
				isUp: false,
				isDown: true,
			}));
		},
		[]
	);

	// mousemoveが発生したときに実行する関数
	const handleMove = (e: MouseEvent): void => {
		// 押し込んでいなければ終了
		if (!draggingElement.current) return;

		//ドラッグした要素に.draggableクラスが指定されていなければ終了
		if (!isDraggable()) return;

		// テキストをdraggableにした場合に、ドラッグしたときにテキストが選択されないようにする
		e.preventDefault();
		// console.log("defaultPrevented: ", e.defaultPrevented);

		// console.log("mousemove");

		// 押し込んだところから進んだカーソルの距離
		const differenceX = e.pageX - startPoint.current.x;
		const differenceY = e.pageY - startPoint.current.y;

		// ドラッグしている方向
		if (differenceX > prevDifference.current.x) {
			draggingDirection.current.horizontal = "right";
		} else if (differenceX < prevDifference.current.x) {
			draggingDirection.current.horizontal = "left";
		}

		if (differenceY > prevDifference.current.y) {
			draggingDirection.current.vertical = "down";
		} else if (differenceY < prevDifference.current.y) {
			draggingDirection.current.vertical = "up";
		}

		// console.log("directionX: ", draggingDirection.current.horizontal);
		// console.log("directionY: ", draggingDirection.current.vertical);

		setTranslate({
			x: currentTranslate.current.x + differenceX,
			y: currentTranslate.current.y + differenceY,
		});

		// 前回までに進んだ距離として保存しておく
		prevDifference.current = {
			x: differenceX,
			y: differenceY,
		};

		// 押し込んだまま動かしていることを示すisMoveをtrueに切り替える
		setMouseStatus((prevMouseStatus) => ({
			...prevMouseStatus,
			isMove: true,
		}));
	};

	// mouseupが発生したときに実行する関数
	const handleUp = (e: MouseEvent): void => {
		e.preventDefault();
		// 押し込んでいなければ終了
		if (!draggingElement.current) return;

		//ドラッグした要素に.draggableクラスが指定されていなければ終了
		if (!isDraggable()) return;
		// console.log("mouseup");

		// ドロップ＝押し込みをやめたということで空にする
		draggingElement.current = null;

		// 押し込みをやめたことを示すisUpをtrueに切り替え、isDownとisMoveをfalseに戻す
		setMouseStatus((prevMouseStatus) => ({
			...prevMouseStatus,
			isDown: false,
			isMove: false,
			isUp: true,
		}));
	};

	// translateが変化したときに要素を動かす
	useEffect(() => {
		// isStyleTransformがfalseであればstyle.transformを指定しない
		if (!isStyleTransform) return;

		// nullの判定（TypeScript）
		if (!draggingElement.current) return;

		// style.transformで要素を動かす
		draggingElement.current.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0)`;
	}, [translate]);

	// mousemove, mouseup, mouseleaveイベントが発生したときに実行されるようにする
	// 初回のレンダー後に一度だけ実行
	useEffect(() => {
		document.body.addEventListener("mousemove", handleMove);
		document.body.addEventListener("mouseup", handleUp);
		document.body.addEventListener("mouseleave", handleUp);

		return () => {
			document.body.removeEventListener("mousemove", handleMove);
			document.body.removeEventListener("mouseup", handleUp);
			document.body.removeEventListener("mouseleave", handleUp);
		};
	}, []);

	return [
		{
			translate,
			mouseStatus,
			draggingElement: draggingElement.current,
			draggingDirection: draggingDirection.current,
		},
		handleDown,
	];
};

export default useDraggable;
