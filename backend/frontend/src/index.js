import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter,
	Router,
	Route,
	Switch,
	Redirect,
	withRouter,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "components/Table.css";
import "components/TableDark.css";
import "components/ExcelButton.css";
import "components/EmptyButton.css";
import "components/NewButton.css";
import "components/NewButtonBlue.css";
import "components/NewButtonDelete.css";
import "assets/css/black-dashboard-react.css";
import ThemeContextWrapper from "./components/general/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/general/BackgroundColorWrapper/BackgroundColorWrapper";

import history from "./history";

import LoggedinRoute from "auth/LoggedinRoute";
import UnloggedinRoute from "auth/UnloggedinRoute";
import AdminRoute from "auth/AdminRoute.js";

//auth routes
import SignIn from "views/authentication/SignInForm";
import AdminSignIn from "views/authentication/AdminSignInForm";
import SignUp from "views/authentication/SignUpForm";
import SignUpOtherUsers from "views/authentication/SignUpOtherUsers";
import ManageUsers from "views/authentication/manageusers/ManageUsers";
import EditUser from "views/authentication/EditUserForm";

import EditReport from "views/authentication/EditReports/EditReport";
import EditReportRekem from "views/authentication/EditReports/EditReportRekem";

import WachReport from "views/authentication/WachReports/WachReport";
import WachReportRekem from "views/authentication/WachReports/WachReportRekem";

import Dash from "views/divoah/Dash";
import DashAdmin from "views/divoah/DashAdmin";

import Report from "views/divoah/Report";
import ReportRekem from "views/divoah/ReportRekem";
import DashHamal from "views/divoah/Hamal/DashHamal";
import Odot from "views/divoah/Hamal/Odot";
import HistoReport from "views/divoah/Hamal/HistoReport";
import SummarizingReport from "views/divoah/Hamal/SummarizingReport";
import SummarizingReportRekem from "views/divoah/Hamal/SummarizingReportRekem";

ReactDOM.render(
	<>
		<ThemeContextWrapper>
			<ToastContainer
				rtl
				autoClose={4000}
				style={{ textAlign: "right" }}
			/>
			<BackgroundColorWrapper>
				<Router history={history}>
					<Switch>
						{/*///////////////////////////////////////////UnLoggedIn Routes/////////////////////////////////////////////////*/}
						<UnloggedinRoute
							path="/signin"
							exact
							component={SignIn}
						/>
						<UnloggedinRoute
							path="/adminsignin"
							exact
							component={AdminSignIn}
						/>
						<UnloggedinRoute
							path="/signup"
							exact
							component={SignUp}
						/>
						<LoggedinRoute
							path="/signupotherusers"
							exact
							component={SignUpOtherUsers}
						/>
						{/*///////////////////////////////////////////UnLoggedIn Routes/////////////////////////////////////////////////*/}

						{/*///////////////////////////////////////////Admin Routes/////////////////////////////////////////////////*/}
						<AdminRoute
							path="/manageusers"
							exact
							component={ManageUsers}
						/>
						<AdminRoute
							path="/edituser/:userid"
							exact
							component={EditUser}
						/>

						{/*///////////////////////////////////////////Admin Routes/////////////////////////////////////////////////*/}

						{/*///////////////////////////////////////////LoggedIn Routes/////////////////////////////////////////////////*/}
						<LoggedinRoute
							path="/dash"
							exact
							component={Dash}
						/>
						<LoggedinRoute
							path="/dashadmin"
							exact
							component={DashAdmin}
						/>

						<LoggedinRoute
							path="/report"
							exact
							component={Report}
						/>
						<LoggedinRoute
							path="/reportrekem"
							exact
							component={ReportRekem}
						/>
						<LoggedinRoute
							path="/historeport"
							exact
							component={HistoReport}
						/>
						<LoggedinRoute
							path="/summarizingreport"
							exact
							component={SummarizingReport}
						/>
												<LoggedinRoute
							path="/summarizingreportrekem"
							exact
							component={SummarizingReportRekem}
						/>
						<LoggedinRoute
							path="/editreport/:formId"
							exact
							component={EditReport}
						/>
						<LoggedinRoute
							path="/editreportrekem/:formId"
							exact
							component={EditReportRekem}
						/>
						<LoggedinRoute
							path="/wachreport/:formId"
							exact
							component={WachReport}
						/>
						<LoggedinRoute
							path="/wachreportrekem/:formId"
							exact
							component={WachReportRekem}
						/>
						{/* <LoggedinRoute path="/signinhamal" exact component={SignInHamal} />
            <LoggedinRoute path="/signup" exact component={SignUpHamal} /> */}
						{/*///////////////////////////////////////////LoggedIn Routes/////////////////////////////////////////////////*/}
						<LoggedinRoute
							path="/dashamal"
							exact
							component={DashHamal}
						/>
						<LoggedinRoute
							path="/odot"
							exact
							component={Odot}
						/>

						<Redirect
							from="/"
							to="/signin"
						/>
					</Switch>
				</Router>
			</BackgroundColorWrapper>
		</ThemeContextWrapper>
	</>,
	document.getElementById("root")
);
