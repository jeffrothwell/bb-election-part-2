document.addEventListener("DOMContentLoaded", function() {

  resultsListEl = document.getElementById('election-results')
  refreshButton = document.querySelector('button[name=refresh-results]')
  // Imagination!
  $.ajax({
    url: "https://bb-election-api.herokuapp.com",
    method: "get"
  }).done(function(responseData){
    // var sortedCandidates = responseData.candidates.sort(function(a, b){
      // return b.votes - a.votes;
    // });
    responseData.candidates.forEach(function(candidate){
      candidateLi = document.createElement('li');
      voteForm = document.createElement('form');
      voteForm.method = "POST";
      voteForm.action = "https://bb-election-api.herokuapp.com/vote";
      hiddenField = document.createElement('input');
      hiddenField.type = "hidden";
      hiddenField.name = "name";
      hiddenField.value = candidate.name;
      voteForm.append(hiddenField);
      submitButton = document.createElement('button');
      submitButton.type = "submit";
      submitButton.innerText = "Vote for " + candidate.name;
      voteForm.append(submitButton);
      candidateLi.innerHTML = 'Name: ' + candidate.name + ', Votes: <span>' + candidate.votes + "</span>";
      candidateLi.append(voteForm);
      resultsListEl.appendChild(candidateLi);
      voteForm.addEventListener('submit', function(e){
        e.preventDefault();
        candidateName = this.querySelector('input[type=hidden]').value;
        $.ajax({
          url: "https://bb-election-api.herokuapp.com/vote",
          method: "POST",
          data: {name: candidateName}
        }).done(function(data){
          console.log('Vote recieved successfully');
        }).fail(function(data){
          console.log("Polls are temporarily closed, come back later.");
        });
      });
    });
  });

  refreshButton.addEventListener('click', function(){
    $.ajax({
      url: "https://bb-election-api.herokuapp.com",
      method: "get"
    }).done(function(data){
      var listEls = document.querySelectorAll('li')
      for (var i = 0; i < listEls.length; i++) {
        var innerSpan = listEls[i].querySelector('span');
        innerSpan.innerText = data.candidates[i].votes;
      }
    })
  });

});
