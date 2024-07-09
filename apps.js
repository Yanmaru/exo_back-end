//Appel de la dépendance express
var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');

const url = "mongodb+srv://Awarle:aurel123@cluster0.yfvpimp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(url)
.then(console.log("Mongodb Connected !"))
.catch(error => console.log(error));

app.set('view engine', 'ejs');

var Contact = require ("./models/Contact");

app.post("/nouveaucontact", function(req, res){

    const Data = new Contact({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        adresse: req.body.adresse,
        message: req.body.message
    })
    Data.save().then(() => {
        console.log("contact saved !");
        res.redirect('/');
    })
    .catch(error => console.log(error));
});

// app.get('/',function(req,res){
//     Contact.find().then((data => {
//         console.log(data)
//         res.end();
//     }))
//     .catch(error => console.log(error));
// });

// READ
app.get('/', function (req, res){

    Contact.find().then(data => {

    res.render('home', {data:data});
        
    })
    
    .catch(error => console.log(error));
    
});

// CREATE

app.get('/formulairecontact', function (req, res){
    res.render('NewContact');
});

app.get('/contact/:identifiant', function (req, res) {
    
    Contact.findOne({
        _id : req.params.identifiant
    }).then(data => {
        res.render('Edit', {data:data});
    })
    .catch(error => console.log(error));
})


//Permet de lire le fichier index.html 
 var path = require('path');
const car = require('./car');


// app.get('/', function(req, res){
//     res.send("<html><body><h1>Express c'est génial</h1></body></html>");
// })

//  app.get('/formulaire', function(req, res){
//      res.sendFile(path.resolve("index.html"));
//  });

// app.get('/students', function(req, res){
//     res.send("<html><body><h1>Page Student !</h1></body></html>");
// });

// app.post('/submit-name', function(req, res){
//     // console.log("Votre nom est " + req.body.nom + " " + req.body.prenom);
//    res.send("Votre nom est " + req.body.nom + " " + req.body.prenom);
    
// })

// app.post('/contactform', function(req, res){
//     res.send("Bonjour " + req.body.nom + " " + req.body.prenom + ",<br>" 
//         + "Merci de nous avoir contacté.<br>Nous reviendrons vers vous dans les plus brefs délais : " 
//         + req.body.email ) ;
// })


app.get('/newcar', function (req, res){
    res.render('NewCar');
});

// / Route pour sauvegarder les voitures

app.post('/newcarsave', function (req, res){
    const Data = new car ({

    modele : req.body.modele,
    marque : req.body.marque,
    description : req.body.description
    })

    Data.save().then(()=> {
        console.loge("Sauvegarde réussie");
        res.redirect('/allcars');
    })

    .catch(error => console.log(error));
});

//  route pour afficher toutes les voitures

app.get('/allcars', function(req,res){
    car.find().then((data)=>{
        res.render('AllCars', {data:data});
    })
    .catch(error => console.log(error));
})


// route pour afficher 1 voiture en fonction de son id

app.get('/editcar/:id', function(req,res){
    Car.findOne({_id:req.params.id})
    .then((data)=>{
        res.render('Editcar', {data:data});
    })
    .catch(error => console.log(error));
});


app.put('/updatecar/:id', function(req, res){
    const Data = {
        marque : req.body.marque,
        modele : req.body.modele,
        description : req.body.description
    }

    Car.updateOne({_id:req.params.id}, {$set: Data})
    .then((data)=>{
        console.log("Voiture modifiée");
        res.redirect("/allcars");
    })
    .catch(error => console.log(error));

})



// route pour delete

app.delete('/deletecar/:id', function(req,res){
    Car.findOneAndDelete({_id:req.params.id})
    .then(()=>{
        console.log("suppression réussie");
        res.redirect("/allacars");
    })
})
























var server = app.listen(5000, function(){
    console.log('Server listening on port 5000');
})


