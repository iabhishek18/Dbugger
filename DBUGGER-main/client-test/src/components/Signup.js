import React, { useRef, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import emailjs from '@emailjs/browser';



const Signup = () => {
	const formData = useRef();
	var el = document.getElementById('newform')
	const sendEmail = (e) => {
		// e.preventDefault();
		
		emailjs.sendForm("service_lz21ob1", "template_l8qfip9", formData.current, "VU12XavFNatwZljAP")
		.then((result) => {
			console.log(result.text);
		}, (error) => {
			console.log(error.text);
		});
	};
	
	const [form, set] = useState({
		fname: "",
		lname: "",
		username: "",
		mail: "",
		password: "",
		repassword: ""
	});
	
	function handle(e) {
		const data = { ...form };
		data[e.target.name] = e.target.value;
		set(data);
	}
	function spacecheck(value){
		return value.indexOf(' ') >= 0;
	}
	async function signup() {
		console.log(form);
		
		
		if (form.fname === "" || form.lname === "" || form.username === "" || form.mail === "" || form.password === "" || form.repassword === "") {
			alert("Please fill out all the fields");
		}
		else if (spacecheck(form.username)) {
			alert("Username must not contain any space.");
	    }
		else {
			if (form.password === form.repassword) {
				await fetch("http://localhost:5000/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(form),
				})
				.then(res => res.json())
				.then(res => {
					if (res === 1) {
						alert("User already exists");
					}
					else if (res === -1) {
						alert("Server error");
					}
					else if (res === 0) {
						alert("Account created");
						window.location.href = "/login";
					}
				})
				.catch(error => {
					window.alert(error);
					return;
				});
			}
			else {
				alert("Password doesn't match");
			}
		}
	}
	
	return (
		<div>
			<form ref={formData} id='newform'>
				<input type="text" name='fname' placeholder='First name' onChange={(e) => handle(e)} /><br />
				<input type="text" name='lname' placeholder='Last name' onChange={(e) => handle(e)} /><br />
				<input type="text" name='username' placeholder='Username' onChange={(e) => handle(e)} /><br />
				<input type="mail" name='mail' placeholder='mail' onChange={(e) => handle(e)} /><br />
				<input type="password" name='password' placeholder='Password' onChange={(e) => handle(e)} /><br />
				<input type="password" name='repassword' placeholder='Re-type password' onChange={(e) => handle(e)} /><br />
				<input type="button" value="Submit" onClick={function(event){  sendEmail(); signup()} } />
				<p>Already have account ?<a href='/login'><input type="button" value="Login" /></a></p>
			</form>
		</div>
	)
}

export default Signup;