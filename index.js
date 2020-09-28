const express = require ('express');

const users = ['Luiz', 'Rubens', 'Marina'];


const server = express();
server.use(express.json());

server.get('/users/:index', (req, res) => {
const {index} = req.params;

//users.push(name);

  return res.json(users[index]);
})

server.listen(3000)

