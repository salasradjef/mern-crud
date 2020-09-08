const router = require('express').Router()
const Exercice = require('../models/exercice.model')

router.route('/').get( (req,res) => {
    Exercice.find()
    .then(exercices => res.json(exercices))
    .catch( err => res.status(400).json('Error : '+ err))
})

router.route('/add').post((req,res)=> {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)


const newExercice = new Exercice({
    username,
    description,
    duration,
    date

});

newExercice.save()
.then(()=> res.json('user added'))
.catch( err => res.status(400).json('error: '+ err))

})

router.route('/:id').get((req,res)=> {
    Exercice.findById(req.params.id)
    .then( exercice => res.json(exercice))
    .catch(err => res.status(400).json('Error:' + err))
})

router.route('/:id').delete( (req,res)=> {
    Exercice.findByIdAndDelete(req.params.id)
    .then(exercice => res.json('Exercices supprimer'))
    .catch(err => res.status(400).json('Error:'+ err))
})


router.route('/update/:id').post( (req,res)=> {
    Exercice.findById(req.params.id)
    .then( exercice => {
        exercice.username = req.body.username
        exercice.description = req.body.description
        exercice.duration = Number(req.body.duration)
        exercice.date = Date.parse(req.body.date)
        exercice.save()
        .then( () => res.json('User updated'))
        .catch( err => res.status(400).json('ERROR:' + err))
    })
    
    .catch( err => res.status(400).json('Error:' + err))
})

module.exports = router