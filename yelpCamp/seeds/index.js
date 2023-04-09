const mongoose = require('mongoose')
const cities = require('./cities')
const Campground = require('../models/campground')
const {dedescriptors, places, descriptors} = require('./seedHeplers')

mongoose.connect('mongodb://127.0.0.1/yelp-camp', 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        console.log('MongodbコネクションOK')
    })
    .catch(err => {
        console.log('MongodbコネクションNG')
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i=0; i<50; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length)
        const price = Math.floor(Math.random() * 2000) + 1000
        const camp = new Campground({
            author: '63d72a32475b02153bf6c65c',
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`,
            geometry: {
                type:'Point',
                coordinates: [
                    cities[randomCityIndex].longitude,
                    cities[randomCityIndex].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dr8zxgpfl/image/upload/v1675686981/YelpCamp/nxlgwrhd0qxi2bd8qhox.png',
                  filename: 'YelpCamp/nxlgwrhd0qxi2bd8qhox'
                },
                {
                  url: 'https://res.cloudinary.com/dr8zxgpfl/image/upload/v1675686983/YelpCamp/brm4fqhc4a4qrvd5nb7w.png',
                  filename: 'YelpCamp/brm4fqhc4a4qrvd5nb7w'
                }
              ],
            description: '木曽路は全ての山の中にある。それが全てだ。',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
}) 