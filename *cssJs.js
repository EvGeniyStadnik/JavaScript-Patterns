---1.Вариант - строки ssText - если в тегах уже есть инлайновые слили все будут затерты ---

function setStyles(css) {
  for (var key in css) {
    var elems = document.querySelectorAll(key),
    styles = css[key];
    for (var i = 0; i < elems.length; i++) {
      elems[i].style.cssText = styles;
    }
  }
}
var cssObj = {
  'div': 'font-size: 20px; font-weight: 300',
  'span': 'font-size: 10px; font-weight: 500'
}
setStyles(cssObj);

---1.Вариант - объект - придется писать стили через кемел кейс fontSize. Уже существующие инлайновые стили не затирает---

function setStyles(css) {
  for (var key in css) {
    if(css.hasOwnProperty(key)){
      var elems = document.querySelectorAll(key),
      styles = css[key];
      for (var i = 0; i < elems.length; i++) {
        for (var prop in styles) {
          if(styles.hasOwnProperty(prop)){
            elems[i].style[prop] = styles[prop]
          }
        }
      }
    }
  }
}
var cssObj = {
  'div': {
    fontSize: '20px',
    fontWeight: '300'
  },
  'span': {
    fontSize: '10px',
    fontWeight: '500'
  }
}
setStyles(cssObj);

---2.Вариант - Два предыдущих вместе ---

function setStyles(css) {
  for (var key in css) {
    if(css.hasOwnProperty(key)){
      var elems = document.querySelectorAll(key),
      styles = css[key];
      for (var i = 0; i < elems.length; i++) {
        if (typeof styles === 'object') {
          for (var prop in styles) {
            if(styles.hasOwnProperty(prop)){
              elems[i].style[prop] = styles[prop]
            }
          }
        } else {
          elems[i].style.cssText = styles;
        }
      }
    }
  }
}
var cssObj = {
  'div': {
    fontSize: '20px',
    fontWeight: '300'
  },
  'span': 'font-size: 10px; font-weight: 500'
}
setStyles(cssObj);

---3.Вариант - lazy edition - стили и селекторы можно просто копировать с браузера. Ничего не перезатрет---

function setStyles(css) {
  var arrStyle, prpStl, slash, concatProp, elems;
  for (var key in css) {
    var styleObj = {},
    styles = css[key],
    arrStyles = styles.split(';');//['dis-play: none', ' color: red']
    for (var k = 0; k < arrStyles.length; k++) {
      arrStyle = arrStyles[k].trim().split(':');['dis-play', 'none']
      prpStl = arrStyle[0];//'dis-play'
      if (~prpStl.indexOf('-')) {
        slash = prpStl.indexOf('-');
        concatProp = prpStl.slice(0, slash) + '' + prpStl.slice(slash + 1, slash + 2).toUpperCase() + '' + prpStl.slice(slash + 2);//disPlay
      } else {
        concatProp = prpStl;
      }
      styleObj[concatProp] = arrStyle[1].trim();
    }
    elems = document.querySelectorAll(key);
    for (var i = 0; i < elems.length; i++) {
      for (var prop in styleObj) {
        elems[i].style[prop] = styleObj[prop]
      }
    }
  }
}
var stylesObj = {
  'div': 'background-color: red; font-size: 10px; color: blue; font-weight: bold',
  'span': 'background-color: blue; font-size: 20px; color: red; font-weight: bold'
}
setStyles(stylesObj);

---------------адаптивная функция-------------------

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

if (width < 375){
  setStyles(stylesObj);
}
