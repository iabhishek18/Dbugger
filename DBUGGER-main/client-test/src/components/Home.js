import React from 'react';
import { Route, Routes } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <a href='/login'>
                <input type='button' value="Login" />
            </a>
            <a href='/signup'>
                <input type='button' value="Signup" />
            </a>
        </div>
    )
}

export default Home;