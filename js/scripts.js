// Empty JS for your own code to be here

function formatMoneyPos(obj){
    var sign;
    if (obj.value.match(/^\-/)){sign = '-';} else {sign = '';}
    obj.value = obj.value.replace(/[^0-9]+/g,"");
    if (obj.value.length < 3){
        obj.value = "000" + obj.value;
    }
    obj.value = obj.value.slice(0,obj.value.length-2) +"."+ obj.value.slice(obj.value.length-2);
    obj.value = obj.value.replace(/^0+/g,'');
    obj.value = obj.value.replace(/^\./g,'0.');
    obj.value = sign + obj.value;
}

function signChange(obj){
    var inputSec = document.getElementById(obj.dataset.id);
    var value = inputSec.value;
    if (value.match(/^\-/)){
        inputSec.value = inputSec.value.replace(/^\-/,"");
    } else {
        inputSec.value = '-'+inputSec.value;
    }
}
