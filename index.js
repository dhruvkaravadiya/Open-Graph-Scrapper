// index.js
const TinyScraper = require('./tiny-scraper');
const scraper = new TinyScraper('http://localhost:8000/url1');

scraper.on('scrapeSuccess', (data) => {
    console.log('JSON Data received:', data);
});

scraper.on('scrapeStarted', (data) => {
    console.log('Started Scraping:', data);
});


scraper.on('error', () => {
    console.log('The URL is not valid.');
});


scraper.on('timeout', () => {
    console.log('Scraping timed out');
});
