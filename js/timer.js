var timers = [];
var DAYS = 0;
var HOURS = 1;
var MINUTES = 2;
var SECONDS = 3;

var periods = [DAYS,HOURS,MINUTES,SECONDS];
/*
timer{elem > timer, seconds}


 */
 var specialProducts = document.querySelectorAll('.catalog_cart--special');

 //var endingDate = 0;

   function getInitialSeconds(card){

     var endingDate = card.dataset.dateTo;
     endingDate = new Date(endingDate.split(' ')[0]);
     endingDate = endingDate/1000;
     return endingDate;
  }


//getInitialSeconds();

function initTimers(){


     for(var i=0; i<specialProducts.length; i++){
      var obj = {}
      var now = new Date();
      now = now/1000;
      var initialSec = getInitialSeconds(specialProducts[i]);
        obj.elem = specialProducts[i].querySelector('.timer');
        obj.seconds = initialSec - now;
        timers.push(obj);
       setInterval(processTimers , 1000);

       if(obj.seconds <= 0){
        specialProducts[i].classList.add('catalog_cart--disabled');
       }
     }

}


function processTimers(){

    /*for(var key in timers){
      decrementTimer(key);
    }*/

    for(var i=0; i<timers.length; i++){
        decrementTimer(i);
    }
}

function decrementTimer(id){
  var timer = timers[id];

  if(timer.seconds > 0){
   timer.seconds -=1;
   updateDom(timer);
  }else{
    timer.seconds=0;
    updateDom(timer);
 }
}

function updateDom(timer){
  var el = timer.elem;
  var timerItem = el.querySelectorAll('.timer__item');
  for(var i=0; i<timerItem.length; i++){
    var spans = timerItem[i].querySelectorAll('span');
    var num = calcRemainTime(timer.seconds , i);
    spans[0].innerText = num;
    spans[1].innerText = getPeriodWord(i,num);
  }

}

function calcRemainTime(seconds , period){
   var time = 0;

   switch(period){
    case DAYS: time = seconds / 86400;
    break;

    case HOURS: time = seconds % 86400 / 3600;
    break;

    case MINUTES: time = seconds % 86400 % 3600 / 60;
    break;

    case SECONDS: time = seconds % 86400 % 3600 % 60;
    break;
   }
   // console.log(time);
   return Math.floor(time);
}

function getPeriodWord(period, num){

    switch(period){

        case DAYS: return num === 1 ? 'day' : 'days';
        case HOURS: return num === 1 ? 'hour' : 'hours';
        case MINUTES: return 'min';
        case SECONDS: return 'sec';
    }
}

var testCases = [86400,86399,3599,0,61];

testCases.forEach(function(seconds){
    console.group(seconds);
  periods.forEach(function(period){
    console.log(calcRemainTime(seconds,period));
  })
  console.groupEnd(seconds);
});

initTimers();
