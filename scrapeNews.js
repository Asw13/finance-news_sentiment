const puppeteer = require('puppeteer');
const xlsx = require('xlsx'); // Import xlsx module

(async () => {
    const browser = await puppeteer.launch({ headless: false });  // Set false to debug
    const page = await browser.newPage();

    let allNews = [];

    for (let i = 1; i <= 3; i++) {  // Loop through pages 1 to 3
        let url = `https://www.moneycontrol.com/news/business/companies/page-${i}/`;
        console.log(`Scraping: ${url}`);
        
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Ensure content is loaded before extracting
        await page.waitForSelector("li.clearfix", { timeout: 15000 });

        // Extract news headlines and dates
        let newsData = await page.evaluate(() => {
            let newsItems = [];
            let elements = document.querySelectorAll("li.clearfix");

            // Function to extract date from comment
            function extractApanDate(data) {
                const regex = /<span>\s*(.*?)\s*<\/span>/;
                const match = data.match(regex);
                return match && match[1] ? match[1] : "No date available";
            }

            elements.forEach(el => {
                let headline = el.querySelector("p")?.innerText.trim() || "No headline available";

                // Extract the comment node containing the date
                let dateNode = [...el.childNodes].find(node => node.nodeType === 8); // NodeType 8 = Comment
                let date = dateNode ? dateNode.textContent.trim() : "No date available";

                // Extract formatted date
                let date1 = extractApanDate(date);

                console.log(date1); // ✅ Corrected Syntax

                newsItems.push({ News: headline, Date: date1 });
            });

            return newsItems;
        });

        allNews = allNews.concat(newsData);

        // **Replace page.waitForTimeout()**
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log("\nFinal Scraped News Data:");
    console.log(allNews);

    // **Save Data to Excel**
    if (allNews.length > 0) {
        const worksheet = xlsx.utils.json_to_sheet(allNews);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "News");
        xlsx.writeFile(workbook, "MoneyControl_News.xlsx");

        console.log("\nData saved successfully to: MoneyControl_News.xlsx");
    } else {
        console.log("\nNo data scraped. Excel file not created.");
    }

    await browser.close();
})();
