import {React,useState} from "react";
import axios from 'axios'
import { useEffect } from 'react'
import { Fiche } from "../Components/Fiche";
import "./Liste.css"


function Liste () {
    const [fiches, setFiches] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("https://janco-fiche-server.onrender.com/fiche").then((res) => {
            setFiches(res.data.reverse())
            setLoading(false)
        })
    }, [])
    
    return (
        <>
        <div className="fiche-page">
            <h1>Toutes les fiches {isLoading ? "(Chargement...)" : `(${fiches.length})`}</h1>
            <ul>
                {isLoading ? "Chargement" : fiches.map((fiche, index) => (
                    <li key={fiche._id}>
                        <Fiche fiche={fiche} />
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default Liste