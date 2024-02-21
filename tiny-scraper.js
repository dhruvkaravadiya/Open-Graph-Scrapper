const EventEmitter = require("events");
const axios = require("axios");
const cheerio = require("cheerio");

class TinyScraper extends EventEmitter {
    constructor(url, timeout = 2000) {
        super();
        this.url = url;
        this.timeout = timeout;
        this.scrape();
    }

    scrape() {
        this.emit("scrapeStarted", this.url);

        // Fetch HTML content from the provided URL
        axios
            .get(this.url, { responseType: "stream" })
            .then((response) => {
                let html = "";
                response.data.on("data", (chunk) => {
                    html += chunk;
                    const ogData = this.parseOGTags(html);
                    if (ogData.title && ogData.image && ogData.description) {
                        this.emit("scrapeSuccess", ogData);
                    }
                });
                response.data.on("end", () => {
                    const ogData = this.parseOGTags(html);
                    this.emit("scrapeSuccess", ogData);
                });
            })
            .catch((error) => {
                this.emit("error", error);
            });

        // Set a timeout to handle scraping duration
        setTimeout(() => {
            this.emit("timeout");
        }, this.timeout);
    }

    parseOGTags(html) {
        const $ = cheerio.load(html);
        const ogData = {};

        // Extract og:title
        ogData.title = $('meta[property="og:title"]').attr("content");

        // Extract og:image
        ogData.image = $('meta[property="og:image"]').attr("content");

        // Extract og:description
        ogData.description = $('meta[property="og:description"]').attr(
            "content"
        );

        return ogData;
    }
}

module.exports = TinyScraper;
