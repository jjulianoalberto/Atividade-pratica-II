console.log('Hello, Atividade Prática - Express II!')


import express, { request, response } from 'express'

const app = express()
app.use(express.json())

import cors from 'cors'
app.use(cors())



const cars = [
    {id:1, modelo: 'civic', marca: 'honda', ano: '2014/2015', cor: 'Azul', preco: 'R$ 40.000'},
    {id:2, modelo: 'civic', marca: 'honda', ano: '2014/2015', cor: 'Azul', preco: 'R$ 40.000'},
    
]

app.get('/cars',(request, response)=>{
    if(cars.length===0){
        return response.status(404).json({message:'Nenhum usuario encontrado'})
    }

    response.json(cars)
})

app.post('/cars',(request, response)=>{
    const {modelo, marca, ano, cor, preco}=request.body
   
    if (!modelo){
        return response.status(400).json({message:'Modelo do carro é obrigatorio.'})
    }
    const newCar={
        id:cars.length+1,
        modelo,
        marca,
        ano,
        cor,
        preco
    }

    cars.push(newCar)

    response.status(201).json({message:'Carro adicionado com sucesso', car: newCar})

})

app.get('/cars/:marca',(request, response)=>{
    const {marca} = request.params

    const carsFiltered=cars.filter(car=>car.marca===marca)

    response.json(carsFiltered)
})

app.put('/cars/:id', (request, response)=>{
    const {id} = request.params
    const{cor, preço}=request.body

const car=cars.find(car=>car.id === parseInt(id))

if (!car){
    return response.status(404).json({message:'Veículo, não encontrado. O usuário deve voltar para o menu inicial depois'})
}

car.cor=cor
car.preco=preco

response.json({message:'Carro atualizado com sucesso', user})
})


app.delete('/cars/:id', (request,response)=>{
    const {id}=request.params
    const carIndex=cars.findIndex(car=>car.id===parseInt(id))
    if(carIndex===-1){
        return response.status(404).json({message:'Veículo, não encontrado. O usuário deve voltar para o menu inicial depois'})
    }

    const [deleteCar]=cars.splice(carIndex,1)

    response.status(200).json({message:'Carro removido com sucesso', car: deleteCar})
})


const adminUsers=[]
app.post('/signup', async(request,response)=>{
    try{
        const {email, password}=request.body

        const hashedPassword=await bcrypt.hash(password, 10)

        const existingUser=adminUsers.find(user=>user.email===email)
        if(existingUser){
            return response.status(404).json({message:'Usuario ja existe'})
        }
app.post('/login',async(request, response)=>{
    try{
        const {email, password}=request.body
        const user = adminUsers.find(user=>user.email===email)
        if(!user){
            return response.status(404).json({message:'Admin não encontrado'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return response.status(400).json({message:'Senha incorreta'})
        }
        response.status(200).json({message:'Login realizado com sucesso'})
    } catch{
        response.status(500).json({message:'Erro ao fazer login'})
    }
})


        const newUser={
            email,
            password: hashedPassword
        }
        adminUsers.push(newUser)

        response.status(201).json({message:'Admin cadastrado com sucesso', user: newUser})

    } catch{
        response.status(500).json({message:'Erro ao cadastrar admin'})
    }
})

app.listen(3001)
console.log('Servidor rodando porta 3001')

