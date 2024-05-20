require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const { PORT, MONGO_URL, MONGO_DBNAME, REDIS_URL, NODENV } = process.env
const { mongoConnect, redisConnect } = require('./etc/connection')
const routes = require('./routes/index.route')

app.use(express.json())
app.use('/generate', (req, res) => {
  const token = jwt.sign({}, "KEY", { expiresIn: '2H' })

  res.send({
    tkn: token.slice(0, 15) + 'A' + token.slice(15, 30) + 'A' + token.slice(30 + 0)
  })
})

app.use('*', (req, res, next) => {
  try {
    const { token } = req.headers

    if (!token) throw ({ msg: 'Invalid token' })
    const newToken = token.slice(0, 15) + token.slice(16, 31) + token.slice(32)
    const decoded = jwt.verify(newToken, "KEY", (_err, decoded) => { return decoded })
    if (!decoded) throw ({ msg: 'Invalid token' })
    
    next()
  } catch (err) {
    res.status(500).send(err)
  }
})

app.use(routes)
app.use('/', (req, res) => {
  res.status(404).send({
    msg: "Missing direction"
  })
})

mongoConnect(MONGO_URL, MONGO_DBNAME)
void redisConnect(REDIS_URL)

if (NODENV !== 'Testing') {
  app.listen(PORT || 3000, '0.0.0.0', () => {
    console.log('Connected to PORT:', PORT)
  })  
}

module.exports = app