const express = require ('express');

const server = express();
server.use(express.json());

const users = ['Luiz', 'Rubens', 'Marina'];

//Midleeware global
// server.use((req, res, next) => {
//   console.time('request'),
//   console.log(`Metodo: ${req.method}, URL ${req.url}`);

//  next();
//  console.timeEnd('request');

// });
// // Middleware Local
// function checkUserNameExist(req, res, next) {
//   if (!req.body.name){
//     return res.status(400).json({error: 'User name' is requered})
//   }

     
//   return next();
// }

// function checkUserInArray(req, res, next) {
//   const user = users [req.params.index];
//   if (!user) {
//     return res.status(400).json({ error: "user does not exist. "});
//   }
//   req.user = user;  
//   return next();
// }
server.get('/users', (req, res) => {
  return res.json (users);
});

server.get('/users/:index', (req, res) => {
  const {index} = req.params;
  return res.json(users[index]);
});

server.post ("/users", (req, res) => {
  const {name} = req.body;
  users.push(name);
  return res.json(users); 

});


server.put("/users/:index", (req, res) => {
  const {index} = req.params;
  const {name} = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  
  const {index} = req.params;
  users.splice(index, 1)







  return res.json(users);
});


server.listen(3000)

