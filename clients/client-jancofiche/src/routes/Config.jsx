import {React,useState} from "react";
import axios from 'axios'
import { useEffect } from 'react'
import { Fiche } from "../Components/Fiche";

import Cookies from "universal-cookie";
const cookies = new Cookies();


function Liste () {
    const token = cookies.get("TOKEN");

    const [fiches, setFiches] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("http://localhost:3000/fiche").then((res) => {
            setFiches(res.data.reverse())
            setLoading(false)
        })
    }, [])

    const handleDelete = (e) => {
        setLoading(true)
        axios.get("http://localhost:3000/fiche").then((res) => {
            setFiches(res.data.reverse())
            setLoading(false)
        })
    }
    
    return (
        <>
        <div className="fiche-page">
            <h1>Toutes les fiches {isLoading ? "(Chargement...)" : `(${fiches.length})`}</h1>
            <ul>
                {isLoading ? "Chargement" : fiches.map((fiche, index) => (
                    <li key={fiche._id}>
                        <Fiche fiche={fiche} isDeletable={true} onDelete={handleDelete}/>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default Liste