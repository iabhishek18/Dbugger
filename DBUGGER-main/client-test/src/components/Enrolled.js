import React from "react";

const Enrolled = (props) => {
    return (
        <div>
            <h2>{props.data.course_name}</h2>
            <img src={props.data.image} style={{ height: "100px" }} /><br />
            {/* <input type="button" name={props.data.course_id} value="Enroll Now" onClick={(e) => enroll(e)} /> */}
        </div>
    )
}

export default Enrolled;