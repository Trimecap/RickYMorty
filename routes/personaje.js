var express = require('express');
var router = express.Router();
const Personaje = require('../models/personaje');

router.get('/todos', async (req, res) => {
  try {
    const personajes = await Personaje.find({}, 'id name gender image url created');
    console.log(personajes);
    res.render('personajes', { title: 'Express', personajes: personajes });
  } catch (error) {
    res.status(500).send('Error al obtener la lista de personajes.');
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const personajes = await Personaje.find({id:id}, 'id name gender image url created');
    console.log(personajes);
    res.render('vistapersonaje', {personajes});
  } catch (error) {
    res.status(500).send('Error al obtener la lista de personajes.');
  }
});

router.post('/', async (req, res) => {
  const {id, name, gender, image, url, created} = req.body;
  try{
    const personaje = new Personaje({id, name, gender, image, url, created})
    await personaje.save();
  }catch(error){
    console.log(error)
    res.status(500).send(error);
  }
})

module.exports = router;
