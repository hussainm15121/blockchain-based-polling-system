import {React, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './';

const LogOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            credentials: "include"
        }).then((res) => {
            navigate("/");
            if (res.status != 200 ){
                const error = new Error(res.error);
                throw error;
            }

        }).catch((err) => {
            console.log(err);
        })
    })
    return(
            <Loader />   
    )
}
export default LogOut;










