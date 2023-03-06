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
	Collapse,
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import { Line, Pie, Doughnut, PolarArea } from "react-chartjs-2";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Background from "components/general/Background/Background";

import { isAuthenticated } from "auth";
const AdminSignInForm = (props) => {
	const [reportDB, setReportDB] = useState([]);
	const [isError, setIsError] = useState(false);

	const [data, setData] = useState([]);
	const [reportDBFillter, setReportDFillter] = useState([]);

	const [gdods, setGdods] = useState([]);
	const [hativas, setHativas] = useState([]);
	const [ogdas, setOgdas] = useState([]);
	const [pikods, setPikods] = useState([]);
	//* options
	const [gdodsop, setGdodsop] = useState([]);
	const [hativasop, setHativasop] = useState([]);
	const [ogdasop, setOgdasop] = useState([]);
	const [pikodsop, setPikodsop] = useState([]);

	const [gdodim, setGdodim] = useState([]);

	// const [filter, setFilter] = useState([]);

	const { user } = isAuthenticated();

	const [collapseOpen, setcollapseOpen] = React.useState(false);
	const toggleCollapse = () => {
		setcollapseOpen(!collapseOpen);
	};

	const animatedComponents = makeAnimated();

	const eventTypeArray = {
		בחר: "",
		1: "תאונת כלי רכב",
		2: "התהפכות",
		3: "הנתקות גלגל",
		4: "שריפה",
		5: "אירוע נשק / תחמושת",
		6: 'תאונת עבודה אנשי טנ"א',
		7: "פריקת מטפים",
		9: "חילוץ",
		10: 'נזק לתשתיות אחזקה / הח"י',
		11: "אי קיום שגרת אחזקה",
		12: "אחר",
		רקם: 'רק"ם',
	};

	const loadPikods = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				setPikods(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadGdodim = async () => {
		await axios
			.get("http://localhost:8000/api/gdod")
			.then((response) => {
				setGdodim(response.data);
				// console.log(response.data);
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

	const loadReports = () => {
		axios
			.get(`http://localhost:8000/report/pikod/readall/${user.pikod}`)
			.then((res) => {
				// console.log(res);
				// console.log(res.data);
				const reports = res.data;
				// console.log(reports);
				reports.reverse();
				setReportDB(reports);
			});
	};

	const loadReportsByDate = (from, to) => {
		// console.log("try by date");
		// console.log(from);
		// console.log(to);
		axios
			.get(
				`http://localhost:8000/report/byDate/pikod/readall/${from}/${to}/${user.pikod}`
			)
			.then((res) => {
				// console.log(res);
				// console.log("by date");
				// console.log(res.data);
				const reports = res.data;
				reports.reverse();
				setReportDB(reports);
			});
	};

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
		console.log(evt.target.value);
		console.log(evt.target.name);
		setData({ ...data, [evt.target.name]: value });
		console.log(new Date(data.fromdate).setHours(0, 0, 0, 0));
		console.log(data.todate);
	}

	function setoptions(pk, og, ht, gd) {
		setPikodsop(
			pk.map((item, index) => {
				let val = pk[index]._id;
				let lab = pk[index].name;
				return { value: val, label: lab };
			})
		);
		setOgdasop(
			og.map((item, index) => {
				let val = og[index]._id;
				let lab = og[index].name;
				return { value: val, label: lab };
			})
		);
		setHativasop(
			ht.map((item, index) => {
				let val = ht[index]._id;
				let lab = ht[index].name;
				return { value: val, label: lab };
			})
		);
		setGdodsop(
			gd.map((item, index) => {
				let val = gd[index]._id;
				let lab = gd[index].name;
				return { value: val, label: lab };
			})
		);
	}

	function convertToObj(a, b) {
		if (a.length != b.length || a.length == 0 || b.length == 0) {
			return null;
		}
		let obj = {};

		// Using the foreach method
		a.forEach((k, i) => {
			obj[k] = b[i];
		});
		return obj;
	}

	function handleChange8(selectedOption, name) {
		// console.log(selectedOption[0].value);
		// console.log(name);
		if (!(selectedOption.value == "בחר")) {
			let tempvalues = [];
			let tempnames = [];
			for (let i = 0; i < selectedOption.length; i++) {
				tempvalues.push(selectedOption[i].value);
				tempnames.push(selectedOption[i].label);
			}
			// console.log(tempvalues);
			// console.log(tempnames);
			// console.log(name.name);
			if (tempvalues.length > 0) {
				setData({ ...data, [name.name]: tempvalues });
			} else {
				// console.log(name.name);
				if (name.name == "hativa") {
					delete data.hativa;
					setData({ ...data });
				}
				if (name.name == "ogda") {
					delete data.ogda;
					setData({ ...data });
				}
				if (name.name == "pikod") {
					delete data.pikod;
					setData({ ...data });
				}
			}

			console.log(data);
			// console.log(data.pikod);
			// console.log(data.ogda);
			// console.log(data.hativa);
			// console.log(data.pikod.map((item,index) => {

			// }));
		} else {
			let tempfilter = { ...data };
			delete tempfilter[name];
			setData(tempfilter);
			console.log(tempfilter);
		}
	}

	function reportDBFl(report, dataUnit, unit) {
		/*//? taking all the reports + the unit array that we want to filter from said reports and the name of the unit */
		//* filltering by white mode and dark mode
		props.theme == "white-content"
			? setReportDFillter(
					report.filter((rp) =>
						// unit == "pikod"
						// 	? dataUnit.includes(rp.pikod)
						unit == "ogda"
							? dataUnit.includes(rp.ogda)
							: unit == "hativa"
							? dataUnit.includes(rp.hativa)
							: null
					)
			  )
			: setReportDFillter(
					report.filter((rp) =>
						// unit == "pikod"
						// 	? dataUnit.includes(rp.pikodrep)
						unit == "ogda"
							? dataUnit.includes(rp.ogdarep)
							: unit == "hativa"
							? dataUnit.includes(rp.hativarep)
							: null
					)
			  );
	}

	function reportSwitch() {
		switch (true) {
			//* the order is important - must be from the lowest level to the highest
			case typeof data.hativa == "object": //? checks if the the array exists
				reportDBFl(reportDB, data.hativa, "hativa");
				// console.log(data.hativa);
				break;
			case typeof data.ogda == "object":
				reportDBFl(reportDB, data.ogda, "ogda");
				// console.log(data.ogda);
				break;
			// case typeof data.pikod == "object":
			// 	reportDBFl(reportDB, data.pikod, "pikod");
			// 	// console.log(data.pikod);
			// 	break;

			default:
				setReportDFillter(reportDB);
				console.log("def");
				break;
		}
	}

	const options = {
		//* on civil
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "right",
				align: "center",
				fullSize: true,
			},
		},
	};
	//* on Army :
	//! brakes after 2-3 fillter because of the size of the data
	// 		responsive: true,
	// 		legend: {
	// 			display: true,
	// 			position: "right",
	// 			align: "center",
	// 			fullSize: true,
	// 		},
	// };

	const labels = [
		"תאונת כלי רכב",
		"התהפכות",
		"הנתקות גלגל",
		"שריפה",
		"אירוע נשק / תחמושת",
		'תאונת עבודה אנשי טנ"א',
		"פריקת מטפים",
		"חילוץ",
		'נזק לתשתיות אחזקה / הח"י',
		"אי קיום שגרת אחזקה",
		"אחר",
		'רק"ם',
	];

	function sumtypereport(arr1, arr2, arr3) {
		let alldata = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr3[arr2[j].typevent] == arr1[i]) sum++;
			}
			alldata[i] = sum;
		}
		return alldata;
	}

	const reportEvent = reportDB.filter((report) =>
		data.pikod.includes(report.pikod)
	);

	const dataevent = {
		labels: labels,
		datasets: [
			{
				label: "# of Votes",
				data: sumtypereport(labels, reportEvent, eventTypeArray),
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const dataeventFilltered = {
		labels: labels,
		datasets: [
			{
				label: "# of Votes",
				data: sumtypereport(labels, reportDBFillter, eventTypeArray),
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	function sumpikods(arr1, arr2) {
		let sumallpikods = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr2[j].pikod == arr1[i]._id) sum++;
			}
			sumallpikods[i] = sum;
		}
		return sumallpikods;
	}

	function sumpikodsrep(arr1, arr2) {
		let sumallpikods = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr2[j].pikodrep == arr1[i]._id) sum++;
			}
			sumallpikods[i] = sum;
		}
		return sumallpikods;
	}

	const datapikod = {
		labels: pikods.map((pikod, index) => pikod.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumpikods(pikods, reportDB),
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const datapikodrep = {
		labels: pikods.map((pikod, index) => pikod.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumpikodsrep(pikods, reportDB),
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	function getcolor() {
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	}

	function randomcolor(arr1) {
		const colors = [];
		for (let i = 0; i < arr1.length; i++) {
			colors.push(getcolor());
			console.log(colors);
		}
		return colors;
	}

	function sumogda(arr1, arr2) {
		let sumallogdas = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr2[j].ogda == arr1[i]._id) sum++;
			}
			sumallogdas[i] = sum;
		}
		return sumallogdas;
	}

	function sumogdarep(arr1, arr2) {
		let sumallogdas = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr2[j].ogdarep == arr1[i]._id) sum++;
			}
			sumallogdas[i] = sum;
		}
		return sumallogdas;
	}

	const arryogda = ogdas.filter((ogda, index) => {
		try {
			if (data.pikod.includes(ogda.pikod)) {
				return ogda.pikod;
			}
		} catch (error) {
			return datapikod;
		}
	});

	// const reportDBPikod = reportDB.filter((report) =>
	// 	data.pikod.includes(report.pikod)
	// );

	// const dataeventOgda = {
	// 	labels: labels,
	// 	datasets: [
	// 		{
	// 			label: "# of Votes",
	// 			data: sumtypereport(labels, reportDBFillter, eventTypeArray),
	// 			backgroundColor: [
	// 				"rgba(255, 99, 132, 1)",
	// 				"rgba(54, 162, 235, 1)",
	// 				"rgba(255, 206, 86, 1)",
	// 				"rgba(75, 192, 192, 1)",
	// 				"rgba(153, 102, 255, 1)",
	// 				"rgba(255, 159, 64, 1)",
	// 				"rgba(157, 241, 223, 1)",
	// 				"rgba(130, 0, 0, 1)",
	// 				"rgba(78, 108, 80, 1)",
	// 				"rgba(207, 77, 206, 1)",
	// 				"rgba(61, 23, 102, 1)",
	// 				"rgba(0, 255, 246, 1)",
	// 				"rgba(255, 173, 188, 1)",
	// 			],
	// 			borderColor: [
	// 				"rgba(255, 99, 132, 1)",
	// 				"rgba(54, 162, 235, 1)",
	// 				"rgba(255, 206, 86, 1)",
	// 				"rgba(75, 192, 192, 1)",
	// 				"rgba(153, 102, 255, 1)",
	// 				"rgba(255, 159, 64, 1)",
	// 				"rgba(157, 241, 223, 1)",
	// 				"rgba(130, 0, 0, 1)",
	// 				"rgba(78, 108, 80, 1)",
	// 				"rgba(207, 77, 206, 1)",
	// 				"rgba(61, 23, 102, 1)",
	// 				"rgba(0, 255, 246, 1)",
	// 				"rgba(255, 173, 188, 1)",
	// 			],
	// 			borderWidth: 1,
	// 		},
	// 	],
	// };

	// const datapikodFilttered = {
	// 	labels: pikods.map((pikod, index) => pikod.name),
	// 	datasets: [
	// 		{
	// 			label: "# of Votes",
	// 			data: sumpikods(pikods, reportDBFillter),
	// 			backgroundColor: [
	// 				"rgba(255, 99, 132, 1)",
	// 				"rgba(54, 162, 235, 1)",
	// 				"rgba(255, 206, 86, 1)",
	// 				"rgba(75, 192, 192, 1)",
	// 				"rgba(153, 102, 255, 1)",
	// 				"rgba(255, 159, 64, 1)",
	// 				"rgba(157, 241, 223, 1)",
	// 				"rgba(130, 0, 0, 1)",
	// 				"rgba(78, 108, 80, 1)",
	// 				"rgba(207, 77, 206, 1)",
	// 				"rgba(61, 23, 102, 1)",
	// 				"rgba(0, 255, 246, 1)",
	// 				"rgba(255, 173, 188, 1)",
	// 			],
	// 			borderColor: [
	// 				"rgba(255, 99, 132, 1)",
	// 				"rgba(54, 162, 235, 1)",
	// 				"rgba(255, 206, 86, 1)",
	// 				"rgba(75, 192, 192, 1)",
	// 				"rgba(153, 102, 255, 1)",
	// 				"rgba(255, 159, 64, 1)",
	// 				"rgba(157, 241, 223, 1)",
	// 				"rgba(130, 0, 0, 1)",
	// 				"rgba(78, 108, 80, 1)",
	// 				"rgba(207, 77, 206, 1)",
	// 				"rgba(61, 23, 102, 1)",
	// 				"rgba(0, 255, 246, 1)",
	// 				"rgba(255, 173, 188, 1)",
	// 			],
	// 			borderWidth: 1,
	// 		},
	// 	],
	// };
	// console.log(arryogda);

	const dataogda = {
		labels: arryogda.map((ogda) => ogda.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumogda(arryogda, reportDB),
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderColor: ["rgba(200, 200, 200, 0.75)"],
				borderWidth: 1,
			},
		],
	};

	const dataogdarep = {
		labels: arryogda.map((ogda) => ogda.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumogdarep(arryogda, reportDB),
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderColor: ["rgba(200, 200, 200, 0.75)"],
				borderWidth: 1,
			},
		],
	};

	function sumhativa(arr1, arr2) {
		let sumallhativas = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr2[j].hativa == arr1[i]._id) sum++;
			}
			sumallhativas[i] = sum;
		}
		return sumallhativas;
	}

	function sumhativarep(arr1, arr2) {
		let sumallhativas = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr2[j].hativarep == arr1[i]._id) sum++;
			}
			sumallhativas[i] = sum;
		}
		return sumallhativas;
	}

	const arryhativa = hativas.filter((hativa, index) => {
		try {
			if (data.ogda.includes(hativa.ogda)) {
				return hativa.ogda;
			}
		} catch (error) {}
	});

	const datahativa = {
		labels: arryhativa.map((hativa) => hativa.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumhativa(arryhativa, reportDB),
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderColor: ["rgba(200, 200, 200, 0.75)"],
				borderWidth: 1,
			},
		],
	};

	const datahativarep = {
		labels: arryhativa.map((hativa) => hativa.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumhativarep(arryhativa, reportDB),
				backgroundColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(157, 241, 223, 1)",
					"rgba(130, 0, 0, 1)",
					"rgba(78, 108, 80, 1)",
					"rgba(207, 77, 206, 1)",
					"rgba(61, 23, 102, 1)",
					"rgba(0, 255, 246, 1)",
					"rgba(255, 173, 188, 1)",
				],
				borderColor: ["rgba(200, 200, 200, 0.75)"],
				borderWidth: 1,
			},
		],
	};

	function sumgdod(arr1, arr2) {
		let sumallgdods = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr2[j].gdod == arr1[i]._id) sum++;
			}
			sumallgdods[i] = sum;
		}
		return sumallgdods;
	}

	function sumgdodrep(arr1, arr2) {
		let sumallgdods = [];
		for (let i = 0; i < arr1.length; i++) {
			let sum = 0;
			for (let j = 0; j < arr2.length; j++) {
				if (arr2[j].gdodrep == arr1[i]._id) sum++;
			}
			sumallgdods[i] = sum;
		}
		return sumallgdods;
	}
	// const arryhativa = hativas.filter((hativa, index) => {
	// 	if (data.ogda.includes(hativa.ogda)) {
	// 		return hativa.ogda;
	// 	}
	// });
	const arrygdod = gdods.filter((gdod, index) => {
		try {
			if (data.hativa.includes(gdod.hativa)) {
				return gdod.hativa;
			}
		} catch (error) {}
	});

	const datagdod = {
		labels: arrygdod.map((gdod) => gdod.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumgdod(arrygdod, reportDB),
				backgroundColor: randomcolor(arrygdod),
				borderColor: ["rgba(200, 200, 200, 0.75)"],
				borderWidth: 1,
			},
		],
	};

	const datagdodrep = {
		labels: arrygdod.map((gdod) => gdod.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumgdodrep(arrygdod, reportDB),
				backgroundColor: randomcolor(arrygdod),
				borderColor: ["rgba(200, 200, 200, 0.75)"],
				borderWidth: 1,
			},
		],
	};

	//* --------------------- useEffects -------------------------------------

	//* manmait - reporting + typeevent clock
	useEffect(() => {
		reportSwitch();
		console.table(reportDBFillter);
		// console.log(typeof data.gdod);
		// console.log(reportDBFillter.length);

		console.log(reportDB.reduce((a, b) => a.damageCost + b.damageCost, 0));

		// console.log(props.theme);
	}, [data, props.theme]);

	const initWithUserData = () => {
		setData({
			...data,
			pikod: user.pikod,
		});
		loadReports();
		loadPikods();
		loadGdodim();
		// loadOgdas(pikods);
	};

	useEffect(() => {
		data.fromdate && data.todate
			? loadReportsByDate(data.fromdate, data.todate)
			: loadReports();
	}, [data.fromdate, data.todate]);

	useEffect(() => {
		initWithUserData();
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
		setoptions(pikods, ogdas, hativas, gdods);
		// console.log(pikodsop);
	}, [gdods, hativas, ogdas, pikods]);

	function getname(idnum, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]._id == idnum) return arr[i].name;
		}
	}

	function getnumevt(arr) {
		let num = 0;
		for (let i = 0; i < arr.length; i++) {
			num++;
		}
		return num;
	}

	function gettotal(arr) {
		let sum = arr.reduce(function (a, b) {
			return a + b;
		}, 0);
		return sum;
	}

	return (
		<Background>
			<Container className="mt--8 pb-5">
				<Row>
					<div style={{ width: "100%", margin: "auto", textAlign: "right" }}>
						<Button
							onClick={toggleCollapse}
							style={{}}
						>
							סינון
						</Button>
						<Collapse isOpen={collapseOpen}>
							<Card style={{ background: "rgb(228,228,228,0.2)" }}>
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
													value={data.fromdate}
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
													value={data.todate}
													onChange={handleChange}
												/>
											</Col>
										</Row>

										<Row style={{ paddingTop: "10px", marginBottom: "15px" }}>
											<>
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
										</Row>
									</Col>
								</Row>
							</Card>
						</Collapse>
					</div>
				</Row>
				{/*//todo dont let the user put todate larger then from date or make a fail safe like in divoahReport lines 340 - 374 */}
				{data.fromdate && data.todate ? (
					<Row>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center"> סה"כ עלות נזק</h3>
								</CardHeader>
								<CardBody>
									<h2 className="text-center">
										{gettotal(
											reportDB
												.filter(
													(report) =>
														new Date(report.datevent).setHours(0, 0, 0, 0) >=
															new Date(data.fromdate).setHours(0, 0, 0, 0) &&
														new Date(report.datevent).setHours(0, 0, 0, 0) <=
															new Date(data.todate).setHours(0, 0, 0, 0)
												)
												.map((report) => report.damageCost)
										)}
									</h2>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										סה"כ שעות עבודה
									</h3>
								</CardHeader>
								<CardBody>
									<h2 className="text-center">
										{gettotal(
											reportDB
												.filter(
													(report) =>
														new Date(report.datevent).setHours(0, 0, 0, 0) >=
															new Date(data.fromdate).setHours(0, 0, 0, 0) &&
														new Date(report.datevent).setHours(0, 0, 0, 0) <=
															new Date(data.todate).setHours(0, 0, 0, 0)
												)
												.map((report) => report.totalWorkHours)
										)}
									</h2>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										סה"כ עלות שעות עבודה
									</h3>
								</CardHeader>
								<CardBody>
									<h2 className="text-center">
										{gettotal(
											reportDB
												.filter(
													(report) =>
														new Date(report.datevent).setHours(0, 0, 0, 0) >=
															new Date(data.fromdate).setHours(0, 0, 0, 0) &&
														new Date(report.datevent).setHours(0, 0, 0, 0) <=
															new Date(data.todate).setHours(0, 0, 0, 0)
												)
												.map((report) => report.totalCostWorkHours)
										)}
									</h2>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center"> מספר אירועים</h3>
								</CardHeader>
								<h2 className="text-center">
									{getnumevt(
										reportDB.filter(
											(report) =>
												new Date(report.datevent).setHours(0, 0, 0, 0) >=
													new Date(data.fromdate).setHours(0, 0, 0, 0) &&
												new Date(report.datevent).setHours(0, 0, 0, 0) <=
													new Date(data.todate).setHours(0, 0, 0, 0)
										)
									)}
								</h2>
								<CardBody></CardBody>
							</Card>
						</Col>
					</Row>
				) : (
					<Row>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center"> סה"כ עלות נזק</h3>
								</CardHeader>
								<CardBody>
									<h2 className="text-center">
										{gettotal(reportDB.map((report) => report.damageCost))}
									</h2>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										סה"כ שעות עבודה
									</h3>
								</CardHeader>
								<CardBody>
									<h2 className="text-center">
										{gettotal(reportDB.map((report) => report.totalWorkHours))}
									</h2>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										סה"כ עלות שעות עבודה
									</h3>
								</CardHeader>
								<CardBody>
									<h2 className="text-center">
										{gettotal(
											reportDB.map((report) => report.totalCostWorkHours)
										)}
									</h2>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center"> מספר אירועים</h3>
								</CardHeader>
								<h2 className="text-center">{getnumevt(reportDB)}</h2>
								<CardBody></CardBody>
							</Card>
						</Col>
					</Row>
				)}
				{props.theme == "white-content" ? (
					<>
						<Row>
							<Col lg="12">
								<Card className="card-chart">
									<CardHeader>
										<h3 className="card-category text-center">
											אירועים אחרונים
										</h3>
									</CardHeader>
									<CardBody>
										<table
											className="tablesorter"
											responsive
										>
											<thead className="text-primary">
												<tr>
													<th
														className="text-center"
														style={{ width: "20%" }}
													>
														יחידה מנמרית
													</th>
													<th
														className="text-center"
														style={{ width: "30%" }}
													>
														סוג אירוע
													</th>
													<th
														className="text-center"
														style={{ width: "50%" }}
													>
														פירוט האירוע
													</th>
												</tr>
											</thead>
											{data.fromdate && data.todate ? (
												<>
													{!data.ogda ? (
														<tbody>
															{reportDB
																.filter(
																	(report) =>
																		new Date(report.datevent).setHours(
																			0,
																			0,
																			0,
																			0
																		) >=
																			new Date(data.fromdate).setHours(
																				0,
																				0,
																				0,
																				0
																			) &&
																		new Date(report.datevent).setHours(
																			0,
																			0,
																			0,
																			0
																		) <=
																			new Date(data.todate).setHours(0, 0, 0, 0)
																)
																.slice(0, 5)
																.map((report, index) => (
																	<tr>
																		<td>
																			<p>{getname(report.gdod, gdodim)}</p>
																		</td>
																		<td>{eventTypeArray[report.typevent]}</td>
																		<td>
																			<div
																				style={{
																					width: "100%",
																					height: "50px",
																					margin: "0",
																					padding: "0",
																					overflow: "auto",
																				}}
																			>
																				{report.pirot}
																			</div>
																		</td>
																	</tr>
																))}
														</tbody>
													) : data.pikod ? (
														<tbody>
															{reportDBFillter
																.filter(
																	(report) =>
																		new Date(report.datevent).setHours(
																			0,
																			0,
																			0,
																			0
																		) >=
																			new Date(data.fromdate).setHours(
																				0,
																				0,
																				0,
																				0
																			) &&
																		new Date(report.datevent).setHours(
																			0,
																			0,
																			0,
																			0
																		) <=
																			new Date(data.todate).setHours(0, 0, 0, 0)
																)
																.slice(0, 5)
																.map((report, index) =>
																	data.pikod.includes(report.pikod) ? (
																		<tr>
																			<td>
																				<p>{getname(report.gdod, gdodim)}</p>
																			</td>
																			<td>{eventTypeArray[report.typevent]}</td>
																			<td>
																				<div
																					style={{
																						width: "100%",
																						height: "50px",
																						margin: "0",
																						padding: "0",
																						overflow: "auto",
																					}}
																				>
																					{report.pirot}
																				</div>
																			</td>
																		</tr>
																	) : null
																)}
														</tbody>
													) : !data.ogda ? (
														<tbody>
															{reportDB
																.filter(
																	(report) =>
																		new Date(report.datevent).setHours(
																			0,
																			0,
																			0,
																			0
																		) >=
																			new Date(data.fromdate).setHours(
																				0,
																				0,
																				0,
																				0
																			) &&
																		new Date(report.datevent).setHours(
																			0,
																			0,
																			0,
																			0
																		) <=
																			new Date(data.todate).setHours(0, 0, 0, 0)
																)
																.slice(0, 5)
																.map((report, index) => (
																	<tr>
																		<td>
																			<p>{getname(report.gdod, gdodim)}</p>
																		</td>
																		<td>{eventTypeArray[report.typevent]}</td>
																		<td>
																			<div
																				style={{
																					width: "100%",
																					height: "50px",
																					margin: "0",
																					padding: "0",
																					overflow: "auto",
																				}}
																			>
																				{report.pirot}
																			</div>
																		</td>
																	</tr>
																))}
														</tbody>
													) : null}
												</>
											) : (
												<>
													{!data.ogda ? (
														<tbody>
															{reportDB.slice(0, 5).map((report, index) => (
																<tr>
																	<td>
																		<p>{getname(report.gdod, gdodim)}</p>
																	</td>
																	<td>{eventTypeArray[report.typevent]}</td>
																	<td>
																		<div
																			style={{
																				width: "100%",
																				height: "50px",
																				margin: "0",
																				padding: "0",
																				overflow: "auto",
																			}}
																		>
																			{report.pirot}
																		</div>
																	</td>
																</tr>
															))}
														</tbody>
													) : data.pikod ? (
														<tbody>
															{reportDBFillter
																.slice(0, 5)
																.map((report, index) =>
																	data.pikod.includes(report.pikod) ? (
																		<tr>
																			<td>
																				<p>{getname(report.gdod, gdodim)}</p>
																			</td>
																			<td>{eventTypeArray[report.typevent]}</td>
																			<td>
																				<div
																					style={{
																						width: "100%",
																						height: "50px",
																						margin: "0",
																						padding: "0",
																						overflow: "auto",
																					}}
																				>
																					{report.pirot}
																				</div>
																			</td>
																		</tr>
																	) : null
																)}
														</tbody>
													) : !data.ogda ? (
														<tbody>
															{reportDB.slice(0, 5).map((report, index) => (
																<tr>
																	<td>
																		<p>{getname(report.gdod, gdodim)}</p>
																	</td>
																	<td>{eventTypeArray[report.typevent]}</td>
																	<td>
																		<div
																			style={{
																				width: "100%",
																				height: "50px",
																				margin: "0",
																				padding: "0",
																				overflow: "auto",
																			}}
																		>
																			{report.pirot}
																		</div>
																	</td>
																</tr>
															))}
														</tbody>
													) : null}
												</>
											)}
										</table>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col lg="6">
								<Card className="card-chart">
									<CardHeader>
										<h3 className="card-category text-center">
											{" "}
											אירועים לפי סוג אירוע
										</h3>
									</CardHeader>
									<CardBody>
										{!data.ogda ? (
											<Doughnut
												data={dataevent}
												options={options}
											/>
										) : (
											<Doughnut
												data={dataeventFilltered}
												options={options}
											/>
										)}
									</CardBody>
								</Card>
							</Col>
							{!data.pikod ? (
								<Col lg="6">
									<Card className="card-chart">
										<CardHeader>
											<h3 className="card-category text-center">
												{" "}
												מספר אירועים לפי פיקוד
											</h3>
										</CardHeader>
										<CardBody>
											{!data.ogda ? (
												<Doughnut
													data={datapikod}
													options={options}
												/>
											) : //* was removed
											/*
									<Doughnut
										data={datapikodFilttered}
										options={options}
									/>
									*/
											null}
										</CardBody>
									</Card>
								</Col>
							) : null}
							{data.pikod && !data.ogda && !data.hativa ? (
								<Col lg="6">
									<Card className="card-chart">
										<CardHeader>
											<h3 className="card-category text-center">
												{" "}
												{}
												מספר אירועים לפי אוגדה
											</h3>
										</CardHeader>
										<CardBody>
											<Doughnut
												data={dataogda}
												options={options}
											/>
										</CardBody>
									</Card>
								</Col>
							) : null}
							<>
								{data.ogda && !data.hativa ? (
									<Col lg="6">
										<Card className="card-chart">
											<CardHeader>
												<h3 className="card-category text-center">
													{" "}
													מספר אירועים לפי חטיבה
												</h3>
											</CardHeader>
											<CardBody>
												<Doughnut
													data={datahativa}
													options={options}
												/>
											</CardBody>
										</Card>
									</Col>
								) : null}
							</>
							<>
								{data.hativa ? (
									<Col lg="6">
										<Card className="card-chart">
											<CardHeader>
												<h3 className="card-category text-center">
													{" "}
													מספר אירועים לפי גדוד
												</h3>
											</CardHeader>
											<CardBody>
												<Doughnut
													data={datagdod}
													options={options}
												/>
											</CardBody>
										</Card>
									</Col>
								) : null}
							</>
						</Row>
					</>
				) : (
					<>
						<Row>
							<Col lg="12">
								<Card className="card-chart">
									<CardHeader>
										<h3 className="card-category text-center">
											אירועים אחרונים
										</h3>
									</CardHeader>
									<CardBody>
										<table
											className="tablesorter"
											responsive
										>
											<thead className="text-primary">
												<tr>
													<th
														className="text-center"
														style={{ width: "20%" }}
													>
														יחידה מדווחת
													</th>
													<th
														className="text-center"
														style={{ width: "30%" }}
													>
														סוג אירוע
													</th>
													<th
														className="text-center"
														style={{ width: "50%" }}
													>
														פירוט האירוע
													</th>
												</tr>
											</thead>
											{data.length == 0 && !data.ogda ? (
												<tbody>
													{reportDB.slice(0, 5).map((report, index) => (
														<tr>
															<td>
																<p>{getname(report.gdodrep, gdodim)}</p>
															</td>
															<td>{eventTypeArray[report.typevent]}</td>
															<td>
																<div
																	style={{
																		width: "100%",
																		height: "50px",
																		margin: "0",
																		padding: "0",
																		overflow: "auto",
																	}}
																>
																	{report.pirot}
																</div>
															</td>
														</tr>
													))}
												</tbody>
											) : data.pikod ? (
												<tbody>
													{reportDBFillter.slice(0, 5).map((report, index) =>
														data.pikod.includes(report.pikodrep) ? (
															<tr>
																<td>
																	<p>{getname(report.gdodrep, gdodim)}</p>
																</td>
																<td>{eventTypeArray[report.typevent]}</td>
																<td>
																	<div
																		style={{
																			width: "100%",
																			height: "50px",
																			margin: "0",
																			padding: "0",
																			overflow: "auto",
																		}}
																	>
																		{report.pirot}
																	</div>
																</td>
															</tr>
														) : null
													)}
												</tbody>
											) : !data.ogda ? (
												<tbody>
													{reportDB.slice(0, 5).map((report, index) => (
														<tr>
															<td>
																<p>{getname(report.gdodrep, gdodim)}</p>
															</td>
															<td>{eventTypeArray[report.typevent]}</td>
															<td>
																<div
																	style={{
																		width: "100%",
																		height: "50px",
																		margin: "0",
																		padding: "0",
																		overflow: "auto",
																	}}
																>
																	{report.pirot}
																</div>
															</td>
														</tr>
													))}
												</tbody>
											) : null}
										</table>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col lg="6">
								<Card className="card-chart">
									<CardHeader>
										<h3 className="card-category text-center">
											{" "}
											אירועים לפי סוג אירוע
										</h3>
									</CardHeader>
									<CardBody>
										{!data.ogda ? (
											<Doughnut
												data={dataevent}
												options={options}
											/>
										) : (
											<Doughnut
												data={dataeventFilltered}
												options={options}
											/>
										)}
									</CardBody>
								</Card>
							</Col>
							{!data.pikod ? (
								<Col lg="6">
									<Card className="card-chart">
										<CardHeader>
											<h3 className="card-category text-center">
												{" "}
												מספר אירועים לפי פיקוד
											</h3>
										</CardHeader>
										<CardBody>
											{!data.ogda ? (
												<Doughnut
													data={datapikodrep}
													options={options}
												/>
											) : //* was removed
											/*
									<Doughnut
										data={datapikodFilttered}
										options={options}
									/>
									*/
											null}
										</CardBody>
									</Card>
								</Col>
							) : null}
							{data.pikod && !data.ogda && !data.hativa ? (
								<Col lg="6">
									<Card className="card-chart">
										<CardHeader>
											<h3 className="card-category text-center">
												{" "}
												{}
												מספר אירועים לפי אוגדה
											</h3>
										</CardHeader>
										<CardBody>
											<Doughnut
												data={dataogdarep}
												options={options}
											/>
										</CardBody>
									</Card>
								</Col>
							) : null}
							<>
								{data.ogda && !data.hativa ? (
									<Col lg="6">
										<Card className="card-chart">
											<CardHeader>
												<h3 className="card-category text-center">
													{" "}
													מספר אירועים לפי חטיבה
												</h3>
											</CardHeader>
											<CardBody>
												<Doughnut
													data={datahativarep}
													options={options}
												/>
											</CardBody>
										</Card>
									</Col>
								) : null}
							</>
							<>
								{data.hativa ? (
									<Col lg="6">
										<Card className="card-chart">
											<CardHeader>
												<h3 className="card-category text-center">
													{" "}
													מספר אירועים לפי גדוד
												</h3>
											</CardHeader>
											<CardBody>
												<Doughnut
													data={datagdodrep}
													options={options}
												/>
											</CardBody>
										</Card>
									</Col>
								) : null}
							</>
						</Row>
					</>
				)}
			</Container>
		</Background>
	);
};

export default AdminSignInForm;
