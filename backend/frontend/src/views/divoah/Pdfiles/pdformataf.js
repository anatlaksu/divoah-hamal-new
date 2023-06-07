import React, { useState, useEffect } from "react";
import image from "../../../assets/img/emergencyODOT.jpg";
import { Page, Text, View, Document, StyleSheet, Image, Line,Font } from "@react-pdf/renderer";
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
// import src from "react-select/dist/declarations/src";
import logotene from "assets/img/logotene.png"
import Logo100 from "assets/img/team100.png";

const Pdformataf = ({datareport}) => {
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

		useEffect(() => {
			loadPikods();
			loadPikodsrep();
			getMagadals();	
		}, []);

		function getname(idnum, arr) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i]._id == idnum) return arr[i].name;
			}
		}
	

	// * ------ manmarit --------------------------------
	useEffect(() => {
		setOgdas([]);
		loadOgdas(datareport.pikod);
	}, [datareport.pikod]);

	useEffect(() => {
		setHativas([]);
		loadHativas(datareport.ogda);
	}, [datareport.ogda]);

	useEffect(() => {
		setGdods([]);
		loadGdods(datareport.hativa);
	}, [datareport.hativa]);
	//* ------ rep ----------------------------------------------------------------
	useEffect(() => {
		setOgdasrep([]);
		loadOgdasrep(datareport.pikodrep);
	}, [datareport.pikodrep]);

	useEffect(() => {
		setHativasrep([]);
		loadHativasrep(datareport.ogdarep);
	}, [datareport.ogdarep]);

	useEffect(() => {
		setGdodsrep([]);
		loadGdodsrep(datareport.hativarep);
	}, [datareport.hativarep]);
	//* ------ magdal .... --------------------------------
	useEffect(() => {
		setMagads([]);
		getMagads(datareport.magadal);
	}, [datareport.magadal]);

	useEffect(() => {
		setMkabazs([]);
		getMkabazs(datareport.magad);
	}, [datareport.magad]);

	useEffect(() => {
		setMkabazs([]);
		getMkabazs();
	}, [datareport.mkabaz]);

	

	Font.register({
		family: 'Rubik',
		src: "http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf" });
	const styles = StyleSheet.create({
	  page: {
		backgroundColor: "white"
	  },
	  section1: {
		padding: 10,
		flexGrow: 1
	  },
	  section2: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	  },
	  section3: {
		flexDirection: 'row',
        justifyContent: 'flex-end',
		paddingRight: 30,
	  },


	  image1: {
		width: 100,
		height: 100,
		margin: 10,
		padding: 10,
	  },
	  image2: {
		width: 100,
		height: 100,
		marginLeft: 10,
		padding: 10,
	  },
	  text:{
		fontSize: 10,
	fontFamily: 'Rubik',
		textAlign: 'center',
		direction: 'rtl',
	  },
	  text2:{
		fontSize: 16,
		paddingTop: 80,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',

	  },
	  text3: {
		fontSize: 14,
		paddingTop: 10,
		marginRight: 200,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',
		textDecoration: 'underline',
	  },
	  text4: {
		fontSize: 14,
		paddingTop: 10,
		fontFamily: 'Rubik',
		textAlign: 'left',
		direction: 'ltr',
		marginLeft: 10,
		textDecoration: 'underline',
	  },
	  text5:{
		fontSize: 12,
		paddingTop: 10,
		// marginRight: 200,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',
		right:75,
	  },
	  text6:{
		fontSize: 12,
		paddingTop: 10,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',
		marginLeft: 10,
		overflowWrap: 'break-word',
	  },
	  firstTextContainer: {
		maxWidth: 200,
		width:200 // Set the length range for the first text
	  },
	  line: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 1,
		backgroundColor: 'black',
	  },
	  underline: {
		height: 1,
		backgroundColor: 'black',
		marginTop: 2,
	  },
	  footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 50,
		fontSize: 10,
		fontFamily: 'Rubik',
		paddingRight: 10,
		paddingLeft: 10,
	  },
	  image3: {
		width: 40,
		height: 40,
		// marginLeft: 
	  },
	  text7:{
		fontSize: 10,
	    fontFamily: 'Rubik',
		direction: 'rtl',
		marginLeft: 170
	  },
	  text8:{
		fontSize: 10,
	    fontFamily: 'Rubik',
		direction: 'rtl',
		marginLeft: 140
	  },


	});
	return (
	  <Document>
		{/** Page defines a single page of content. */}
		
		<Page size="A4" style={styles.page}>
		<View style={styles.section1}>
			<Text style={styles.text}>שמור</Text>
			<View style={styles.section2}>
			<Image
				src={logotene} // Replace with the path to your image file
				style={styles.image1}
				/>
				<Text style={styles.text2}>דוח אירוע חריג</Text>
			<Image
				src={logotene} // Replace with the path to your image file
				style={styles.image1}
				/>
			</View>
			<hr style={{height: "3px" ,color:"black",backgroundColor: "black"}}></hr>
			<View style={styles.section3}>
				<Text style={styles.text3}>תאריך ומיקום אירוע</Text>
				<Text style={styles.text4}>פרטי מדווח</Text>	
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}>{datareport.datevent.slice(11, 16)} {datareport.datevent.slice(0, 10).split("-").reverse().join("-")}תאריך אירוע: </Text>
				<View style={styles.firstTextContainer}>
				<Text style={styles.text6}>{datareport.lastname} {datareport.name} שם: </Text>	
				</View>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}>{datareport.mikom}מיקום האירוע: </Text>
				<View style={styles.firstTextContainer}>
				<Text style={styles.text6}>{datareport.personalnumber} :מ.א.</Text>	
				</View>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>	
				<Text style={styles.text6}>{datareport.cellphone} :מספר טלפון</Text>	
			</View>
			<View style={styles.section3}>
				<Text style={styles.text3}>פרטי נפגעים</Text>
				<Text style={styles.text4}>פרטי יחידות</Text>	
			</View>
			<View style={styles.section3}>
				{datareport.nifga == 0 ? (
					<Text style={styles.text5}>האם יש נפגעים: לא</Text>	
				):( <>
					{ datareport.nifga == 1 ? (
					<Text style={styles.text5}>האם יש נפגעים: כן</Text>	
					):(
						<Text style={styles.text5}>האם יש נפגעים: לא ידוע</Text>	
				)}
				</>	
				)}
				<View style={styles.firstTextContainer}>
				<Text style={styles.text6}>{getname(datareport.gdodrep,gdodsrep)}/{getname(datareport.hativarep,hativasrep)}/{getname(datareport.ogdarep,ogdasrep)}/{getname(datareport.pikodrep,pikodsrep)}יחידה מדווחת: </Text>
				</View>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}>{datareport.hurtarray.length}מספר נפגעים: </Text>	
				<View style={styles.firstTextContainer}>
				<Text style={styles.text6}>{getname(datareport.gdod,gdods)}/{getname(datareport.hativa,hativas)}/{getname(datareport.ogda,ogdas)}/{getname(datareport.pikod,pikods)}יחידה מנמ"רית: </Text>
				</View>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text3}></Text>
				<Text style={styles.text4}>פירוט</Text>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>	
				<Text style={styles.text6}>{datareport.pirot} פירוט אירוע: </Text>	
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>	
				<Text style={styles.text6}>{datareport.lessons} לקחים ותובנות: </Text>	
			</View>
			<View style={styles.section3}>
				<Text style={styles.text3}></Text>
				<Text style={styles.text4}>פרטי אירוע</Text>
			</View>
			<View style={styles.section3}>
			{datareport.mazavrekem == 1 ? (
					<Text style={styles.text5}>מצב הרק"ם במהלך הפריקה: סטטי</Text>	
				):( 
					<Text style={styles.text5}>מצב הרק"ם במהלך הפריקה: בתנועה</Text>	
				)}
				<View style={styles.firstTextContainer}>
				{datareport.mataftype== 1 ? (
				<Text style={styles.text6}>סוג המטף: תא מנוע</Text>	
				):(
					<>
					{datareport.mataftype==2 ? (
				<Text style={styles.text6}>סוג המטף: תא צוות</Text>	
				):(
					<>
					{datareport.mataftype==3 ? (
				<Text style={styles.text6}>סוג המטף: תא מנוע ותא צוות</Text>	
				):(
					<Text style={styles.text6}>סוג המטף: לא נמצאו כלים</Text>	
				    )}	
					</>
				    )}	
					</>
				)}	
			</View>
			</View>
			<View style={styles.section3}>
			{datareport.yn == true ? (
					<Text style={styles.text5}>במהלך פירוק/ הרכבה: כן</Text>	
				):( 
					<Text style={styles.text5}>במהלך פירוק/ הרכבה: לא</Text>	
				)}
			<View style={styles.firstTextContainer}>
			{datareport.dwork == 1 ? (
					<Text style={styles.text6}>בוצע במהלך עבודה: אחזקתית טנ"א</Text>	
				):( 
					<Text style={styles.text6}>בוצע במהלך עבודה: תקשוב</Text>	
				)}
			</View>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text3}></Text>
				<Text style={styles.text4}>פרטי ה-צ'</Text>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}>{datareport.zadik}צ': </Text>	
				<View style={styles.firstTextContainer}>
				<Text style={styles.text6}>{getname(datareport.mkabaz,mkabazs)}/{getname(datareport.magad,magads)}/{getname(datareport.magadal,magadals)} הכלי המחולץ: </Text>
				</View>
			</View>
			<View style={styles.footer}>
			<hr style={{height: "3px" ,color:"black",backgroundColor: "black"}}></hr>
			<View style={styles.section3}>
			<Text style={styles.text7}>שמור</Text>
			<Text style={styles.text8}>פותח ע"י צוות מא"ה</Text>
			<Image
				src={Logo100} // Replace with the path to your image file
				style={styles.image3}
				/>
			 </View>
           </View>
		</View>
		</Page>
	  </Document>
	);
  };
  

export default Pdformataf;

