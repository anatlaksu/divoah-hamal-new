/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { withRouter, Redirect ,Link } from "react-router-dom";
import ReactToPdf from 'react-to-pdf';
import { PDFViewer, ReactPDF, PDFDownloadLink } from "@react-pdf/renderer";
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
import { toast } from "react-toastify";
import warning_sign from "assets/img/warning_sign.svg"
import axios from "axios";

const CarDataFormModalView = (match) => {

    const clickSubmit = (event) => {
		DeleteCarDatasUnits();
	};

	async function DeleteCarDatasUnits() {
        var reportid = match.cardataid;
		await axios.delete(`http://localhost:8000/report/del/${reportid}`);
		toast.success(`דיווח נמחק בהצלחה`);
		match.ToggleForModal();
	}

    function init() {
	}

	useEffect(() => {
		init();
	}, [match.isOpen]);

	return (
		<Modal
			style={{
				minHeight: "100%",
				maxHeight: "100%",
				minWidth: "30em",
				maxWidth: "30em",
				justifyContent: "center",
				alignSelf: "center",
				margin: "0px",
				margin: "auto",
				direction: "rtl",
			}}
			isOpen={match.isOpen}
			centered
			fullscreen
			scrollable
			size=""
			toggle={match.Toggle}
		>
			<ModalBody style={{padding: "0px"}}>
				<Card style={{marginBottom: "0px",marginTop: "20px"}}>
				<img src={warning_sign} style={{height:'60px', alignSelf: "center", marginBottom:'-20px'}}></img>
					<CardHeader style={{ direction: "rtl" }}>
						<CardTitle
							tag="h3"
							style={{
								direction: "rtl",
								textAlign: "center",
								fontWeight: "bold",
								marginBottom: "-20px"
							}}
						>
							מחיקת דיווח
						</CardTitle>
						{/*headline*/}
					</CardHeader>
					<CardBody style={{ direction: "rtl" }}>
						<Container>
							<div style={{ textAlign: "center"}}>
								<h4 style={{marginBottom:'-5px'}}>האם אתה בטוח שברצונך למחוק את דיווח זה?</h4>
								<h4>פעולה זו תוביל למחיקה לצמיתות של דיווח זה</h4>
								<div
									style={{
										display: "flex",
										paddingTop: "0px",
										justifyContent: "space-between",
									}}
								>
									<button
									    style={{background:'rgba(231, 29, 54, 0.17)', color:'black'}}
										className="btn-new-delete"
										onClick={() => {
                                            match.ToggleForModal();
										}}
									>
										בטל
									</button>
									<button className="btn-new-delete" onClick={clickSubmit}>
										כן, מחק
									</button>
								</div>
							</div>
						</Container>
					</CardBody>
				</Card>
			</ModalBody>
		</Modal>
	);
};
export default withRouter(CarDataFormModalView);
