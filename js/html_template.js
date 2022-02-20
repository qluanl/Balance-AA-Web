var html_template_Member = "<div class'custom-controls-stacked'>\
  <div class='custom-control custom-checkbox'>\
    <input name='Members' id='Members_aFakeID' type='checkbox' onclick='refreshMembers(this)' checked='checked' class='custom-control-input members-check-box' value='aFakeID'>\
    <span class='custom-control-indicator'></span>\
    <label for='Members_aFakeID' class='custom-control-label'>aFakeName</label>\
  </div>\
</div>";

var html_template_Payer = "<div class='custom-controls-stacked'>\
  <div class='custom-control custom-radio'>\
    <input name='Payer' id='Payer_aFakeID' type='radio' required='required' class='custom-control-input' value='aFakeID'>\
    <span class='custom-control-indicator'></span>\
    <label for='Payer_aFakeID' class='custom-control-label'>aFakeName</label>\
  </div>\
</div>";

var html_template_Member_P2P = "<div class='custom-controls-stacked'>\
  <div class='custom-control custom-radio'>\
    <input name='ElementID' id='ElementID_aFakeID' type='radio' required='required' class='custom-control-input' value='aFakeID'>\
    <span class='custom-control-indicator'></span>\
    <label for='ElementID_aFakeID' class='custom-control-label'>aFakeName</label>\
  </div>\
</div>";

var html_template_Weighting = "<label for='slider_aFakeID' id='slider_aFakeID_label'> aFakeName </label>\
<div class='input-group'>\
  <input id='slider_aFakeID_input' data-id='slider_aFakeID' value='1.00' name='slider-input-aFakeID' type='tel' onfocus='clearDefaultValue(this,\"1.00\")' onblur='restoreDefaultValue(this,\"1.00\");formatWeighting(this)' onkeyup='formatWeighting(this)' onkeypress='formatWeighting(this)' required='required' class='form-control slider-value'>\
  <input id='slider_aFakeID' type='range' class='custom-slider' value='1' min='0' max='10' step='0.01'>\
</div>";

var html_template_Item = "<hr>\
<div class='input-group'>\
  <input type='text' id='item-name-aFakeNumber' name='item-name-aFakeNumber' placeholder='Item Name' value='' class='form-control item-name' required='required'></input>\
  <input type='tel' id='item-price-aFakeNumber' name='item-price-aFakeNumber' value='0.00' onkeyup='formatMoney(this)' onkeypress='formatMoney(this)' onfocus='clearDefaultValue(this,\"0.00\")' onblur='restoreDefaultValue(this,\"0.00\")' required='required' class='form-control item-price'></input>\
</div>\
<div class='input-group'>\
  <select id='item-user-aFakeNumber' name='item-user-aFakeNumber' class='form-control item-user-select' multiple>\
  </select>\
  <input id='item-del-aFakeNumber' type='button' class='btn btn-outline-danger btn-delete-item' name='DelItem-aFakeNumber' value='Delete' data-id='aFakeNumber' onclick='delItem(this)'></input>\
</div>";
