import React, { useState } from 'react';
import { json, Route, Routes } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Login = () => {

	const [form, set] = useState({
		username: "",
		password: ""
	});

	const [cookies, setCookie] = useCookies();

	function handle(e) {
		const data = { ...form };
		data[e.target.name] = e.target.value;
		set(data);
	}
	function spacecheck(value){
		return value.indexOf(' ') >= 0;
	}

	async function login() {
		console.log(form);

		if (form.username === "" || form.password === "") {
			alert("Please fill out all the fields");
		}
		else if (spacecheck(form.username)) {
			alert("Username must not contain any space.");
	    }
		else {
			await fetch("http://localhost:5000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			})
				.then(res => res.json())
				.then(res => {
					if (res === 1) {
						alert("No such user, please register");
						window.location.href = "/signup";
					}
					else if (res === -1) {
						alert("Server error");
					}
					else if (res === 0) {
						setCookie('login', 1);
						setCookie('username', form.username);
						alert("Logged in successfully");
						window.location.href = "/welcome";
					}
					else if (res === 2) {
						alert("Wrong password");
					}
				})
				.catch(error => {
					console.log(error);
					window.alert(error);
					return;
				});
		}
	}

	return (
		<div>
			<form>
				<input type='text' placeholder="Username" name="username"apap onChange={(e) => handle(e)} /><br />
				<input type='password' placeholder="Password" name="password" onChange={(e) => handle(e)} /><br />
				<input type="button" value="Login" onClick={login} /><br/>
				{/* <input type="button" value="Button" onClick={btn} /> */}
				<a href='/reset'>Forgot password?</a>
				<a href='/feedback'>Feedback</a>
				<p>Dont have account?<a href='/signup'><input type='button' value='Sign Up' /></a></p>
			</form>
		</div>
	)
}

export default Login;