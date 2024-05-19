
refreshMembersList();
refreshPayer();
refreshWeighting();
refreshMember_P2P('Member_P2P_From');
refreshMember_P2P('Member_P2P_To');
checkCookie();

$('#event-upload-form').submit(function(e) {
  //prevent the form from submiting
  e.preventDefault();
  eventUploadProcess();
});

$('#P2P-upload-form').submit(function(e) {
  //prevent the form from submiting
  e.preventDefault();
  // console.log($('#P2P-upload-form').serialize());
  P2Pupload();
});

var input = "goirish";
calculateSHA512(input).then(sha512Hash => {
  console.log(sha512Hash);
});
