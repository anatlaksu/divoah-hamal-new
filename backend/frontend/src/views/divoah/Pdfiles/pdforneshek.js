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
import 'core-js/features/object/from-entries';


const Pdforneshek = ({datareport}) => {
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

	const [splitedText, setSplitedText] = useState([]);
	const [splitedTextlekah, setSplitedTextlekah] = useState([]);

	const [lekah,setLekah]= useState(false);
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

	useEffect(()=>{
		const _splitedText = datareport.pirot.split(" ");
		setSplitedText(_splitedText)
	 },[datareport.pirot]);

	 useEffect(()=>{
		if(datareport.lessons == undefined){
			setLekah(true);
		}else{
		const _splitedText = datareport.lessons.split(" ");
		setSplitedTextlekah(_splitedText);
		}
	 },[datareport.lessons]);


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
	  text21:{
		fontSize: 14,
		// paddingTop: 20,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',
		fontWeight: 'bold',
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
	  text16:{
		fontSize: 11,
		paddingTop: 5,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',
		marginLeft: 10,
		overflowWrap: 'break-word',
	  },

	  text9:{
		fontSize: 12,
		paddingTop: 5,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',
		marginLeft: 3,
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
	  flexRowReverse: {
		flexDirection: "row-reverse"
	},
	flexWrap: {
		flexWrap: "wrap"
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
			<View style={styles.section2}>
			<Text></Text>
				<Text style={styles.text21}>אירוע נשו"ת</Text>
				<Text></Text>
			</View>

			<hr style={{height: "3px" ,color:"black",backgroundColor: "black"}}></hr>
			<View style={styles.section3}>
				<Text style={styles.text3}>תאריך ומיקום אירוע</Text>
				<Text style={styles.text4}>פרטי מדווח</Text>	
			</View>
			<View style={styles.section3}>
				{(new Date(datareport.datevent).getHours()===3 && new Date(datareport.datevent).getMinutes()===0)?(
				<Text style={styles.text5}>{datareport.datevent.slice(0, 10).split("-").reverse().join("-")}תאריך אירוע: </Text>
				):(
					<Text style={styles.text5}>{datareport.datevent.slice(11, 16)} {datareport.datevent.slice(0, 10).split("-").reverse().join("-")}תאריך אירוע: </Text>
				)}
				{/* <Text style={styles.text5}>{new Date(datareport.datevent).getMinutes()}</Text> */}
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
				<Text style={styles.text6}>יחידה מדווחת: </Text>
				</View>	
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>
				{/* <View style={styles.firstTextContainer}> */}
				<Text style={styles.text16}>{getname(datareport.gdodrep,gdodsrep)}/{getname(datareport.hativarep,hativasrep)}/{getname(datareport.ogdarep,ogdasrep)}/{getname(datareport.pikodrep,pikodsrep)}</Text>
				{/* </View> */}
			</View>
			<View style={styles.section3}>
			{datareport.nifga !== 2 ? (
				<Text style={styles.text5}>{datareport.hurtarray.length}מספר נפגעים: </Text>
				):null}
				{/* <Text style={styles.text5}>{datareport.hurtarray.length}מספר נפגעים: </Text> */}
				<View style={styles.firstTextContainer}>
				<Text style={styles.text6}>יחידה מנמ"רית: </Text>
				</View>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>
				{/* <View style={styles.firstTextContainer}> */}
				<Text style={styles.text16}>{getname(datareport.gdod,gdods)}/{getname(datareport.hativa,hativas)}/{getname(datareport.ogda,ogdas)}/{getname(datareport.pikod,pikods)}</Text>
				{/* </View> */}
			</View>
			<View style={styles.section3}>
				<Text style={styles.text3}></Text>
				<Text style={styles.text4}>פירוט</Text>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>	
				<Text style={styles.text6}>פירוט אירוע: </Text>	
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>	
				<View style={[styles.flexRowReverse, styles.flexWrap]}>
					{
						splitedText.map((word, idx) => {
							return (
								<Text style={styles.text9} key={idx}>
								{word}
								</Text>
							);
						})
					}
				</View>
			</View>
			{splitedTextlekah[0]=="" ? null:(<>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>	
				<Text style={styles.text6}>לקחים ותובנות: </Text>	
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>	
				<View style={[styles.flexRowReverse, styles.flexWrap]}>
					{
						splitedTextlekah.map((word, idx) => {
							return (
								<Text style={styles.text9} key={idx}>
								{word}
								</Text>
							);
						})
					}
				</View>
			</View>
			</>)}
			<View style={styles.section3}>
				<Text style={styles.text3}></Text>
				<Text style={styles.text4}>פרטי אירוע</Text>
			</View>
			<View style={styles.section3}>
			{datareport.yn == true ? (
					<Text style={styles.text5}>האם נגרם נזק לכלי: כן</Text>	
				):( 
					<Text style={styles.text5}>האם נגרם נזק לכלי: לא</Text>	
				)}
				<View style={styles.firstTextContainer}>
				<Text style={styles.text6}>{datareport.selneshek}סוג נשק/תחמושת: </Text>	
				</View>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}></Text>	
				{datareport.whap==1 ? (
				<Text style={styles.text6}>מה התרחש: פיצוץ נשק</Text>	
				):(
					<>
					{datareport.whap==2 ? (
				    <Text style={styles.text6}>מה התרחש: פיצוץ תחמושת</Text>	
				    ):(
					<>
					{datareport.whap==3 ? (
				    <Text style={styles.text6}>מה התרחש: פליטת כדור</Text>	
				    ):(
					<>
					{datareport.whap==4 ? (
				    <Text style={styles.text6}>מה התרחש: גרימת נזק לנשק</Text>	
				    ):(
					<Text style={styles.text6}>מה התרחש: אחר</Text>	
				    )}	
					</>
				    )}	
					</>
				    )}	
					</>
				)}	
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
  

export default Pdforneshek;

