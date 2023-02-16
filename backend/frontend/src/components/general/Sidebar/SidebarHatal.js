import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

// reactstrap components
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from "reactstrap";

import {
	BackgroundColorContext,
	backgroundColors,
} from "contexts/BackgroundColorContext";

import { ThemeContext, themes } from "contexts/ThemeContext";

import logobazak2 from "assets/img/logobazak2.png";

import logodiv from "assets/img/logodib.jpeg";

import home from "assets/img/home3.png";
import home_white from "assets/img/home3_white.png";

import table from "assets/img/table.png";
import table_white from "assets/img/table_white.png";

import people from "assets/img/people.png";
import people_white from "assets/img/people_white.png";

import editusers from "assets/img/editusers.png";
import editusers_white from "assets/img/editusers_white.png";

import shortlist from "assets/img/shortlist.png";
import shortlist_white from "assets/img/shortlist_white.png";

import info from "assets/img/info.png";
import info_white from "assets/img/info_white.png";

import graphpic from "assets/img/graphpic.png";
import graphpic_white from "assets/img/graphpic_white.png";

import { signout } from "auth/index";
import history from "../../../history";

import {
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
} from "reactstrap";

import { isAuthenticated } from "auth/index";
const { user } = isAuthenticated();

function SidebarHamal(props) {
	const clickSubmit = (event) => {
		event.preventDefault();
		signout().then((response) => {
			history.push(`/signin`);
		});
	};
	// todo: to find out how to relod the sidebar on login

	return (
		<>
			{/* לוגו המערכת */}
			<div className="logo">
				<img src={logodiv}></img>
			</div>
			<Nav style={{ textAlign: "right" }}>
				<li>
					<NavLink
						to="/dashamal"
						style={{ margin: "0px" }}
						activeClassName="sidebar_active_link"
					>
						<Row style={{ direction: "rtl" }}>
							<Col
								xs={12}
								md={3}
								style={{
									paddingLeft: "0px",
									textAlign: "center",
									alignSelf: "center",
								}}
							>
								{props.theme == "white" ? (
									<img
										src={table}
										style={{ height: "20px" }}
									></img>
								) : (
									<img
										src={table_white}
										style={{ height: "20px" }}
									></img>
								)}
							</Col>
							<Col
								xs={12}
								md={9}
								style={{ paddingRight: "0px" }}
							>
								<h4
									style={{
										margin: "0px",
										paddingTop: "6px",
										paddingBottom: "6px",
									}}
								>
									דף ראשי
								</h4>
							</Col>
						</Row>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/report"
						style={{ margin: "0px" }}
						activeClassName="sidebar_active_link"
					>
						<Row style={{ direction: "rtl" }}>
							<Col
								xs={12}
								md={3}
								style={{
									paddingLeft: "0px",
									textAlign: "center",
									alignSelf: "center",
								}}
							>
								{props.theme == "white" ? (
									<img
										src={table}
										style={{ height: "20px" }}
									></img>
								) : (
									<img
										src={table_white}
										style={{ height: "20px" }}
									></img>
								)}
							</Col>
							<Col
								xs={12}
								md={9}
								style={{ paddingRight: "0px" }}
							>
								<h4
									style={{
										margin: "0px",
										paddingTop: "6px",
										paddingBottom: "6px",
									}}
								>
									דיווח אירוע חריג
								</h4>
							</Col>
						</Row>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/reportrekem`}
						style={{ margin: "0px" }}
						activeClassName="sidebar_active_link"
					>
						<Row style={{ direction: "rtl" }}>
							<Col
								xs={12}
								md={3}
								style={{
									paddingLeft: "0px",
									textAlign: "center",
									alignSelf: "center",
								}}
							>
								{props.theme == "white" ? (
									<img
										src={table}
										style={{ height: "20px" }}
									></img>
								) : (
									<img
										src={table_white}
										style={{ height: "20px" }}
									></img>
								)}
							</Col>
							<Col
								xs={12}
								md={9}
								style={{ paddingRight: "0px" }}
							>
								<h4
									style={{
										margin: "0px",
										paddingTop: "6px",
										paddingBottom: "6px",
									}}
								>
									דיווח תאונת רק"ם
								</h4>
							</Col>
						</Row>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/historeport`}
						style={{ margin: "0px" }}
						activeClassName="sidebar_active_link"
					>
						<Row style={{ direction: "rtl" }}>
							<Col
								xs={12}
								md={3}
								style={{
									paddingLeft: "0px",
									textAlign: "center",
									alignSelf: "center",
								}}
							>
								{props.theme == "white" ? (
									<img
										src={table}
										style={{ height: "20px" }}
									></img>
								) : (
									<img
										src={table_white}
										style={{ height: "20px" }}
									></img>
								)}
							</Col>
							<Col
								xs={12}
								md={9}
								style={{ paddingRight: "0px" }}
							>
								<h4
									style={{
										margin: "0px",
										paddingTop: "6px",
										paddingBottom: "6px",
									}}
								>
									היסטוריית דיווחים
								</h4>
							</Col>
						</Row>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/summarizingreport`}
						style={{ margin: "0px" }}
						activeClassName="sidebar_active_link"
					>
						<Row style={{ direction: "rtl" }}>
							<Col
								xs={12}
								md={3}
								style={{
									paddingLeft: "0px",
									textAlign: "center",
									alignSelf: "center",
								}}
							>
								{props.theme == "white" ? (
									<img
										src={table}
										style={{ height: "20px" }}
									></img>
								) : (
									<img
										src={table_white}
										style={{ height: "20px" }}
									></img>
								)}
							</Col>
							<Col
								xs={12}
								md={9}
								style={{ paddingRight: "0px" }}
							>
								<h4
									style={{
										margin: "0px",
										paddingTop: "6px",
										paddingBottom: "6px",
									}}
								>
									סיכום דיווחים
								</h4>
							</Col>
						</Row>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/summarizingreportrekem`}
						style={{ margin: "0px" }}
						activeClassName="sidebar_active_link"
					>
						<Row style={{ direction: "rtl" }}>
							<Col
								xs={12}
								md={3}
								style={{
									paddingLeft: "0px",
									textAlign: "center",
									alignSelf: "center",
								}}
							>
								{props.theme == "white" ? (
									<img
										src={table}
										style={{ height: "20px" }}
									></img>
								) : (
									<img
										src={table_white}
										style={{ height: "20px" }}
									></img>
								)}
							</Col>
							<Col
								xs={12}
								md={9}
								style={{ paddingRight: "0px" }}
							>
								<h4
									style={{
										margin: "0px",
										paddingTop: "6px",
										paddingBottom: "6px",
									}}
								>
									סיכום דיווחים רק"ם
								</h4>
							</Col>
						</Row>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/odot"
						style={{ margin: "0px" }}
						activeClassName="sidebar_active_link"
					>
						<Row style={{ direction: "rtl" }}>
							<Col
								xs={12}
								md={3}
								style={{
									paddingLeft: "0px",
									textAlign: "center",
									alignSelf: "center",
								}}
							>
								{props.theme == "white" ? (
									<img
										src={table}
										style={{ height: "20px" }}
									></img>
								) : (
									<img
										src={table_white}
										style={{ height: "20px" }}
									></img>
								)}
							</Col>
							<Col
								xs={12}
								md={9}
								style={{ paddingRight: "0px" }}
							>
								<h4
									style={{
										margin: "0px",
										paddingTop: "6px",
										paddingBottom: "6px",
									}}
								>
									אודות המערכת
								</h4>
							</Col>
						</Row>
					</NavLink>
				</li>
			</Nav>
		</>
	);
}

export default SidebarHamal;
