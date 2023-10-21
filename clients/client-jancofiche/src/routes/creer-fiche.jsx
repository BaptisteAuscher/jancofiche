import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import './creer-fiche.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function CreerFiche () {
    const [errorMessage, setErrorMessage] = useState("")
    const [succes, setSucces] = useState("")
    const {register, handleSubmit, reset, formState, formState : {isSubmitSuccessful}} = useForm()
    const onSubmit = (data) => {
        localStorage.setItem("name", data.name)
        localStorage.setItem("mail", data.mail)
        const fiche = {
            name: data.name,
            mail: data.mail,
            question: data.question,
            answer: data.answer,
            type: data.type
        }
        axios.post('https://janco-fiche-server.onrender.com/fiche', {fiche} )
          .then(function (response) {
            setErrorMessage("");
            setSucces("Fiche crée avec succès !")
          })
          .catch(function (error) {
            setErrorMessage(error.response.data.error);
            setSucces("")
          });
    }
    console.log(formState.isSubmitSuccessful)
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset();
        }
      }, [formState, reset]);
    
    const mail = localStorage.getItem("mail")
    const name = localStorage.getItem("name")
    return (
        <>  
            <form method="post" onSubmit={handleSubmit(onSubmit)} className="form-creer">
                <h1>Ajoute une fiche</h1>
                { errorMessage != "" && <span className="error-log">{errorMessage}</span>}
                { succes != "" && <span className="succes-log">{succes}</span>}
                <label htmlFor="mail">Adresse mail des mines</label>
                <input type="email" defaultValue={mail} { ...register("mail", {pattern: /\w+[.]\w+(@etu.minesparis.psl.eu)/g})} name="mail" id="mail" placeholder="jean.mineur@etu.minesparis.psl.eu"/>
                <label htmlFor="name">Nom</label>
                <input type="text" defaultValue={name} {...register("name")} name="name" id="name" placeholder="Jean Mineur"/>
                <label htmlFor="question">Pose une question</label>
                <input type="text" {...register("question")} name="question" id="question" placeholder="Quelle est la date du dernier krach boursier ?"/>
                <label htmlFor="answer">Propose une réponse</label>
                <input type="text" {...register("answer")} name="answer" id="answer" placeholder="2008"/>

                <select name="type" id="type-select" {...register("type")}>
                    <option value="Ordre de grandeur">Ordre de grandeur</option>
                    <option value="Conversion">Conversion</option>
                    <option value="Dates et évènements">Dates et évènements</option>
                    <option value="Définitions">Définitions</option>
                    <option value="Infos importantes">Infos importantes</option>
                </select>
                <input type="submit" className="button-envoyer" />
                
            </form>
        </>
    )
}

export default CreerFiche