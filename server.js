const express = require('express');
const app = express();

const blocks = `
<div class="container">
	<div style="height: 400px; background-color: green; margin-bottom: 30px"></div>
</div>
`;

app.use(express.static('dist'));

app.get('/test', function (req, res) {
	setTimeout(() => {
		res.send(blocks + blocks + blocks)
	},3000);
});
app.get('/', function (req, res) {
	res.end(blocks + blocks)
});

app.listen(3000, () => console.log('server start port 3000'));
