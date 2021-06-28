const app = require('express')()
const os = require('os')
require('dotenv').config()
const yaml = require('js-yaml')
const redis = require('redis')

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || "6379",
});

redisClient.on('error', err => {
    console.log('Error ' + err);
});

redisClient.ping(redis.print)

const prettyPlease = (obj) => '<pre>' + yaml.dump(obj) + '</pre>'

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/system', (req, res) => res.send(prettyPlease({
//    "user": os.userInfo().username,
    "hostname": os.hostname(),
//    "arch": os.arch(),
//    "platform": os.platform(),
//    "release": os.release(),
})))

app.get('/headers', (req, res) => res.send(prettyPlease(req.headers)))

app.get('/env', (req, res) => res.send(prettyPlease(process.env)))


app.get('/counter', (req, res) => {
    redisClient.incr("counter", (err, result) => {
        err && console.log(err)

        res.send(`${result}`)
    });
})

app.listen(3000, () => console.log('Listening on port 3000'))
