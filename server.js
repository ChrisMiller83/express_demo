const http = require('http');
const express = require('express')
const db = require('./db');  /* this requires a local file not a preloaded syntax like lines 1 and 2 */

const hostname= '127.0.0.1'
const port = 3000;

const app = express();

const server = http.createServer(app);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

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
  let html = ''
  db.forEach(friend => {
    html += `<li>${friend.name}</li>`
  })
  res.send(html)
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
    let html = `<h1>Hello ${foundFriend.name}</h1>`
    html += `<h2>${foundFriend.handle}</h2>`
    html += `<p>${foundFriend.skill}</p>`
    res.send(html);    
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


