'use strict'

const apiKey = 'yELpNbQFYO51691J7JRUfM7ouh0jVZWGdMjydZkq'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);

  $('#results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3><br>
      ${responseJson.data[i].url}
      <p>${responseJson.data[i].description}</p>
      </li>`
    )};

  // display the results section  
  $('#results').removeClass('hidden');
};


function getNatlParks(query, searchTerm) {
  const inputLimit = $('#js-max-results').val();
  const params = {
    api_key: apiKey,
    q: query,
    stateCode: searchTerm,
    limit: inputLimit
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-state').val();
    const inputLimit = 10;
    getNatlParks(searchTerm, inputLimit);
  });
}

$(watchForm);