import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Container,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Alert,
	Spinner,
	Label,
	Col,
} from "reactstrap";
import { produce } from "immer";
import { generate } from "shortid";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import Select from "components/general/Select/AnimatedSelect";

const EditUserForm = ({ match }) => {

	const [pikods, setPikods] = useState([]);

	const loadPikods = async () => {
		await axios.get("http://localhost:8000/api/pikod",)
			.then(response => {
				setPikods(response.data);
			})
			.catch((error) => {
				console.log(error);
			})
	  }
	  

	const [data, setData] = useState({
		name: "",
		lastname: "",
		personalnumber: "",
		role: "",
		//
		errortype: "",
		error: false,
		successmsg: false,
		loading: false,
		redirectToReferrer: false,
		//
	});

	function handleChange2(selectedOption, name) {
		if (!(selectedOption.value == "בחר"))
			setData({ ...data, [name]: selectedOption.value });
		else {
			let tempdata = { ...data };
			delete tempdata[name];
			setData(tempdata);
		}
	}

	function handleChange(evt) {
		const value = evt.target.value;
		setData({ ...data, [evt.target.name]: value });
	}

	const clickSubmit = (event) => {
		CheckSignUpForm(event);
	};

	const CheckSignUpForm = (event) => {
		event.preventDefault();
		var flag = true;
		var ErrorReason = "";
		if (data.name == "") {
			flag = false;
			ErrorReason += "שם ריק \n";
		}
		if (data.lastname == "") {
			flag = false;
			ErrorReason += "שם משפחה ריק \n";
		}
		if (data.personalnumber == "") {
			flag = false;
			ErrorReason += "מס אישי ריק \n";
		}
		if (flag == true) {
			FixUser(event);
		} else {
			toast.error(ErrorReason);
		}
	};

	const FixUser = (event) => {
		event.preventDefault();
		UpdateUser(event);
	};

	const UpdateUser = () => {
		var userid = match.params.userid;
		const user = {
			name: data.name,
			lastname: data.lastname,
			role: data.role,
			pikod: data.pikod,
			validated: data.validated,
			personalnumber: data.personalnumber,
		};

		axios
			.put(`http://localhost:8000/api/user/update/${userid}`, user)
			.then((response) => {
				toast.success(`המשתמש עודכן בהצלחה`);
				history.push(`/manageusers`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const init = () => {
		var userid = match.params.userid;
		axios
			.post("http://localhost:8000/api/getuserbyid", { userid })
			.then((response) => {
				let tempuser = { ...response.data };
				setData(tempuser);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		init();
		loadPikods();
	}, []);

	return (
		<div className="">
			<Container
				className=""
				dir="rtl"
			>
				<Row className="justify-content-center">
					<Col
						lg="5"
						md="7"
					>
						<Card className="shadow border-0">
							<CardBody className="px-lg-5 py-lg-5">
								<div className="text-center text-muted mb-4">
									<small>עריכת משתמש</small>
								</div>
								<Form role="form">
									<FormGroup>
										<Input
											placeholder="שם פרטי"
											name="name"
											type="string"
											value={data.name}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup>
										<Input
											placeholder="שם משפחה"
											name="lastname"
											type="string"
											value={data.lastname}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup className="mb-3">
										<Input
											placeholder="מספר אישי"
											name="personalnumber"
											type="string"
											value={data.personalnumber}
											onChange={handleChange}
										/>
									</FormGroup>

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										הרשאה
									</div>
									<FormGroup dir="rtl">
										<Input
											type="select"
											name="role"
											value={data.role}
											onChange={handleChange}
										>
											<option value="">הרשאה</option>
											<option value="0">משתמש רגיל</option>
											<option value="1">משתמש חמ"ל</option>
											<option value="2">מנהל מערכת</option>
										</Input>
									</FormGroup>

									<FormGroup
												style={{
													justifyContent: "right",
													alignContent: "right",
													textAlign: "right",
												}}
											>
												<h6>פיקוד</h6>
												<Select
													data={pikods}
													handleChange2={handleChange2}
													name={"pikod"}
													val={data.pikod ? data.pikod : undefined}
												/>
									</FormGroup>

									<div className="text-center">
										<button
											onClick={clickSubmit}
											className="btn-new-blue"
										>
											עדכן
										</button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default withRouter(EditUserForm);
