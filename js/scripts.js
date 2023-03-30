// Empty JS for your own code to be here

function formatMoney(obj) {
    let sign;
    if (obj.value.match(/^\-/)) {
        sign = '-';
    } else {
        sign = '';
    }
    obj.value = obj.value.replace(/[^0-9]+/g, "");
    if (obj.value.length < 3) {
        obj.value = "000" + obj.value;
    }
    obj.value = obj.value.slice(0, obj.value.length - 2) + "." + obj.value.slice(obj.value.length - 2);
    obj.value = obj.value.replace(/^0+/g, '');
    obj.value = obj.value.replace(/^\./g, '0.');
    obj.value = sign + obj.value;
}

function formatWeighting(obj) {
    obj.value = obj.value.replace(/[^0-9]+/g, "");
    if (obj.value.length < 3) {
        obj.value = "000" + obj.value;
    }
    obj.value = obj.value.slice(0, obj.value.length - 2) + "." + obj.value.slice(obj.value.length - 2);
    obj.value = obj.value.replace(/^0+/g, '');
    obj.value = obj.value.replace(/^\./g, '0.');
    document.getElementById(obj.dataset.id).value = obj.value;
    $('#' + obj.dataset.id).css('filter', 'hue-rotate(-' + threshold(obj.value, 0, 10) * 10 + 'deg)');
}

function signChange(obj) {
    let inputSec = document.getElementById(obj.dataset.id);
    let value = inputSec.value;
    if (value.match(/^\-/)) {
        inputSec.value = inputSec.value.replace(/^\-/, "");
    } else {
        inputSec.value = '-' + inputSec.value;
    }
}

function refreshMembersList() {
    let members_containter = document.getElementById("Members");

    // Clear the existing options
    let members_containter_children = members_containter.children;
    let length = members_containter_children.length;
    for (i = 0; i < length; i++) {
        members_containter_children[0].remove();
    }
    //Generate new options
    for (let member_name in Members) {
        let member_html = document.createElement("div");
        member_html.innerHTML = generateFromTemp(html_template_Member, member_name);
        members_containter.appendChild(member_html);
    }
}

function refreshMembers(obj){
  updatePayer(obj.dataset.name, !obj.checked);
  updateWeighting(obj.dataset.name, !obj.checked);
  updateItemUser(obj.dataset.name, !obj.checked)
}

function refreshMember_P2P(element_ID) {
    let member_containter = document.getElementById(element_ID);
    let members_check_box = $(".members-check-box");

    // Clear the existing options
    let member_containter_children = member_containter.children;
    let length = member_containter_children.length;
    for (i = 0; i < length; i++) {
        member_containter_children[0].remove();
    }
    //Generate new options
    for (i = 0; i < members_check_box.length; i++) {
      let member_html = document.createElement("div");
      member_html.innerHTML = generateFromTemp(html_template_Member_P2P, members_check_box[i].dataset.name);
      member_html.innerHTML = member_html.innerHTML.replace(/ElementID/g, element_ID);
      member_containter.appendChild(member_html);
    }
}

function refreshPayer() {
    let payer_containter = document.getElementById("Payer");
    let members_check_box = $(".members-check-box");

    // Clear the existing options
    let payer_containter_children = payer_containter.children;
    let length = payer_containter_children.length;
    for (i = 0; i < length; i++) {
        payer_containter_children[0].remove();
    }
    //Generate new options
    for (i = 0; i < members_check_box.length; i++) {
        if (members_check_box[i].checked) {
            payer_containter.appendChild(createPayer(members_check_box[i].dataset.name));
        }
    }
}

function createPayer(payerName){
  let payer_html = document.createElement("div");
  payer_html.innerHTML = generateFromTemp(html_template_Payer, payerName);
  payer_html.id = 'Payer_div_' + name2ID(payerName);
  return payer_html;
}

function updatePayer(member_name, isRemoving){
  let payer_containter = document.getElementById("Payer");
  let members_check_box = $(".members-check-box");

  if (isRemoving){
    document.getElementById("Payer_div_"+name2ID(member_name)).remove();    
  } else {
    // One more step to make sure the payer does not exist.
    if (document.getElementById("Payer_div_"+name2ID(member_name)) == null){
      // Add the new option
      payer_containter.appendChild(createPayer(member_name));
    }
  }
  //Sort options
  for (i = 0; i < members_check_box.length; i++) {
      if (members_check_box[i].checked) {
          let payer_html = document.getElementById("Payer_div_"+name2ID(members_check_box[i].value));
          payer_containter.appendChild(payer_html);
      }
  }
}

function refreshWeighting() {
    // console.log("refreshWeighting");
    let weighting_containter = document.getElementById("Weighting");
    let weighting_checkbox = document.getElementById("weighting-checkbox");
    // console.log("Clearing sliders");
    // Clear the existing weightings
    let weighting_children = weighting_containter.children;
    let length = weighting_children.length;
    for (i = 0; i < length; i++) {
        weighting_children[0].remove();
    }
    if (weighting_checkbox.checked) {
      let members_check_box = $(".members-check-box");
      // console.log("Generating sliders");
      //Generate new weightings
      let first_line = true;
      for (i = 0; i < members_check_box.length; i++) {
        if (members_check_box[i].checked) {
          if (!first_line){weighting_containter.appendChild(document.createElement("hr"));}
          first_line = false;
        // console.log(members_check_box[i].value);
          weighting_containter.appendChild(createWeightingSlider(members_check_box[i].dataset.name));
          appendSliderCallback("slider_" + name2ID(members_check_box[i].value));
        }
      }
    }
}

function createWeightingSlider(sliderName){
  let weighting_html = document.createElement("div");
  weighting_html.innerHTML = generateFromTemp(html_template_Weighting, sliderName);
  weighting_html.id = 'slider_div_' + name2ID(sliderName);
  return weighting_html;
}

function updateWeighting(member_name, isRemoving){
  let weighting_checkbox = document.getElementById("weighting-checkbox");
  if (weighting_checkbox.checked) {
    let weighting_containter = document.getElementById("Weighting");
    let members_check_box = $(".members-check-box");
    
    if (isRemoving){
      document.getElementById("slider_div_"+name2ID(member_name)).remove();    
    } else {
      // One more step to make sure the member does not exist.
      if (document.getElementById("slider_div_"+name2ID(member_name)) == null){
        // Add the new slider
        weighting_containter.appendChild(createWeightingSlider(member_name));
        appendSliderCallback("slider_" + name2ID(member_name));
      }
    }
    $('#Weighting hr').remove();
    
    //Sort options
    let first_line = true;
    for (i = 0; i < members_check_box.length; i++) {
        if (members_check_box[i].checked) {
          if (!first_line){weighting_containter.appendChild(document.createElement("hr"));}
          first_line = false;
          let weighting_html = document.getElementById("slider_div_"+name2ID(members_check_box[i].value));
          weighting_containter.appendChild(weighting_html);
        }
    }
  }
  
}

function addItem() {
    let item_list = document.getElementById("item-list");
    let members_check_box = $(".members-check-box");

    //Generate new item
    let item_html = document.createElement("div");
    item_html.id = "item-"+itemNumber;
    item_html.innerHTML = generateFromTemp(html_template_Item, '', itemNumber);
    item_list.appendChild(item_html);
    
    //Generate new options
    for (i = 0; i < members_check_box.length; i++) {
        if (members_check_box[i].checked) {
          document.getElementById("item-user-"+itemNumber).appendChild(createItemUserOption(members_check_box[i].dataset.name));
        }
    }
    itemNumberDict[itemNumber] = true;
    
    itemNumber++;
}

function createItemUserOption(userName){
  let user_option_html = document.createElement("option");
  user_option_html.value = name2ID(userName);
  user_option_html.innerHTML = userName;
  user_option_html.id = 'item-user-' + itemNumber + '-' + name2ID(userName);
  // console.log(user_option_html);
  return user_option_html
}

function delItem(obj){
  let item_div = document.getElementById('item-'+obj.dataset.id);
  item_div.remove();
  delete itemNumberDict[obj.dataset.id];
}

function refreshItemUser(){
  
  let members_check_box = $(".members-check-box");
  let item_user_selects = $(".item-user-select");
  
  //Clearing existing users
  for (i = 0; i < item_user_selects.length; i++){
    let item_list_children = item_user_selects[i].children;
    let length = item_list_children.length;
    for (j = 0; j < length; j++) {
        item_list_children[0].remove();
    }
  }
  
  //Generate new options
  for (i = 0; i < item_user_selects.length; i++){
    for (j = 0; j < members_check_box.length; j++) {
        if (members_check_box[j].checked) {
          item_user_selects[i].appendChild(createItemUserOption(members_check_box[j].value));
        }
    }
  }
  
}

function updateItemUser(member_name, isRemoving){    
    let members_check_box = $(".members-check-box");
    let item_user_selects = $(".item-user-select");
    
    if (isRemoving){
      $(".item-user-select option[value='"+ name2ID(member_name) +"']").remove();
    } else {
      // One more step to make sure the member does not exist.
      for (i = 0; i < item_user_selects.length; i++){
        if ($("#" + item_user_selects[i].id + " option[value='"+ name2ID(member_name) +"']").length == 0){
          // Add the new option
          item_user_selects[i].appendChild(createItemUserOption(member_name));
          //Sort options
          for (j = 0; j < members_check_box.length; j++) {
              if (members_check_box[j].checked) {
                  let item_user_option_html = $("#" + item_user_selects[i].id + " option[value='"+ name2ID(members_check_box[j].value) +"']")[0];
                  item_user_selects[i].appendChild(item_user_option_html);
              }
          }
        }
      }
      
    }
    
}

function getCurrency() {
$.ajax({
    url: 'https://v6.exchangerate-api.com/v6/' + Currency_API_Key + '/latest/' + Currency_ID[Main_Currency],
    type: 'GET',
    success: function(result) {
        exchange_rate = result.conversion_rates;
        time_last_update_utc = result.time_last_update_utc;
        console.log("Got the currency exchange rates");
        generateCurrency("Currency","CurrencyHelpBlock");
        generateCurrency("Currency_P2P","CurrencyHelpBlock_P2P");
    },
    error: function(e) {
        var r = confirm("Cannot get the up-to-date currency rates.\nThe default rates would be used if you click cancel. \nTry to get the new rates again? Then click OK");
        if (r == true) {
            getCurrency();
        } else {
          generateCurrency("Currency","CurrencyHelpBlock");
          generateCurrency("Currency_P2P","CurrencyHelpBlock_P2P");
        }
    },
    timeout: 3000
  });
}

function generateCurrency(element_currency, element_note) {
    let currency_select = document.getElementById(element_currency);

    // Clear the existing options
    let currency_select_children = currency_select.children;
    let length = currency_select_children.length;
    for (i = 0; i < length; i++) {
        currency_select_children[0].remove();
    }
    
    // Check the main currency rate is 1.00
    if (exchange_rate[Currency_ID[Main_Currency]] == 1){
      //Generate new options
      currency_select.appendChild(createCurrencyOption(Main_Currency));
      for (i = 0; i < Currency_ID.length; i++) {
        if (i != Main_Currency){
          currency_select.appendChild(createCurrencyOption(i));
        }
      }
      document.getElementById(element_note).innerHTML = "<small>Notice: Any other currency would be automatically converted into <b>" + Currency_Name[Main_Currency] + "</b> based on the listed exchange rates while submitting to the google form.\nThe listed exchange rates was updated from <a href='https://v6.exchangerate-api.com'>exchangerate-api</a> at [UTC] "+time_last_update_utc + "</small>";
    } else {
      alert("[ERROR] The currency data is not consistant with the main currency setup. The reason might be the default currency rates in config.js is stored with a different major currency");
      document.getElementById(element_note).innerHTML = "Error: Data not valid.";
    }
    
}

function createCurrencyOption(currency_number){
  let currency_html = document.createElement("option");
  currency_html.value = Currency_ID[currency_number];
  currency_html.innerHTML = Currency_Name[currency_number] + " [" + Currency_ID[currency_number]+ "] : " + exchange_rate[Currency_ID[currency_number]];
  // console.log(currency_html);
  return currency_html;
}

function restoreDefaultValue(obj, val) {
if (obj.value == "") {
        obj.value = val;
    }
}

function clearDefaultValue(obj, val) {
    if (obj.value == val) {
        obj.value = "";
    }
}

function appendSliderCallback(ID) {
    $('#' + ID).on('change input', function() {
        let rangePercent = $('#' + ID).val();
        $('#' + ID + '_input').val(rangePercent);
        $('#' + ID).css('filter', 'hue-rotate(-' + rangePercent * 10 + 'deg)');
    });
}

function generateFromTemp(temp, name, number){
  let html_result = temp.replace(/aFakeName/g, name);
  html_result = html_result.replace(/aFakeID/g, name2ID(name));
  html_result = html_result.replace(/aFakeNumber/g, number);
  return html_result;
}

function name2ID(name){
  return name.replace(/\s/g,'_');
}


function setMenu(menu_id){
  let menu_id_max = 2;
  for (i=1; i <= menu_id_max; i++){
    if (i == menu_id) {
      // console.log("set menu active " + i);
      document.getElementById('Menu_'+i).className = "nav-link active";
      document.getElementById('Page_'+i).className = "";
    } else {
      // console.log("set menu disable " + i);
      document.getElementById('Menu_'+i).className = "nav-link";
      document.getElementById('Page_'+i).className = "hide";
    }
    
    
  }
  
  
}

function eventUploadProcess(){
  document.getElementById('upload-table').className = 'hide';
  EventDict = generateUploadDict();
  
  // Show the result
  document.getElementById('upload-table').className = '';
  document.getElementById('upload-table-event').innerHTML = 'Event: ' + EventDict['Event'];
  document.getElementById('upload-table-date').innerHTML = 'Date: ' + EventDict['Date'];
  document.getElementById('upload-table-currency').innerHTML = 'Currency: ' + EventDict['Currency'];
  document.getElementById('upload-table-currencyRate').innerHTML = 'Exchange Rate to Main Currency ('+Currency_ID[Main_Currency]+') : ' + EventDict['CurrencyRate'];
  
  
  $('#upload-table-item-head tr').remove();
  $('#upload-table-item-body tr').remove();
  
  let table_head = document.getElementById('upload-table-item-head')
  let table_body = document.getElementById('upload-table-item-body')
  
  let head_row = document.createElement("tr");
  head_row.innerHTML = '<th>#</th><th>Item</th>';
  table_head.appendChild(head_row);
  let head_user;
  for (let username in Members){
    head_user = document.createElement("th");
    head_user.innerHTML = username;
    head_row.appendChild(head_user);
  }
  
  let item_list = EventDict['Items'];
  for (i=0; i < item_list.length; i++){
    let item_dict = item_list[i];
    let item_row = document.createElement("tr");
    table_head.appendChild(item_row);
    
    item_num = document.createElement("th");
    item_num.innerHTML = i+1;
    item_row.appendChild(item_num);
    
    item_name = document.createElement("th");
    item_name.innerHTML = item_dict['item_name'];
    item_row.appendChild(item_name);
    
    let payerMoney = 0;
    for (let username in Members){
      let item_user = document.createElement("th");
      let money = item_dict[name2ID(username)];
      item_user.innerHTML = money.toFixed(3);
      item_row.appendChild(item_user);
      payerMoney -= money;
    }
    switch (item_dict['item_name']){
      case 'Share':
        item_row.className = 'table-active';
        break;
      case 'Tips':
        item_row.className = 'table-active';
        break;
      case 'Payment':
        item_row.className = 'table-success';
        break;
      default:
        item_row.style.backgroundColor = ConvertRGBtoHex(255,255*threshold(1-payerMoney/1000,0,1),255*threshold(1-payerMoney/1000,0,1));
    }
  }
  
}

function generateUploadDict(){
  EventFormCheck = $('#event-upload-form').serialize();
  const formData = new FormData(document.getElementById('event-upload-form'));
  // for (let [key, value] of formData.entries()) {
  //   console.log(key + ':' + value);
  // }
  
  let total_check = 0;
  let subtotal = Str2Num(formData.get('Subtotal'));
  let tax = Str2Num(formData.get('Tax'));
  let tips = Str2Num(formData.get('Tips'));
  if (subtotal == 0){
    alert("[Error] The subtotal cannot be zero!!!");
    throw("Invalid subtotal");
  }
  let taxRate = tax / subtotal;
  let unshare = 0;
  let payerID = formData.get('Payer');
  let memberList = formData.getAll('Members');
  let numberOfMembers = memberList.length;
  let itemDictList = [];
  let itemDict = {};
  let weightDict = {};
  let weightingSum = 0.0;
  
  if (numberOfMembers <= 1){
    alert('[Error] You must choose at least two member for this event!!!');
    throw 'No enough members!';
  }
  
  let logger_name = formData.get('Logger');
  setLoggerCookie(logger_name);
  
  let weighting_check_box = document.getElementById('weighting-checkbox');
  if (weighting_check_box.checked){
    for (let user of memberList){
      // console.log(formData.get('slider-input-'+user));
      weightDict[user] = Str2Num(formData.get('slider-input-'+user));
      weightingSum += weightDict[user];
    }
    if (weightingSum == 0){
      alert('[Error] The sum of the weighting parameters cannot be zero!!!');
      throw 'Invalid weighting parameters!';
    }
  }else{
    for (let user of memberList){
      weightDict[user] = 1.0;
      weightingSum += weightDict[user];
    }
  }
  // console.log(weightDict);
  // console.log(weightingSum);
  
  for (let itemNumber in itemNumberDict) {
    // console.log('Item: '+itemNumber);
    let itemPrice = formData.get('item-price-'+itemNumber);
    let taxedPrice = (1+taxRate)*itemPrice;
    let userList = formData.getAll('item-user-'+itemNumber);
    let numberOfItemUsers = userList.length;
    if (numberOfItemUsers == 0){
      alert('[Error] You must choose at least one user for item: ' + formData.get('item-name-'+itemNumber) + '!!!');
      throw 'No enough members!';
    }
    
    let itemPricePerUser = taxedPrice / numberOfItemUsers;
    unshare += taxedPrice;
    
    itemDict = newEmptyItemDict(formData.get('item-name-'+itemNumber));
    
    for (let user of userList){
      itemDict[user] -= itemPricePerUser;
      total_check -= itemPricePerUser;
    }
    // itemDict[payerID] += taxedPrice;
    itemDictList.push(itemDict);
  }
  
  let taxedShare = (subtotal + tax - unshare);
  if (taxedShare < 0){
    alert('[Error] The total amount of non-sharing items is greater than the subtotal + tax! Please check your input!');
    throw('Invalid input');
  }
  let taxedSharePerWeight = (taxedShare / weightingSum);
  let tipsPerWeight = (tips / weightingSum);
  
  let shareDict = newEmptyItemDict('Share');
  let tipsDict = newEmptyItemDict('Tips');
  for (let user of memberList){
    shareDict[user] -= weightDict[user]*taxedSharePerWeight;
    tipsDict[user] -= weightDict[user]*tipsPerWeight;
    total_check -= weightDict[user]*taxedSharePerWeight;
    total_check -= weightDict[user]*tipsPerWeight;
  }
  // shareDict[payerID] += taxedShare;
  // tipsDict[payerID] += tips;
  itemDictList.push(shareDict);
  if (tips != 0){
    itemDictList.push(tipsDict);
  }
  
  // Payment
  let paymentDict = newEmptyItemDict('Payment');
  paymentDict[payerID] += subtotal + tax + tips;
  total_check += subtotal + tax + tips;
  itemDictList.push(paymentDict);
  
  // console.log(itemDictList);
  let event_dict = {};
  event_dict['Event'] = formData.get('EventName');
  event_dict['Date'] = formData.get('Date');
  event_dict['Currency'] = formData.get('Currency');
  event_dict['CurrencyRate'] = Str2Num(exchange_rate[formData.get('Currency')]);
  event_dict['Logger'] = logger_name;
  event_dict['Items'] = itemDictList;
  console.log(event_dict);
  if (Math.abs(total_check) > 1e-6){
    alert('[Error] Calculation failure! Process stopped.');
    throw('The total balance is not zero!');
  }
  
  return event_dict;
  
}


function P2Pupload(){
  const formData = new FormData(document.getElementById('P2P-upload-form'));
  // for (let [key, value] of formData.entries()) {
  //   console.log(key + ':' + value);
  // }
  
  let fromID = formData.get('Member_P2P_From');
  let toID = formData.get('Member_P2P_To');
  if (fromID == toID){
    alert('Payer and user cannot be the same person!');
    throw 'Invalid payer/user';
  }
  let total = Str2Num(formData.get('Total'));
  let logger_name = formData.get('Logger');
  setLoggerCookie(logger_name);
  
  let itemDictList = [];
  let p2pDict = newEmptyItemDict('P2P');
  p2pDict[fromID] += total;
  p2pDict[toID] -= total;
  itemDictList.push(p2pDict);
  
  let p2p_dict = {};
  p2p_dict['Event'] = formData.get('EventName');
  p2p_dict['Date'] = formData.get('Date');
  p2p_dict['Currency'] = formData.get('Currency');
  p2p_dict['CurrencyRate'] = Str2Num(exchange_rate[formData.get('Currency')]);
  p2p_dict['Logger'] = logger_name;
  p2p_dict['Items'] = itemDictList;
  console.log(p2p_dict);
  submitDict(p2p_dict);
}

function sendEmail(){
  if (getCookie('SendEmailFlag') == 'Send'){
    alert('You have sent an email in 10 mins. You are not allowed to send another email until 10 mins after your last one.');
  }else{
    var r = confirm("A notification email with the optimal transfer solution would be send.\n Are you sure?");
    if (r == true) {
      let post_data_array = [];
      post_data_array.push(Event_ID+'='+'SendEmailRequest');
      post_data_array.push(Date_ID+'='+'NA');
      for (let member_name in Members){
        post_data_array.push(Members[member_name]+'='+'0');
      }
      let logger_name = getLoggerName();
      if (logger_name != null)
      {
      post_data_array.push(Logger_ID+'='+logger_name);
      setLoggerCookie(logger_name);
        let ajax_request = $.ajax({
          url: Form_URL,     //The public Google Form url, but replace /view with /formResponse
          data: post_data_array.join('&'), //Nifty jquery function that gets all the input data 
          type: 'POST', //tells ajax to post the data to the url
          dataType: "json", //the standard data type for most ajax requests
          complete: function(XMLHttpRequest, textStatus) {
        
            let status_code = XMLHttpRequest.status;
            if (status_code == 200 || status_code == 0){
              // success
              console.log('Email sending request success!');
              alert('Email has been sent.');
            }else{
              alert('[Error] Failed to send email! Please check your network.');
              success_flag = false;
            }
          }
        });
        setCookie_min('SendEmailFlag','Send',10);
      }
    }
  }
  
}

function submitEvent(){
  let event_form_data = $('#event-upload-form').serialize();
  if (EventFormCheck == event_form_data){
    submitDict(EventDict);
  }else{
    alert("[Warning] The input value has been changed, the showing form is out of date. Please click the 'Generate the form' button to refresh and manually check the submission form before submit it.");
  }
  
}

function submitDict(dict){
  let success_flag = true;
  let ajax_state_dict = {};
  if (dict['CurrencyRate'] == 0){
    alert("Currency rate cannot be 0!");
    throw 'Invalid currency rate';
  }
  let exchange_rate = 1 / dict['CurrencyRate'];
  let item_list = dict['Items'];
  for (let item_dict of item_list){
    let post_data_array = [];
    post_data_array.push(Event_ID+'='+dict['Event']+'-'+item_dict['item_name']);
    post_data_array.push(Date_ID+'='+dict['Date']);
    for (let member_name in Members){
      post_data_array.push(Members[member_name]+'='+(item_dict[name2ID(member_name)] * exchange_rate));
    }
    post_data_array.push(Logger_ID+'='+dict['Logger']);
    // console.log(post_data_array);
    // console.log(post_data_array.join('&'));
    ajax_state_dict[item_dict['item_name']] = false;
    let ajax_request = $.ajax({
      url: Form_URL,     //The public Google Form url, but replace /view with /formResponse
      data: post_data_array.join('&'), //Nifty jquery function that gets all the input data 
      type: 'POST', //tells ajax to post the data to the url
      dataType: "json", //the standard data type for most ajax requests
      complete: function(XMLHttpRequest, textStatus) {
        // console.log(XMLHttpRequest);
        let status_code = XMLHttpRequest.status;
        if (status_code == 200 || status_code == 0){
          // success
          console.log('Submit success: ' + item_dict['item_name']);
        }else{
          alert('[Error] Failed to submit item: ' + item_dict['item_name'] + '! Please check the google sheet manually!');
          success_flag = false;
        }
    
        ajax_state_dict[item_dict['item_name']] = true;
        let ajax_state_all = true;
        for (let ajax_state of Object.values(ajax_state_dict)){ajax_state_all = ajax_state && ajax_state_all;}
        if (ajax_state_all){
          if (success_flag){
            alert('Submitted All!');
          }
        }
      }
    });
  }
  
  
}

function newEmptyItemDict(item_name){
  itemDict = {};
  itemDict['item_name'] = item_name;
  for (let member in Members){
    itemDict[name2ID(member)] = 0.00;
  }
  return itemDict;
}

function Str2Num(str){
  let val = parseFloat(str);
  if (isNaN(val) ) {
    alert('[Error] Input value: [' + str + '] is not a valid number! Please enter a number!');
    throw 'Input is not a valid number!';
  }
  return val;
}

function setLoggerCookie(logger_name){
  setCookie("LoggerName",logger_name,365*2);
}

function setCookie(cname,cvalue,exdays)
{
  let d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  let expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function setCookie_min(cname,cvalue,exmins)
{
  let d = new Date();
  d.setTime(d.getTime()+(exmins*60*1000));
  let expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) 
  {
    let c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

function checkCookie()
{
  let logger_name=getCookie("LoggerName");
  if (logger_name!="")
  {
    document.getElementById('Logger').value = logger_name;
    document.getElementById('Logger_P2P').value = logger_name;
  }
}

function getLoggerName()
{
  let logger_name=getCookie("LoggerName");
  let prompt_message = "Please Enter Your Name";
  if (logger_name=="")
  {
    while (logger_name=="") {
      logger_name = prompt(prompt_message, "");
      if (logger_name=="")
      {prompt_message = "User Name CANNOT Be Empty!\nPlease Enter Your Name";}
    }
  }
  return logger_name;
}

function ColorToHex(color) {
  color = parseInt(color);
  var hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}
function ConvertRGBtoHex(red, green, blue) {
  return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}
function threshold(val, min, max){
  console.assert(max>min);
  if (val < min){
    return min;
  }else if (val > max){
    return max;
  }else{
    return val;
  }
}
