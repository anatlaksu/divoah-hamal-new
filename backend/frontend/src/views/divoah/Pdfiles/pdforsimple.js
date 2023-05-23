import React, { useState, useEffect } from "react";
import image from "../../../assets/img/emergencyODOT.jpg";

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


const Pdforsimple =()=> {
	return (
		<div>
            <p className="text-center">שמור</p>
			<Row>
				<Col>
				<img
								src={logotene}
								style={{ height: "100px" , paddingLeft: "100px"}}
				></img>
				</Col>
				<Col  style={{ paddingTop: "50px" }}>
				<h2 className="text-center">דוח אירוע חריג</h2>
				</Col>
				<Col>
				<img
								src={logotene}
								style={{ height: "100px" , paddingLeft: "100px"}}
				></img>
                </Col>
			</Row>
			<hr style={{height: "3px" ,color:"black",backgroundColor: "black"}}></hr>
			<Row>
				<Col className="text-right" style={{paddingRight: "150px"}}>
				<u style={{color:"black"}}><span style={{fontWeight:"bold"}}><h2>פרטי מדווח</h2></span></u>
				<h4><span style={{fontWeight:"bold"}}>שם: </span></h4>
				<h4><span style={{fontWeight:"bold"}}>מ.א:</span></h4>
				<h4><span style={{fontWeight:"bold"}}>מספר טלפון:</span></h4>
				</Col>
				<Col className="text-right">
				<u style={{color:"black"}}><span style={{fontWeight:"bold"}}><h2>תאריך ומיקום האירוע</h2></span></u>
				<h4><span style={{fontWeight:"bold"}}>תאריך האירוע: </span></h4>
				<h4><span style={{fontWeight:"bold"}}>מיקום האירוע:</span></h4>
				</Col>
			</Row>
			<Row>
				<Col className="text-right" style={{paddingRight: "150px"}}>
				<u style={{color:"black"}}><span style={{fontWeight:"bold"}}><h2>פרטי יחידות</h2></span></u>
				<h4><span style={{fontWeight:"bold"}}>יחידה מדווחת: </span></h4>
				<h4><span style={{fontWeight:"bold"}}>יחידה מנמ"רית:</span></h4>
				</Col>
				<Col className="text-right">
				<u style={{color:"black"}}><span style={{fontWeight:"bold"}}><h2>פרטי הנפגעים</h2></span></u>
				<h4><span style={{fontWeight:"bold"}}>האם יש נפגעים: </span></h4>
				<h4><span style={{fontWeight:"bold"}}>מספר נפגעים:</span></h4>
				</Col>
			</Row>
			<Row>
			<Col className="text-right" style={{paddingRight: "150px"}}>
			<u style={{color:"black"}}><span style={{fontWeight:"bold"}}><h2>פירוט:</h2></span></u>
			<h4><span style={{fontWeight:"bold"}}>פירוט האירוע: </span></h4>
			<h4><span style={{fontWeight:"bold"}}>לקחים ותובנות:</span></h4>
			</Col>
			</Row>
			<hr style={{height: "3px" ,color:"black",backgroundColor: "black"}}></hr>
			<Row>
				<Col>
				<img
								src={Logo100}
								style={{ height: "50px", paddingLeft: "250px"}}
				></img>
				</Col>
				<Col>
				<p className="text-center">שמור</p>
				</Col>
				<Col>
				<img
								src={logotene}
								style={{ height: "50px" , paddingLeft: "100px"}}
				></img>
                </Col>
			</Row>

		</div>
	);
}

export default withRouter(Pdforsimple);
