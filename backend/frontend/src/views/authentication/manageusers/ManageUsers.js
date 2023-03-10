import React, { useState, useEffect } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";

import ManageUsersTable from "views/authentication/manageusers/ManageUsersTable";

import ManageNotValidatedUsersTable from "views/authentication/manageusers/ManageNotValidatedUsersTable";

const ManageUsers = (props) => {
	useEffect(() => {}, []);

	return (
		<>
			<div className="">
				<ManageUsersTable theme={props.theme} />
				{/* <ManageNotValidatedUsersTable theme={props.theme}/> */}
			</div>
		</>
	);
};
export default withRouter(ManageUsers);
