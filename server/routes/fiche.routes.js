const ficheModel = require('../models/fiche.models')
const { SetFiches } = require("../controllers/fiche.controllers")

const router = require("express").Router()

const auth = require('../config/auth')

router.get("/", async (req,res) => {
    reponse = await ficheModel.find({})
    if (reponse.length >= 1) {
        res.json(reponse)
    }
})

router.post("/", SetFiches)

router.delete("/:id", auth, async (req,res) => {
    await ficheModel.deleteOne({_id : req.params.id })
    res.status(200).json({
        "message" : "Fiche supprimée"
    })
})

module.exports = router