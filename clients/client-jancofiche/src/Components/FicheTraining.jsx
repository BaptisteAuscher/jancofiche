import React from "react";

export function FicheTraining ({ type, handleClick, index, fiches }) {
    const textInCard = (type, index, fiches) => {
        if (type == "question") {
            return (<h2>Question : {fiches[index].question}</h2>)
        } else if (type == "answer") {
            return (
                <>
                    <p>Question : {fiches[index].question} </p>
                    <h2>Réponse : {fiches[index].answer}</h2>
                </>
            )
        }
    }
    return (
        <>
            <div className="fiche-training" onClick={handleClick}>

                {textInCard(type, index, fiches)}
            </div>
        </>
    )
}