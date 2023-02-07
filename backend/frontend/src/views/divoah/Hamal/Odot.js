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

function Odot() {
	return (
		<div>
			{/* <Container className="mt--8 pb-5">
    </Container> */}
			<img
				src={image}
				style={{ width: "100vw", height: "100vh" }}
			/>
		</div>
	);
}

export default Odot;
