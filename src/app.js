const express = require('express');

const server = express();

const PORT = 3000;



server.get('/compare', (req, res) => {
    const { past, present } = req.query;
    

})












server.listen(PORT, err => {
    if (err) {
        console.log(`Error starting server: ${err}`);
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
})