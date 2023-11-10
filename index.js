const app = require('express')();
const PORT = 8080;

app.use(express.json());

<<<<<<< Updated upstream
app.listen(
	PORT,
	() => console.log('alive on http://localhost:8080')
)

app.post('/APITEST', (req,res) => {
	console.log(req.body)
	res.status(200);
	res.json({responseMessage: "MESSAGE RECEIVED"});
});

app.get('/APITEST', (req,res) => {
	res.status(200).send({
		message:"This is a POST ONLY route"
	})
})


app.get('', (req,res) => {
	res.status(200).send({
		message:"Yo this the homepage get outta here"
	})
})

app.get('/route1', (req,res) => {
	res.status(200).send({
		cows: '',
		bogs: '',
		WORLD: 'Hello'
	})
})



app.get('/secret', (req, res) => {
  	res.status(200).send({
  		ok:"you found it"
  	})
})
=======
const itemRoutes = require('./routes/routes');
app.use('/', itemRoutes); // Use '/' as the base path
>>>>>>> Stashed changes

