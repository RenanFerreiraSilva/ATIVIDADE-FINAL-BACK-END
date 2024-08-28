

//import bcrypt from "bcrypt";
//import { v4 as uuidv4 } from 'uuid';


app.get("/", (request, response) => {
  response.send(`Hello, Renan!`);
});

const users = [
  { id: 1, name: `Renan`, available: true },
  { id: 2, name: `Mari`, available: false },
  { id: 3, name: `Carol`, available: true },
  { id: 4, name: "Paulo", available: true },
];

app.get("/users", (request, response) => {
  if (users.length === 0) {
    return response.status(404).json({ message: "nenhum usuário encontrado!" });
  }

  return response.json(users);
});

app.post("/users", (request, response) => {
  //const name = request.body.name;
  //consst available = request.body.available;

  const { name, available } = request.body;

  if (!name) {
    return response
      .status(400)
      .json({ message: "Nomde de usuário é obrigatório!" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    //se available ofr NULL ou UNDERFINED, vai receber TRUE
    available: available ?? true,
  };

  users.push(newUser);

  return response
    .status(201)
    .json({ message: "Usuário cadastrado com sucesso!", user: newUser });
});

app.put("/users/:id", (request, response) => {
  const { id } = request.params;

  const { name: updateUser, available } = request.body;

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return response.status(404).json({ message: "Usuário não encontrado!" });
  }

  //user.name = updateUser;
  //user.available = available;

  const {updates} = request.body
  Object.keys(updates).forEach(key => {
    if(key in user) {
      user[key] = updates[key]
    }
  });

  response.status(200).json({message: 'Usuário atualizado com sucesso!', user})
});

app.get('/users-filtered' , (request, response) => {
  const {filter} = request.query;

  let filtered = users;
  if(filter === 'ativo') {
    filterdUsers = filteredUsers.fiter(user => user.available === true);
  } else if(filter === 'inativo') {
    filteredUsers = filteredUsers.filter(user => user.available === false);
  }

  return response.status(200).json(filteredUsers)
});



const adminUsers = [];

app.post('/singup', async (request, response) => {
  try {
    const { username, password } = request.body;

    const hashPassword = await bcrypt.hash(password, 10)

    const existeUser = adminUsers.find(user => user.username === username);

    if(existeUser) {
      return response.status(400).json({message: "Usuário ja existe!"})
    }

    const newUser = {
      id: uuidv4(),
      username,
      password: hashPassword
    }

    adminUsers.push(newUser)

    response.status(201).json({message: "Admin cadastrado com sucesso", user: newUser});


  } catch{
    response.status(500).json({message: "Erro ao cadastrar admin"});
  }
});

app.post('/login', async (request, response) => {
  try {
    const {username, password} = request.body;

    const user = adminUsers.find(user => user.username === username);

    if(!user) {
      return response.status(404).json({message: 'Admin nao cadastrado.'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return response.status(400).json({message: "Senha incorreta"});
    }

    response.status(200).json({message: 'Login de admin realizado com sucesso.'});

  } catch{
    response.status(500).json({message: 'Erro ao fazer login.'});

  }
});











app.listen(9876, () => {
  console.log(`Servidor rodando na porta 9876.`);
}); 