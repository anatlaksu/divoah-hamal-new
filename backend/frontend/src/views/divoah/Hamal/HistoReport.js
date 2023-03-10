import React, { useState, useEffect } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";

// reactstrap components
import {
	Button,
	ButtonGroup,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Label,
	FormGroup,
	Input,
	Table,
	Row,
	CardText,
	Col,
	UncontrolledTooltip,
} from "reactstrap";
import axios from "axios";
import ManageReportSortingTable from "components/general/authcomponents/ManageReportSortingTable/SortingTable";

const HistoReport = (props) => {
	useEffect(() => {}, []);

	return (
		<>
			<div className="">
				<Row>
					<Col>
						<Card>
							<CardHeader style={{ direction: "rtl" }}>
								<CardTitle
									tag="h4"
									style={{ direction: "rtl", textAlign: "right" }}
								>
									היסטוריית דיווחים
								</CardTitle>
								{/*headline*/}
							</CardHeader>
							<CardBody style={{ direction: "rtl" }}>
								<ManageReportSortingTable theme={props.theme} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
};
export default withRouter(HistoReport);
