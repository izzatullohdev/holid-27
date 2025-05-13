const express = require('express')
const app = express()
const errorHandle = require('./middlewares/error')
const helmet = require('helmet')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }))

// routes
app.use('/api', require('./routes/register.route'))
// user routes
app.use('/api/user',
    require('./routes/user/project.route'),
    require('./routes/user/certificate.route'),
    require('./routes/user/network.route'),
    require('./routes/user/contact.route')
)
// admin routes
app.use('/api/admin',
    require('./routes/admin/project.route'),
    require('./routes/admin/certificate.route'),
    require('./routes/admin/network.route'),
    require('./routes/admin/contact.route')
)

// Handle error
app.use(errorHandle)

module.exports = app