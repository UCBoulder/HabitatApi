const app  = require('express')();
const PORT = 8080;

app.listen(
	PORT,
	() => console.log('alive on http://localhost:8080')
)

app.get('', (req,res) => {
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
