const FicheModel = require("../models/fiche.models")

module.exports.SetFiches  = async (req,res) => {
    console.log("requete recue en cours de traitement ...")
    try {
        if (req.body.fiche.name == "") {
            res.status(400).json({"error" : "Remplis le champ nom."})
            return;
        }
        if (req.body.fiche.mail == "") {
            res.status(400).json({"error" : "Remplis le champ mail."})
            return;
        }
        if (req.body.fiche.question == "") {
            res.status(400).send({error : "Remplis le champ question."})
            return;
        }
        if (req.body.fiche.answer == "") {
            res.status(400).json({"error" : "Remplis le champ réponse."})
            return;
        }
        const fiche = FicheModel.create(req.body.fiche)
        console.log(fiche)
        res.status(200).json({"message": "tout est bon"})
    } catch (errors) {
        console.log(errors)
    }
}