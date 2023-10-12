const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`mongodb+srv://Sagar885941:${process.env.REACT_APP_PASSWORD}@cluster0.lpam1rp.mongodb.net/?retryWrites=true&w=majority`)