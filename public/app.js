function displayResults(scrapedData) {
    scrapedData.forEach(function (article) {
        var articleCard = $('<div class = "card">').append(
            $('<h5 class = "card-title">').text(article.title),
            $('<a class = "card-text">').html('<a href=' + 'https://dailysentinel.com/' + article.link + '>' + 'click to view article' + '</a>'),
            $('<button class="btn btn-warning">').html('Note')
        );

        $('.articles').append(articleCard);
    });
}

// Ask back end for json with all animals
function initPage() {
    $.get('/all').then(function (data) {

        console.log(data);
        displayResults(data);
    });
};

initPage();
