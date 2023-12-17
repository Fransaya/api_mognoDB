const express=require('express');
const router=express.Router();

const Libro=require('../models/Libro');

//?RUTA para traer todos los libros
router.get('/',async(req,res)=>{
    try{
        const libros=await Libro.find()
        res.json(libros);
    }catch(err){
        console.log(err)
        res.status(500).json({error:"no se encontraron lirbos"});
    }
});


//? devuelve datos de un libro segun un id
router.get('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(" id recibida", id)
        const libro=await Libro.findById(id);
        if(libro){
            res.json(libro);
        }else{
            console.log("no existe un libro con esa id");
            res.json({message:"no existe ese libro"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"no se encontro el libro"});
    }
})

//? creacion de nuevo libro
router.post('/',async(req,res)=>{
    try{
        const datos=new Libro(req.body);;
        console.log(datos);
        await datos.save();
        res.json(datos);    
    }catch(err){
        console.log("faltan datos por enviar");
        res.status(500).json({error:"Error al crear nuevo lirbo"});
    }; 
})


//? actualizacion de informacion de un libro

router.put('/:id', async(req,res)=>{
    try{
        const id=req.params.id;
        const libroActu= await Libro.findByIdAndUpdate(id, req.body,{
            new:true
        });
        res.json(libroActu);
    }catch(err){
        console.log(erro);
        res.status(500).json({error:`no se puedo actualizar el libro con id ${req.params.id}`})
    }
})

//? eliminacion de lirbo segun id
router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const libroDelete= await Libro.findByIdAndDelete(id, req.body,{
            new:true
        });
        res.json(libroDelete) ;
    }catch(err){
        console.log("no se pudo eliminar el libro");
        res.status(500).json({error:`no se pudo eliminar el lirbo con el id ${req.params.id}`});
    }
})

module.exports=router;
