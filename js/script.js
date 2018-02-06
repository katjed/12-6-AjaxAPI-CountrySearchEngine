var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$.support.cors = true;
$('#search').click(searchCountries);
$('#country-name').keyup(function(e) {
    if (e.keyCode === 13) {  // 13 - Enter
        searchCountries();
    }
});

function searchCountries() {
	var countryName = $('#country-name').val();
	if (!countryName.length) countryName = 'Poland';

	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList
	});
}

/*
function showCountriesList(resp) {  // alternative
    countriesList.empty();
    resp.forEach(function(item) {
        $('<li>').text('Name: ' + item.name).appendTo(countriesList);        
        $('<li>').text('Capital: ' + item.capital).appendTo(countriesList);
        $('<li>').text('Land area: ' + item.area + ' km²').appendTo(countriesList);
        $('<li>').text('Population: ' + item.population).appendTo(countriesList);
    });
}
*/
function showCountriesList(resp) {
    var countries = [],
        languages,
        currencies;

    resp.forEach(function(item) {
        languages = item.languages.map(function(item) {
            return item.name;
        }).join(', ');

        currencies = item.currencies.map(function(item) {
            return item.name;
        });    

        countries.push(
            $('<li>')            
                .append($('<img>').attr('src', item.flag).attr('width', 64))
                .append($('<p>').text(item.name))
                .append($('<p>').text('Capital: ' + item.capital))
                .append($('<p>').text('Land area: ' + item.area + ' km²'))
                .append($('<p>').text('Population: ' + item.population))
                .append($('<p>').text('Language(s): ' + languages))
                .append($('<p>').text('Currency: ' + currencies))        
        );
    });

    countriesList.empty().append(countries);
}