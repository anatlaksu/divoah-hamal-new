/* eslint-disable eqeqeq */
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
import { produce } from "immer";
import { generate } from "shortid";
import { isAuthenticated } from "auth";
import Select from "components/general/Select/AnimatedSelect";
import deletepic from "assets/img/delete.png";
import CarTypesFilterObject from "components/general/CarTypeFilter/CarTypesFilterObject";
import Background from "components/general/Background/Background";

const Report = ({ match }) => {
	const { user } = isAuthenticated();
	const digits_only = (string) =>
		[...string].every((c) => "0123456789".includes(c));
	const [cartypesfilterarray, setCartypesfilterarray] = useState([]);
	const [infohurtarray, setinfohurtarray] = useState([]);
	const [dateTime, setDateTime] = useState("");

	const [propPrint, setPropPrint] = useState([]);
	const [files, setFiles] = useState([]);

	const [data, setData] = useState({
		name: "",
		lastname: "",
		personalnumber: "",
		cellphone: "",
		pikodrep: "",
		ogdarep: "",
		hativarep: "",
		gdod: "",
		gdodrep: "",
		mkabaz: "",
		arraymkabaz: [],
		zadik: "",
		typevent: "0",
		resevent: "0",
		yn: "0",
		yndate:"",
		selneshek: "",
		whap: "0",
		amlahtype: "",
		rekemtype: "0",
		mazavrekem: "0",
		dwork: "0",
		mataftype: "0",
		apitype: "0",
		mholaztype: "0",
		// mhalztype:"0",
		pirot: "",
		lessons: "",
		datevent: "",
		mikom: "",
		nifga: "",
		wnifga: "",
		hurtarray: [],
		totalWorkHours: "0",
		totalCostWorkHours: "0",
		damageCost: "0",
		spareCost: "0",
		timevent:"",
		files_id:"",
		error: false,
		successmsg: false,
		loading: false,
		redirectToReferrer: false,
	});
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
	// * cardata
	const [mkabazs, setMkabazs] = useState([]);
	const [magads, setMagads] = useState([]);
	const [magadals, setMagadals] = useState([]);
	//* isRekem
	const [mkabazsRekem, setRekem] = useState([]);
	const [indexM, setIndexM] = useState(0);

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

	const getRekem = async (magadid) => {
		let tempmagadmkabazs = [];
		if (magadid != undefined) {
			await axios
				//? should work need to test on real db
				.get(`http://localhost:8000/api/mkabaz/mkabazsbyrekem/${magadid}`)
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						tempmagadmkabazs.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
			console.log(tempmagadmkabazs);
			setRekem(tempmagadmkabazs);
		}
	};
	//* manmarit
	const loadPikods = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				setPikods(response.data);
				// setPikodsrep(response.data);
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
		// setOgdasrep(temppikodsogdas);
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
		// setHativasrep(tempogdashativas)
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
		// setGdodsrep(temphativasgdods);
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

	const handleUploadFiles = (uploadFiles) => {
		const uploaded = [...files];
		let flag = true;
		const ErrorReason = [];
		let limitExceeded = false;
		uploadFiles.some((filePush, index) => {
		  if (uploaded.findIndex((f) => f.name === filePush.name) === -1) {
			  uploaded.push(filePush);
			if (flag !== true) {
			  ErrorReason.forEach((reason) => {
				toast.error(reason);
				return false;
				// setData({ ...data, loading: false, successmsg: false, error: true });
			  });
			} else {
			  return true;
			  // setData({ ...data, loading: false, successmsg: true, error: false });
			}
			// console.log("file name: " + data.propPrint.nameFile);
			// setPropPrint({ ...propPrint, nameFile: filePush.name });
			// setTextArea({ ...textArea, nameFiletxt: filePush.name });
	
			// if (uploaded.length === MAX_COUNT) setFileLimit(true);
			if (uploaded.length < 0) {
			  // alert(`You can only add a maximum of ${MAX_COUNT} files`);
			  // setFileLimit(false);
			  limitExceeded = false;
			  return false;
			}
		  }
		  return setFiles(uploaded);
		});
		if (!limitExceeded) setFiles(uploaded);
	  };	

	//* handle changes

	const handleFileEvent = (e) => {
		e.preventDefault();
		const chosenFiles = Array.prototype.slice.call(e.target.files);
		handleUploadFiles(chosenFiles);
	  };

	function handleChange(evt) {
		const value = evt.target.value;
		if (evt.target.name == "nifga") {
			if (value == 1) {
				setData({ ...data, [evt.target.name]: value });
				setinfohurtarray((currentSpec) => [...currentSpec, { id: generate() }]);
			} else {
				setData({ ...data, [evt.target.name]: value });
			}
		}
		if (evt.target.name != "cellphone" && evt.target.name != "zadik") {
			setData({ ...data, [evt.target.name]: value });
		} else {
			if (digits_only(value)) {
				setData({ ...data, [evt.target.name]: value });
			} else {
				// console.log("you used letter in the phone number");
				toast.error("לא ניתן לכתוב אותיות בשדה זה");
			}
		}
		// if(evt.target.name === "timevent"){
		// 	const currentHours=parseInt(value.split(':')[0], 10);
		// 	const currentMinutes = parseInt(value.split(':')[1], 10);
		// 	let newHours = currentHours + 3;
		// 	if (newHours >= 24) {
		// 		newHours %= 24;
		// 	}
		// 	const value1 = `${String(newHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;
		// 	setData({ ...data, [evt.target.name]: value1 });
		// }else{
		// 	setData({ ...data, [evt.target.name]: value });
		// }

	}

	async function matafHandleChange(selectedOption, name) {
		if (!(selectedOption.value == "בחר")) {
			let i = mkabazsRekem.map((item, index) => {
				return mkabazsRekem[index].name;
			});
			console.log(1);
			let nameIndex = await i.indexOf(selectedOption.label);
			// console.log(selectedOption.label);
			console.log(nameIndex);
			await setIndexM(nameIndex);
			// console.log(mkabazsMataf[nameIndex]);
			console.log(indexM);
			console.log(mkabazsRekem[indexM].matafEngine);
			console.log(mkabazsRekem[indexM].matafCre);

			setData({ ...data, [name]: selectedOption.value });
		} else {
			let tempdata = { ...data };
			console.log(tempdata);
			delete tempdata[name];
			setData(tempdata);
		}
	}

	// * only for pikod... and magadal... should be saved in cardats not data (the report itself)
	function handleChange2(selectedOption, name) {
		// console.log(selectedOption.value);
		if (!(selectedOption.value == "בחר")) {
			// console.log(selectedOption);
			setData({ ...data, [name]: selectedOption.value });
		} else {
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
			ErrorReason += " שם ריק \n";
		}
		if (data.lastname == "") {
			flag = false;
			ErrorReason += " שם משפחה ריק \n";
		}
		if (data.personalnumber == "") {
			flag = false;
			ErrorReason += " מס אישי ריק \n";
		}
		if (data.cellphone == "") {
			flag = false;
			ErrorReason += " טלפון ריק \n";
		}
		// if (data.gdod == ("בחר" || "" || undefined || null)) {
		// 	flag = false;
		// 	ErrorReason += "  גדוד ריק \n";
		// }
		// if (data.gdodrep == ("בחר" || "" || undefined || null)) {
		// 	flag = false;
		// 	ErrorReason += "  גדוד ריק \n";
		// }

		// if (
		// 	document.getElementById("pikod").options[
		// 		document.getElementById("pikod").selectedIndex
		// 	].value == "0"
		// ) {
		// 	flag = false;
		// 	ErrorReason += " פיקוד ריק \n";
		// }
		// if (
		// 	document.getElementById("ogda").options[
		// 		document.getElementById("ogda").selectedIndex
		// 	].value == "0"
		// ) {
		// 	flag = false;
		// 	ErrorReason += " אוגדה ריק \n";
		// }
		// if (
		// 	document.getElementById("hativa").options[
		// 		document.getElementById("hativa").selectedIndex
		// 	].value == "0"
		// ) {
		// 	flag = false;
		// 	ErrorReason += " חטיבה ריק \n";
		// }
		// if (
		// 	document.getElementById("gdod").options[
		// 		document.getElementById("gdod").selectedIndex
		// 	].value == "0"
		// ) {
		// 	flag = false;
		// 	ErrorReason += " גדוד ריק \n";
		// }

		if (
			document.getElementById("seltype").options[
				document.getElementById("seltype").selectedIndex
			].value == "בחר"
		) {
			flag = false;
			ErrorReason += " סוג אירוע ריק \n";
		}

		if (
			data.typevent === "1" ||
			data.typevent === "2" ||
			data.typevent === "3" 
		) {
			if (
				document.getElementById("res").options[
					document.getElementById("res").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "סיבת האירוע ריקה \n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,אם נגרם נזק לכלי ריק \n";
			}
			if (cartypesfilterarray.length == 0
				) {
					flag = false;
					ErrorReason += " ,לא הוזן כלי\n";
				}
				for (let i = 0; i < cartypesfilterarray.length; i++) {
					if (!cartypesfilterarray[i].mkabaz) {
						ErrorReason += "  ,לא הוזן סוג כלי\n";
						flag = false;
					}
				}		
		}
		if (
			data.typevent === "4"
		) {
			if (
				document.getElementById("res").options[
					document.getElementById("res").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "סיבת האירוע ריקה \n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,אם נגרם נזק לכלי ריק \n";
			}
		}
		if (data.typevent === "5") {
			if (data.selneshek == "") {
				flag = false;
				ErrorReason += " סוג הנשק/ תחמושת ריק\n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,אם נגרם נזק ריק \n";
			}

			if (
				document.getElementById("what").options[
					document.getElementById("what").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += " מה התרחש באירוע ריק \n";
			}
		}
		if (data.typevent === "6") {
			if (
				document.getElementById("when").options[
					document.getElementById("when").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "מתי הנפגע ריק \n";
			}
			if (data.amlah == "") {
				flag = false;
				ErrorReason += " סוג האמלח ריק \n";
			}
		}
		if (data.typevent === "7") {

		if (data.mkabaz == "") {
			flag = false;
			ErrorReason += "  סוג הכלי ריק\n";
		}


			// if (data.zadik == "") {
			// 	flag = false;
			// 	ErrorReason += "  צ' ריק\n";
			// }
			// if (
			// 	document.getElementById("mataf").options[
			// 		document.getElementById("mataf").selectedIndex
			// 	].value == "0"
			// ) {
			// 	flag = false;
			// 	ErrorReason += "סוג מטף ריק \n";
			// }
			// if (
			// 	document.getElementById("rekem").options[
			// 		document.getElementById("rekem").selectedIndex
			// 	].value == "0"
			// ) {
			// 	flag = false;
			// 	ErrorReason += " סוג הרק'ם ריק \n";
			// }
			if (
				document.getElementById("mazav").options[
					document.getElementById("mazav").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "מצב הרק'ם ריק \n";
			}
			if (
				document.getElementById("dwork").options[
					document.getElementById("dwork").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += " האם בוצע במהלך עבודה ריק  \n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,אם בפירוק / הרכבה ריק \n";
			}
		}
		if (data.typevent === "9") {
			if (data.mkabaz == "") {
			flag = false;
			ErrorReason += "  סוג הכלי ריק\n";
		}

			// if (
			// 	document.getElementById("mholaz").options[
			// 		document.getElementById("mholaz").selectedIndex
			// 	].value == "0" || null
			// ) {
			// 	flag = false;
			// 	ErrorReason += "סוג הכלי המחולץ ריק \n";
			// }
			// if (data.zadik == "") {
			// 	flag = false;
			// 	ErrorReason += "  צ' ריק\n";
			// }
			// if (
			//   document.getElementById("mhalz").options[
			//     document.getElementById("mhalz").selectedIndex
			//   ].value == "0"
			// ) {
			//   flag = false;
			//   ErrorReason += "סוג הכלי המחלץ ריק \n";
			// }
		}
		if (data.pirot == "") {
			flag = false;
			ErrorReason += "  פירוט האירוע ריק \n";
		}
		if (data.mikom == "") {
			flag = false;
			ErrorReason += " ,מיקום ריק \n";
		}

		if (!data.datevent) {
			flag = false;
			ErrorReason += " ,תאריך ריק \n";
		}
		if(!data.timevent){
			const inputDate = new Date(data.datevent);	
			const formattedDate =
			  inputDate.getFullYear() +
			  "-" +
			  ("0" + (inputDate.getMonth() + 1)).slice(-2) +
			  "-" +
			  ("0" + inputDate.getDate()).slice(-2) +
			  "T" +
			  "03:00:00";
			console.log(formattedDate);
			// setDateTime(formattedDate);
			data.datevent=formattedDate;
		}


		if(data.timevent){
			// const hour = data.timevent.split(":")[0];
			// console.log(hour);
			const inputDate = new Date(data.datevent);
			const currentHours=parseInt(data.timevent.split(':')[0], 10);
			const currentMinutes = parseInt(data.timevent.split(':')[1], 10);
			let newHours = currentHours + 3;
			if (newHours >= 24) {
				newHours %= 24;
				inputDate.setDate(inputDate.getDate() + 1)
			}
			const value1 = `${String(newHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;

			// const minute = data.timevent.split(":")[1];
			const formattedDate =
			  inputDate.getFullYear() +
			  "-" +
			  ("0" + (inputDate.getMonth() + 1)).slice(-2) +
			  "-" +
			  ("0" + inputDate.getDate()).slice(-2) +
			  "T" + value1;
			// setDateTime(formattedDate);
			data.datevent=formattedDate;
		}

		// if (new Date(data.datevent).getTime()> new Date().getTime()) {
		// 	flag = false;
		// 	ErrorReason += " ,תאריך לא תקין \n";
		// }

		let datecheck= new Date(data.datevent);
		let check= datecheck.setHours(datecheck.getHours() - 3)
		if (new Date(check).getTime()> new Date().getTime()) {
			flag = false;
			ErrorReason += " ,תאריך לא תקין \n";
		}


		if (data.nifga == "") {
			flag = false;
			ErrorReason += " האם יש נפגעים ריק,\n";
		}
		if(data.nifga== "1"){
			if (infohurtarray.length == 0
				) {
					flag = false;
					ErrorReason += " ,לא הוזן נפגע\n";
				}

		for (let i = 0; i < infohurtarray.length; i++) {
			if (!infohurtarray[i].dargahurt) {
				ErrorReason += "   לא הוזן דרגת פגיעה \n";
				flag = false;
			}
			if (!infohurtarray[i].mikomhurt) {
				ErrorReason += "   לא הוזן כמות ימים \n";
				flag = false;
			}
		}
	    }

		if (flag == true) {
			SendFormData(event);
		} else {
			toast.error(ErrorReason);
		}
	};
	const SendFormData = (event) => {
		event.preventDefault();
		setData({
			...data,
			loading: true,
			successmsg: false,
			error: false,
			NavigateToReferrer: false,
		});
		const formFilesData = new FormData();
		Object.keys(files).forEach((key) => {
		formFilesData.append("files", files[key]);
		});
		axios.post("http://localhost:8000/api/multipleFiles", formFilesData, {}).then((res) => {
		console.log("from the file axios");
		console.log(res.data);
		const requestData = {
			name: data.name,
			lastname: data.lastname,
			personalnumber: data.personalnumber,
			cellphone: data.cellphone,
			gdod: data.gdod,
			gdodrep: data.gdodrep,
			ogdarep: data.ogdarep,
			hativarep: data.hativarep,
			pikodrep: data.pikodrep,
			typevent: data.typevent,
			resevent: data.resevent,
			// magadal: data.magadal,
			// magad:data.magad,
			mkabaz: data.mkabaz,
			arraymkabaz: cartypesfilterarray,
			zadik: data.zadik,
			yn: data.yn,
			yndate: data.yndate,
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
			lessons: data.lessons,
			datevent: data.datevent,
			mikom: data.mikom,
			nifga: data.nifga,
			hurtarray: infohurtarray,
			wnifga: data.wnifga,
			totalWorkHours: data.totalWorkHours,
			totalCostWorkHours: data.totalCostWorkHours,
			damageCost: data.damageCost,
			spareCost: data.spareCost,
			files_id:res.data,
		};
		console.log("In the SendFormData Func");
		console.groupCollapsed("Axios");
		console.log(requestData.datevent);
		if (!requestData.gdod == "") {
			if (!requestData.gdodrep == "") {
				axios
					.post(`http://localhost:8000/report/add`, requestData)
					.then((res) => {
						console.groupCollapsed("Axios then");
						console.log(res);
						setData({
							...data,
							loading: false,
							error: false,
							successmsg: true,
						});
						toast.success(` הדיווח נשלח בהצלחה`);
						if (user.role == "0") {
							history.push(`/dash`);
						} else if (user.role == "1") {
							history.push(`/dashamal`);
						} else if (user.role == "2") {
							history.push(`/dashadmin`);
						} else if (user.role == "3") {
							history.push(`/dash`);
						}else if (user.role == "4") {
							history.push(`/dashogda`);
						}

						console.log(res.data);
						console.groupEnd();
					})
					.catch((error) => {
						console.groupCollapsed("Axios catch error");
						console.log(error);
						toast.error("שגיאה בשליחת הדיווח");
						setData({
							...data,
							errortype: error.response.data.error,
							loading: false,
							error: true,
						});
						console.groupEnd();
					});
				console.groupEnd();
			} else {
				toast.error("לא הוזנה יחידה מדווחת");
			}
		} else {
			toast.error("לא הוזנה יחידה מנמרית");
		}
		});
	};

	const initWithUserData = () => {
		setData({
			...data,
			name: user.name,
			lastname: user.lastname,
			personalnumber: user.personalnumber,
		});
		loadPikods();
		loadPikodsrep();
		getMagadals();
	};

	useEffect(() => {
		initWithUserData();
	}, []);
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
		setRekem([]);
		getRekem(data.magad);
		console.log(data.mkabaz);
		console.log(mkabazsRekem);
	}, [data.magad]);

	useEffect(() => {
		setCartypesfilterarray([]);
	}, []);

	// useEffect(() => {
	// 	setIndexM(0);
	// }, []);

	// const selectElem = document.getElementById("mkabazM");

	return (
		<Background>
			<Container className="mt--8 pb-5">
				<Row className="justify-content-center">
					<Col
						lg="20"
						md="7"
					>
						<Card className="shadow border-0"  style={{width: "800px"}}>
							<CardBody className="px-lg-5 py-lg-5">
								<div className="text-center text-muted mb-4">
									<big>שליחת דיווח</big>
								</div>
								<div className="text-center text-muted mb-4">
									<small>פרטי מדווח</small>
								</div>
								<Form role="form">
									<FormGroup dir="rtl">
										<Input
											placeholder="שם פרטי"
											name="name"
											type="text"
											value={data.name}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup dir="rtl">
										<Input
											placeholder="שם משפחה"
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
											placeholder="מספר אישי"
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
											placeholder="טלפון נייד"
											name="cellphone"
											type="tel"
											maxlength="10"
											value={data.cellphone}
											onChange={handleChange}
										/>
									</FormGroup>
									{/*//* --------------------------------------- rep ------------------------------------------- */}
									<div className="text-center text-muted mb-4">
										<small>פרטי יחידה מדווחת</small>
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
												<h6>פיקוד</h6>
												<Select
													data={pikodsrep}
													handleChange2={handleChange2}
													name={"pikodrep"}
													val={data.pikodrep ? data.pikodrep : undefined}
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
													data={pikodsrep}
													handleChange2={handleChange2}
													name={"pikodrep"}
													val={data.pikodrep ? data.pikodrep : undefined}
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
													<h6>אוגדה</h6>
													<Select
														data={ogdasrep}
														handleChange2={handleChange2}
														name={"ogdarep"}
														val={data.ogdarep ? data.ogdarep : undefined}
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
														data={ogdasrep}
														handleChange2={handleChange2}
														name={"ogdarep"}
														val={data.ogdarep ? data.ogdarep : undefined}
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
													<h6>חטיבה</h6>
													<Select
														data={hativasrep}
														handleChange2={handleChange2}
														name={"hativarep"}
														val={data.hativarep ? data.hativarep : undefined}
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
														data={hativasrep}
														handleChange2={handleChange2}
														name={"hativarep"}
														val={data.hativarep ? data.hativarep : undefined}
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
													<h6>גדוד</h6>
													<Select
														data={gdodsrep}
														handleChange2={handleChange2}
														name={"gdodrep"}
														val={data.gdodrep ? data.gdodrep : undefined}
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
														data={gdodsrep}
														handleChange2={handleChange2}
														name={"gdodrep"}
														val={data.gdodrep ? data.gdodrep : undefined}
														isDisabled={true}
													/>
												</Col>
											)}
										</>
									</Row>
									{/* //* ----------------------------------------- manmarit ---------------------------------------------- */}

									<div className="text-center text-muted mt-3 mb-4">
										<small>פרטי יחידה מנמרית</small>
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
												<h6>פיקוד</h6>
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
												<h6>פיקוד</h6>
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
													<h6>אוגדה</h6>
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
													<h6>אוגדה</h6>
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
													<h6>חטיבה</h6>
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
													<h6>חטיבה</h6>
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
													<h6>גדוד</h6>
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
													<h6>גדוד</h6>
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
										<small>פרטי אירוע</small>
									</div>

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										סוג אירוע
									</div>
									<FormGroup>
										<Input
											placeholder="סוג אירוע"
											type="select"
											name="typevent"
											value={data.typevent}
											onChange={handleChange}
											id="seltype"
										>
											<option value={"בחר"}>בחר</option>
											<option value={"1"}>תאונת כלי רכב</option>
											<option value={"2"}>התהפכות</option>
											<option value={"3"}>הנתקות גלגל</option>
											<option value={"4"}>שריפה</option>
											<option value={"5"}>אירוע נשו"ת</option>
											<option value={"6"}>תאונת עבודה אנשי טנ"א</option>
											<option value={"7"}>פריקת מטפים</option>
											<option value={"9"}>חילוץ</option>
											<option value={"10"}>נזק לתשתיות אחזקה / הח"י</option>
											<option value={"11"}>אי קיום שגרת אחזקה</option>
											<option value={"12"}>אחר</option>
										</Input>
									</FormGroup>

									{/* תאונת כלי רכב, שריפה, הנתקות גלגל,התהפכות */}

									{(data.typevent === "1" ||
										data.typevent === "2" ||
										data.typevent === "3" ||
										data.typevent === "4") && (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												סיבת האירוע
											</div>
											<FormGroup>
												<Input
													type="select"
													name="resevent"
													value={data.resevent}
													onChange={handleChange}
													id="res"
												>
													<option value={"0"}>בחר</option>
													<option value={"1"}>תאונה</option>
													<option value={"2"}>כשל טכני</option>
													<option value={"3"}>טעות אנוש</option>
													<option value={"4"}>לא ידוע</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												סוג הכלי
											</div>
											<Row style={{ padding: "0px" }}>
												<Col
													style={{
														display: "flex",
														justifyContent: "right",
														paddingTop: "15px",
														paddingRight: "0px",
													}}
												>
													<Button
														style={{ width: "100px", padding: "10px" }}
														type="button"
														onClick={() => {
															setCartypesfilterarray((currentSpec) => [
																...currentSpec,
																{ id: generate() },
															]);
														}}
													>
														הוסף כלים
													</Button>
												</Col>
											</Row>

											{cartypesfilterarray.map(
												(cartypesfilterobject, index) => {
													return (
														<CarTypesFilterObject
															user={user}
															cartypesfilterobject={cartypesfilterobject}
															index={index}
															setCartypesfilterarray={setCartypesfilterarray}
														/>
													);
												}
											)}

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												האם נגרם נזק לכלי
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
														כן
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
														לא
													</div>
												</FormGroup>
											</div>
										</>
									)}

									{/* //* אירוע נשק */}

									{data.typevent === "5" && (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												סוג הנשק/ תחמושת
											</div>
											<FormGroup>
												<Input
													type="text"
													name="selneshek"
													value={data.selneshek}
													onChange={handleChange}
													id="selneshek"
												></Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												האם נגרם נזק לנשק
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
														כן
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
														לא
													</div>
												</FormGroup>
											</div>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												מה התרחש באירוע
											</div>
											<FormGroup>
												<Input
													type="select"
													name="whap"
													value={data.whap}
													onChange={handleChange}
													id="what"
												>
													<option value={"0"}>בחר</option>
													<option value={"1"}>פיצוץ נשק</option>
													<option value={"2"}>פיצוץ תחמושת</option>
													<option value={"3"}>פליטת כדור</option>
													<option value={"4"}>גרימת נזק לנשק</option>
													<option value={"5"}>אחר</option>
												</Input>
											</FormGroup>
										</>
									)}

									{/*//*  תאונת עבודה אנשי טנ"א */}

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
												*תאונת עבודה - כל אירוע בו קיים ימי מחלה (מיום מחלה אחד
												ומעלה)
											</p>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												מתי נפגע
											</div>
											<FormGroup>
												<Input
													type="select"
													name="wnifga"
													value={data.wnifga}
													onChange={handleChange}
													id="when"
												>
													<option value={"0"}>בחר</option>
													<option value={"1"}>במהלך פעילות אחזקתית</option>
													<option value={"2"}>במהלך פעילות שגרתית</option>
													<option value={"3"}>תרגיל</option>
													<option value={"4"}>פעילות מבצעית</option>
													<option value={"5"}>אחר</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												ממה נפגע
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

									{/*//* ------- פריקת מטפים ------------------*/}

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
														<h6>מאגד על</h6>
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
														<h6>מאגד על</h6>
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
														<h6>מאגד</h6>
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
														<h6>מאגד</h6>
														<Select
															data={magads}
															handleChange2={handleChange2}
															name={"magad"}
															val={data.magad ? data.magad : undefined}
															isDisabled={true}
														/>
													</Col>
												)}

												{data.magad ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>מקבץ</h6>
														<Select
															data={mkabazsRekem}
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
														<h6>מקבץ</h6>
														<Select
															data={mkabazsRekem}
															handleChange2={handleChange2}
															name={"mkabaz"}
															val={data.mkabaz ? data.mkabaz : undefined}
															isDisabled={true}
														/>
													</Col>
												)}
											</Row>
											{data.mkabaz == undefined ? null : !data.mkabaz == "" ? (
												<div className="mt-3">
													<FormGroup
														className="mb-3"
														dir="rtl"
													>
														<Input
															placeholder="צ'"
															name="zadik"
															type="string"
															value={data.zadik}
															onChange={handleChange}
														/>
													</FormGroup>
												</div>
											) : null}

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												סוג המטף
											</div>
											<FormGroup>
												{/* {console.log(mkabazsMataf)} */}
												{/* {console.log(mkabazsMataf[indexM])}
												{console.log(mkabazsMataf[indexM].matafEngine)}
												{console.log(mkabazsMataf[indexM].matafCre)} */}

												{mkabazsRekem[indexM] ==
												undefined ? null : mkabazsRekem[indexM] ? (
													<Input
														type="select"
														name="mataftype"
														value={data.mataftype}
														onChange={handleChange}
														id="mataf"
													>
														<option value={"0"}>בחר</option>
														<option value={"1"}>תא מנוע</option>
														<option value={"2"}>תא צוות</option>
														<option value={"3"}>תא מנוע ותא צוות</option>
													</Input>
												) : (
													!mkabazsRekem[indexM](
														<Input
															type="select"
															name="mataftype"
															value={data.mataftype}
															onChange={handleChange}
															id="mataf"
														>
															<option value={"0"}>בחר</option>
															<option value={""}>לא נמצאו כלים </option>
														</Input>
													)
												)}
											</FormGroup>
											{/* //! to be checked */}
											{/* <div style={{ textAlign: "right", paddingTop: "10px" }}>
												סוג הרק"ם
											</div>
											<FormGroup>
												<Input
													type="select"
													name="rekemtype"
													value={data.rekemtype}
													onChange={handleChange}
													id="rekem"
												>
													<option value={"0"}>בחר</option>
												</Input>
											</FormGroup> */}

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												מצב הרק"ם במהלך הפריקה
											</div>
											<FormGroup>
												<Input
													type="select"
													name="mazavrekem"
													value={data.mazavrekem}
													onChange={handleChange}
													id="mazav"
												>
													<option value={"0"}>בחר</option>
													<option value={"1"}>סטטי</option>
													<option value={"2"}>בתנועה</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												האם בוצע במהלך עבודה
											</div>
											<FormGroup>
												<Input
													type="select"
													name="dwork"
													value={data.dwork}
													onChange={handleChange}
													id="dwork"
												>
													<option value={"0"}>בחר</option>
													<option value={"1"}>אחזקתית טנ"א</option>
													<option value={"2"}>תקשוב</option>
												</Input>
											</FormGroup>

											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												במהלך פירוק / הרכבה
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
														כן
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
														לא
													</div>
												</FormGroup>
											</div>
										</>
									)}

									{/* //* ------ חילוץ  --------------*/}

									{data.typevent === "9" && (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												סוג הכלי המחולץ
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
														<h6>מאגד על</h6>
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
														<h6>מאגד על</h6>
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
														<h6>מאגד</h6>
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
														<h6>מאגד</h6>
														<Select
															data={magads}
															handleChange2={handleChange2}
															name={"magad"}
															val={data.magad ? data.magad : undefined}
															isDisabled={true}
														/>
													</Col>
												)}

												{data.magad  ? (
													<Col
														style={{
															justifyContent: "right",
															alignContent: "right",
															textAlign: "right",
														}}
													>
														<h6>מקבץ</h6>
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
														<h6>מקבץ</h6>
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
											{data.mkabaz == undefined ? null : !data.mkabaz == "" ? (
												<div className="mt-3">
													<FormGroup
														className="mb-3"
														dir="rtl"
													>
														<Input
															placeholder="צ'"
															name="zadik"
															type="string"
															value={data.zadik}
															onChange={handleChange}
														/>
													</FormGroup>
												</div>
											) : null}

											{/* <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    סוג הכלי המחלץ
                  </div>
                 <FormGroup>
                    <Input
                      type="select"
                      name="mhalztype"
                      value={data.mhalztype}
                      onChange={handleChange}
                      id="mhalz"
                    >
                      <option value={"0"}>בחר</option>
                    </Input>
                  </FormGroup>
 */}
										</>
									)}

									<FormGroup dir="rtl" style={{paddingTop: "10px" }}>
										<Input
											placeholder="פירוט האירוע"
											name="pirot"
											type="textarea"
											value={data.pirot}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup dir="rtl">
										<Input
											placeholder="לקחים ותובנות"
											name="lessons"
											type="textarea"
											value={data.lessons}
											onChange={handleChange}
										/>
									</FormGroup>

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										תאריך אירוע
									</div>
									<FormGroup dir="rtl">
										<Input
											placeholder="תאריך אירוע"
											name="datevent"
											type="date"
											value={data.datevent}
											onChange={handleChange}
										/>
									</FormGroup>

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										שעת אירוע
									</div>
									<FormGroup dir="rtl">
										<Input
											placeholder="שעת אירוע"
											name="timevent"
											type="time"
											value={data.timevent}
											onChange={handleChange}
										/>
									</FormGroup>



									<FormGroup dir="rtl">
										<Input
											placeholder="מיקום האירוע"
											name="mikom"
											type="string"
											value={data.mikom}
											onChange={handleChange}
										/>
									</FormGroup>

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										האם יש נפגעים
									</div>
									<div
										className="mb-2"
										style={{ textAlign: "right" }}
									>
										<FormGroup
											check
											inline
										>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												<Input
													// placeholder="ללא נפגעים "
													name="nifga"
													type="radio"
													value="1"
													onChange={handleChange}
												/>
												כן
											</div>
										</FormGroup>

										<FormGroup
											check
											inline
										>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												<Input
													// placeholder="הוסף נפגעים"
													name="nifga"
													type="radio"
													value="0"
													onChange={handleChange}
												/>
												ללא נפגעים
											</div>
										</FormGroup>

										<FormGroup
											check
											inline
										>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												<Input
													// placeholder="הוסף נפגעים"
													name="nifga"
													type="radio"
													value="2"
													onChange={handleChange}
												/>
												לא ידוע
											</div>
										</FormGroup>
									</div>

									{data.nifga === "1" && (
										<>
											<div>
												{infohurtarray.length == 0 ? (
													<Row>
														<Col
															style={{ display: "flex", textAlign: "right" }}
														>
															<Button
																style={{ width: "100px", padding: "5px" }}
																type="button"
																onClick={() => {
																	setinfohurtarray((currentSpec) => [
																		...currentSpec,
																		{ id: generate() },
																	]);
																}}
															>
																הוסף נפגע
															</Button>
														</Col>
													</Row>
												) : (
													infohurtarray.map((p, index) => {
														return (
															<div>
																{index == 0 ? (
																	<Row>
																		<Col
																			style={{
																				display: "flex",
																				textAlign: "right",
																			}}
																		>
																			<Button
																				style={{
																					width: "100px",
																					padding: "5px",
																				}}
																				type="button"
																				onClick={() => {
																					setinfohurtarray((currentSpec) => [
																						...currentSpec,
																						{ id: generate() },
																					]);
																				}}
																			>
																				הוסף נפגע
																			</Button>
																		</Col>
																	</Row>
																) : null}
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
																					דרגת הפציעה
																				</p>
																				<Input
																					onChange={(e) => {
																						const dargahurt = e.target.value;
																						if (e.target.value != "בחר")
																							setinfohurtarray((currentSpec) =>
																								produce(currentSpec, (v) => {
																									v[index].dargahurt =
																										dargahurt;
																								})
																							);
																					}}
																					value={p.dargahurt}
																					type="select"
																					placeholder="דרגת הפציעה"
																				>
																					<option value={"בחר"}>{"בחר"}</option>
																					<option value={"קל"}>{"קל"}</option>
																					<option value={"בינוני"}>
																						{"בינוני"}
																					</option>
																					<option value={"קשה"}>{"קשה"}</option>
																					<option value={"מת"}>{"מת"}</option>
																					<option value={"לא ידוע"}>
																						{"לא ידוע"}
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
																					מספר ימי מחלה
																				</p>
																				<Input
																					onChange={(e) => {
																						const mikomhurt = e.target.value;
																						if (e.target.value != "")
																							setinfohurtarray((currentSpec) =>
																								produce(currentSpec, (v) => {
																									v[index].mikomhurt =
																										mikomhurt;
																								})
																							);
																					}}
																					value={p.mikomhurt}
																					type="number"
																					placeholder="0"
																					min="0"
																				/>
																			</div>
																		</Col>
																	</Row>
																}
																<Button
																	type="button"
																	onClick={() => {
																		setinfohurtarray((currentSpec) =>
																			currentSpec.filter((x) => x.id !== p.id)
																		);
																	}}
																>
																	<img
																		src={deletepic}
																		height="20px"
																	></img>
																</Button>
															</div>
														);
													})
												)}
											</div>
										</>
									)}

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
									קובץ תחקיר ביטחוני
									</div>
										<Input
											placeholder="העלאת קובץ"
											type="file"
											accept="application/pdf,
											image/png,
											image/jpeg,
												application/vnd.ms-excel,
												application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
												application/vnd.ms-powerpoint, 
												application/vnd.openxmlformats-officedocument.presentationml.presentation,
												application/msword,
												application/vnd.openxmlformats-officedocument.wordprocessingml.document"
											onChange={handleFileEvent}
										/>

									<div className="text-center">
										<button
											onClick={clickSubmit}
											className="btn-new-blue"
										>
											שליחה
										</button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Background>
	);
};

export default withRouter(Report);
