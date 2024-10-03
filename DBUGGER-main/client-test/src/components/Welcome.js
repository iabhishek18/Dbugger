import React, { useEffect, useState } from "react";
import Courses from './Courses';
import { useCookies } from 'react-cookie';
import Enrolled from "./Enrolled";

const Welcome = () => {
	const [courses, setCourses] = useState([{}]);
	const [myCourses, setMyCourses] = useState([{}]);
	const [cookies, setCookie] = useCookies();

	useEffect(() => {
		async function getCourses() {
			const response = await fetch('http://localhost:5000/courses');

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}

			const records = await response.json();
			setCourses(records);
		}

		getCourses();
		return;
	}, [courses.length]);

	useEffect(() => {
		const data = { username: cookies['username'] };
		async function getMyCourses() {
			await fetch("http://localhost:5000/getMyCourse", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then(res => res.json())
				.then(res => {
					setMyCourses(res)
				})
				.catch(error => {
					console.log(error);
					window.alert("error");
					return;
				});
		}

		getMyCourses();
		return;
	}, [myCourses.length]);


	function viewCourses() {
		return courses.map((course) => {
			return (
				<Courses data={course} />
			)
		})
	}

	function viewMyCourses() {
		return myCourses.map((course) => {
			return (
				<Enrolled data={course} />
			)
		})
	}

	return (
		<div>
			Available Courses
			{viewCourses()}
			Enrolled Courses
			{viewMyCourses()}
		</div>
	)
}

export default Welcome;