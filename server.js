const express = require('express')
const mongoose = require('mongoose')
const task = require('./models/taskModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes  product

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is rajat')
})

app.get('/task', async(req, res) => {
    try {
        const task = await task.find({});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/task/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const task = await task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/tasks', async(req, res) => {
    try {
        const task = await task.create(req.body)
        res.status(200).json(task);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a task
app.put('/tasks/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const task = await task.findByIdAndUpdate(id, req.body);
        // we cannot find any task in database
        if(!task){
            return res.status(404).json({message: `cannot find any task with ID ${id}`})
        }
        const updatedtask = await task.findById(id);
        res.status(200).json(updatedtask);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a task

app.delete('/tasks/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const task = await task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({message: `cannot find any task with ID ${id}`})
        }
        res.status(200).json(task);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://admin:12345678Admin@devtaminapi.zpncstm.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})