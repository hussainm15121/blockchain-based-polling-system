import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Loader.css"
import { useNotification } from '../components/Notifications/NotificationProvider';
import '../components/Notifications/Notification.css'
import React, { useEffect, useState } from 'react';

const Notify = () => {

    const dispatch = useNotification();
    
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        setInterval(() => {
            setShowComponent(true);
        }, 3000);
    }, []);

    return(
        <>
        {showComponent && <div>
            {
                dispatch({
                    type: "SUCCESS",
                    message: "Successful Request"
                    })    
            }
        </div>}
        </>
    );
};
export default Notify;