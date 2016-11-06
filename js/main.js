/*----------------------Add cards----------------------*/
getJson('./generated.json', renderCards);

function getJson(url,callback){
  var request = new XMLHttpRequest();
  request.open("get", url);
  request.addEventListener('load',function (){
    var req = request.responseText;
    var reqJSON = JSON.parse(req);
    callback(reqJSON);
  })
  request.send();
  return request;
}

function renderCards(reqJSON){
  var special = 'catalog_cart--special';
  var priceSort = document.querySelectorAll('.catalog_sort__item')
  for (var i = 0; i < reqJSON.length; i++) {
    if(reqJSON[i].special == false){
    special = '';
    }
    var parent = document.querySelector('.catalog__list');
    var el = document.createElement('a');
    el.className = 'catalog_cart catalog__item';
    var attrs = ['special', 'metro', 'type', 'price', 'special', 'dateTo', 'dateFrom'];
    attrs.forEach(function(attr) {
      el.dataset[attr] = reqJSON[i][attr]
    })
    el.href = '/'
    el.innerHTML = '<div class="catalog_cart__image">'+
    '<img src="'+reqJSON[i].image+'">'+
    '<div class="catalog_cart__timer timer">'+
    '<div class="timer__item"> <span>1</span><span>day</span></div>'+
    '<div class="timer__item"><span>3</span><span>hour</span></div>'+
    '<div class="timer__item"><span>40</span><span>min</span></div>'+
    '<div class="timer__item"><span>13</span><span>sec</span></div>'+
    '</div>'+
    '</div>'+
    '<div class="catalog_cart__content">'+
    '<div class="catalog_cart__discount">'+reqJSON[i].discount+'%'+'</div>'+
    '<p class="catalog_cart__title">'+reqJSON[i].title+'</p>'+
    '<div class="catalog_cart__footer">'+
    '<p class="catalog_cart__price"><span class="price catalog_cart__price_old">'+reqJSON[i].priceOld+'</span><span class="price catalog_cart__price_new">'+reqJSON[i].priceNew+'</span></p>'+
    '<div class="catalog_cart__btn"> '+
    '<p class="btn">to cart</p>'+
    '</div>'+
    '</div>'+
    '</div>'
    el.dataset.price = reqJSON[i].priceNew;
    parent.appendChild(el);
    if (el.dataset.special == 'true') {
      el.classList.add('catalog_cart--special');
    }
  }
  renderCart();
  toggleFilters();
  toggleModal();
  toggleLayout();
  sortCatalogue();
  enableTimers();
  enableFilters();
  // modalValidator();
}


/*--------------------Add to cart----------------------*/
function renderCart(){
  var cart=[],
      cartList = document.querySelector('.catalog_basket__list'),
      cartSum = document.querySelector('.catalog_basket__summ_text'),
      productCards = document.querySelectorAll('.catalog_cart');
      disabledCards = document.querySelectorAll('.catalog_cart--disabled')


  function updateSum(sum){
    cartSum.innerHTML = sum;

  }

  function makeCart(){
    var sum=0;
    if(cart.length === 0){

     cartList.innerHTML = '<p class="catalog_basket__default">No items</p>';

    } else {
     var sum;
     cartList.innerHTML = '';
     cart.forEach(function(item , i){

      var newItem = document.createElement('div');
      newItem.className = 'catalog_basket__line';

      var newItemProduct = document.createElement('div');
      newItemProduct.className = 'catalog_basket__product';
      newItemProduct.innerHTML = cart[i].name;

      var newItemPrice = document.createElement('div');
      newItemPrice.className  = 'catalog_basket__price price';
      newItemPrice.innerHTML  = cart[i].price;

      var newItemClose = document.createElement('div');
      newItemClose.className = 'catalog_basket__close';
      newItemClose.innerHTML = '<img src="img/svg/i-close.png" alt="close">';

      newItemClose.addEventListener('click', function(){
          removeItem(i);
      })

      newItem.appendChild(newItemProduct);
      newItem.appendChild(newItemPrice);
      newItem.appendChild(newItemClose);

      cartList.appendChild(newItem);

      sum += Math.ceil((cart[i].price)*100)/100
      // sum += Math.round(cart[i].price*100)/100;

     })

    }
    updateSum(sum);
  }

  function addToCart(e){
       e.preventDefault();
       var parentBox = e.target.closest('.catalog_cart');

       if( parentBox.classList.contains('catalog_cart--disabled')){
          return;
       }

       var productName = parentBox.querySelector('.catalog_cart__title').innerText;
       var productPrice = parentBox.querySelector('.catalog_cart__price_new').innerText;
       var item = { name: productName , price: Number(productPrice) };
       console.log(item);

       cart.push(item);
       console.log(cart);
       makeCart()

  }

  function removeItem(i){
    cart.splice(i , 1);
    makeCart();
  }

  for(i=0; i<productCards.length; i++){
   var currentBtn = productCards[i].querySelector('.btn');
   currentBtn.addEventListener('click', addToCart);
  }

   makeCart();
}
/*-------------------Open / close buy modal----------------------*/

function toggleModal(){
  var buyBtn = document.querySelector('.catalog_basket__summ a');
  var overlay = document.querySelector('.modal_underlay');
  var modalClose = document.querySelector('.modal__close');

  buyBtn.addEventListener('click' , function(e){
    e.preventDefault();
    document.querySelector('.modal_order').style.display = 'block';
    document.querySelector('.modal_underlay').style.display = 'block';
  });

  function closeModal(e){
    e.preventDefault();
    document.querySelector('.modal_order').style.display = 'none';
    document.querySelector('.modal_underlay').style.display = 'none';
  }

  overlay.addEventListener('click' , closeModal);
  modalClose.addEventListener('click' , closeModal);
}
/*----------------------Change layout---------------------------*/
function toggleLayout(){
  var viewItems = document.querySelectorAll('.catalog_view__item');
  var row2 = viewItems[0];
  var row3 = viewItems[1];
  var productLists = document.querySelectorAll('.catalog__list');


  function makeRow2(){
    for(var i=0; i < productLists.length; i++){
      productLists[i].classList.add('catalog__list--two');
      productLists[i].classList.remove('catalog__list--three');
      row2.classList.add('catalog_view__item--active');
      row3.classList.remove('catalog_view__item--active');
    }
  }

  function makeRow3(){
    for(var i=0; i < productLists.length; i++){
      productLists[i].classList.add('catalog__list--three');
      productLists[i].classList.remove('catalog__list--two');
      row3.classList.add('catalog_view__item--active');
      row2.classList.remove('catalog_view__item--active');
    }
  }

  row2.addEventListener('click', makeRow2);
  row3.addEventListener('click', makeRow3);

}
/*--------------------Open/Close filters-----------------------*/

function toggleFilters(){
  var titles = document.querySelectorAll('.filter__title');

  function toggleFilter(e){
      e.preventDefault();
      var parent = e.target.closest('.catalog_filters__item');

      if(parent.classList.contains('filter--open')){
        parent.classList.remove('filter--open');
      }else{
        parent.classList.add('filter--open');
      }
  }

  for(var i=0; i<titles.length; i++){
     titles[i].addEventListener('click' , toggleFilter);
  }
}
/*--------------------------------sort by Incrprice / decr-----------------------------------------*/

function sortCatalogue(){
  var productCards = document.querySelectorAll('.catalog_cart');
  var incrBtn = document.querySelector ('.catalog_sort__item');
  var decrBtn = document.querySelector ('.catalog_sort__item:nth-child(2)');
  var catalogue = document.querySelector ('.catalog__list');
  var pricesList = [];
  var discountsList = [];

  for(var i=0; i<productCards.length; i++){
      var priceItem = productCards[i].dataset.price;
      priceItem = Number(priceItem);
      pricesList.push(priceItem);
      pricesList.sort(function(a,b){return a - b});
  }

  for(var i=0; i<productCards.length; i++){
      var discount = productCards[i].querySelector('.catalog_cart__discount').innerHTML;
      discount = Number(discount.slice(0,-1));
      discountsList.push(discount);
      discountsList.sort(function(a,b){return b - a});
  }

  function clearCatalogue(){
    for(var i=0; i<productCards.length; i++){
      catalogue.removeChild(productCards[i]);
    }
  }

  function renderByPriceIncr(e){
    e.preventDefault();
    clearCatalogue();

    for(var i=0; i<pricesList.length; i++){
      for(var j=0; j<productCards.length; j++){
       if(pricesList[i] == productCards[j].dataset.price){
          catalogue.appendChild(productCards[j]);
       }
      }
    }
  }

  function renderByDiscountDecr(e){
    e.preventDefault();
    clearCatalogue();

    for(var i=0; i<discountsList.length; i++){
      for(var j=0; j<discountsList.length; j++){
       var productDiscount = productCards[j].querySelector('.catalog_cart__discount').innerHTML;
       productDiscount = Number(productDiscount.slice(0,-1));

       if(discountsList[i] == productDiscount){
          catalogue.appendChild(productCards[j]);
       }
      }
    }
  }

  incrBtn.addEventListener('click' , renderByPriceIncr);
  decrBtn.addEventListener('click' , renderByDiscountDecr);
}
/*--------------------------Validate modal input form--------------------------------*/
// function modalValidator(){
  var regs = [];

  regs[0] = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
  regs[1] = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;
  regs[2] = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  var inputFields = [];


  function checkInput(e){
    e.preventDefault();
     inputFields[0] = document.querySelector('.modal__form>.modal__line>.input').value;
     inputFields[1] = document.querySelector('.modal__form>.modal__line:nth-child(2)>.input').value;
     inputFields[2] = document.querySelector('.modal__form>.modal__line:nth-child(3)>.input').value;

    for (var i=0; i<regs.length; i++){
      if(regs[i].test(inputFields[i]) == true){
         success();
      }
    }
  }

  function success(e){
     e.preventDefault();
     var modal = document.querySelector('.modal_order');
     var successModal = document.querySelector('.modal_success');
     succesModal.style.display = 'block';
     modal.style.display = 'none';
  }


    var wantBtn = document.querySelector('.want-btn');
    wantBtn.addEventListener('click', checkInput);
// }
