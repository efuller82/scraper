var cheerio = require('cheerio');
var axios = require('axios');

//Making a request via axios for the Sentinel's news page
axios.get('https://www.dailysentinel.com').then(function (response) {
    // Load the response into cheerio and save it to a variable
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the 'tnt-summary' class
    // (i: iterator. element: the current element) 
    $('p.tnt-summary').each(function (i, element) {

        // Save the text of the element in a 'title' variable
        var title = $(element).text();

        // In the currently selected element, look at its child elements (its a-tags),
        // then sae the values for any 'href' attributes that the child elements may have 
        var link = $(element).children().attr('href');

        // Save the results in an object that we'll push into the results array we defined earlier
        results.push({
            title: title,
            link: link
        });
    });
    console.log(results);
});