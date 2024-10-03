// card for available courses
import React from "react";
import { useCookies } from 'react-cookie';

const Courses = (props) => {

	const [cookies, setCookie] = useCookies();

	function enroll(id) {
		console.log(id);
	}

	async function enroll(e) {
		if (e.target.name === "2" || e.target.name === "3") {
			alert("Sorry, currently this course is not active.")
		}
		else {
			const data = {
				username: cookies['username'],
				course_id: e.target.name
			}
			await fetch("http://localhost:5000/enroll", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then(res => res.json())
				.then(res => {
					if (res === -1) {
						alert("Server error");
					}
					else if (res === 0) {
						alert("Enrolled successfully");
						window.location.reload();
					}
					else if (res === 1) {
						alert("Already enrolled");
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
			<h2>{props.data.course_name}</h2>
			<img src={props.data.image} style={{ height: "100px" }} /><br />
			<input type="button" name={props.data.course_id} value="Enroll Now" onClick={(e) => enroll(e)} />
		</div>
	)
}

export default Courses;