import {useState} from "react";
import axios from "axios"
import { useForm } from 'react-hook-form'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

import "./Auth.css"



export default function Config () {




    const [errorMessage, setErrorMessage] = useState("")
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        const user = {
            username: data.admin,
            password: data.password
        }
        axios.post('https://janco-fiche-server.onrender.com/auth/login', user )
          .then(function (response) {
            console.log(response)
            cookies.set("TOKEN", response.data.token, {
              path: "/",
            });

            setErrorMessage("");
            window.location.href = "/config";
          })
          .catch(function (error) {
            console.log(error.response)
            setErrorMessage(error.response.data.error);
            
          });
    }
    return (
    <>
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="form-auth">
                <h1>Identification</h1>
                { errorMessage != "" && <span className="error-log">{errorMessage}</span>}
                <label htmlFor="admin">Admin</label>
                <input type="text" { ...register("admin")} name="admin" id="admin" placeholder="admin"/>
                <label htmlFor="name">Mot de passe</label>
                <input type="password" {...register("password")} name="password" id="password" placeholder="Mot de passe"/>          
                <input type="submit" className="button-envoyer" />
            </form>
    </>
    )
}