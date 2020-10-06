const express = require('express');

const server = express(); // A variável server recebe express(),
                          // os parenteses indicam que o express exporta uma função,
                          // Ou seja, estamos chamando a função do express. 

server.use(express.json()); // o server é a instância do express, o use é um plugin já importado 
                            // que estamos adicionando pra ele (express) e passamos pra ele o
                            // express.json()

const users = ['Rubens', 'Eliete', 'Marina'];

// Middleware Global
server.use((req, res, next) => {
  console.time('request');
  console.log(`Metodo: ${req.method}, URL ${req.url}`);

  next();

  console.timeEnd('request');
});

// Middleware Local
function checkUserNameExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required!'});
  } 

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists!"});
  }

  req.user = user;

  return next();

}

// CRUD - CREATE, READ, UPDATEe DELETE
/**
 * ROTAS get, post, put e dele a seguir 
 */

// Consultar - Listar todos os usuario
server.get('/users', (req, res) => {
  return res.json(users); // Lista todos os usuários 
});

// Consultar - Listar um usuario
server.get('/users/:index', checkUserInArray, (req, res) => {
  // Aqui exibiremos o usuário referente ao id capturado na rota
  return res.json({message : `Exibindo o usuário ` + req.user});
});

// Create
// Incluir - Cadastrar usuario
server.post('/users', checkUserNameExists, (req, res) => {
  const { name } = req.body;

  users.push(name); // Insere o usuário passado no corpo da requisição no vetor

  return res.json(users);
});

// Update
// Alterar - Editar um usuario
server.put('/users/:index', checkUserNameExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name }  = req.body;

    users[index] = name; // Substitui no vetor o nome que está na posição do 
                         // index passado pelo nome passado no corpo da requisição

    return res.json(users);
});

// Delete
// Excluir - Deletar um usuario
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1); // O método splice percorre o vetor até o index e 
                          // e exclui a partir daquela posição o número de
                          // posições passada no segundo parâmetro.

  return res.send();
});

// Porta utilizada pelo servidor
server.listen(3000)