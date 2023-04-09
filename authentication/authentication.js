const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

app.get('/users',(req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt() //  default round = 10, it'll generate few hashes/seconds; round = 20 or 30 will take more days to generate single hash
        const hashedPasswod = await bcrypt.hash(req.body.password, salt)
        console.log(salt);
        console.log(hashedPasswod)
        const user = {
            name: req.body.name,
            password: hashedPasswod
        }
        users.push(user)
        res.sendStatus(201)
    } catch{
        res.sendStatus(500)
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if(user == null)
        return res.status(400).send('Cannot find user')
    try{
        if( await bcrypt.compare(req.body.password, user.password))    //  comparing with hashed password
            res.send('Success')
        else
            res.send('Not Allowed!')
    } catch{
        res.sendStatus(500)
    }
})

app.listen(2001)