//  based on tutorial: https://youtu.be/mbsmsi7l3r4
require('dotenv').config()
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json()) //  lets our server application to get json from the request body of the user request - https://youtu.be/mbsmsi7l3r4?t=366

const posts = [
    {
        username: 'Mohammed',
        title: 'Post 1'
    },
    {
        username: 'Audhil',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
    //  Authenticate user - refer another video
    const username = req.body.username
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

//  middle-ware
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'] //  structure will be BEARER Token
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401)  //  they've not sent the token
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)  //  don't have access
        req.user = user
        next()  //  move on from the middleware
    })
}

app.listen(4000)