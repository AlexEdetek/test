$(document).ready(function () {
    $('#get-data').click(function () {
        var showData = $('#show-data');
        $.getJSON('data-compare/Astella_v1.json', function (data) {
            console.log(data);

            var items = data.children.map(function (item) {
                return item.name + ' &nbsp; &nbsp; &nbsp; ' + item.text + ' &nbsp; &nbsp; &nbsp; ' + item.class;
            });

            showData.empty();

            if (items.length) {
                var content = items.join('</br>');
                var list = $('<ul />').html(content);
                showData.append(list);
            }
        });

        showData.text('Loading the JSON file.');
    })
});

$(document).ready(function () {
    $('#get-data2').click(function () {
        var showData = $('#show-data2');
        $.getJSON('data-compare/Astella_v2.json', function (data) {
            console.log(data);

            var items = data.children.map(function (item) {
                return item.name + ' &nbsp; &nbsp; &nbsp; ' + item.text + ' &nbsp; &nbsp; &nbsp; ' + item.class
            });

            showData.empty();

            if (items.length) {
                var content = items.join('</br>');
                var list = $('<ul />').html(content).css( "background-color", "yellow" );
                showData.append(list);
            }
        });

        showData.text('Loading the JSON file.');
    })

});
