import React, { useState, useEffect } from "react";

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
import image from "../../assets/img/landing.jpg";


function AdminSignInForm() {
	const { user } = isAuthenticated();
	const [data, setData] = useState([]);

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
		<div >
		<div className=" position-absolute"
		style={{marginRight: "7em"}}
		
		>
		{/*//* on army marginRight: "12em" */}
								<div className="mb-5"
								style={{marginTop :" 250%"}}
								>
										{/*//* on army marginTop :" 320%" */}

									<Button>
										<Link
										
											className="text-white"
											to="/report"
										>
											דיווח אירוע חריג
										</Link>
									</Button>
								</div>
								<div className="">
									<Button>
										<Link
											className="text-white"
											to="/reportrekem"
										>
											דיווח אירוע רק"ם
										</Link>
									</Button>
								</div>
							</div>
			<img 
				src={image}
				style={{ width: "100vw", height: "100vh" }}
			/>

		</div>
	);
}

export default AdminSignInForm;
