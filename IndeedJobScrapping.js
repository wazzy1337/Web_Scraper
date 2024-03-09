import puppeteer from 'puppeteer';

(async () => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false
    });
    
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://uk.indeed.com/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Type into search boxes
    await page.type('#text-input-what.css-p1lp5i.e1jgz0i3', 'software engineer £75,000');
    await page.type('#text-input-where.css-p1lp5i.e1jgz0i3', 'England');

    // Wait and click on the search button
    const searchButtonSelector = 'button.yosegi-InlineWhatWhere-primaryButton';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    //Process Job Results
    const jobList = await page.waitForSelector('ul.css-zu9cdh.eu4oa1w0');
    const listItems = await jobList.$$('li'); //I WILL USE THESE FOR THE TARGET SELECTORS.
    
    // Use page.evaluate to access the tag content
    const targetSelector = 'h2.jobTitle.css-14z7akl.eu4oa1w0'; // Modify this selector as needed
    const tagContent = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
        return element ? element.outerText : 'Tag not found'; // Handle case where tag is not found
    }, targetSelector);

    // Log the content to console
    console.log('Content of the', targetSelector, 'tag:', tagContent);
    
  //await browser.close();
})();