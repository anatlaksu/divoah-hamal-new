import React, { useState, useEffect } from "react";
import styles from "../divoah/css/dash.module.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import {
	Button,
	Card,
	CardHeader,
	Container,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import { isAuthenticated } from "auth";

import vectorOne from "../../assets/img/vector-1@2x.png";
import vectorTwo from "../../assets/img/vector-3@2x.png";
import vectorThree from "../../assets/img/vector-2@2x.png";
import photo from "../../assets/img/pngwing-2@2x.png";

import tank from "../../assets/img/pngwing.com (2).png";
import note from "../../assets/img/note-img.png";
import pikodImg from "../../assets/img/home3.png";

function AdminSignInForm() {
	const { user } = isAuthenticated();
	const [data, setData] = useState([]);

	const loadReports = () => {
		//* help tool for checking if ReportDB is an array so the map function will work on him
		let arrayTester = [];
		//* geting all the reports
		axios
			.get(`http://localhost:8000/report/`)
			.then((res) => {
				res.data.map((item, index) => {
					// console.log(res.data[index]._id);
					//* taking the id of etch report and geting all its data (like in the cardatamodal)
					axios
						.get(`http://localhost:8000/report/${res.data[index]._id}`)
						.then((response) => {
							// console.log(response);
							// let tempuser = { ...response.data };
							// setData(tempuser);
							let tempcardata = response.data[0];
							// console.log(tempcardata);
							arrayTester.push(tempcardata);
							// tempcardata.slice();
							if (arrayTester.length === res.data.length) {
								setData(arrayTester);
								console.log(data.length);
							}
						})
						.catch((error) => {
							console.log(error);
						});
				});
				// console.log(response.data);
				// console.log(reportDBItem);
				// setReportDB(reportDBItem);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		// console.log(user.personalnumber);
		// console.log(user.role);
		// if (user.role == "1") {
		// 	history.push(`/dashamal`);
		// }
		// if (user.role == "2") {
		// 	history.push(`/dashamal`);
		// }
		// console.log(user.personalnumber);
		axios
			.get(
				`http://localhost:8000/report/requestByPersonalnumber/${user.personalnumber}`
			)
			.then((response) => {
				console.log(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// console.log(data.length);
	// console.log(
	// 	data.map((i, index) => {
	// 		return data[index].typevent;
	// 	})
	// );

	const rekem = data.filter((i, index) => {
		if (isNaN(data[index].typevent)) {
			return data[index].typevent;
		}
	});
	const incident = data.filter((i, index) => {
		if (!isNaN(data[index].typevent)) {
			return data[index].typevent;
		}
	});
	console.log(rekem.length);
	console.log(incident.length);

	return (
		<div className={styles.wireframe1}>
			<div className={styles.component1}>
				<div className={styles.vectorParent}>
					<img
						className={styles.groupChild}
						alt=""
						src={vectorOne}
					/>
					<img
						className={styles.groupItem}
						alt=""
						src={vectorTwo}
					/>
					<img
						className={styles.groupInner}
						alt=""
						src={vectorThree}
					/>
				</div>
				<img
					className={styles.pngwing2Icon}
					alt=""
					src={photo}
				/>
				<iframe className={styles.component1Child} />
				<div className={styles.parent}>
					<h2 className={styles.h2}>
						<h1
							className={styles.h1}
							style={{ color: "white" }}
						>
							מערכת אירועים חריגים
						</h1>
					</h2>
					<h4 className={styles.h4}>
						<h4
							style={{ fontWeight: "bold" }}
						>{`לניהול ודיווח אירועים חריגים `}</h4>
					</h4>
				</div>
				{/*//* ------------- buttons ----------------------- */}
				<div
					className="row"
					style={{ marginTop: "11%" }}
				>
					<div className="col-md-1 lg mr-3">
						<button className={styles.dashBtn}>
							<Link
								className="text-dark"
								style={{ fontSize: "16px" }}
								to="/report"
							>
								דיווח אירוע חריג
							</Link>
						</button>
					</div>
					<div className="col-md-2 mr-5  ">
						<button
							className={styles.dashBtn}
							style={{ marginLeft: "100px" }}
						>
							<Link
								className="text-dark"
								style={{ fontSize: "16px" }}
								to="/reportrekem"
							>
								דיווח אירוע רק"ם
							</Link>
						</button>
					</div>
				</div>
				<div className={styles.AllCard}>
					<div
						className="row justify-content-around"
						style={{ marginLeft: "20%" }}
					>
						{/*//* ------- rekem ------------- */}

						<Card
							className="col-md-2 shadow border-0 mt-5 "
							style={{
								height: "300px",
								marginRight: "10%",
								borderRadius: "35px",
							}}
						>
							<img
								src={tank}
								style={{ height: "120px", width: "120px" }}
								className="mb-0 rounded mx-auto d-block"
							/>
							<CardHeader>
								{" "}
								<h2 className="text-center mt-0">
									סה"כ אירועי רק"ם
									<br /> <br />
									{rekem.length}
								</h2>
							</CardHeader>
						</Card>

						{/*//* ------- report ------------- */}

						<Card
							className="col-md-2 shadow border-0 mt-5 "
							style={{
								height: "300px",
								marginRight: "42%",
								borderRadius: "35px",
							}}
						>
							<img
								src={note}
								style={{ height: "60px", width: "60px" }}
								className="mb-0 mt-2 rounded mx-auto d-block"
							/>
							<CardHeader>
								{" "}
								<h2 className="text-center">
									{" "}
									כמות אירועים חריגים שדווחו <br /> <br /> {incident.length}
								</h2>
							</CardHeader>
						</Card>
					</div>
					<Card
						className={"shadow " + styles.pikodCard}
						style={{ height: "400px", borderRadius: "35px" }}
					>
						<img
							src={pikodImg}
							style={{ height: "60px", width: "60px" }}
							className="mb-0 mt-2 rounded mx-auto d-block"
						/>
						<CardHeader>
							{" "}
							<h2 className="text-center">
								{" "}
								כמות אירועים חריגים שדווחו <br /> <br /> {data.length}
							</h2>
						</CardHeader>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default AdminSignInForm;
