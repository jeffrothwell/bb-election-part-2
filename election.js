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
      voteForm = document.createElement('form');
      voteForm.method = "POST";
      voteForm.action = "https://bb-election-api.herokuapp.com/vote"
      candidateLi.innerText = 'Name: ' + candidate.name + ', Votes: ' + candidate.votes;
      candidateLi.append(voteForm);
      resultsListEl.appendChild(candidateLi);
    });
  })

});
