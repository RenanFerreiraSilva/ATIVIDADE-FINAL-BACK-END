import express from "express";
import cors from "cors";
//import bcrypt from "bcrypt";
//import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(cors());




const cars = [
  {id: 1, modelo: "Civic", marca: "Honda", ano: 2014, cor: "Azul", preco: 40000},
  {id: 2, modelo: "Fit", marca: "Honda", ano: 2013, cor: "Verde-Metalico", preco: 26900}
];

app.post('/cars', (request, response) => {
  const { modelo, marca, ano, cor, preco } = request.body;

  if(!modelo || !marca || !ano || !cor || !preco) {
    return response.status(400).json({message: "O preenchimentos de todos os campos é necessario."});
  }

  const newCar = {
    id: cars.length +1,
    modelo,
    marca,
    ano,
    cor,
    preco
  };

  cars.push(newCar);

  return response.status(201).json({message: "Carro cadastrado com sucesso."})
});

app.get('/cars', (request, response) => {
  if(cars.length === 0) {
    return response.status(404).json({message: "Nenhum carro encontrado."});
  }
  return response.json(cars);
});

app.get('/cars-filtered', (request,response) => {
  const filter = request.query;

  if(filter === modelo) {
    filteredCars = filteredCars.filter(car => car.modelo === cars.madole);
  }else if(filter !== modelo) {
    return response.status(400).json({message: 'carro nao encontrado'});
  }

  return response.status(200).json(filteredCars);
});

app.put('/cars/:id', (request, response) => {
  const {id} = request.params;
  const {cor: updateColor, preco: updateValue} = request.body


  const car = cars.find((car) => car.id === parseInt(id));

  if(!car) {
    return response.status(404).json({message: "Veículo não encontrado. O usuário deve voltar para o menininicial depois."});
  }

  car.cor = updateColor;
  car.preco = updateValue;
  
  response.status(200).json({message: "Carro atualizado com sucesso.",car});

});

app.delete('/cars/:id', (request, response) => {
  const {id} = request.params;

  const carIndex = cars.findIndex(car => car.id === parseInt(id));
  
  if(carIndex === -1) {
    return response.status(404).json({message: "Veículo não encontrado. O usuário deve voltar para o menininicial depois."})
  }
  
  const deletedCar = cars.splice(carIndex, 1)

  response.status(200).json({message: "Carro removido com sucesso.", car: deletedCar});
});


app.listen(9876, () => {
  console.log(`Servidor rodando na porta 9876.`);
});

console.log(`Ta rodando`); 