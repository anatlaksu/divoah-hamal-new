/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
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
	Collapse,
} from "reactstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNSSUM } from "./ColumnsSum";
import { GlobalFilter } from "./GlobalFilter";
import CarDataFormModal from "views/divoah/CarDataFormModal";
import CarDataFormModalHatal from "views/divoah/Hatal/CarDataFormModalHatal";
import CarDataFormModalView from "views/divoah/CarDataFormModalView";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { isAuthenticated } from "auth";
import history from "history.js";
import { toast } from "react-toastify";

const SortingTableRekem = ({ match }) => {
	const columns = useMemo(() => COLUMNSSUM, []);
	const { user } = isAuthenticated();
	const [data, setData] = useState([]);
	const [isError, setIsError] = useState(false);
	//* the difference between the date the report was created and the date the incident happened
	const [diff, setDiff] = useState([]);
	//* check if the report was created for more than 30 days
	const [expired, setExpired] = useState([]);
	//*cardata form modal
	const [iscardataformopen, setIscardataformopen] = useState(false);
	const [cardataidformodal, setCardataidformodal] = useState(undefined);
	//* view modal
	const [isviewmodalopen, setisviewmodalopen] = useState(false);
	const [viewmodalid, setViewmodalid] = useState(undefined);

	const [date, setDate] = useState([]);

	const [collapseOpen, setcollapseOpen] = React.useState(false);
	const toggleCollapse = () => {
		setcollapseOpen(!collapseOpen);
	};

	const [gdodsrep, setGdodsrep] = useState([]);
	const [hativasrep, setHativasrep] = useState([]);
	const [ogdasrep, setOgdasrep] = useState([]);
	const [pikodsrep, setPikodsrep] = useState([]);

	const loadpikodsrep = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				setPikodsrep(response.data);
				console.log(response.data);
				// setPikodsrep(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadogdasrep = async () => {
		await axios
			.get("http://localhost:8000/api/ogda")
			.then((response) => {
				setOgdasrep(response.data);
				console.log(response.data);
				// setPikodsrep(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadhativasrep = async () => {
		await axios
			.get("http://localhost:8000/api/hativa")
			.then((response) => {
				setHativasrep(response.data);
				console.log(response.data);
				// setPikodsrep(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadgdodsrep = async () => {
		await axios
			.get("http://localhost:8000/api/gdod")
			.then((response) => {
				setGdodsrep(response.data);
				console.log(response.data);
				// setPikodsrep(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// ! alternative is to enter the timestamp to the database and then call it like we do with the other columns
	// * ------ geting only on loading the difference btween the dates --------------------------------

	useEffect(() => {
		console.log(user.personalnumber);
		if (user.role == "0") {
			history.push(`/historeport`);
		}
		// console.log(data.length);
		// * ------ making the dates subtractable --------------------------------
		//* created at:
		const creatArray = data.map((item, index) => {
			return new Date(data[index].createdAt);
		});
		//* the date the incident happened:
		const dateArray = data.map((item, index) => {
			return new Date(data[index].datevent);
		});
		//* today:
		const today = new Date();

		// * ---------- makeing sure that there are not any problems --------------------------------
		try {
			setDiff(
				creatArray.map((item, index) => {
					//* ~~ == Math.floor
					return ~~(
						(creatArray[index].getTime() - dateArray[index].getTime()) /
						86400000
					);
				})
			);
			// console.log(diff);
			// todo: maybe to reload the page if error
		} catch (error) {
			console.log(error);
		}
		try {
			setExpired(
				creatArray.map((item, index) => {
					let sum = ~~(
						(today.getTime() - creatArray[index].getTime()) /
						86400000
					);
					// console.log(`today is ${today}`);
					// console.log(creatArray[index]);
					// console.log(`${sum > 30} at ${index}`);
					return sum > 30;
				})
			);
		} catch (error) {
			console.log(error);
		}
		// console.log(expired);
	}, [data]);

	function handleChange(evt) {
		const value = evt.target.value;
		console.log(evt.target.value);
		console.log(evt.target.name);
		setDate({ ...date, [evt.target.name]: value });
		console.log(new Date(date.fromdate).setHours(0, 0, 0, 0));
		console.log(date.todate);
	}

	function getname(idnum, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]._id == idnum) return arr[i].name;
		}
	}

	//* ------------ modal --------------------------------

	function Toggle(evt) {
		let index = +evt.currentTarget.id;
		// console.log(index);
		// console.log(expired[index]);
		if (!evt.currentTarget.value == "") {
			if (expired[index] == true) {
				if (user.role == "2" || user.role == "3") {
					if (evt.currentTarget.value == "") {
						setCardataidformodal(undefined);
					} else {
						setCardataidformodal(evt.currentTarget.value);
					}
					setIscardataformopen(!iscardataformopen);
				} else {
					toast.error("עברו שלושים ימים מאז שהדוח הוזן לא ניתן לערוך אותו");
				}
			} else {
				if (evt.currentTarget.value == "") {
					setCardataidformodal(undefined);
				} else {
					setCardataidformodal(evt.currentTarget.value);
				}
				setIscardataformopen(!iscardataformopen);
			}
		} else {
			if (evt.currentTarget.value == "") {
				setCardataidformodal(undefined);
			} else {
				setCardataidformodal(evt.currentTarget.value);
			}
			setIscardataformopen(!iscardataformopen);
			// console.log(cardataidformodal);
		}
	}

	function ToggleForModal(evt) {
		setIscardataformopen(!iscardataformopen);
		window.location.reload();
	}

	//* ------------ modal view --------------------------------

	function ToggleView(evt) {
		if (evt.currentTarget.value == "") {
			setViewmodalid(undefined);
		} else {
			setViewmodalid(evt.currentTarget.value);
		}
		setisviewmodalopen(!isviewmodalopen);
		// console.log(cardataidformodal);
	}

	function ToggleForModalView(evt) {
		setisviewmodalopen(!isviewmodalopen);
		window.location.reload();
	}

	// ? -------------- idk if needs to be in admin route -----------------------
	//units

	// const UserDelete = (UserId) => {
	// 	axios
	// 		.post(`http://localhost:8000/api/user/remove/${UserId}`)
	// 		.then((response) => {
	// 			loadUsers();
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	// const loadUsers = () => {
	// 	axios
	// 		.get("http://localhost:8000/api/usersvalidated")
	// 		.then((response) => {
	// 			setData(response.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	// ? ------------------- was commented out ---------------------------------
	// useEffect(() => {
	//   (async () => {
	//     console.log("================================================");
	//     console.log(user.personalnumber);
	//     const result = await axios.get(
	//       `http://localhost:8000/report/requestByPersonalnumber/${user.personalnumber}`
	//     );
	//     console.log(result);
	//     setData(result.data);
	//   })();
	// }, []);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/report/rekem`)
			.then((response) => {
				const reports = response.data;
				reports.reverse();
				// console.log(reports);
				setData(reports);
			})
			.catch((error) => {
				console.log(error);
				setIsError(true);
			});
	}, []);

	useEffect(() => {
		loadgdodsrep();
		loadhativasrep();
		loadogdasrep();
		loadpikodsrep();
	}, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,

		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, globalFilter },
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},

		useGlobalFilter,
		useFilters,
		useSortBy,
		usePagination
	);

	return (
		<>
			<Row>
				<div style={{ width: "100%", margin: "auto", textAlign: "right" }}>
					<Button
						onClick={toggleCollapse}
						style={{}}
					>
						סינון
					</Button>
					<Collapse isOpen={collapseOpen}>
						<Card style={{ background: "rgb(255, 255, 255)" }}>
							<Row style={{ margin: "0px" }}>
								<Col
									xs={12}
									md={8}
									style={{ textAlign: "right" }}
								>
									<Row>
										<Col
											xs={12}
											md={6}
										>
											<div style={{ textAlign: "right" }}>מתאריך</div>
											<Input
												placeholder="תאריך התחלה"
												type="date"
												name="fromdate"
												value={date.fromdate}
												onChange={handleChange}
											/>
										</Col>
										<Col
											xs={12}
											md={6}
										>
											<div style={{ textAlign: "right" }}>עד תאריך</div>
											<Input
												placeholder="תאריך סיום"
												type="date"
												name="todate"
												value={date.todate}
												onChange={handleChange}
											/>
										</Col>
									</Row>
								</Col>
							</Row>
							{/* {user.role === "2" ? (
								<Row style={{ margin: "0px" }}>
									<Col
										xs={12}
										md={8}
										style={{ textAlign: "right" }}
									>
										<Row style={{ paddingTop: "10px", marginBottom: "15px" }}>
											{!data.ogda ? (
												<Col
													style={{
														justifyContent: "right",
														alignContent: "right",
														textAlign: "right",
													}}
												>
													<h6>פיקוד</h6>
													<Select
														closeMenuOnSelect={false}
														components={animatedComponents}
														isMulti
														options={pikodsop}
														// data={pikods}
														onChange={handleChange8}
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
													<h6>פיקוד</h6>
													<Select
														closeMenuOnSelect={false}
														components={animatedComponents}
														isMulti
														options={pikodsop}
														handleChange2={handleChange8}
														name={"pikod"}
														val={data.pikod ? data.pikod : undefined}
														isDisabled={true}
														// isDisabled={
														// 	!data.ogda
														// 		? true
														// 		: data.ogda.length < 1
														// 		? false
														// 		: true
														// }
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
														<h6>אוגדה</h6>
														<Select
															closeMenuOnSelect={false}
															components={animatedComponents}
															isMulti
															options={ogdasop}
															onChange={handleChange8}
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
														<h6>אוגדה</h6>
														<Select
															components={animatedComponents}
															isMulti
															options={ogdasop}
															onChange={handleChange8}
															name={"ogda"}
															val={data.ogda ? data.ogda : undefined}
															isDisabled={true}
															// isDisabled={
															// 	!data.hativa
															// 		? true
															// 		: data.hativa.length < 1
															// 		? false
															// 		: true
															// }
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
														<h6>חטיבה</h6>
														<Select
															components={animatedComponents}
															isMulti
															options={hativasop}
															onChange={handleChange8}
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
														<h6>חטיבה</h6>
														<Select
															components={animatedComponents}
															isMulti
															options={hativasop}
															onChange={handleChange8}
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
													<h6>גדוד</h6>
													<Select
															components={animatedComponents}
															isMulti
															options={gdodsop}
															onChange={handleChange8}
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
													<h6>גדוד</h6>
													<Select
															components={animatedComponents}
															isMulti
															options={gdodsop}
															onChange={handleChange8}
															name={"gdod"}
															val={data.gdod ? data.gdod : undefined}
															isDisabled={true}
													/>
												</Col>
											)}
										</>
										</Row>
									</Col>
								</Row>
								):(
									<Row style={{ margin: "0px" }}>
									<Col
										xs={12}
										md={8}
										style={{ textAlign: "right" }}
									>
										<Row style={{ paddingTop: "10px", marginBottom: "15px" }}>
										{!data.hativa ? (
											<Col
												style={{
													justifyContent: "right",
													alignContent: "right",
													textAlign: "right",
												}}
											>
												<h6>אוגדה</h6>
												<Select
													closeMenuOnSelect={false}
													components={animatedComponents}
													isMulti
													options={ogdasop}
													onChange={handleChange8}
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
												<h6>אוגדה</h6>
												<Select
													components={animatedComponents}
													isMulti
													options={ogdasop}
													onChange={handleChange8}
													name={"ogda"}
													val={data.ogda ? data.ogda : undefined}
													isDisabled={true}
													// isDisabled={
													// 	!data.hativa
													// 		? true
													// 		: data.hativa.length < 1
													// 		? false
													// 		: true
													// }
												/>
											</Col>
										)}
									<>
										{data.ogda && !data.gdod ? (
											<Col
												style={{
													justifyContent: "right",
													alignContent: "right",
													textAlign: "right",
												}}
											>
												<h6>חטיבה</h6>
												<Select
													components={animatedComponents}
													isMulti
													options={hativasop}
													onChange={handleChange8}
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
												<h6>חטיבה</h6>
												<Select
													components={animatedComponents}
													isMulti
													options={hativasop}
													onChange={handleChange8}
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
													<h6>גדוד</h6>
													<Select
															components={animatedComponents}
															isMulti
															options={gdodsop}
															onChange={handleChange8}
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
													<h6>גדוד</h6>
													<Select
															components={animatedComponents}
															isMulti
															options={gdodsop}
															onChange={handleChange8}
															name={"gdod"}
															val={data.gdod ? data.gdod : undefined}
															isDisabled={true}
													/>
												</Col>
											)}
										</>
										</Row>
									</Col>
								</Row>
								)} */}
						</Card>
					</Collapse>
				</div>
			</Row>

			<div style={{ float: "right", paddingBottom: "5px" }}>
				<ReactHTMLTableToExcel
					id="test-table-xls-button"
					className="btn-green"
					table="table-to-xls"
					filename="קובץ - סיכום דיווחים"
					sheet="קובץ - סיכום דיווחים"
					buttonText="הורד כקובץ אקסל"
					style={{ float: "right" }}
				/>
			</div>

			{/*//* ----- modals --------------------------------
				//? ++ unittype={props.unittype} unitid={props.unitid} */}
			{user.role == "3" || user.role == "2" ? (
				<CarDataFormModalHatal
					style={{
						minHeight: "100%",
						maxHeight: "100%",
						minWidth: "60%",
						maxWidth: "70%",
						justifyContent: "center",
						alignSelf: "center",
						direction: "rtl",
					}}
					isOpen={iscardataformopen}
					cardataid={cardataidformodal}
					Toggle={Toggle}
					ToggleForModal={ToggleForModal}
				/>
			) : (
				<CarDataFormModal
					style={{
						minHeight: "100%",
						maxHeight: "100%",
						minWidth: "60%",
						maxWidth: "70%",
						justifyContent: "center",
						alignSelf: "center",
						direction: "rtl",
					}}
					isOpen={iscardataformopen}
					cardataid={cardataidformodal}
					Toggle={Toggle}
					ToggleForModal={ToggleForModal}
				/>
			)}

			<CarDataFormModalView
				style={{
					minHeight: "100%",
					maxHeight: "100%",
					minWidth: "60%",
					maxWidth: "70%",
					justifyContent: "center",
					alignSelf: "center",
					direction: "rtl",
				}}
				isOpen={isviewmodalopen}
				cardataid={viewmodalid}
				Toggle={ToggleView}
				ToggleForModal={ToggleForModalView}
			/>

			<GlobalFilter
				filter={globalFilter}
				setFilter={setGlobalFilter}
			/>
			<div
				className="table-responsive"
				style={{ overflow: "auto" }}
			>
				<table
					id="table-to-xls"
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th style={{ width: "12.5%" }}>
										<div
											{...column.getHeaderProps(column.getSortByToggleProps())}
										>
											{" "}
											{column.render("Header")}{" "}
										</div>
										<div>
											{column.canFilter ? column.render("Filter") : null}
										</div>
										<div>
											{column.isSorted
												? column.isSortedDesc
													? "🔽"
													: "⬆️"
												: ""}
										</div>
									</th>
								))}
								<th>עדכן</th>
								<th>צפייה</th>
							</tr>
						))}
					</thead>
					{date.fromdate && date.todate ? (
						<>
							<tbody {...getTableBodyProps()}>
								{page
									.filter(
										(row) =>
											new Date(row.original.datevent).setHours(0, 0, 0, 0) >=
												new Date(date.fromdate).setHours(0, 0, 0, 0) &&
											new Date(row.original.datevent).setHours(0, 0, 0, 0) <=
												new Date(date.todate).setHours(0, 0, 0, 0)
									)
									.map((row, index) => {
										prepareRow(row);
										return (
											<tr {...row.getRowProps()}>
												{row.cells.map((cell) => {
													if (
														cell.column.id != "typevent" &&
														cell.column.id != "pirot" &&
														cell.column.id != "createdAt" &&
														cell.column.id != "datevent" &&
														cell.column.id != "difftime" &&
														cell.column.id != "tipul" &&
														cell.column.id != "pikodrep" &&
														cell.column.id != "ogdarep" &&
														cell.column.id != "hativarep" &&
														cell.column.id != "gdodrep"
													) {
														return (
															<td {...cell.getCellProps()}>
																{cell.render("Cell")}
															</td>
														);
													} else {
														if (cell.column.id == "typevent") {
															if (cell.value == "1")
																return <td>תאונת כלי רכב</td>;
															if (cell.value == "2") return <td>התהפכות</td>;
															if (cell.value == "3")
																return <td>הנתקות גלגל</td>;
															if (cell.value == "4") return <td>שריפה</td>;
															if (cell.value == "5")
																return <td>אירוע נשק / תחמושת</td>;
															if (cell.value == "6")
																return <td>תאונת עבודה אנשי טנ"א</td>;
															if (cell.value == "7")
																return <td>פריקת מטפים</td>;
															if (cell.value == "9") return <td>חילוץ</td>;
															if (cell.value == "10")
																return <td>נזק לתשתיות אחזקה / הח"י</td>;
															if (cell.value == "11")
																return <td>אי קיום שגרת אחזקה</td>;
															if (cell.value == "12") return <td>אחר</td>;
															if (cell.value == "רקם") return <td>רק"ם</td>;
														}
														if (cell.column.id == "pirot") {
															return (
																<td>
																	<div
																		style={{
																			width: "100%",
																			height: "40px",
																			margin: "0",
																			padding: "0",
																			overflow: "auto",
																		}}
																	>
																		{cell.value}
																	</div>
																</td>
															);
														}

														if (cell.column.id == "pikodrep") {
															return <td>{getname(cell.value, pikodsrep)}</td>;
														}
														if (cell.column.id == "ogdarep") {
															return <td>{getname(cell.value, ogdasrep)}</td>;
														}
														if (cell.column.id == "hativarep") {
															return <td>{getname(cell.value, hativasrep)}</td>;
														}
														if (cell.column.id == "gdodrep") {
															return <td>{getname(cell.value, gdodsrep)}</td>;
														}

														if (cell.column.id == "createdAt") {
															return (
																<td>
																	{cell.value
																		.slice(0, 10)
																		.split("-")
																		.reverse()
																		.join("-")}
																</td>
															);
														}

														if (cell.column.id == "datevent") {
															return (
																<td>
																	{cell.value
																		.slice(0, 10)
																		.split("-")
																		.reverse()
																		.join("-")}
																</td>
															);
														}

														if (cell.column.id == "difftime") {
															return <td>{diff[index]}</td>;
														}
														if (cell.column.id == "tipul") {
															if (
																row.original.resevent === "4" &&
																row.original.nifga === 2
															)
																return (
																	<td>סיבת אירוע חסרה, לא ידוע על נפגעים</td>
																);
															else {
																if (row.original.resevent === "4")
																	return <td>סיבת אירוע חסרה</td>;
																else {
																	if (row.original.nifga === 2)
																		return <td>לא ידוע על נפגעים</td>;
																	else return <td>לא</td>;
																}
															}
														}
													}
												})}

												{row.original.typevent != "רקם" ? (
													<td role="cell">
														{" "}
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
															}}
														>
															{" "}
															{/* {console.log(row.original.typevent)} */}
															<Button
																id={row.index}
																value={row.original._id}
																onClick={Toggle}
															>
																עדכן
															</Button>
														</div>{" "}
													</td>
												) : (
													<td role="cell">
														{" "}
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
															}}
														>
															{" "}
															{/* {console.log(row.original.typevent)} */}
															<Button
																id={row.index}
																value={row.original._id}
																onClick={Toggle}
															>
																עדכן
															</Button>
														</div>{" "}
													</td>
												)}

												{/* // ? row.original._id=user._id*/}
												{/*//* -------- view report --------------- */}
												{row.original.typevent != "רקם" ? (
													<td role="cell">
														{" "}
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
															}}
														>
															{" "}
															{/* // ? <button
                        className="btn-new-delete"
                        onClick={() => UserDelete(row.original._id)}
                      >
                        צפייה
                      </button> */}
															<button
																value={row.original._id}
																onClick={ToggleView}
																className="btn-new"
															>
																צפייה
															</button>
														</div>
													</td>
												) : (
													<td role="cell">
														{" "}
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
															}}
														>
															{" "}
															{/* // ? <button
                        className="btn-new-delete"
                        onClick={() => UserDelete(row.original._id)}
                      >
                        צפייה
                      </button> */}
															<button
																value={row.original._id}
																onClick={ToggleView}
																className="btn-new"
															>
																צפייה
															</button>
														</div>
													</td>
												)}
											</tr>
										);
									})}
							</tbody>
						</>
					) : (
						<tbody {...getTableBodyProps()}>
							{/* added an index so i could pull the diff for each row */}
							{page.map((row, index) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => {
											if (
												cell.column.id != "typevent" &&
												cell.column.id != "pirot" &&
												cell.column.id != "createdAt" &&
												cell.column.id != "datevent" &&
												cell.column.id != "difftime" &&
												cell.column.id != "tipul" &&
												cell.column.id != "pikodrep" &&
												cell.column.id != "ogdarep" &&
												cell.column.id != "hativarep" &&
												cell.column.id != "gdodrep"
											) {
												return (
													<td {...cell.getCellProps()}>
														{cell.render("Cell")}
													</td>
												);
											} else {
												if (cell.column.id == "typevent") {
													if (cell.value == "1") return <td>תאונת כלי רכב</td>;
													if (cell.value == "2") return <td>התהפכות</td>;
													if (cell.value == "3") return <td>הנתקות גלגל</td>;
													if (cell.value == "4") return <td>שריפה</td>;
													if (cell.value == "5")
														return <td>אירוע נשק / תחמושת</td>;
													if (cell.value == "6")
														return <td>תאונת עבודה אנשי טנ"א</td>;
													if (cell.value == "7") return <td>פריקת מטפים</td>;
													if (cell.value == "9") return <td>חילוץ</td>;
													if (cell.value == "10")
														return <td>נזק לתשתיות אחזקה / הח"י</td>;
													if (cell.value == "11")
														return <td>אי קיום שגרת אחזקה</td>;
													if (cell.value == "12") return <td>אחר</td>;
													if (cell.value == "רקם") return <td>רק"ם</td>;
												}
												if (cell.column.id == "pirot") {
													return (
														<td>
															<div
																style={{
																	width: "100%",
																	height: "60px",
																	margin: "0",
																	padding: "0",
																	overflow: "auto",
																}}
															>
																{cell.value}
															</div>
														</td>
													);
												}

												if (cell.column.id == "pikodrep") {
													return <td>{getname(cell.value, pikodsrep)}</td>;
												}
												if (cell.column.id == "ogdarep") {
													return <td>{getname(cell.value, ogdasrep)}</td>;
												}
												if (cell.column.id == "hativarep") {
													return <td>{getname(cell.value, hativasrep)}</td>;
												}
												if (cell.column.id == "gdodrep") {
													return <td>{getname(cell.value, gdodsrep)}</td>;
												}

												if (cell.column.id == "createdAt") {
													return (
														<td>
															{cell.value
																.slice(0, 10)
																.split("-")
																.reverse()
																.join("-")}
														</td>
													);
												}

												if (cell.column.id == "datevent") {
													return (
														<td>
															{cell.value
																.slice(0, 10)
																.split("-")
																.reverse()
																.join("-")}
														</td>
													);
												}

												// * ------------- added difftime --------------------------------

												if (cell.column.id == "difftime") {
													return <td>{diff[index]}</td>;
												}

												if (cell.column.id == "tipul") {
													if (
														row.original.resevent === "4" &&
														row.original.nifga === 2
													)
														return <td>סיבת אירוע חסרה, לא ידוע על נפגעים</td>;
													else {
														if (row.original.resevent === "4")
															return <td>סיבת אירוע חסרה</td>;
														else {
															if (row.original.nifga === 2)
																return <td>לא ידוע על נפגעים</td>;
															else return <td>לא</td>;
														}
													}
												}
											}
										})}
										{/*//* -------- update report --------------- */}
										{row.original.typevent != "רקם" ? (
											<td role="cell">
												{" "}
												<div
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													{" "}
													{/* {console.log(row.original.typevent)} */}
													{/* <Link to={`/editreport/${row.original._id}`}> */}
													<Button
														id={row.index}
														value={row.original._id}
														onClick={Toggle}
													>
														עדכן
													</Button>
												</div>{" "}
											</td>
										) : (
											<td role="cell">
												{" "}
												<div
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													{" "}
													{/* {console.log(row.original.typevent)} */}
													{/* <Link to={`/editreport/${row.original._id}`}> */}
													<Button
														id={row.index}
														value={row.original._id}
														onClick={Toggle}
													>
														עדכן
													</Button>
												</div>{" "}
											</td>
										)}
										{/* // ? row.original._id=user._id*/}
										{/*//* -------- view report --------------- */}
										{row.original.typevent != "רקם" ? (
											<td role="cell">
												{" "}
												<div
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													{" "}
													{/* // ? <button
                        className="btn-new-delete"
                        onClick={() => UserDelete(row.original._id)}
                      >
                        צפייה
                      </button> */}
													{/* <Link to={`/wachreport/${row.original._id}`}> */}
													<button
														value={row.original._id}
														onClick={ToggleView}
														className="btn-new"
													>
														צפייה
													</button>
												</div>
											</td>
										) : (
											<td role="cell">
												{" "}
												<div
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													{" "}
													{/* // ? <button
                        className="btn-new-delete"
                        onClick={() => UserDelete(row.original._id)}
                      >
                        צפייה
                      </button> */}
													{/* <Link to={`/wachreportrekem/${row.original._id}`}> */}
													<button
														value={row.original._id}
														onClick={ToggleView}
														className="btn-new"
													>
														צפייה
													</button>
												</div>
											</td>
										)}
									</tr>
								);
							})}
						</tbody>
					)}
				</table>
				<div className="pagination">
					<button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						{"<"}
					</button>{" "}
					<button
						onClick={() => nextPage()}
						disabled={!canNextPage}
					>
						{">"}
					</button>{" "}
					<span>
						עמוד{" "}
						<strong>
							{pageIndex + 1} מתוך {pageOptions.length}
						</strong>{" "}
					</span>
					<span>
						| חפש עמוד:{" "}
						<input
							type="number"
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: "100px", borderRadius: "10px" }}
						/>
					</span>{" "}
					<select
						style={{ borderRadius: "10px" }}
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option
								key={pageSize}
								value={pageSize}
							>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</>
	);
};
export default withRouter(SortingTableRekem);
