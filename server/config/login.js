const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.post("/login", (req, res) => {

    const admin = process.env.admin
    const password = process.env.password
  // check if email exists
    if (req.body.username != admin) {
        res.status(400).json({"error" : "Mauvais identifiant de connexion"})
        return;
    }

    if (req.body.password != password) {
        res.status(400).json({"error" : "Mauvais mot de passe"})
        return;
    }

          //   create JWT token
    const token = jwt.sign(
    {
        user: process.env.admin,
        userPass: process.env.password,
    },
    "RANDOM-TOKEN",
    { expiresIn: "24h" }
    );

        //   return success response
    res.status(200).send({
    message: "Login Successful",
    admin,
    token,
    });
    })

module.exports = router