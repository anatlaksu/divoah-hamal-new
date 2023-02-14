import React from "react";

import styles from "../../../assets/css/backgroundAll.module.css";
import groupOne from "../../../assets/img/group-6@2x.png";
import groupTwo from "../../../assets/img/group-7@2x.png";

export default function Background(props) {
	return (
		<div
			className={styles.componentParent}
			style={{ zIndex: "1", position: "absolute" }}
		>
			<img
				className={styles.frameChild}
				alt=""
				src={groupOne}
			/>
			<img
				className={styles.frameItem}
				alt=""
				src={groupTwo}
			/>
			<div style={{ position: "relative", left: "10%" }}>{props.children}</div>
		</div>
	);
}
