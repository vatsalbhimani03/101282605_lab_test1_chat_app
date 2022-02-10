var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = 3000
const user = require('./models/userSchema');
const group = require('./models/groupMessageSchema');
const private = require('./models/privateMessageSchema');

//Create Server Socket
const io = require('socket.io')(http)
app.use(express.json());
app.use(cors())
//Create user list
users = []
 
// MOngoDb connection
var dbUrl = 'mongodb+srv://vatsalbhimani:Vatsal123@restaurants.kr0a9.mongodb.net/labtest1'

mongoose.connect(dbUrl , { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('mongodb connected',err);
    }else{
        console.log('Successfully mongodb connected');
    }
})

// user chat page
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/front/chat.html')
})
app.post('/chat', async(req, res) => {
    
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

// user sign in page
app.get("/signin", (req, res) => {
    res.sendFile(__dirname + '/front/signin.html')
})
app.post('/signin', async(req, res) => {
    try {
        const { username, password } = req.body;
        const User = await user.findOne({username});
        if(User.password !== password ){
            throw new Error("Password does not match")
        }  
        res.status(200).send({
            User
        })
    } catch (err) {
        res.status(500).send({error:err.message})
    }
})

// user sign up page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/front/signup.html')
})
app.post('/signup', async (req, res) => {
    const {username, firstname, lastname, password} = req.body
    const existedUser = await user.findOne({username})
    if (existedUser !== null) {
        throw new Error ('Username already exist in the system')
    } 

    try {
        const newUser = new user({
            username,
            firstname,
            lastname,
            password
        })
        await newUser.save()
            res.status(200).send( {newUser} )
    } catch (err) {
        res.status(500).send(err)
    }
    
})

//Accept new request
io.on('connection', (socket) => {
    console.log('Connected ')
    
    socket.emit('welcome', 'Welcome to the chat room: ')

    //Custom message event to socket
    socket.on('message', (data) => {
        console.log(data)
        const message={
            user:data.user,
            message :data.message
        }
        console.log(`Room Name: ${data.roomName}`)
       
        // io.to(data.room).emit('newMessage', data.message)
       socket.broadcast.to(data.roomName).emit('roomMessage', message)
    })

    //Get User name
    socket.on('newUser', (name) => {
        console.log(name)
        //users.push({name, id: socket.id})
        //users.push(socket.id)
        console.log(users)
        if(users.includes(name)){
            name = users[i]
            users.push(name)
        }else{
            users.push(name)
        }
        socket.id = name
    })

    //Group/Room Join
    socket.on('joinroom', (room, username) => {
        socket.join(room)
        roomName = room
    })
   
    //Disconnected
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})


// listening on http://localhost:3000
http.listen(PORT, () => {
    console.log(`Server started at ${PORT} \n http://localhost:${PORT}/signin`)
})