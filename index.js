const express = require('express');
const app = express();

const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Api Works!');
});

app.post('/data', (req, res) => {
    const body = req.body;
    res.json({
        message: 'Received Body!',
        data: body
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});