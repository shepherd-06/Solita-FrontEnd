import React from 'react';
import image from '../img/404_not_found.jpeg';
import { useLocation } from 'react-router-dom';
import '../css/App.css';


export default function ErrorPage() {
    const location = useLocation()
    return (
        <div className='container'>
            <div className='row sin-station-free-space'>
                <p className='display-4' align="center">
                    "{(location.pathname).replace('/', '')}" is not a valid path!
                </p>
            </div>
            <img src={image} alt="Logo" />
        </div>
    );
}