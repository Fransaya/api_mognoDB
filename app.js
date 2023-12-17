const express=require('express');
const app=express();

const routeLibros=require('./routes/libros')

app.use(express.json());

app.use('/libros',routeLibros);


app.listen(3000,()=>{
    console.log("Servidor online en el puerto 3000")
});