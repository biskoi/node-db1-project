const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

module.exports = server;

server.get('/', (req, res) => {

   // db.select('*').from('accounts')
   db('accounts')
   .then(rep => {
      res.status(200).json(rep)
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`
      });
   });

});

server.get('/:id', (req, res) => {

   // db.select('*').from('accounts')
   db('accounts')
   .where({
      id: req.params.id
   })
   .then(rep => {
      res.status(200).json(rep)
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`
      });
   });

});

server.post('/', (req, res) => {

   db('accounts')
   .insert(req.body)
   .then(rep => {
      // res.status(200).json(rep)
      db('accounts')
      .where({
         id: rep[0] // could also just chain .first to the .where
      })
      .then(resp => {
         res.status(200).json(resp[0]);
      })
      .catch(err => {
         res.status(500).json({
            message: `Server error. ${err}`
         });
      });
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`
      });
   });

});

server.delete('/:id', (req, res) => {

   db('accounts')
   .where({
      id: req.params.id
   })
   .del()
   .then(rep => {
      res.status(200).json({
         message: `${rep} entries deleted.`
      });
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`
      });
   });

});

server.put('/:id', (req, res) => {

   db('accounts')
   .where({
      id: req.params.id
   })
   .update(req.body)
   .then(rep => {
      res.status(200).json({
         message: `${rep} entries updated.`
      })
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`
      });
   });

});
