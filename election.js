document.addEventListener("DOMContentLoaded", function() {

  resultsListEl = document.getElementById('election-results')
  // Imagination!
  $.ajax({
    url: "https://bb-election-api.herokuapp.com",
      method: "get"
  }).done(function(responseData){
    var sortedCandidates = responseData.candidates.sort(function(a, b){
      return b.votes - a.votes;
    });
    sortedCandidates.forEach(function(candidate){
      candidateLi = document.createElement('li');
      candidateLi.innerText = 'Name: ' + candidate.name + ', Votes: ' + candidate.votes;
      resultsListEl.appendChild(candidateLi);
    });
  })

});
