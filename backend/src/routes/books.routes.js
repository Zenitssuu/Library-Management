import { Book } from "../models/book.models.js";
import { app } from "../app.js";
import { apiError } from "../utils/apiError.js";
import { Router } from "express";

const router = Router();
//posting books in db
router.post('/',async (req,res)=>{

    const {title,author,publishYear} = req.body;
    // console.log(req.body.title);
    // console.log(req.body.author);
    // console.log(req.body.publishYear);

    
    try {
        if(!title || !author || !publishYear){
            return res.status(400).send({
                message:"Send all required feilds: title, author and publishYear"
            })
        }
        const newBook = {
            title:title,
            author:author,
            publishYear:publishYear
        }

        const book = await Book.create(newBook);

        return res.status(200).send(book);
        
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
           
    }
})

//getting all books from db
router.get('/',async (req,res)=>{
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count:books.length,
            data:books
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500,{message:error.message})
        
    }
})

//getting all books from db by id
router.get('/:id',async (req,res)=>{

    try {
        console.log(req.params);
        
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json({book});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:error.message})
        
    }
})

//update book
router.put('/:id',async (req,res)=>{
    try {
        const {title,author,publishYear} = req.body;
        if(!title || !author || !publishYear){
            return res.status(400).send('send all feilds');
        }
        const {id} = req.params

        const result = await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(400).send('book not found');
        }

        return res.status(200).send({message:"update successfull"})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
        
    }
})

//delete
router.delete('/:id',async (req,res)=>{
    try {
        const {id} = req.params

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).send({message:"book not found"})
        }
        return res.status(200).send({message:'deleted successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
        
    }
})

export default router;