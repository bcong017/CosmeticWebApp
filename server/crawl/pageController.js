// ./book-scraper/pageController.js
const pageScraper = require('./pageScaper');
async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        await pageScraper.scraper(browser);

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
