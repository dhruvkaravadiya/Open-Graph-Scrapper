# Node.js Simple Open Graph Scraper


## Project Specifications 

Your company is planning to launch a chat service to be used internally by all the employees. One key functionality that is missing in the service is the ability to scrape the URLs typed in the message in order to fetch the Open Graph Metadata of the page and display the rich preview of the webpage. As the NodeJS developer of your company, you have been assigned the responsibility to write the scraper. This will extract the Title, Description, and Image properties from the Head section of the HTML of the provided URL and return it as JSON.

 

The class TinyScraper should extend the EventEmitter class and should make use of the event pattern to communicate data to and from the scraper. The primary goal is to extract the Open Graph Tags (og:*) from the HTML of the webpage and convert it into JSON. (Read more about the Open Graph tags here.)

 

Complete the module tiny-scraper.js and implement the following set of functionalities:

* The file should export a class TinyScraper as the default export of the module, and the class should inherit from the NodeJS EventEmitter class.  
* The TinyScraper constructor accepts the webpage URL eg http://localhost:url1 as the first argument and an optional timeout duration as the second argument.  
* When the instance of the class is instantiated, the process of fetching the webpage and parsing it should also be started.  
* The class should emit the following events:  
    - scrapeStarted: Should be fired when the scraping starts. 
    - error: Should be fired if there is an error with the URL passed to the scraper or any other network-related issue.
    - timeout: Should be fired if the scraping could not be completed within the set timeout duration.
    - scrapeSuccess: Should be fired if the data is completely parsed. The ogData should be sent as the payload to the callback function. The schema of ogData is mentioned in the 'Metadata Tags and Result JSON' section below.
    - The default timeout of the scraper should be 2000ms. If the data is not fetched and parsed within 2000ms, the instance should emit a timeout event and stop processing.

 
Note: Do not use any external URLs to test the scraper.

A simple web server containing two dummy webpages is present in the project. While in development, make sure that you use the URLs only for the webpages from this server instead of using an external URL. To run the webserver, run the command npm start. The scraper can be tested by running the index.js file using the command node index.js.

Valid URL to test the scraper:
1. http://localhost:8000/url1
2. http://localhost:8000/url2

Invalid URL to test the error event:  
http://localhost:8000


## Environment
- Node Version: v14(LTS)
- Default Port: 8000

**Read Only Files**
- `test`
- `server`


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

