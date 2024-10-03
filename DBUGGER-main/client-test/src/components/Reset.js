import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";

const Reset = () => {

	const [form, set] = useState({
		mail: "",
	});

	function handle(e) {
		const data = { ...form };
		data[e.target.name] = e.target.value;
		set(data);
	}

	async function reset() {
		console.log(form);
		if (form.mail === "") {
			alert("Please enter mail..");
		}
		else {
			await fetch("http://localhost:5000/reset", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			})
				.then(res => res.json())
				.then(res => {
					if (res === 3) {
						alert("Password has been updated successfully!")
						window.location.href = "/login";
					}
					else if (res === -1) {
						alert("Server error");
					}
				})
				.catch(error => {
					window.alert(error);
					return;
				});
		}
	}

	async function getUsername() {
		console.log(form);
		if (form.mail === "") {
			alert("Please enter mail..");
		}
		else {
			await fetch("http://localhost:5000/getUsername", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			})
				.then(res => res.json())
				.then(res => {
					if (res != -1) {
						alert(res.data);
						window.location.href = "/login";
					}
					else if (res === -1) {
						alert("Server error");
					}
				})
				.catch(error => {
					window.alert(error);
					return;
				});
		}
	}

	return (
		<div>
			<form>
				<input type="mail" name='mail' placeholder='Email' onChange={(e) => handle(e)} /><br />
				<input type="password" name='newpassword' placeholder='Password' onChange={(e) => handle(e)} /><br />
				<input type="button" value="Change Password" onClick={reset} />
				<input type="button" value="Get Username" onClick={getUsername} />
				<a href='./login'><input type="button" value="Back to login" /></a>
			</form>
		</div>
	)
}

export default Reset;