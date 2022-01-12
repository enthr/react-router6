import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet, useParams, NavLink, useNavigate, useLocation } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/myapps' element={<Navigate replace to='/learn' />} />
            <Route path='/learn' element={<Learn />}>
                <Route path='courses' element={<Courses />}>
                    <Route path=':courseid' element={<CourseId />} />
                </Route>
                <Route path='bundles' element={<Bundles />} />
            </Route>
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);

function Home() {
    return (
        <div>
            <h1>Home Route</h1>
            <br />
            <Link to='/myapps'>My Apps</Link>
            <br />
            <Link to='/learn'>Learn</Link>
            <br />
            <Link to='/dashboard'>Dashboard</Link>
        </div>
    );
}

function Learn() {
    return (
        <div>
            <h1>Learn</h1>
            <h3>All Courses Are Listed Here</h3>
            <br />
            <Link to='/learn/courses'>Courses</Link>
            <br />
            <Link to='/learn/bundles'>Bundle</Link>
            <br />
            <Outlet />
        </div>
    );
}

function Courses() {
    const courseList = ['React', 'Angular', 'Vue', 'Meteor', 'Node.js'];
    const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];
    return (
        <div>
            <h1>Courses List</h1>
            <h4>Course Card</h4>
            <br />
            <NavLink style={({isActive}) => {return {backgroundColor: isActive ? 'red' : 'white'}}} to={`/learn/courses/${randomCourseName}`}>{randomCourseName}</NavLink>
            <br />
            <NavLink to={`/learn/courses/tests`}>test</NavLink>
            <br />
            <Outlet />
        </div>
    );
}

function Bundles() {
    return (
        <div>
            <h1>Bundles List</h1>
            <h4>Bundle Card</h4>
        </div>
    );
}

function CourseId() {
    const { courseid } = useParams();

    const navigate = useNavigate();

    return (
        <div>
            <h1>URL Params: {courseid} </h1>
            <button
            onClick={() => {
                navigate('/dashboard', {state: `${courseid} Price is 399`});
            }}
            >Price</button>
            <br />
            <Link to='/dashboard' state={'Django'}>Test Link</Link>
        </div>
    );
}

function Dashboard() {
    const location = useLocation();
    return (
        <div>
            <h1>Info That I Got Here is: {location.state}</h1>
        </div>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();