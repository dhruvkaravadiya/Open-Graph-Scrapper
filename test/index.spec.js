const chai = require('chai');
const chaiHttp = require('chai-http');
const TinyScraper = require('../tiny-scraper');
const PORT = process.env.PORT || 8000;
const server = require('../server/index')(PORT);
const should = chai.should();
const baseURL = `http://localhost:${PORT}`;

chai.use(chaiHttp);

describe('tiny_og_scraper', () => {
    let scraper;

    after(() => {
        server.close();
    })

    it('Should emit the scrapeStarted event once the processing starts', (done) => {
        const scrapeUrl = `${baseURL}/url1`
        scraper = new TinyScraper(scrapeUrl);
        scraper.on('scrapeStarted', url => {
            url.should.eql(scrapeUrl);
            done();
        });
    });

    it('Should emit an error event if the url is invalid', (done) => {
        scraper = new TinyScraper(`${baseURL}`);
        scraper.on('error', (err) => {
            done();
        })
    });

    it('Should emit the scrapeSuccess event once the data is parsed', (done) => {
        scraper = new TinyScraper(`${baseURL}/url1`);
        scraper.on('scrapeSuccess', () => {
            done();
        })
    });

    it('Should convert the og tags to valid JSON-1', done => {
        scraper = new TinyScraper(`${baseURL}/url1`);
        scraper.on('scrapeSuccess', data => {
            data.title.should.eql('Tests | Programming problems and challenges | HackerRank');
            data.description.should.eql('Join over 7 million developers in solving code challenges on HackerRank.');
            data.image.should.eql('https://hrcdn.net/og/default.jpg');
            done();
        });
    });

    it('Should convert the og tags to valid JSON-2', done => {
        scraper = new TinyScraper(`${baseURL}/url2`);
        scraper.on('scrapeSuccess', data => {
            data.title.should.eql('Tests | Programming problemsand challenges | HackerRank');
            data.description.should.eql('Join over 70 million developers in solving code challenges on HackerRank.');
            data.image.should.eql('https://hrcdn.net/og/default.png');
            done();
        });
    });

    it('Should throw a timeout error event if the process does not complete in the timeout period', done => {
        scraper = new TinyScraper(`${baseURL}/url1`, 1);
        scraper.on('timeout', () => {
            done();
        })
    });
});
