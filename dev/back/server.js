const Mongoose = require('mongoose');

let express = require('express'),
    app = express();

let fs = require('fs'),
    path = require('path'),
    async = require('async'); 
let bodyParser = require ('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//connexion à la BDD local sur la collection "JeuxVideo"
Mongoose.connect("mongodb://mongodb:27017/JeuxVideo");


//Création de la table JeuxVideo
const JeuxVideoModel = Mongoose.model('JeuxVideo', {
    nom: String,
    description: String,
    type: String,
    disponible: Number,
    console: String
}, 'JeuxVideo')

app.get('/version', function (req,res){
    res.status(200).json({yes:"we can"})
});

//Appel d'une méthode GET qui montre le menu de la pizzeria avec les toutes les infos (nom,description,...) 
app.get("/JeuxVideo", async (request, reponse) => {
    try{
        var result = await JeuxVideoModel.find().exec();
        reponse.send(result);
    }catch(error){
        reponse.status(500).send(error);
    }
})

//Appel d'une méthode POST qui récupère les commandes de l'utilisateur
app.post("/addjeu", (req, res) => {
    var myData = new JeuxVideo(req.body);
    console.log(myData);
    myData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database" + err);
      });
  });
// Appel GET d'écoute sur le port 3000
app.listen(3000,function(){
   console.info('HTTP on port 3000')
})
