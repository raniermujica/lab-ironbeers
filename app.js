const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

//const randomBeer = PunkAPI.getRandom()

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
//Método para obtener las cervezas de la API
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(response);

      let filterBeers = beersFromApi.map(
        ({ image_url, name, description, tagline }) => ({
          image_url,
          name,
          description,
          tagline
        })
      );
      console.log(filterBeers);

      //let beerImageArr = Object.keys(response.name);
      //  console.log(beerImageArr);
      let allBeers = Object.values(filterBeers);
      console.log(allBeers);

      res.render('beers.hbs', {
        allBeers: allBeers,
        name: allBeers.name,
        description: allBeers.description,
        tagline: allBeers.tagline
      });
    })
    .catch(error => {
      console.log(error);
    });
});

//----------------------------------------------------
//Random Beer
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI);

      let randonFilterBeers = responseFromAPI.map(
        ({
          image_url,
          name,
          description,
          tagline,
          food_pairing,
          brewer_tips
        }) => ({
          image_url,
          name,
          description,
          tagline,
          food_pairing,
          brewer_tips
        })
      );
      console.log(randonFilterBeers);

      let randomItem = Object.values(randonFilterBeers);
      console.log(randomItem);

      res.render('randomBeer.hbs', {
        randomItem: randomItem,
        name: randomItem.name,
        description: randomItem.description,
        tagline: randomItem.tagline,
        //food_pairing: food_pairing,
        //brewer_tips: brewer_tips,
        //!falta hacer un bucle para iteractuar con el array de food_pairing
      });
    })
    .catch(error => {
      console.log(error);
    });
});

//-----------------------------------------------------

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
