function enableTimers(){

  var timers = [];
  var DAYS = 0;
  var HOURS = 1;
  var MINUTES = 2;
  var SECONDS = 3;

  var specialProducts = document.querySelectorAll('.catalog_cart--special');

   function getInitialSeconds(card){

     var endingDate = card.dataset.dateTo;
     endingDate = new Date(endingDate.split(' ')[0]);
     endingDate = endingDate/1000;
     return endingDate;

  }

  function initTimers(){

       for(var i=0; i<specialProducts.length; i++){
        var obj = {}
        var now = new Date();
        now = now/1000;
        var initialSec = getInitialSeconds(specialProducts[i]);
          obj.elem = specialProducts[i].querySelector('.timer');
          obj.seconds = initialSec-Math.floor(now);

          timers.push(obj);

          if(obj.seconds <= 0){
            specialProducts[i].classList.add('catalog_cart--disabled');
         }
       }

    setInterval(processTimers , 1000);
  }


  function processTimers(){

      for(var i=0; i<timers.length; i++){
          decrementTimer(i);
      }
  }

  function decrementTimer(id){

    var timer = timers[id];


    if(timer.seconds > 0){
     timer.seconds -= 1;
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

      case HOURS: time = (seconds % 86400) / 3600;
      break;

      case MINUTES: time = (seconds % 86400 % 3600) / 60;
      break;

      case SECONDS: time = seconds % 86400 % 3600 % 60;
      break;
     }
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
  initTimers();
}
