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

const Pdforsimple = ({datareport}) => {

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
	  },
	  text4: {
		fontSize: 14,
		paddingTop: 10,
		fontFamily: 'Rubik',
		textAlign: 'left',
		direction: 'ltr',
		marginLeft: 10,
	  },
	  text5:{
		fontSize: 12,
		paddingTop: 10,
		// marginRight: 200,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',
		right:200,
	  },
	  text6:{
		fontSize: 12,
		paddingTop: 10,
		fontFamily: 'Rubik',
		textAlign: 'right',
		direction: 'rtl',
		marginLeft: 10,
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
				<Text style={styles.text6}>{datareport.lastname} {datareport.name} שם: </Text>	
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}>{datareport.mikom}מיקום האירוע: </Text>
				<Text style={styles.text6}>{datareport.personalnumber} :מ.א.</Text>	
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
				<Text style={styles.text6}>יחידה מדווחת:</Text>
			</View>
			<View style={styles.section3}>
				<Text style={styles.text5}>{datareport.hurtarray.length}מספר נפגעים: </Text>	
				<Text style={styles.text6}>יחידת מנמ"רית:</Text>
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
			<hr style={{height: "3px" ,color:"black",backgroundColor: "black", marginTop:"300px"}}></hr>
		</View>
		</Page>
	  </Document>
	);
  };
  

export default Pdforsimple;

// const Pdforsimple = ({datareport}) => {

// 	Font.register({
// 		family: 'Rubik',
// 		src: "http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf" });
// 	const styles = StyleSheet.create({
// 	  page: {
// 		backgroundColor: "white"
// 	  },
// 	  section2: {
// 		// flexDirection: 'row',
// 		// paddingRight: 20,
// 		position: 'relative',
// 		width: '100%',
// 		height: '100%',
//       },
// 	  text2: {
// 		fontFamily: 'Rubik',
// 		fontSize: 12,
// 		textAlign: 'right',
// 		direction: 'rtl',
// 		position: 'absolute',
// 		top: 10,
// 		left: 200,
// 	  },
// 	  text3: {
// 		fontFamily: 'Rubik',
// 		fontSize: 12,
// 		textAlign: 'right',
// 		direction: 'rtl',
// 		position: 'absolute',
// 		top: 10,
// 		left: 450,
// 	  },

// 	});
// 	return (
// 	  <Document>
// 		{/** Page defines a single page of content. */}
		
// 		<Page size="A4" style={styles.page}>
// 		<View style={styles.section2}>
//           <Text style={styles.text2}> תאריך אירוע כגג</Text>
//           <Text style={styles.text3}>פרטי מדווח</Text>
//         </View>
// 		<View style={styles.section2}>
//           <Text style={styles.text2}>{datareport.lastname} {datareport.name} תאריך אירוע כגג</Text>
//           <Text style={styles.text3}>{datareport.personalnumber}פרטי מדווח</Text>
//         </View>
// 		</Page>
// 	  </Document>
// 	);
//   };
  

// export default Pdforsimple;
