
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!!!!!');
});

app.get('/api/courses', (req, res) => {
res.send([1,2,3,4]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));