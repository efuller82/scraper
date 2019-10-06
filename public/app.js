

// to display data on page
function displayResults(scrapedData) {
    scrapedData.forEach(function (article) {
        var articleCard = $('<div class = "card">').append(
            $('<h5 class = "card-title">').text(article.title),
            $('<a class = "card-text">').html('<a href=' + 'https://dailysentinel.com/' + article.link + '>' + 'click to view article' + '</a>'),
            $('<button class="btn btn-warning btn-notes">').data("_id", article._id).html('Note')
        );

        $('.articles').append(articleCard);
    });
}
// Ask back end for json with all articles
function initPage() {
    $.get('/all').then(function (data) {

        console.log(data);
        displayResults(data);
    });
};
initPage();

// Click event that brings up notes and form to add note
$(document).on('click', '.btn-notes', function (event) {
    var clickedId = $(this).data();
    console.log(clickedId);
    $('#note-header').text(clickedId._id);
});

// click event that should post notes to /allnotes
$('#submit-note').on('click', function (event) {
    var noteId = $('#note-header').text()
    event.preventDefault();
    console.log(noteId);
    $.ajax({
        type: 'POST',
        url: '/all/' + noteId,
    });

});