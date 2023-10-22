import React from "react";
import "./Notification.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck,faXmark} from "@fortawesome/free-solid-svg-icons"

export function Notification ({ type, message }) {
    return (
        <>
            <div className="notif">
                {type == "error" && <FontAwesomeIcon className="error" icon={faXmark} />}
                {type == "succes" && <FontAwesomeIcon icon={faCheck} />}
                <h2>{message}</h2>
            </div>
        
        </>
    )
}