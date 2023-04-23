import React, { useState, useEffect } from "react";
import { createContext } from "react";
import ToggleButton from "react-toggle-button";

import { Link, withRouter, Redirect, Prompt } from "react-router-dom";
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
import { Line, Pie, Doughnut, PolarArea, Bar } from "react-chartjs-2";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Background from "components/general/Background/Background";
import ToggleDarkModeButton from "../../components/general/Navbars/BazakNavbar/ToggleDarkModeButton/ToggleDarkModeButton";

const AdminSignInForm = (props) => {
	const [isError, setIsError] = useState(false);
	//* main data
	const [reportDB, setReportDB] = useState([]);
	const [data, setData] = useState([]);
	const [reportDBFillter, setReportDFillter] = useState([]);
	//* units
	const [gdods, setGdods] = useState([]);
	const [hativas, setHativas] = useState([]);
	const [ogdas, setOgdas] = useState([]);
	const [pikods, setPikods] = useState([]);
	//* options
	const [gdodsop, setGdodsop] = useState([]);
	const [hativasop, setHativasop] = useState([]);
	const [ogdasop, setOgdasop] = useState([]);
	const [pikodsop, setPikodsop] = useState([]);
	//*manmarit reporting
	const [manmarit, setmanmarit] = useState(true);

	const [gdodim, setGdodim] = useState([]);

	// const [filter, setFilter] = useState([]);
	//* dark mode button
	const [color, setcolor] = useState("white");

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
		5: 'אירוע נשו"ת',
		6: 'תאונת עבודה אנשי טנ"א',
		7: "פריקת מטפים",
		8: "אפידמיה",
		9: "חילוץ",
		10: 'נזק לתשתיות אחזקה / הח"י',
		11: "אי קיום שגרת אחזקה",
		12: "אחר",
		רקם: 'רק"ם',
	};

	//* ------- supporting functions --------------------------------

	// function init() {
	// 	if (color == "white") settemptheme(true);
	// 	if (color == "rgb(32 33 51)") settemptheme(false);
	// }
	//* ------------------------ units ---------------------------------------------------------
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

	//* ------------------------ reports ---------------------------------------------------------

	const loadReports = () => {
		axios.get(`http://localhost:8000/report/readall`).then((res) => {
			// console.log(res);
			console.log("all");
			console.log(res.data);
			const reports = res.data;
			reports.reverse();
			setReportDB(reports);
		});
	};

	const loadReportsByDate = (from, to) => {
		// console.log("try by date");
		// console.log(from);
		// console.log(to);
		axios
			.get(`http://localhost:8000/report/byDate/readall/${from}/${to}`)
			.then((res) => {
				// console.log(res);
				// console.log("by date");
				// console.log(res.data);
				const reports = res.data;
				reports.reverse();
				setReportDB(reports);
				if (reportDBFillter.length == 0) {
					setReportDFillter(reports);
				}
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

	function handleChange(evt) {
		const value = evt.target.value;
		console.log(evt.target.value);
		console.log(evt.target.name);
		setData({ ...data, [evt.target.name]: value });
		console.log(new Date(data.fromdate).setHours(0, 0, 0, 0));
		console.log(data.todate);
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

			// console.log(data);
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
		manmarit
			? setReportDFillter(
					report.filter((rp) =>
						unit == "pikod"
							? dataUnit.includes(rp.pikod)
							: unit == "ogda"
							? dataUnit.includes(rp.ogda)
							: unit == "hativa"
							? dataUnit.includes(rp.hativa)
							: null
					)
			  )
			: setReportDFillter(
					report.filter((rp) =>
						unit == "pikod"
							? dataUnit.includes(rp.pikodrep)
							: unit == "ogda"
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
			case typeof data.pikod == "object":
				reportDBFl(reportDB, data.pikod, "pikod");
				// console.log(data.pikod);
				break;

			default:
				setReportDFillter(reportDB);
				console.log("def");
				break;
		}
	}

	//* clock options settings ----------------------------------------------------------------

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

	const optionsBar = {
		//* on civil
		responsive: true,
		scales: {
			x: {
			  stacked: true,
			},
			y: {
			  stacked: true
			}
		  }
	};


	const labels = [
		"תאונת כלי רכב",
		"התהפכות",
		"הנתקות גלגל",
		"שריפה",
		'אירוע נשו"ת',
		'תאונת עבודה אנשי טנ"א',
		"פריקת מטפים",
		"חילוץ",
		'נזק לתשתיות אחזקה / הח"י',
		"אי קיום שגרת אחזקה",
		"אחר",
		'רק"ם',
	];

	//* clocks + clock supporting functions and calculates ----------------------------------------------------------------

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

	const colors=["rgb(230, 115, 136)","rgb(255, 94, 94)","rgb(255, 129, 94)","	rgb(255, 164, 94)","rgb(255, 199, 94)","rgb(255, 218, 94)","rgb(255, 235, 95)","rgb(255, 255, 94)","rgb(189, 213, 78)","rgb(118, 170, 62)","rgb(48, 128, 47)","rgb(31, 84, 83)","rgb(63, 90, 171)","rgb(94, 94, 255)","rgb(95, 79, 214)","rgb(94, 63, 171)","rgb(96, 48, 130)","rgb(121, 74, 148)","rgb(147, 104, 166)","rgb(195, 161, 201)"];

	// const fillterReport = reportDB.filter();

	const dataevent = {
		labels: labels,
		datasets: [
			{
				label: "# of Votes",
				data: sumtypereport(labels, reportDB, eventTypeArray),
				backgroundColor: colors.map((col)=>col),
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
				backgroundColor: colors.map((col)=>col),
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
				backgroundColor: colors.map((col)=>col),
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
				backgroundColor: colors.map((col)=>col),
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
		console.log(arr1);
		const colorsar = colors.map((col)=>col).slice(0,arr1.length+1);
		return colorsar;
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

	const dataogda = {
		labels: arryogda.map((ogda) => ogda.name),
		datasets: [
			{
				label: "# of Votes",
				data: sumogda(arryogda, reportDB),
				backgroundColor: randomcolor(arryogda),
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
				backgroundColor: randomcolor(arryogda),
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
				backgroundColor: randomcolor(arryhativa),
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
				backgroundColor: randomcolor(arryhativa),
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

	// ------------------------------------------------------- graf by month ---------------------------------
	const monthlabel= ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

	const databymonthpikod = {
		labels: monthlabel,
		datasets: pikodmonth(pikods,reportDB).map((mo)=> mo)
	  };
	
	  const databymonthogda = {
		labels: monthlabel,
		datasets: ogdamonth(arryogda,reportDB).map((mo)=> mo)
	  };
	
	  const databymonthhativa = {
		labels: monthlabel,
		datasets: hativamonth(arryhativa,reportDB).map((mo)=> mo)
	  };
	
	  const databymonthgdod = {
		labels: monthlabel,
		datasets: gdodmonth(arrygdod,reportDB).map((mo)=> mo)
	  };

	  function pikodmonth(arr1,arr2){
		let arrdata=[{label:"",data:[],backgroundColor:''}];
		for(let i=0;i<arr1.length;i++)
		{
			arrdata[i].label=arr1[i].name;
			arrdata[i].backgroundColor=colors[i];
			for(let m=1;m<=12;m++){
			let sumbynum=0;
			  for(let j=0;j<arr2.length;j++){
				  if(arr2[j].pikod==arr1[i]._id){
					if(new Date(arr2[j].datevent).getYear()== new Date().getYear()){

				  if(new Date(arr2[j].datevent).getMonth()==m){
					sumbynum++;
				  }
				}
				}
				}
				arrdata[i].data[m]=sumbynum;
			}
			arrdata.push({label:"",data:[],backgroundColor:''})
		}
		return arrdata;
	}
	
	function ogdamonth(arr1,arr2){
		let arrdata=[{label:"",data:[],backgroundColor:''}];
		for(let i=0;i<arr1.length;i++)
		{
			arrdata[i].label=arr1[i].name;
			arrdata[i].backgroundColor=colors[i];
			for(let m=1;m<=12;m++){
			let sumbynum=0;
			  for(let j=0;j<arr2.length;j++){
				  if(arr2[j].ogda==arr1[i]._id){
					if(new Date(arr2[j].datevent).getYear()== new Date().getYear()){

				  if(new Date(arr2[j].datevent).getMonth()==m){
					sumbynum++;
				  }
				}
				}
				}
				arrdata[i].data[m]=sumbynum;
			}
			arrdata.push({label:"",data:[],backgroundColor:''})
		}
		return arrdata;
	}
	
	function hativamonth(arr1,arr2){
		let arrdata=[{label:"",data:[],backgroundColor:''}];
		for(let i=0;i<arr1.length;i++)
		{
			arrdata[i].label=arr1[i].name;
			arrdata[i].backgroundColor=colors[i];
			for(let m=1;m<=12;m++){
			let sumbynum=0;
			  for(let j=0;j<arr2.length;j++){
				  if(arr2[j].hativa==arr1[i]._id){
					if(new Date(arr2[j].datevent).getYear()== new Date().getYear()){

				  if(new Date(arr2[j].datevent).getMonth()==m){
					sumbynum++;
				  }
				}
				}
				}
				arrdata[i].data[m]=sumbynum;
			}
			arrdata.push({label:"",data:[],backgroundColor:''})
		}
		return arrdata;
	}
	
	function gdodmonth(arr1,arr2){
		let arrdata=[{label:"",data:[],backgroundColor:''}];
		for(let i=0;i<arr1.length;i++)
		{
			arrdata[i].label=arr1[i].name;
			arrdata[i].backgroundColor=colors[i];
			for(let m=1;m<=12;m++){
			let sumbynum=0;
			  for(let j=0;j<arr2.length;j++){
				  if(arr2[j].gdod==arr1[i]._id){
					if(new Date(arr2[j].datevent).getYear()== new Date().getYear()){

				  if(new Date(arr2[j].datevent).getMonth()==m){
					sumbynum++;
				  }
				}
				}
				}
				arrdata[i].data[m]=sumbynum;
			}
			arrdata.push({label:"",data:[],backgroundColor:''})
		}
		return arrdata;
	}
	

const databymonthpikodrep = {
	labels: monthlabel,
	datasets: pikodrepmonth(pikods,reportDB).map((mo)=> mo)
  };

  const databymonthogdarep = {
	labels: monthlabel,
	datasets: ogdarepmonth(arryogda,reportDB).map((mo)=> mo)
  };

  const databymonthhativarep = {
	labels: monthlabel,
	datasets: hativarepmonth(arryhativa,reportDB).map((mo)=> mo)
  };

  const databymonthgdodrep = {
	labels: monthlabel,
	datasets: gdodrepmonth(arrygdod,reportDB).map((mo)=> mo)
  };


function pikodrepmonth(arr1,arr2){
	let arrdata=[{label:"",data:[],backgroundColor:''}];
	for(let i=0;i<arr1.length;i++)
	{
		arrdata[i].label=arr1[i].name;
		arrdata[i].backgroundColor=colors[i];
		for(let m=1;m<=12;m++){
		let sumbynum=0;
		  for(let j=0;j<arr2.length;j++){
			  if(arr2[j].pikodrep==arr1[i]._id){
				if(new Date(arr2[j].datevent).getYear()== new Date().getYear()){
			  if(new Date(arr2[j].datevent).getMonth()==m){
				sumbynum++;
			  }
			}
			}
			}
			arrdata[i].data[m]=sumbynum;
		}
		arrdata.push({label:"",data:[],backgroundColor:''})
	}
	return arrdata;
}

function ogdarepmonth(arr1,arr2){
	let arrdata=[{label:"",data:[],backgroundColor:''}];
	for(let i=0;i<arr1.length;i++)
	{
		arrdata[i].label=arr1[i].name;
		arrdata[i].backgroundColor=colors[i];
		for(let m=1;m<=12;m++){
		let sumbynum=0;
		  for(let j=0;j<arr2.length;j++){
			  if(arr2[j].ogdarep==arr1[i]._id){
				if(new Date(arr2[j].datevent).getYear()== new Date().getYear()){

			  if(new Date(arr2[j].datevent).getMonth()==m){
				sumbynum++;
			  }
			}
			}
			}
			arrdata[i].data[m]=sumbynum;
		}
		arrdata.push({label:"",data:[],backgroundColor:''})
	}
	return arrdata;
}

function hativarepmonth(arr1,arr2){
	let arrdata=[{label:"",data:[],backgroundColor:''}];
	for(let i=0;i<arr1.length;i++)
	{
		arrdata[i].label=arr1[i].name;
		arrdata[i].backgroundColor=colors[i];
		for(let m=1;m<=12;m++){
		let sumbynum=0;
		  for(let j=0;j<arr2.length;j++){
			  if(arr2[j].hativarep==arr1[i]._id){
				if(new Date(arr2[j].datevent).getYear()== new Date().getYear()){

			  if(new Date(arr2[j].datevent).getMonth()==m){
				sumbynum++;
			  }
			}
			}
			}
			arrdata[i].data[m]=sumbynum;
		}
		arrdata.push({label:"",data:[],backgroundColor:''})
	}
	return arrdata;
}

function gdodrepmonth(arr1,arr2){
	let arrdata=[{label:"",data:[],backgroundColor:''}];
	for(let i=0;i<arr1.length;i++)
	{
		arrdata[i].label=arr1[i].name;
		arrdata[i].backgroundColor=colors[i];
		for(let m=1;m<=12;m++){
		let sumbynum=0;
		  for(let j=0;j<arr2.length;j++){
			  if(arr2[j].gdodrep==arr1[i]._id){
				if(new Date(arr2[j].datevent).getYear()== new Date().getYear()){

			  if(new Date(arr2[j].datevent).getMonth()==m){
				sumbynum++;
			  }
			}
			}
			}
			arrdata[i].data[m]=sumbynum;
		}
		arrdata.push({label:"",data:[],backgroundColor:''})
	}
	return arrdata;
}

	// ------------------------------------------------------- graf by month ---------------------------------

	//* --------------------- useEffects -------------------------------------

	useEffect(() => {
		data.fromdate && data.todate
			? loadReportsByDate(data.fromdate, data.todate)
			: loadReports();
	}, [data]);

	//* manmait - reporting + typeevent clock
	useEffect(() => {
		reportSwitch();
		console.table(reportDBFillter);
		// console.log(typeof data.gdod);
		// console.log(reportDBFillter.length);

		console.log(reportDB.reduce((a, b) => a.damageCost + b.damageCost, 0));

		// console.log(manmarit);
	}, [data, manmarit]);

	useEffect(() => {
		loadReports();
		loadPikods();
		loadGdodim();
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
		arr = arr.map((num) => {
			return +num;
		});
		console.log(arr);
		let sum = arr.reduce(function (a, b) {
			return a + b;
		}, 0);
		return sum;
	}

	//* ----------- is rendered --------------------------------

	return (
		<Background>
			<Container
				className="mt--8 pb-5"
				// style={{ marginRight: "10%" }}
			>
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
										<Row className="mt-3">
											{manmarit ? (
												<div
													className="ml-3 mr-3"
													style={{ textAlign: "right" }}
												>
													יחידה מדווחת
												</div>
											) : (
												<div
													className="ml-3 mr-3"
													style={{ textAlign: "right" }}
												>
													יחידה מנמרי"ת
												</div>
											)}
											<ToggleButton
												colors={{
													activeThumb: {
														base: "rgb(250,250,250)",
													},
													inactiveThumb: {
														base: "rgb(62,130,247)",
													},
													active: {
														base: "rgb(62,130,247)",
														hover: "rgb(84 155 245)",
													},
													inactive: {
														base: "rgb(65,66,68)",
														hover: "rgb(95,96,98)",
													},
												}}
												inactiveLabel={
													/*<img src={darkmodeimg} style={{ width: '15px', height: '15px' }}></img>*/ <p>
														בהיר
													</p>
												}
												activeLabel={
													/*<img src={lightmodeimg} style={{ width: '15px', height: '15px' }}></img>*/ <p>
														כהה
													</p>
												}
												value={manmarit}
												onToggle={() => {
													setmanmarit(!manmarit);
												}}
											/>
										</Row>

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
										</Row>
									</Col>
								</Row>
							</Card>
						</Collapse>
					</div>
				</Row>
				{/* <Row>
					<CardHeader>
					<h3 className="card-category text-center">{pikodmonth(pikods)}</h3>

					</CardHeader>
				</Row> */}
				{/*//todo dont let the user put todate larger then from date or make a fail safe like in divoahReport lines 340 - 374 */}
				{data.fromdate && data.todate ? (
					<Row>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center"> סה"כ עלות נזק</h3>
								</CardHeader>
								<CardBody>
									{data.pikod ? (
										<h2 className="text-center">
											{gettotal(
												reportDBFillter
													.filter(
														(report) =>
															new Date(report.datevent).setHours(0, 0, 0, 0) >=
																new Date(data.fromdate).setHours(0, 0, 0, 0) &&
															new Date(report.datevent).setHours(0, 0, 0, 0) <=
																new Date(data.todate).setHours(0, 0, 0, 0)
													)
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.damageCost)
											)}
										</h2>
									) : (
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
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.damageCost)
											)}
										</h2>
									)}
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
									{data.pikod ? (
										<h2 className="text-center">
											{gettotal(
												reportDBFillter
													.filter(
														(report) =>
															new Date(report.datevent).setHours(0, 0, 0, 0) >=
																new Date(data.fromdate).setHours(0, 0, 0, 0) &&
															new Date(report.datevent).setHours(0, 0, 0, 0) <=
																new Date(data.todate).setHours(0, 0, 0, 0)
													)
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.totalWorkHours)
											)}
										</h2>
									) : (
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
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.totalWorkHours)
											)}
										</h2>
									)}
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
									{data.pikod ? (
										<h2 className="text-center">
											{gettotal(
												reportDBFillter
													.filter(
														(report) =>
															new Date(report.datevent).setHours(0, 0, 0, 0) >=
																new Date(data.fromdate).setHours(0, 0, 0, 0) &&
															new Date(report.datevent).setHours(0, 0, 0, 0) <=
																new Date(data.todate).setHours(0, 0, 0, 0)
													)
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.totalCostWorkHours)
											)}
										</h2>
									) : (
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
													.filter((rep) => rep.typevent  == "רקם")
													.map((report) => report.totalCostWorkHours)
											)}
										</h2>
									)}
								</CardBody>
							</Card>
						</Col>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center"> מספר אירועים</h3>
								</CardHeader>
								{data.pikod ? (
									<h2 className="text-center">
										{getnumevt(
											reportDBFillter.filter(
												(report) =>
													new Date(report.datevent).setHours(0, 0, 0, 0) >=
														new Date(data.fromdate).setHours(0, 0, 0, 0) &&
													new Date(report.datevent).setHours(0, 0, 0, 0) <=
														new Date(data.todate).setHours(0, 0, 0, 0)
											)
										)}
									</h2>
								) : (
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
								)}

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
									{data.pikod ? (
										<h2 className="text-center">
											{gettotal(
												reportDBFillter
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.damageCost)
											)}
										</h2>
									) : (
										<h2 className="text-center">
											{gettotal(
												reportDB
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.damageCost)
											)}
										</h2>
									)}
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
									{data.pikod ? (
										<h2 className="text-center">
											{gettotal(
												reportDBFillter
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.totalWorkHours)
											)}
										</h2>
									) : (
										<h2 className="text-center">
											{gettotal(
												reportDB
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.totalWorkHours)
											)}
										</h2>
									)}
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
									{data.pikod ? (
										<h2 className="text-center">
											{gettotal(
												reportDBFillter
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.totalCostWorkHours)
											)}
										</h2>
									) : (
										<h2 className="text-center">
											{gettotal(
												reportDB
													.filter((rep) => rep.typevent == "רקם")
													.map((report) => report.totalCostWorkHours)
											)}
										</h2>
									)}
								</CardBody>
							</Card>
						</Col>
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center"> מספר אירועים</h3>
								</CardHeader>
								{data.pikod ? (
									<h2 className="text-center">{getnumevt(reportDBFillter)}</h2>
								) : (
									<h2 className="text-center">{getnumevt(reportDB)}</h2>
								)}
								<CardBody></CardBody>
							</Card>
						</Col>
					</Row>
				)}

				{manmarit ? (
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
													{data.length == 0 && !data.pikod ? (
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
													) : !data.pikod ? (
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
													{data.length == 0 && !data.pikod ? (
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
													) : !data.pikod ? (
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
										{data.length == 0 ? (
											<Doughnut
												data={dataevent}
												options={options}
											/>
										) : !data.pikod ? (
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
											{!data.pikod ? (
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
						<Row>
						{!data.pikod ? (
							<Col lg="12">
								<Card className="card-chart">
									<CardHeader>
										<h3 className="card-category text-center">
											{" "}
											מספר אירועים בכל פיקוד לפי חודשים
										</h3>
									</CardHeader>
									<CardBody>
									{!data.pikod ? (
											<Bar
												data={databymonthpikod}
												options={optionsBar}
											/>
											) :null}
									</CardBody>
								</Card>
							</Col>
							) : null}
							{data.pikod && !data.ogda && !data.hativa ? (
							<Col lg="12">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										מספר אירועים בכל אוגדה לפי חודשים
									</h3>
								</CardHeader>
								<CardBody>
										<Bar
											data={databymonthogda}
											options={optionsBar}
										/>
								</CardBody>
							</Card>
						</Col>
						) : null}
						<>
								{data.ogda && !data.hativa ? (
							<Col lg="12">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										מספר אירועים בכל חטיבה לפי חודשים
									</h3>
								</CardHeader>
								<CardBody>
										<Bar
											data={databymonthhativa}
											options={optionsBar}
										/>
								</CardBody>
							</Card>
						</Col>
								) : null}
							</>
							<>
								{data.hativa ? (
							<Col lg="12">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										מספר אירועים בכל גדוד לפי חודשים
									</h3>
								</CardHeader>
								<CardBody>
										<Bar
											data={databymonthgdod}
											options={optionsBar}
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
											{data.length == 0 && !data.pikod ? (
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
											) : !data.pikod ? (
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
										{data.length == 0 ? (
											<Doughnut
												data={dataevent}
												options={options}
											/>
										) : !data.pikod ? (
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
											{!data.pikod ? (
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
						<Row>
						{!data.pikod ? (
							<Col lg="12">
								<Card className="card-chart">
									<CardHeader>
										<h3 className="card-category text-center">
											{" "}
											מספר אירועים בכל פיקוד לפי חודשים
										</h3>
									</CardHeader>
									<CardBody>
									{!data.pikod ? (
											<Bar
												data={databymonthpikodrep}
												options={optionsBar}
											/>
											) :null}
									</CardBody>
								</Card>
							</Col>
							) : null}
							{data.pikod && !data.ogda && !data.hativa ? (
							<Col lg="12">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										מספר אירועים בכל אוגדה לפי חודשים
									</h3>
								</CardHeader>
								<CardBody>
										<Bar
											data={databymonthogdarep}
											options={optionsBar}
										/>
								</CardBody>
							</Card>
						</Col>
						) : null}
						<>
								{data.ogda && !data.hativa ? (
							<Col lg="12">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										מספר אירועים בכל חטיבה לפי חודשים
									</h3>
								</CardHeader>
								<CardBody>
										<Bar
											data={databymonthhativarep}
											options={optionsBar}
										/>
								</CardBody>
							</Card>
						</Col>
								) : null}
							</>
							<>
								{data.hativa ? (
							<Col lg="12">
							<Card className="card-chart">
								<CardHeader>
									<h3 className="card-category text-center">
										{" "}
										מספר אירועים בכל גדוד לפי חודשים
									</h3>
								</CardHeader>
								<CardBody>
										<Bar
											data={databymonthgdodrep}
											options={optionsBar}
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
