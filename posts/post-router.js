const express = require('express');

// database access using knex
const knex = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    knex.select('*').from("posts").then( posts => {
        res.status(200).json({data:posts})
    }).catch( error => {
        res.status(500).json({error})
    })
});

router.get('/:id', (req, res) => {
    knex.select('*').from("posts").where({id: req.params.id})
    .then(post => {
        res.status(200).json({postID: post})
    })
    .catch(error => {
        res.status(500).json({error: error})
    })

});

// SQL POST
// INSERT INTO Shippers ('ShipperName', 'Phone')VALUES('BobbyShips', '973-224-3825')
router.post('/', (req, res) => {
    knex('posts').insert(req.body, "id")
    .then(([id]) => {
        res.status(200).json({id: id})//returns an id
    })
    .catch(error => {
        res.status(500).json({error:error})
    })
});

// SQL PUT
// update shippers set ShipperName = 'updated', Phone = '18005551212' where ShipperID = 4;
// needs a WHERE
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    knex('posts').where({id: id}).update(changes)
    .then(updatedData => {
        if(updatedData > 0){
        res.status(200).json({count: updatedData})
        } else{
            res.status(404).json({message: 'no record updated/found'})
        }
    })
    .catch(error => {
        console.log('put/error', error);
        res.status(500).json({message:error.message})
    })
});

// SQL DELETE
// delete from shippers where shipperId=3
router.delete('/:id', (req, res) => {
    const id = req.params.id
    knex('posts').where(id).del()
});

module.exports = router;