import {useState, useEffect} from "react";
import axios from "axios";

import { FicheTraining } from "../Components/FicheTraining";


function Entrainement () {
    function getRandomIndex (used, max) {
        if (used.length == max) {
            return -1
        }
        let i = Math.floor(Math.random() * max)
        if (!(used.includes(i))) {
            return i
        } else {
            getRandomIndex(used, max)
        }
    }

    const [fiches, setFiches] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isTraining, setTraining] = useState(false)
    const [index, setIndex] = useState(0)
    const [usedIndex, setUsedIndex] = useState([])
    const [type, setType] = useState("")
    const nextIndex = async () => {
        if (!isTraining) {
            setTraining(true)
            setType("question")
        }
        if (type == "question") {
            setType("answer")
            return
        }
        let i = getRandomIndex(usedIndex, fiches.length)
        if (i == -1) {
            return
        }
        if (i == undefined) {
            nextIndex()
            return
        }
        await setUsedIndex([...usedIndex, i])
        await setIndex(i)
        await setType("question")
    }
    useEffect(() => {
        const callAPI = async (url) => {
            await axios.get(url)
                    .then((res) => {
                        setFiches(res.data.reverse())
                        setLoading(false)
                    })
        }
        callAPI("https://janco-fiche-server.onrender.com/fiche")
    }, [])

    const trainingComponent = () => {
        if (isLoading) {
            return "Chargement"
        } else if (!isLoading && !isTraining) {
            return (<button onClick={nextIndex}><h2>S'entraîner !</h2></button>)
        } else if (!isLoading && isTraining) {
            return <FicheTraining type={type} index={index} fiches={fiches} handleClick={nextIndex} />
        }
    }

    return (
        <>
            {trainingComponent()}
        </>
    )
}

export default Entrainement