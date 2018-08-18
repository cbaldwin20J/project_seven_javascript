const express = require('express');
const app = express();


// tip: '{ projects }' is an ES6 shortcut where it is the same thing
// as doing 'const projects = require('data.json').projects'.
const { projects } = require('./data/data.json');

// need to require 'path' module and 'data.json' file.

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

// need '/' that goes to index.pug with locals set to 'data.projects'
// need '/about' that goes to about.pug for about page
// need '/project' that takes the id of the project that goes to 'project.pug'
//          I think for this I will have to pass in the json data as variables for that project
//          with the matching id.



app.get('/', (req, res) => {

	res.render('index');
  
});


// if it goes through all of the routes and none match,
// then it will hit this 404 error.
app.use((req, res, next) => {
  // 'new Error' is a custom error we create with whatever text we want.
  const err = new Error('Not Found');
  err.status = 404;
  // if you aren't rendering a template, or redirecting,
  // then you have to use 'next()'.
  next(err);
});

// if we ever send anything in the 'next()' ex: 'next(err)',
// then it will find the 'app.use' with four parameters to throw
// the error.
app.use((err, req, res, next) => {
  
  res.status(err.status);
  console.log(err);
});



app.listen(3000, () => {
	console.log('The application is running on localhost:3000');
})