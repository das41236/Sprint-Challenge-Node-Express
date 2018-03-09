const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const server = express();

const STATUS_ERROR = 422;
const STATUS_OK = 200;
const PORT = 3000;

const CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const YESTERDAY = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday'

server.use(bodyParser.json());

const ARRAY = [YESTERDAY, CURRENT];

server.get('/compare', (req, res) => {
    getPrices(). 
    then(priceDifference). 
    then(difference => {
        res.status(STATUS_OK);
        res.send({
            Price_Change : difference
        });
    }).
    // then(price => {
    //     res.status(STATUS_OK)
    //     console.log('Price', price.result);
    //     res.send({prices: price});
    // }).
    catch(err => console.error(err));
})


function getPrices() {
    return new Promise((resolve, reject) => {
        const promises = ARRAY.map(url => {
            return fetch(url). 
            then(res => res.json()). 
            then(res => res.bpi);
        });
        Promise.all(promises). 
            then(priceOBJ => resolve(priceOBJ)). 
            catch(err => reject(err));
    }). 
    catch(err => reject(err));
}

function priceDifference(prices) {
    const yesterday = () => {
        const price = prices[0];
        return price[Object.keys(price)[0]];
    };
    const today = () => {
        const price = prices[1];
        const yPrice = price.USD.rate_float;
        return yPrice;
    }

    return Number(today() - yesterday()).toFixed(2);
}



server.listen(PORT, err => {
    if (err) {
        console.log(`Error starting server: ${err}`);
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
})