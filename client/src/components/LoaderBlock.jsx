import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from  'react-loader-spinner'
import "./Loader.css"
import '../components/Notifications/Notification.css'
import React from 'react';


const LoaderBlock = () => {

    return(
        <div className="spinner">
            Poll is being created...
            <BallTriangle
            height="100"
            width="100"
            color='white'
            ariaLabel='loading'
    />
        </div>
    );
};
export default LoaderBlock;