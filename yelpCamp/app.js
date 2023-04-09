if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')

const ExpreeError = require('./utils/ExpressError')
const methodOverride = require('method-override');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const usersRoutes = require('./routes/users')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')

mongoose.connect('mongodb://127.0.0.1/yelp-camp', 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => {
        console.log('MongodbコネクションOK')
    })
    .catch(err => {
        console.log('MongodbコネクションNG')
        console.log(err)
    })

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


const sessionConfig = {
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(flash())

app.use('/', (req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success =req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/', usersRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)


app.all('*', (req, res, next) => {
    next(new ExpreeError('ページが見つかりませんでした', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500} = err
    if (!err.message) {
        err.message = '問題が起きました'
    }
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待機中...')
})