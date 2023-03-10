/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
	// eslint-disable-next-line no-unused-vars
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

const EditReport = ({ match }) => {
	const [data, setData] = useState({
		name: "",
		lastname: "",
		personalnumber: "",
		cellphone: "",
		typevent: "",
		resevent: "",
		yn: "",
		status: "",
		selneshek: "",
		whap: "",
		amlahtype: "",
		rekemtype: "",
		mazavrekem: "",
		dwork: "",
		mataftype: "",
		apitype: "",
		mholaztype: "",
		pirot: "",
		datevent: "",
		mikom: "",
		nifga: "",

		error: false,
		successmsg: false,
		loading: false,
		redirectToReferrer: false,
		//
	});

	const [gdods, setGdods] = useState([]);
	const [hativas, setHativas] = useState([]);
	const [ogdas, setOgdas] = useState([]);
	const [pikods, setPikods] = useState([]);
	const [mkabazsMataf, setMkabazsMataf] = useState([]);
	const [indexM, setIndexM] = useState(0);

	const [mkabazs, setMkabazs] = useState([]);
	const [magads, setMagads] = useState([]);
	const [magadals, setMagadals] = useState([]);

	const getMagadals = async () => {
		await axios
			.get(`http://localhost:8000/api/magadal`)
			.then((response) => {
				setMagadals(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getMagads = async (magadalid) => {
		let tempmagadalsmagads = [];
		if (magadalid != undefined) {
			await axios
				.get(`http://localhost:8000/api/magad/magadsbymagadal/${magadalid}`)
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						tempmagadalsmagads.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
			setMagads(tempmagadalsmagads);
		}
	};

	const getMkabazs = async (magadid) => {
		let tempmagadmkabazs = [];
		if (magadid != undefined) {
			await axios
				.get(`http://localhost:8000/api/mkabaz/mkabazsbymagad/${magadid}`)
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						tempmagadmkabazs.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
			setMkabazs(tempmagadmkabazs);
		}
	};

	const getMkabazsMataf = async () => {
		await axios
			.get(`http://localhost:8000/api/mkabaz`)
			.then((response) => {
				setMkabazsMataf(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadPikods = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				setPikods(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadOgdas = async (pikodids) => {
		let temppikodids = pikodids;
		if (temppikodids != undefined && !temppikodids.isArray) {
			temppikodids = [pikodids];
		}
		let temppikodsogdas = [];
		if (temppikodids != undefined && temppikodids.length > 0) {
			for (let i = 0; i < temppikodids.length; i++) {
				await axios
					.post("http://localhost:8000/api/ogda/ogdasbypikodid", {
						pikod: temppikodids[i],
					})
					.then((response) => {
						for (let j = 0; j < response.data.length; j++)
							temppikodsogdas.push(response.data[j]);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		setOgdas(temppikodsogdas);
	};

	const loadHativas = async (ogdaids) => {
		let tempogdaids = ogdaids;
		if (tempogdaids != undefined && !tempogdaids.isArray) {
			tempogdaids = [ogdaids];
		}
		let tempogdashativas = [];
		if (tempogdaids != undefined && tempogdaids.length > 0) {
			for (let i = 0; i < tempogdaids.length; i++) {
				await axios
					.post("http://localhost:8000/api/hativa/hativasbyogdaid", {
						ogda: tempogdaids[i],
					})
					.then((response) => {
						for (let j = 0; j < response.data.length; j++)
							tempogdashativas.push(response.data[j]);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		setHativas(tempogdashativas);
	};

	const loadGdods = async (hativaids) => {
		let temphativaids = hativaids;
		if (temphativaids != undefined && !temphativaids.isArray) {
			temphativaids = [hativaids];
		}
		let temphativasgdods = [];
		if (temphativaids != undefined && temphativaids.length > 0) {
			for (let i = 0; i < temphativaids.length; i++) {
				await axios
					.post("http://localhost:8000/api/gdod/gdodsbyhativaid", {
						hativa: temphativaids[i],
					})
					.then((response) => {
						for (let j = 0; j < response.data.length; j++)
							temphativasgdods.push(response.data[j]);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		setGdods(temphativasgdods);
	};

	function handleChange(evt) {
		const value = evt.target.value;
		setData({ ...data, [evt.target.name]: value });
	}

	async function matafHandleChange(selectedOption, name) {
		if (!(selectedOption.value == "??????")) {
			let i = mkabazsMataf.map((item, index) => {
				return mkabazsMataf[index].name;
			});
			console.log(1);
			let nameIndex = await i.indexOf(selectedOption.label);
			// console.log(selectedOption.label);
			console.log(nameIndex);
			await setIndexM(nameIndex);
			// console.log(mkabazsMataf[nameIndex]);
			console.log(indexM);
			console.log(mkabazsMataf[indexM].matafEngine);
			console.log(mkabazsMataf[indexM].matafCre);

			setData({ ...data, [name]: selectedOption.value });
		} else {
			let tempdata = { ...data };
			console.log(tempdata);
			delete tempdata[name];
			setData(tempdata);
		}
	}

	function handleChange2(selectedOption, name) {
		if (!(selectedOption.value == "??????"))
			setData({ ...data, [name]: selectedOption.value });
		else {
			let tempdata = { ...data };
			delete tempdata[name];
			setData(tempdata);
		}
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
			ErrorReason += " ???? ?????? \n";
		}
		if (data.lastname == "") {
			flag = false;
			ErrorReason += " ???? ?????????? ?????? \n";
		}
		if (data.personalnumber == "") {
			flag = false;
			ErrorReason += " ???? ???????? ?????? \n";
		}
		if (data.cellphone == "") {
			flag = false;
			ErrorReason += " ?????????? ?????? \n";
		}
		if (
			document.getElementById("seltype").options[
				document.getElementById("seltype").selectedIndex
			].value == "??????"
		) {
			flag = false;
			ErrorReason += " ?????? ?????????? ?????? \n";
		}

		if (
			data.typevent === "1" ||
			data.typevent === "2" ||
			data.typevent === "3" ||
			data.typevent === "4"
		) {
			if (
				document.getElementById("res").options[
					document.getElementById("res").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "???????? ???????????? ???????? \n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,???? ???????? ?????? ???????? ?????? \n";
			}
		}
		if (data.typevent === "5") {
			if (
				document.getElementById("neshek").options[
					document.getElementById("neshek").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "?????? ????????/ ???????????? ?????? \n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,???? ???????? ?????? ?????? \n";
			}
			if (
				document.getElementById("what").options[
					document.getElementById("what").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += " ???? ?????????? ???????????? ?????? \n";
			}
		}
		if (data.typevent === "6") {
			if (
				document.getElementById("when").options[
					document.getElementById("when").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "?????? ?????????? ?????? \n";
			}
			if (data.amlah == "") {
				flag = false;
				ErrorReason += " ?????? ?????????? ?????? \n";
			}
		}
		if (data.typevent === "7") {
			if (
				document.getElementById("mataf").options[
					document.getElementById("mataf").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "?????? ?????? ?????? \n";
			}
			// if (
			// 	document.getElementById("rekem").options[
			// 		document.getElementById("rekem").selectedIndex
			// 	].value == "0"
			// ) {
			// 	flag = false;
			// 	ErrorReason += " ?????? ??????'?? ?????? \n";
			// }
			if (
				document.getElementById("mazav").options[
					document.getElementById("mazav").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "?????? ??????'?? ?????? \n";
			}
			if (
				document.getElementById("dwork").options[
					document.getElementById("dwork").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += " ?????? ???????? ?????????? ?????????? ??????  \n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,???? ???????????? / ?????????? ?????? \n";
			}
		}
		if (data.typevent === "9") {
			if (
				document.getElementById("mholaz").options[
					document.getElementById("mholaz").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "?????? ???????? ???????????? ?????? \n";
			}
			// if (
			//   document.getElementById("mhalz").options[
			//     document.getElementById("mhalz").selectedIndex
			//   ].value == "0"
			// ) {
			//   flag = false;
			//   ErrorReason += "?????? ???????? ?????????? ?????? \n";
			// }
		}
		if (data.pirot == "") {
			flag = false;
			ErrorReason += "  ?????????? ???????????? ?????? \n";
		}
		if (data.mikom == "") {
			flag = false;
			ErrorReason += " ,?????????? ?????? \n";
		}

		if (!data.datevent) {
			flag = false;
			ErrorReason += " ,?????????? ?????? \n";
		}
		if (data.nifga == "") {
			flag = false;
			ErrorReason += "???????? ?????????????? ???????? \n";
		}

		if (flag == true) {
			FixUser(event);
		} else {
			toast.error(ErrorReason);
		}
	};

	const FixUser = (event) => {
		event.preventDefault();
		UpdateReport(event);
	};

	const UpdateReport = () => {
		var reportid = match.params.formId;
		const report = {
			name: data.name,
			lastname: data.lastname,
			personalnumber: data.personalnumber,
			cellphone: data.cellphone,
			pikod: data.pikod,
			ogda:data.ogda,
			hativa:data.hativa,
			gdod:data.gdod,
			typevent: data.typevent,
			resevent: data.resevent,
			magadal: data.magadal,
			// magad:data.magad,
			mkabaz: data.mkabaz,
			yn: data.yn,
			status: data.dt != undefined || null ? data.dt : data.status,
			selneshek: data.selneshek,
			whap: data.whap,
			amlahtype: data.amlahtype,
			rekemtype: data.rekemtype,
			mazavrekem: data.mazavrekem,
			dwork: data.dwork,
			mataftype: data.mataftype,
			apitype: data.apitype,
			mholaztype: data.mholaztype,
			// mhalztype: data.mhalztype,
			pirot: data.pirot,
			datevent: data.datevent,
			mikom: data.mikom,
			nifga: data.nifga,
		};

		axios
			.put(`http://localhost:8000/report/update/${reportid}`, report)
			.then((response) => {
				toast.success(`???????????? ?????????? ????????????`);
				history.push(`/SummarizingReport`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const init = () => {
		var reportid = match.params.formId;
		axios
			.get(`http://localhost:8000/report/${reportid}`)
			.then((response) => {
				let tempuser = { ...response.data };
				setData(tempuser);
			})
			.catch((error) => {
				console.log(error);
			});
		loadPikods();
		getMagadals();
	};

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		setOgdas([]);
		loadOgdas(data.pikod);
	}, [data.pikod]);

	useEffect(() => {
		setHativas([]);
		loadHativas(data.ogda);
	}, [data.ogda]);

	useEffect(() => {
		setGdods([]);
		loadGdods(data.hativa);
	}, [data.hativa]);

	useEffect(() => {
		setMagads([]);
		getMagads(data.magadal);
	}, [data.magadal]);

	useEffect(() => {
		setMkabazs([]);
		getMkabazs(data.magad);
	}, [data.magad]);

	useEffect(() => {
		setMkabazsMataf([]);
		getMkabazsMataf();
	}, [data.mkabaz]);

	// todo: add a way to get the mkbatz

	return (
		<div>
			<Container className="mt--8 pb-5">
				<Row className="justify-content-center">
					<Col
						lg="20"
						md="7"
					>
						<Card className="shadow border-0">
							<CardBody className="px-lg-5 py-lg-5">
								<div className="text-center text-muted mb-4">
									<big>?????????? ??????????</big>
								</div>
								<div className="text-center text-muted mb-4">
									<small>???????? ??????????</small>
								</div>
								<Form role="form">
									<FormGroup dir="rtl">
										<Input
											placeholder="???? ????????"
											name="name"
											type="text"
											value={data.name}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup dir="rtl">
										<Input
											placeholder="???? ??????????"
											name="lastname"
											type="text"
											value={data.lastname}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup
										className="mb-3"
										dir="rtl"
									>
										<Input
											placeholder="???????? ????????"
											name="personalnumber"
											type="string"
											maxlength="7"
											value={data.personalnumber}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup
										className="mb-3"
										dir="rtl"
									>
										<Input
											placeholder="?????????? ????????"
											name="cellphone"
											type="tel"
											maxlength="10"
											value={data.cellphone}
											onChange={handleChange}
										/>
									</FormGroup>

									<div className="text-center text-muted mb-4">
										<small>???????? ?????????? ????????????</small>
									</div>

									<Row style={{ paddingTop: "2px" }}>
										{!data.ogda ? (
											<Col
												style={{
													justifyContent: "right",
													alignContent: "right",
													textAlign: "right",
												}}
											>
												<h6>??????????</h6>
												<Select
													data={pikods}
													handleChange2={handleChange2}
													name={"pikod"}
													val={data.pikod ? data.pikod : undefined}
												/>
											</Col>
										) : (
											<Col
												style={{
													justifyContent: "right",
													alignContent: "right",
													textAlign: "right",
												}}
											>
												<h6>??????????</h6>
												<Select
													data={pikods}
													handleChange2={handleChange2}
													name={"pikod"}
													val={data.pikod ? data.pikod : undefined}
													isDisabled={true}
												/>
											</Col>
										)}

										<>
											{data.pikod && !data.hativa ? (
												<Col
													style={{
														justifyContent: "right",
														alignContent: "right",
														textAlign: "right",
													}}
												>
													<h6>??????????</h6>
													<Select
														data={ogdas}
														handleChange2={handleChange2}
														name={"ogda"}
														val={data.ogda ? data.ogda : undefined}
													/>
												</Col>
											) : (
												<Col
													style={{
														justifyContent: "right",
														alignContent: "right",
														textAlign: "right",
													}}
												>
													<h6>??????????</h6>
													<Select
														data={ogdas}
														handleChange2={handleChange2}
														name={"ogda"}
														val={data.ogda ? data.ogda : undefined}
														isDisabled={true}
													/>
												</Col>
											)}
										</>

										<>
											{data.ogda && !data.gdod ? (
												<Col
													style={{
														justifyContent: "right",
														alignContent: "right",
														textAlign: "right",
													}}
												>
													<h6>??????????</h6>
													<Select
														data={hativas}
														handleChange2={handleChange2}
														name={"hativa"}
														val={data.hativa ? data.hativa : undefined}
													/>
												</Col>
											) : (
												<Col
													style={{
														justifyContent: "right",
														alignContent: "right",
														textAlign: "right",
													}}
												>
													<h6>??????????</h6>
													<Select
														data={hativas}
														handleChange2={handleChange2}
														name={"hativa"}
														val={data.hativa ? data.hativa : undefined}
														isDisabled={true}
													/>
												</Col>
											)}
										</>

										<>
											{data.hativa ? (
												<Col
													style={{
														justifyContent: "right",
														alignContent: "right",
														textAlign: "right",
													}}
												>
													<h6>????????</h6>
													<Select
														data={gdods}
														handleChange2={handleChange2}
														name={"gdod"}
														val={data.gdod ? data.gdod : undefined}
													/>
												</Col>
											) : (
												<Col
													style={{
														justifyContent: "right",
														alignContent: "right",
														textAlign: "right",
													}}
												>
													<h6>????????</h6>
													<Select
														data={gdods}
														handleChange2={handleChange2}
														name={"gdod"}
														val={data.gdod ? data.gdod : undefined}
														isDisabled={true}
													/>
												</Col>
											)}
										</>
									</Row>

									<div
										className="text-center text-muted mb-4"
										style={{ paddingTop: "20px" }}
									>
										<small>???????? ??????????</small>
									</div>

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										?????? ??????????
									</div>
									<FormGroup>
										<Input
											placeholder="?????? ??????????"
											type="select"
											name="typevent"
											value={data.typevent}
											onChange={handleChange}
											id="seltype"
										>
											<option value={"??????"}>??????</option>
											<option value={"1"}>?????????? ?????? ??????</option>
											<option value={"2"}>??????????????</option>
											<option value={"3"}>???????????? ????????</option>
											<option value={"4"}>??????????</option>
											<option value={"5"}>?????????? ??????"??</option>
											<option value={"6"}>?????????? ?????????? ???????? ????"??</option>
											<option value={"7"}>?????????? ??????????</option>
											<option value={"9"}>??????????</option>
											<option value={"10"}>?????? ?????????????? ?????????? / ????"??</option>
											<option value={"11"}>???? ???????? ???????? ??????????</option>
											<option value={"12"}>??????</option>
										</Input>
									</FormGroup>

									{/* ?????????? ?????? ??????, ??????????, ???????????? ????????,?????????????? */}

									{(data.typevent === "1" ||
										data.typevent === "2" ||
										data.typevent === "3" ||
										data.typevent === "4") && (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												???????? ????????????
											</div>
											<FormGroup>
												<Input
													type="select"
													name="resevent"
													value={data.resevent}
													onChange={handleChange}
													id="res"
												>
													<option value={"0"}>??????</option>
													<option value={"1"}>??????????</option>
													<option value={"2"}>?????? ????????</option>
													<option value={"3"}>???????? ????????</option>
													<option value={"4"}>???? ????????</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ????????
											</div>
											<Row>
												{!data.magad ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>???????? ????</h6>
														<Select
															data={magadals}
															handleChange2={handleChange2}
															name={"magadal"}
															val={data.magadal ? data.magadal : undefined}
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>???????? ????</h6>
														<Select
															data={magadals}
															handleChange2={handleChange2}
															name={"magadal"}
															val={data.magadal ? data.magadal : undefined}
															isDisabled={true}
														/>
													</Col>
												)}

												{data.magadal && !data.mkabaz ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={magads}
															handleChange2={handleChange2}
															name={"magad"}
															val={data.magad ? data.magad : undefined}
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={magads}
															handleChange2={handleChange2}
															name={"magad"}
															val={data.magad ? data.magad : undefined}
															isDisabled={true}
														/>
													</Col>
												)}

												{data.magad && !data.makat ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={mkabazs}
															handleChange2={handleChange2}
															name={"mkabaz"}
															val={data.mkabaz ? data.mkabaz : undefined}
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={mkabazs}
															handleChange2={handleChange2}
															name={"mkabaz"}
															val={data.mkabaz ? data.mkabaz : undefined}
															isDisabled={true}
														/>
													</Col>
												)}
											</Row>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ???????? ?????? ????????
											</div>
											<div style={{ textAlign: "right" }}>
												<FormGroup
													check
													inline
												>
													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														<Input
															type="radio"
															name="yn"
															value={true}
															onChange={handleChange}
															id="YES"
														/>
														????
													</div>
												</FormGroup>

												<FormGroup
													check
													inline
												>
													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														<Input
															type="radio"
															id="NO"
															name="yn"
															value={false}
															onChange={handleChange}
														/>
														????
													</div>
												</FormGroup>
											</div>
										</>
									)}

									{/* ?????????? ?????? */}

									{data.typevent === "5" && (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ????????/ ????????????
											</div>
											<FormGroup>
												<Input
													type="select"
													name="selneshek"
													value={data.selneshek}
													onChange={handleChange}
													id="neshek"
												>
													<option value={"0"}>??????</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ???????? ?????? ????????
											</div>

											<div style={{ textAlign: "right" }}>
												<FormGroup
													check
													inline
												>
													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														<Input
															type="radio"
															name="yn"
															value={true}
															onChange={handleChange}
															id="YES"
														/>
														????
													</div>
												</FormGroup>

												<FormGroup
													check
													inline
												>
													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														<Input
															type="radio"
															id="NO"
															name="yn"
															value={false}
															onChange={handleChange}
														/>
														????
													</div>
												</FormGroup>
											</div>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												???? ?????????? ????????????
											</div>
											<FormGroup>
												<Input
													type="select"
													name="whap"
													value={data.whap}
													onChange={handleChange}
													id="what"
												>
													<option value={"0"}>??????</option>
													<option value={"1"}>?????????? ??????</option>
													<option value={"2"}>?????????? ????????????</option>
													<option value={"3"}>?????????? ????????</option>
													<option value={"4"}>?????????? ?????? ????????</option>
													<option value={"5"}>??????</option>
												</Input>
											</FormGroup>
										</>
									)}

									{/*  ?????????? ?????????? ???????? ????"?? */}

									{data.typevent === "6" && (
										<>
											<p
												style={{
													textAlign: "right",
													color: "red",
													fontSize: "10px",
												}}
											>
												{" "}
												*?????????? ?????????? - ???? ?????????? ???? ???????? ?????? ???????? (???????? ???????? ??????
												??????????)
											</p>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ????????
											</div>
											<FormGroup>
												<Input
													type="select"
													name="wnifga"
													value={data.wnifga}
													onChange={handleChange}
													id="when"
												>
													<option value={"0"}>??????</option>
													<option value={"1"}>?????????? ???????????? ??????????????</option>
													<option value={"2"}>?????????? ???????????? ????????????</option>
													<option value={"3"}>??????????</option>
													<option value={"4"}>???????????? ????????????</option>
													<option value={"5"}>??????</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ????????
											</div>
											<FormGroup>
												<Input
													type="text"
													name="amlahtype"
													value={data.amlahtype}
													onChange={handleChange}
													id="amlah"
												></Input>
											</FormGroup>
										</>
									)}

									{/* ?????????? ??????????*/}

									{/*//* ------- ?????????? ?????????? ------------------*/}

									{data.typevent === "7" && (
										<>
											<Row>
												{!data.magad ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>???????? ????</h6>
														<Select
															data={magadals}
															handleChange2={handleChange2}
															name={"magadal"}
															val={data.magadal ? data.magadal : undefined}
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>???????? ????</h6>
														<Select
															data={magadals}
															handleChange2={handleChange2}
															name={"magadal"}
															val={data.magadal ? data.magadal : undefined}
															isDisabled={true}
														/>
													</Col>
												)}

												{!data.magadal && !data.mkabaz ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={magads}
															handleChange2={handleChange2}
															name={"magad"}
															val={data.magad ? data.magad : undefined}
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={magads}
															handleChange2={handleChange2}
															name={"magad"}
															val={data.magad ? data.magad : undefined}
															isDisabled={true}
														/>
													</Col>
												)}

												{!data.magad && !data.makat ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={mkabazsMataf}
															handleChange2={matafHandleChange}
															val={data.mkabaz ? data.mkabaz : undefined}
															id="mkabazM"
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={mkabazsMataf}
															handleChange2={matafHandleChange}
															val={data.mkabaz ? data.mkabaz : undefined}
															isDisabled={true}
															id="mkabazM"
														/>
													</Col>
												)}
											</Row>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ????????
											</div>
											<FormGroup>
												{/* {console.log(mkabazsMataf)} */}
												{/* {console.log(mkabazsMataf[indexM])}
												{console.log(mkabazsMataf[indexM].matafEngine)}
												{console.log(mkabazsMataf[indexM].matafCre)} */}

												{mkabazsMataf[indexM] ==
												undefined ? null : mkabazsMataf[indexM].matafEngine &&
												  mkabazsMataf[indexM].matafCre ? (
													<Input
														type="select"
														name="mataftype"
														value={data.mataftype}
														onChange={handleChange}
														id="mataf"
													>
														<option value={"0"}>??????</option>
														<option value={"1"}>???? ????????</option>
														<option value={"2"}>???? ????????</option>
														<option value={"3"}>???? ???????? ?????? ????????</option>
													</Input>
												) : mkabazsMataf[indexM].matafEngine ? (
													<Input
														type="select"
														name="mataftype"
														value={data.mataftype}
														onChange={handleChange}
														id="mataf"
													>
														<option value={"0"}>??????</option>
														<option value={"1"}>???? ????????</option>
													</Input>
												) : mkabazsMataf[indexM].matafCre ? (
													<Input
														type="select"
														name="mataftype"
														value={data.mataftype}
														onChange={handleChange}
														id="mataf"
													>
														<option value={"0"}>??????</option>
														<option value={"2"}>???? ????????</option>
													</Input>
												) : (
													<Input
														type="select"
														name="mataftype"
														value={data.mataftype}
														onChange={handleChange}
														id="mataf"
													>
														<option value={"0"}>??????</option>
														<option value={""}>???? ?????????? ???????? </option>
													</Input>
												)}
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ??????"?? ?????????? ????????????
											</div>
											<FormGroup>
												<Input
													type="select"
													name="mazavrekem"
													value={data.mazavrekem}
													onChange={handleChange}
													id="mazav"
												>
													<option value={"0"}>??????</option>
													<option value={"1"}>????????</option>
													<option value={"2"}>????????????</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ???????? ?????????? ??????????
											</div>
											<FormGroup>
												<Input
													type="select"
													name="dwork"
													value={data.dwork}
													onChange={handleChange}
													id="dwork"
												>
													<option value={"0"}>??????</option>
													<option value={"1"}>?????????????? ????"??</option>
													<option value={"2"}>??????????</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????????? ?????????? / ??????????
											</div>

											<div style={{ textAlign: "right" }}>
												<FormGroup
													check
													inline
												>
													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														<Input
															type="radio"
															name="yn"
															value={true}
															onChange={handleChange}
															id="YES"
														/>
														????
													</div>
												</FormGroup>

												<FormGroup
													check
													inline
												>
													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														<Input
															type="radio"
															id="NO"
															name="yn"
															value={false}
															onChange={handleChange}
														/>
														????
													</div>
												</FormGroup>
											</div>
										</>
									)}

									{/*//* -------------- ??????????  ----------*/}

									{data.typevent === "9" && (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												?????? ???????? ????????????
											</div>
											<Row>
												{!data.magad ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>???????? ????</h6>
														<Select
															data={magadals}
															handleChange2={handleChange2}
															name={"magadal"}
															val={data.magadal ? data.magadal : undefined}
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>???????? ????</h6>
														<Select
															data={magadals}
															handleChange2={handleChange2}
															name={"magadal"}
															val={data.magadal ? data.magadal : undefined}
															isDisabled={true}
														/>
													</Col>
												)}

												{data.magadal && !data.mkabaz ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={magads}
															handleChange2={handleChange2}
															name={"magad"}
															val={data.magad ? data.magad : undefined}
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={magads}
															handleChange2={handleChange2}
															name={"magad"}
															val={data.magad ? data.magad : undefined}
															isDisabled={true}
														/>
													</Col>
												)}

												{data.magad && !data.makat ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={mkabazs}
															handleChange2={handleChange2}
															name={"mkabaz"}
															val={data.mkabaz ? data.mkabaz : undefined}
														/>
													</Col>
												) : (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>????????</h6>
														<Select
															data={mkabazs}
															handleChange2={handleChange2}
															name={"mkabaz"}
															val={data.mkabaz ? data.mkabaz : undefined}
															isDisabled={true}
														/>
													</Col>
												)}
											</Row>
											{/* <div style={{ textAlign: "right", paddingTop: "10px" }}>
        ?????? ???????? ??????????
      </div>
     <FormGroup>
        <Input
          type="select"
          name="mhalztype"
          value={data.mhalztype}
          onChange={handleChange}
          id="mhalz"
        >
          <option value={"0"}>??????</option>
        </Input>
      </FormGroup>
*/}
										</>
									)}
									{/*//* ------------- status checker ------------------ */}
									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										??????????
									</div>
									<div style={{ textAlign: "right" }}>
										<FormGroup
											check
											inline
										>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												<Input
													type="radio"
													name="dt"
													value="1"
													onChange={handleChange}
													id="delt"
												/>
												????????
											</div>
										</FormGroup>

										<FormGroup
											check
											inline
										>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												<Input
													type="radio"
													id="notDelt"
													name="dt"
													value="0"
													onChange={handleChange}
												/>
												????????????
											</div>
										</FormGroup>
									</div>

									<FormGroup dir="rtl">
										<Input
											placeholder="?????????? ????????????"
											name="pirot"
											type="textarea"
											value={data.pirot}
											onChange={handleChange}
										/>
									</FormGroup>

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										?????????? ??????????
									</div>
									<FormGroup dir="rtl">
										<Input
											placeholder="?????????? ??????????"
											name="datevent"
											type="datetime-local"
											value={data.datevent.slice(0, 21)}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup dir="rtl">
										<Input
											placeholder="?????????? ????????????"
											name="mikom"
											type="string"
											value={data.mikom}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup dir="rtl">
										<Input
											placeholder="?????? ???????????? ?????? ????????????"
											name="nifga"
											type="number"
											value={data.nifga}
											onChange={handleChange}
										/>
									</FormGroup>
									{/* 
       {data.nifga > "0" && (
        <>
          <div style={{ textAlign: "right", paddingTop: "10px" }}>
            ?????? ??????????
          </div>
          <FormGroup>
            <Input
              type="select"
              name="mazavnifga"
              value={data.mazavnifga}
              onChange={handleChange}
              id="mazav"
            >
              <option value={"0"}>??????</option>
              <option value={"1"}>????</option>
              <option value={"2"}>????????????</option>
              <option value={"3"}>??????</option>
              <option value={"4"}>????????</option>
            </Input>
          </FormGroup>

          <FormGroup dir="rtl">
        <Input
          placeholder="?????????? ???????????? ????????"
          name="mikompgia"
          type="string"
          value={data.mikompgia}
          onChange={handleChange}
        />
      </FormGroup> 
      <div style={{ textAlign: 'right', paddingTop: '10px' }}>
      <button
    //    onClick={clickSubmit} 
       className="btn btn-primary">
          +
     </button>
     </div>
      </>
      )} */}

									<div className="text-center">
										<button
											onClick={clickSubmit}
											className="btn-new-blue"
										>
											????????
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
export default withRouter(EditReport);
