import React from "react";
import "./Fiche.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import Cookies from "universal-cookie"
const cookies = new Cookies()


import axios from "axios";

export function Fiche (props) {
    const handleDelete = (e) =>{
        const token = cookies.get("TOKEN")
        const configuration = {
            method: "delete",
            url: `http://localhost:3000/fiche/${props.fiche._id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
        console.log(props.fiche._id)

        axios(configuration).then((res) => {
            props.onDelete()
        })
        .catch((err) => {
            console.log("erreur")
            console.log(err)
        })
    }
    return (
        <>
         <div className="fiche" >
            <div>
                <h2>{props.fiche.question} <span className="fiche-nom" >{props.fiche.name }</span></h2>
                <p>{props.fiche.answer}</p>
            </div>
            {
                props.isDeletable ?
                   (<button onClick={handleDelete}>
                        <FontAwesomeIcon icon={faDeleteLeft} />
                    </button>) : ""
            }
        </div>
        </>
    )
}