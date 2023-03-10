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
	Modal,
	ModalBody,
} from "reactstrap";
import { produce } from "immer";
import { generate } from "shortid";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import Select from "components/general/Select/AnimatedSelect";
import CarTypesFilterObject from "components/general/CarTypeFilter/CarTypesFilterforwach";
import deletepic from "assets/img/delete.png";

const CarDataFormModalView = (match) => {
	const [data, setData] = useState({
		name: "",
		lastname: "",
		personalnumber: "",
		cellphone: "",
		pikodrep: "",
		ogdarep: "",
		hativarep: "",
		typevent: "",
		resevent: "",
		yn: "",
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
		lessons: "",
		datevent: "",
		mikom: "",
		nifga: "",
		wnifga: "",
		error: false,
		successmsg: false,
		loading: false,
		redirectToReferrer: false,
		//
	});

	const [cartypesfilterarray, setCartypesfilterarray] = useState([]);
	const [infohurtarray, setinfohurtarray] = useState([]);

	//* pikod data
	const [gdods, setGdods] = useState([]);
	const [hativas, setHativas] = useState([]);
	const [ogdas, setOgdas] = useState([]);
	const [pikods, setPikods] = useState([]);
	//* pikodrep data
	const [gdodsrep, setGdodsrep] = useState([]);
	const [hativasrep, setHativasrep] = useState([]);
	const [ogdasrep, setOgdasrep] = useState([]);
	const [pikodsrep, setPikodsrep] = useState([]);

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

	//* manmarit
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

	//* rep

	const loadPikodsrep = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				// setPikods(response.data);
				setPikodsrep(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadOgdasrep = async (pikodids) => {
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
		// setOgdas(temppikodsogdas);
		setOgdasrep(temppikodsogdas);
	};

	const loadHativasrep = async (ogdaids) => {
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
		// setHativas(tempogdashativas);
		setHativasrep(tempogdashativas);
	};

	const loadGdodsrep = async (hativaids) => {
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
		// setGdods(temphativasgdods);
		setGdodsrep(temphativasgdods);
	};

	//* handle changes
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
		match.ToggleForModal();
	};

	const init = () => {
		// console.log(match);
		var reportid = match.cardataid;
		axios
			.get(`http://localhost:8000/report/${reportid}`)
			.then((response) => {
				let tempcardata = response.data[0];
				setData(tempcardata);
				setCartypesfilterarray(tempcardata.arraymkabaz);
				setinfohurtarray(tempcardata.hurtarray);
			})
			.catch((error) => {
				console.log(error);
			});
		loadPikods();
		loadPikodsrep();
		getMagadals();
	};

	useEffect(() => {
		if (match.isOpen == true) init();
	}, [match.isOpen]);

	// * ------ manmarit --------------------------------
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
	//* ------ rep ----------------------------------------------------------------
	useEffect(() => {
		setOgdasrep([]);
		loadOgdasrep(data.pikodrep);
	}, [data.pikodrep]);

	useEffect(() => {
		setHativasrep([]);
		loadHativasrep(data.ogdarep);
	}, [data.ogdarep]);

	useEffect(() => {
		setGdodsrep([]);
		loadGdodsrep(data.hativarep);
	}, [data.hativarep]);
	//* ------ magdal .... --------------------------------
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

	useEffect(() => {
		setCartypesfilterarray([]);
		setinfohurtarray([]);
	}, []);

	// todo: add a way to get the mkbatz

	return (
		<Modal
			style={{
				minHeight: "100%",
				maxHeight: "100%",
				minWidth: "80%",
				maxWidth: "80%",
				justifyContent: "center",
				alignSelf: "center",
			}}
			isOpen={match.isOpen}
			centered
			fullscreen
			scrollable
			size=""
			toggle={match.Toggle}
		>
			<ModalBody>
				<Card>
					<CardHeader style={{ direction: "rtl" }}>
						<CardTitle
							tag="h4"
							style={{
								direction: "rtl",
								textAlign: "center",
								fontWeight: "bold",
							}}
						>
							?????????? ????????????{" "}
						</CardTitle>
						{/*headline*/}
					</CardHeader>
					<CardBody style={{ direction: "rtl" }}>
						<div>
							<Container className="mt--8 pb-5">
								<Row className="justify-content-center">
									<Card className="shadow border-0">
										{data.typevent != "??????" ? (
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
															disabled
														/>
													</FormGroup>

													<FormGroup dir="rtl">
														<Input
															placeholder="???? ??????????"
															name="lastname"
															type="text"
															value={data.lastname}
															onChange={handleChange}
															disabled
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
															disabled
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
															disabled
														/>
													</FormGroup>

													<div className="text-center text-muted mb-4">
														<small>???????? ?????????? ????????????</small>
													</div>

													<Row style={{ paddingTop: "2px" }}>
														{!data.ogdarep ? (
															<Col
																style={{
																	justifyContent: "right",
																	alignContent: "right",
																	textAlign: "right",
																}}
															>
																<h6>??????????</h6>
																<Select
																	data={pikodsrep}
																	handleChange2={handleChange2}
																	name={"pikodrep"}
																	val={
																		data.pikodrep ? data.pikodrep : undefined
																	}
																	isDisabled={true}
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
																	data={pikodsrep}
																	handleChange2={handleChange2}
																	name={"pikodrep"}
																	val={
																		data.pikodrep ? data.pikodrep : undefined
																	}
																	isDisabled={true}
																/>
															</Col>
														)}

														<>
															{data.pikodrep && !data.hativarep ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>??????????</h6>
																	<Select
																		data={ogdasrep}
																		handleChange2={handleChange2}
																		name={"ogdarep"}
																		val={
																			data.ogdarep ? data.ogdarep : undefined
																		}
																		isDisabled={true}
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
																		data={ogdasrep}
																		handleChange2={handleChange2}
																		name={"ogdarep"}
																		val={
																			data.ogdarep ? data.ogdarep : undefined
																		}
																		isDisabled={true}
																	/>
																</Col>
															)}
														</>

														<>
															{data.ogdarep && !data.gdodrep ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>??????????</h6>
																	<Select
																		data={hativasrep}
																		handleChange2={handleChange2}
																		name={"hativarep"}
																		val={
																			data.hativarep
																				? data.hativarep
																				: undefined
																		}
																		isDisabled={true}
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
																		data={hativasrep}
																		handleChange2={handleChange2}
																		name={"hativarep"}
																		val={
																			data.hativarep
																				? data.hativarep
																				: undefined
																		}
																		isDisabled={true}
																	/>
																</Col>
															)}
														</>

														<>
															{data.hativarep ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>????????</h6>
																	<Select
																		data={gdodsrep}
																		handleChange2={handleChange2}
																		name={"gdodrep"}
																		val={
																			data.gdodrep ? data.gdodrep : undefined
																		}
																		isDisabled={true}
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
																		data={gdodsrep}
																		handleChange2={handleChange2}
																		name={"gdodrep"}
																		val={
																			data.gdodrep ? data.gdodrep : undefined
																		}
																		isDisabled={true}
																	/>
																</Col>
															)}
														</>
													</Row>
													{/* //* ----------------------------------------- manmarit ---------------------------------------------- */}

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
																	isDisabled={true}
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
																		isDisabled={true}
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
																		isDisabled={true}
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
																		isDisabled={true}
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

													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
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
															disabled
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
															<option value={"10"}>
																?????? ?????????????? ?????????? / ????"??
															</option>
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
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																???????? ????????????
															</div>
															<FormGroup>
																<Input
																	type="select"
																	name="resevent"
																	value={data.resevent}
																	onChange={handleChange}
																	id="res"
																	disabled
																>
																	<option value={"0"}>??????</option>
																	<option value={"1"}>??????????</option>
																	<option value={"2"}>?????? ????????</option>
																	<option value={"3"}>???????? ????????</option>
																	<option value={"4"}>???? ????????</option>
																</Input>
															</FormGroup>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ????????
															</div>

															{cartypesfilterarray.map(
																(cartypesfilterobject, index) => {
																	return (
																		<CarTypesFilterObject
																			cartypesfilterobject={
																				cartypesfilterobject
																			}
																			index={index}
																			setCartypesfilterarray={
																				setCartypesfilterarray
																			}
																		/>
																	);
																}
															)}

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ???????? ?????? ????????
															</div>
															<div style={{ textAlign: "right" }}>
																<FormGroup
																	check
																	inline
																>
																	<div
																		style={{
																			textAlign: "right",
																			paddingTop: "10px",
																		}}
																	>
																		<Input
																			checked={data.yn == true}
																			type="radio"
																			name="yn"
																			value={true}
																			onChange={handleChange}
																			id="YES"
																			disabled
																		/>
																		????
																	</div>
																</FormGroup>

																<FormGroup
																	check
																	inline
																>
																	<div
																		style={{
																			textAlign: "right",
																			paddingTop: "10px",
																		}}
																	>
																		<Input
																			checked={data.yn == false}
																			type="radio"
																			id="NO"
																			name="yn"
																			value={false}
																			onChange={handleChange}
																			disabled
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
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ????????/ ????????????
															</div>
															<FormGroup>
																<Input
																	type="text"
																	name="selneshek"
																	value={data.selneshek}
																	onChange={handleChange}
																	id="selneshek"
																	disabled
																></Input>
															</FormGroup>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ???????? ?????? ????????
															</div>

															<div style={{ textAlign: "right" }}>
																<FormGroup
																	check
																	inline
																>
																	<div
																		style={{
																			textAlign: "right",
																			paddingTop: "10px",
																		}}
																	>
																		<Input
																			checked={data.yn == true}
																			type="radio"
																			name="yn"
																			value={true}
																			onChange={handleChange}
																			id="YES"
																			disabled
																		/>
																		????
																	</div>
																</FormGroup>

																<FormGroup
																	check
																	inline
																>
																	<div
																		style={{
																			textAlign: "right",
																			paddingTop: "10px",
																		}}
																	>
																		<Input
																			checked={data.yn == false}
																			type="radio"
																			id="NO"
																			name="yn"
																			value={false}
																			onChange={handleChange}
																			disabled
																		/>
																		????
																	</div>
																</FormGroup>
															</div>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																???? ?????????? ????????????
															</div>
															<FormGroup>
																<Input
																	type="select"
																	name="whap"
																	value={data.whap}
																	onChange={handleChange}
																	id="what"
																	disabled
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
																*?????????? ?????????? - ???? ?????????? ???? ???????? ?????? ???????? (????????
																???????? ?????? ??????????)
															</p>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ????????
															</div>
															<FormGroup>
																<Input
																	type="select"
																	name="wnifga"
																	value={data.wnifga}
																	onChange={handleChange}
																	id="when"
																	disabled
																>
																	<option value={"0"}>??????</option>
																	<option value={"1"}>
																		?????????? ???????????? ??????????????
																	</option>
																	<option value={"2"}>
																		?????????? ???????????? ????????????
																	</option>
																	<option value={"3"}>??????????</option>
																	<option value={"4"}>???????????? ????????????</option>
																	<option value={"5"}>??????</option>
																</Input>
															</FormGroup>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ????????
															</div>
															<FormGroup>
																<Input
																	type="text"
																	name="amlahtype"
																	value={data.amlahtype}
																	onChange={handleChange}
																	id="amlah"
																	disabled
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
																			val={
																				data.magadal ? data.magadal : undefined
																			}
																			isDisabled={true}
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
																			val={
																				data.magadal ? data.magadal : undefined
																			}
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
																			isDisabled={true}
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
																			val={
																				data.mkabaz ? data.mkabaz : undefined
																			}
																			isDisabled={true}
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
																			val={
																				data.mkabaz ? data.mkabaz : undefined
																			}
																			isDisabled={true}
																		/>
																	</Col>
																)}
															</Row>
															<div className="mt-3">
																<FormGroup
																	className="mb-3"
																	dir="rtl"
																>
																	<Input
																		placeholder="??'"
																		name="zadik"
																		type="string"
																		value={data.zadik}
																		onChange={handleChange}
																		disabled
																	/>
																</FormGroup>
															</div>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ????????
															</div>
															<FormGroup>
																{/* {console.log(mkabazsMataf)} */}
																{/* {console.log(mkabazsMataf[indexM])}
												{console.log(mkabazsMataf[indexM].matafEngine)}
												{console.log(mkabazsMataf[indexM].matafCre)} */}

																{mkabazsMataf[indexM] ==
																undefined ? null : mkabazsMataf[indexM]
																		.matafEngine &&
																  mkabazsMataf[indexM].matafCre ? (
																	<Input
																		type="select"
																		name="mataftype"
																		value={data.mataftype}
																		onChange={handleChange}
																		id="mataf"
																		disabled
																	>
																		<option value={"0"}>??????</option>
																		<option value={"1"}>???? ????????</option>
																		<option value={"2"}>???? ????????</option>
																		<option value={"3"}>
																			???? ???????? ?????? ????????
																		</option>
																	</Input>
																) : mkabazsMataf[indexM].matafEngine ? (
																	<Input
																		type="select"
																		name="mataftype"
																		value={data.mataftype}
																		onChange={handleChange}
																		id="mataf"
																		disabled
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
																		disabled
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
																		disabled
																	>
																		<option value={"0"}>??????</option>
																		<option value={""}>???? ?????????? ???????? </option>
																	</Input>
																)}
															</FormGroup>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ??????"?? ?????????? ????????????
															</div>
															<FormGroup>
																<Input
																	type="select"
																	name="mazavrekem"
																	value={data.mazavrekem}
																	onChange={handleChange}
																	id="mazav"
																	disabled
																>
																	<option value={"0"}>??????</option>
																	<option value={"1"}>????????</option>
																	<option value={"2"}>????????????</option>
																</Input>
															</FormGroup>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????? ???????? ?????????? ??????????
															</div>
															<FormGroup>
																<Input
																	type="select"
																	name="dwork"
																	value={data.dwork}
																	onChange={handleChange}
																	id="dwork"
																	disabled
																>
																	<option value={"0"}>??????</option>
																	<option value={"1"}>?????????????? ????"??</option>
																	<option value={"2"}>??????????</option>
																</Input>
															</FormGroup>

															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																?????????? ?????????? / ??????????
															</div>

															<div style={{ textAlign: "right" }}>
																<FormGroup
																	check
																	inline
																>
																	<div
																		style={{
																			textAlign: "right",
																			paddingTop: "10px",
																		}}
																	>
																		<Input
																			checked={data.yn == true}
																			type="radio"
																			name="yn"
																			value={true}
																			onChange={handleChange}
																			id="YES"
																			disabled
																		/>
																		????
																	</div>
																</FormGroup>

																<FormGroup
																	check
																	inline
																>
																	<div
																		style={{
																			textAlign: "right",
																			paddingTop: "10px",
																		}}
																	>
																		<Input
																			checked={data.yn == false}
																			type="radio"
																			id="NO"
																			name="yn"
																			value={false}
																			onChange={handleChange}
																			disabled
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
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
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
																			val={
																				data.magadal ? data.magadal : undefined
																			}
																			isDisabled={true}
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
																			val={
																				data.magadal ? data.magadal : undefined
																			}
																			disabled
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
																			isDisabled={true}
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
																			val={
																				data.mkabaz ? data.mkabaz : undefined
																			}
																			isDisabled={true}
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
																			val={
																				data.mkabaz ? data.mkabaz : undefined
																			}
																			isDisabled={true}
																		/>
																	</Col>
																)}
															</Row>
															<div className="mt-3">
																<FormGroup
																	className="mb-3"
																	dir="rtl"
																>
																	<Input
																		placeholder="??'"
																		name="zadik"
																		type="string"
																		value={data.zadik}
																		onChange={handleChange}
																		disabled
																	/>
																</FormGroup>
															</div>

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

													<FormGroup dir="rtl">
														<Input
															placeholder="?????????? ????????????"
															name="pirot"
															type="textarea"
															value={data.pirot}
															onChange={handleChange}
															disabled
														/>
													</FormGroup>

													<FormGroup dir="rtl">
														<Input
															placeholder="?????????? ??????????????"
															name="lessons"
															type="textarea"
															value={data.lessons}
															onChange={handleChange}
															disabled
														/>
													</FormGroup>

													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														?????????? ??????????
													</div>
													<FormGroup dir="rtl">
														<Input
															placeholder="?????????? ??????????"
															name="datevent"
															type="datetime-local"
															value={data.datevent.slice(0, 21)}
															onChange={handleChange}
															disabled
														/>
													</FormGroup>

													<FormGroup dir="rtl">
														<Input
															placeholder="?????????? ????????????"
															name="mikom"
															type="string"
															value={data.mikom}
															onChange={handleChange}
															disabled
														/>
													</FormGroup>

													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														?????? ???? ????????????
													</div>
													<div
														className="mb-2"
														style={{ textAlign: "right" }}
													>
														<FormGroup
															check
															inline
														>
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																<Input
																	checked={data.nifga == 1}
																	// placeholder="?????? ???????????? "
																	name="nifga"
																	type="radio"
																	value="1"
																	onChange={handleChange}
																	disabled
																/>
																????
															</div>
														</FormGroup>

														<FormGroup
															check
															inline
														>
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																<Input
																	checked={data.nifga == 0}
																	// placeholder="???????? ????????????"
																	name="nifga"
																	type="radio"
																	value="0"
																	onChange={handleChange}
																	disabled
																/>
																?????? ????????????
															</div>
														</FormGroup>

														<FormGroup
															check
															inline
														>
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																<Input
																	checked={data.nifga == 2}
																	// placeholder="?????? ???????????? "
																	name="nifga"
																	type="radio"
																	value="2"
																	onChange={handleChange}
																	disabled
																/>
																???? ????????
															</div>
														</FormGroup>
													</div>
												</Form>
												{data.nifga == 1 ? (
												infohurtarray.map((p, index) => {
																	return (
																		<div>
																			{
																				<Row>
																					<Col
																						xs={12}
																						md={4}
																					>
																						<div>
																							<p
																								style={{
																									margin: "0px",
																									float: "right",
																								}}
																							>
																								???????? ????????????
																							</p>
																							<Input
																								onChange={(e) => {
																									const dargahurt =
																										e.target.value;
																									if (e.target.value != "??????")
																										setinfohurtarray(
																											(currentSpec) =>
																												produce(
																													currentSpec,
																													(v) => {
																														v[index].dargahurt =
																															dargahurt;
																													}
																												)
																										);
																								}}
																								value={p.dargahurt}
																								type="select"
																								placeholder="???????? ????????????"
																								disabled
																							>
																								<option value={"??????"}>
																									{"??????"}
																								</option>
																								<option value={"????"}>
																									{"????"}
																								</option>
																								<option value={"????????????"}>
																									{"????????????"}
																								</option>
																								<option value={"??????"}>
																									{"??????"}
																								</option>
																								<option value={"????"}>
																									{"????"}
																								</option>
																								<option value={"???? ????????"}>
																									{"???? ????????"}
																								</option>
																							</Input>
																						</div>
																					</Col>
																					<Col
																						xs={12}
																						md={4}
																					>
																						<div>
																							<p
																								style={{
																									margin: "0px",
																									float: "right",
																								}}
																							>
																								???????? ?????? ????????
																							</p>
																							<Input
																								onChange={(e) => {
																									const mikomhurt =
																										e.target.value;
																									if (e.target.value != "")
																										setinfohurtarray(
																											(currentSpec) =>
																												produce(
																													currentSpec,
																													(v) => {
																														v[index].mikomhurt =
																															mikomhurt;
																													}
																												)
																										);
																								}}
																								value={p.mikomhurt}
																								type="number"
																								placeholder="0"
																								min="0"
																								disabled
																							/>
																						</div>
																					</Col>
																				</Row>
																			}
																		</div>
																	);
												})
												) : null}
											</CardBody>
										) : (
											<CardBody className="px-lg-5 py-lg-5">
												<div className="text-center text-muted mb-4">
													<big>?????????? ????????????</big>
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
															disabled
														/>
													</FormGroup>

													<FormGroup dir="rtl">
														<Input
															placeholder="???? ??????????"
															name="lastname"
															type="text"
															value={data.lastname}
															onChange={handleChange}
															disabled
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
															disabled
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
															disabled
														/>
													</FormGroup>

													<div className="text-center text-muted mb-4">
														<small>???????? ?????????? ????????????</small>
													</div>

													<Row style={{ paddingTop: "2px" }}>
														{!data.ogdarep ? (
															<Col
																style={{
																	justifyContent: "right",
																	alignContent: "right",
																	textAlign: "right",
																}}
															>
																<h6>??????????</h6>
																<Select
																	data={pikodsrep}
																	handleChange2={handleChange2}
																	name={"pikodrep"}
																	val={
																		data.pikodrep ? data.pikodrep : undefined
																	}
																	isDisabled={true}
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
																	data={pikodsrep}
																	handleChange2={handleChange2}
																	name={"pikodrep"}
																	val={
																		data.pikodrep ? data.pikodrep : undefined
																	}
																	isDisabled={true}
																/>
															</Col>
														)}

														<>
															{data.pikodrep && !data.hativarep ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>??????????</h6>
																	<Select
																		data={ogdasrep}
																		handleChange2={handleChange2}
																		name={"ogdarep"}
																		val={
																			data.ogdarep ? data.ogdarep : undefined
																		}
																		isDisabled={true}
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
																		data={ogdasrep}
																		handleChange2={handleChange2}
																		name={"ogdarep"}
																		val={
																			data.ogdarep ? data.ogdarep : undefined
																		}
																		isDisabled={true}
																	/>
																</Col>
															)}
														</>

														<>
															{data.ogdarep && !data.gdodrep ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>??????????</h6>
																	<Select
																		data={hativasrep}
																		handleChange2={handleChange2}
																		name={"hativarep"}
																		val={
																			data.hativarep
																				? data.hativarep
																				: undefined
																		}
																		isDisabled={true}
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
																		data={hativasrep}
																		handleChange2={handleChange2}
																		name={"hativarep"}
																		val={
																			data.hativarep
																				? data.hativarep
																				: undefined
																		}
																		isDisabled={true}
																	/>
																</Col>
															)}
														</>

														<>
															{data.hativarep ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>????????</h6>
																	<Select
																		data={gdodsrep}
																		handleChange2={handleChange2}
																		name={"gdodrep"}
																		val={
																			data.gdodrep ? data.gdodrep : undefined
																		}
																		isDisabled={true}
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
																		data={gdodsrep}
																		handleChange2={handleChange2}
																		name={"gdodrep"}
																		val={
																			data.gdodrep ? data.gdodrep : undefined
																		}
																		isDisabled={true}
																	/>
																</Col>
															)}
														</>
													</Row>
													{/* //* ----------------------------------------- manmarit ---------------------------------------------- */}

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
																	isDisabled={true}
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
																		isDisabled={true}
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
																		isDisabled={true}
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
																		isDisabled={true}
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

													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														???????? ????????????
													</div>
													<FormGroup>
														<Input
															type="select"
															name="resevent"
															value={data.resevent}
															onChange={handleChange}
															id="res"
															disabled
														>
															<option value={"0"}>??????</option>
															<option value={"1"}>??????????</option>
															<option value={"2"}>?????? ????????</option>
															<option value={"3"}>???????? ????????</option>
															<option value={"4"}>???? ????????</option>
														</Input>
													</FormGroup>

													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														?????? ??????"??
													</div>
													{cartypesfilterarray.map(
														(cartypesfilterobject, index) => {
															return (
																<CarTypesFilterObject
																	cartypesfilterobject={cartypesfilterobject}
																	index={index}
																	setCartypesfilterarray={
																		setCartypesfilterarray
																	}
																/>
															);
														}
													)}

													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														?????? ???????? ?????? ??????"??
													</div>

													<div style={{ textAlign: "right" }}>
														<FormGroup
															check
															inline
														>
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																<Input
																	checked={data.yn == true}
																	type="radio"
																	name="yn"
																	value={true}
																	onChange={handleChange}
																	id="YES"
																	disabled
																/>
																????
															</div>
														</FormGroup>

														<FormGroup
															check
															inline
														>
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																<Input
																	checked={data.yn == false}
																	type="radio"
																	id="NO"
																	name="yn"
																	value={false}
																	onChange={handleChange}
																	disabled
																/>
																????
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
															disabled
														/>
													</FormGroup>

													<FormGroup dir="rtl">
														<Input
															placeholder="?????????? ??????????????"
															name="lessons"
															type="textarea"
															value={data.lessons}
															onChange={handleChange}
															disabled
														/>
													</FormGroup>

													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														?????????? ??????????
													</div>
													<FormGroup dir="rtl">
														<Input
															placeholder="?????????? ??????????"
															name="datevent"
															type="datetime-local"
															value={data.datevent.slice(0, 21)}
															onChange={handleChange}
															disabled
														/>
													</FormGroup>

													<FormGroup dir="rtl">
														<Input
															placeholder="?????????? ????????????"
															name="mikom"
															type="string"
															value={data.mikom}
															onChange={handleChange}
															disabled
														/>
													</FormGroup>

													<div
														style={{ textAlign: "right", paddingTop: "10px" }}
													>
														?????? ???? ????????????
													</div>
													<div
														className="mb-2"
														style={{ textAlign: "right" }}
													>
														<FormGroup
															check
															inline
														>
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																<Input
																	checked={data.nifga == 1}
																	// placeholder="?????? ???????????? "
																	name="nifga"
																	type="radio"
																	value="1"
																	onChange={handleChange}
																	disabled
																/>
																????
															</div>
														</FormGroup>

														<FormGroup
															check
															inline
														>
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																<Input
																	checked={data.nifga == 0}
																	// placeholder="???????? ????????????"
																	name="nifga"
																	type="radio"
																	value="0"
																	onChange={handleChange}
																	disabled
																/>
																?????? ????????????
															</div>
														</FormGroup>

														<FormGroup
															check
															inline
														>
															<div
																style={{
																	textAlign: "right",
																	paddingTop: "10px",
																}}
															>
																<Input
																	checked={data.nifga == 2}
																	// placeholder="?????? ???????????? "
																	name="nifga"
																	type="radio"
																	value="2"
																	onChange={handleChange}
																	disabled
																/>
																???? ????????
															</div>
														</FormGroup>
													</div>
												</Form>

												{data.nifga == 1 ? (
												infohurtarray.map((p, index) => {
																	return (
																		<div>
																			{
																				<Row>
																					<Col
																						xs={12}
																						md={4}
																					>
																						<div>
																							<p
																								style={{
																									margin: "0px",
																									float: "right",
																								}}
																							>
																								???????? ????????????
																							</p>
																							<Input
																								onChange={(e) => {
																									const dargahurt =
																										e.target.value;
																									if (e.target.value != "??????")
																										setinfohurtarray(
																											(currentSpec) =>
																												produce(
																													currentSpec,
																													(v) => {
																														v[index].dargahurt =
																															dargahurt;
																													}
																												)
																										);
																								}}
																								value={p.dargahurt}
																								type="select"
																								placeholder="???????? ????????????"
																								disabled
																							>
																								<option value={"??????"}>
																									{"??????"}
																								</option>
																								<option value={"????"}>
																									{"????"}
																								</option>
																								<option value={"????????????"}>
																									{"????????????"}
																								</option>
																								<option value={"??????"}>
																									{"??????"}
																								</option>
																								<option value={"????"}>
																									{"????"}
																								</option>
																								<option value={"???? ????????"}>
																									{"???? ????????"}
																								</option>
																							</Input>
																						</div>
																					</Col>
																					<Col
																						xs={12}
																						md={4}
																					>
																						<div>
																							<p
																								style={{
																									margin: "0px",
																									float: "right",
																								}}
																							>
																								???????? ?????? ????????
																							</p>
																							<Input
																								onChange={(e) => {
																									const mikomhurt =
																										e.target.value;
																									if (e.target.value != "")
																										setinfohurtarray(
																											(currentSpec) =>
																												produce(
																													currentSpec,
																													(v) => {
																														v[index].mikomhurt =
																															mikomhurt;
																													}
																												)
																										);
																								}}
																								value={p.mikomhurt}
																								type="number"
																								placeholder="0"
																								min="0"
																								disabled
																							/>
																						</div>
																					</Col>
																				</Row>
																			}
																		</div>
																	);
												})
												) : null}
											</CardBody>
										)}

										<div className="text-center">
											<button
												onClick={clickSubmit}
												className="btn-new-blue mb-3"
											>
												????
											</button>
										</div>
									</Card>
								</Row>
							</Container>
						</div>
					</CardBody>
				</Card>
			</ModalBody>
		</Modal>
	);
};
export default withRouter(CarDataFormModalView);
