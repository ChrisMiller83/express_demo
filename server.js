const http = require('http');
const express = require('express')
const es6Renderer = require('express-es6-template-engine');
const db = require('./db');  /* this requires a local file not a preloaded syntax like lines 1 and 2 */
const radLogger = require('./radLogger');
// const checkIfAwesome = require('./awesomeCheck')
const bodyParser = require('body-parser')

const hostname= '127.0.0.1'
const port = 3000;

const app = express();

app.engine('html', es6Renderer) // register html template engine
app.set('views', 'templates') // look for templates in the 'templates' folder
app.set('view engine', 'html') // use the html engine for view rendering

const server = http.createServer(app);



app.use(radLogger);
// app.use(checkIfAwesome)

app.use(express.static('public')); /* look in 'public' for any files */


// parse JSON data
app.use(bodyParser.json());

// parse Form Data
app.use(bodyParser.urlencoded({extended: false }));

app.get('/', (req, res) => {
  // render the 'templates/home.html' file
  // looks in templates folder by default
  // don't need to include .html either
  res.render('home', {
    locals: {
      title: 'Avengers Address Book'  
    },
    partials: {
      head: '/partials/head'
    }
  }); 
});

app.get('/about', (req, res) => {
  res.render('about', {
    locals: {
    title: 'Avengers Address Book'
  },
    partials: {
    head: '/partials/head'
  }
  });
});

// app.get('/cats', (req, res) => {
//   res.end('Meow!  Cats are evil.');
// })

// app.get('/dogs', (req, res) => {
//   res.end('Woof!  Dogs are awesome');
// })

// app.get('/cats_and_dogs', (req, res) => {
//   res.end('I would rather have a dog than a cat.  Having both would suck!')
// })
// app.get('/about', (req, res) => {
//   res.send('About page');
// })

// app.get('/contact', (req, res) => {
//   res.send('Contact Page');
// })


app.get('/friends', (req, res) => {  
  res.render('friends', {
    locals: {
      title: 'Friends List',
      friends: db
    },
    partials: {
      head: '/partials/head'
    }
  })
})

/* :handle tells express to look for the parameter handle, the req.params.handle matches what is behind the :  */
app.get('/friends/:handle', (req, res) => {
  const foundFriend = db.find((friend) => {
    if (friend.handle === req.params.handle) {
      return true
    } else {
      return false
    }
  })

  if (foundFriend){
    res.render('friendSingle', {
      locals: {
        friend: foundFriend, 
      title: 'Avengers Address Book'
    },
      partials: {
      head: '/partials/head'
    }
  
      
    })   
  } else {
    res.status(404)
    res.send('Could not find user with that handle')
  }
})

app.get('/greet/:name', (req, res) => {
  res.send('Hello, ' + req.params.name + ' !')
})

/* catch all statement below */
app.get('*', (req, res) => {
  res.status(404);
  res.send('Page be gone, SORRY');
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


