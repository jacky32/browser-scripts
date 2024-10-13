// ==UserScript==
// @name     GmapsLink
// @version  1.1
// @grant    none
// @include https://www.google.com/search*
// ==/UserScript==
var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return; 

    if( MutationObserver ){
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe for changes in children
      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }
    
    // browser support fallback
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()

let isMapOnPage = false;
const isWeatherPage = document.documentElement.innerHTML.includes('Vyberte oblast');
if (isWeatherPage) return;

observeDOM(document.querySelector('html'), function(m){ 
  if (!isMapOnPage) {    
    const includes = m.some(a => a.target.outerHTML.includes('travel_layout')) || document.querySelector('#lu_map');
    if (includes) {
      const params = new URLSearchParams(window.location.search);
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        if (form.action == 'https://www.google.com/search') {
          const aNode = document.createElement("a");
          const text = document.createTextNode("Mapy");
          aNode.style.zIndex = '500';
          aNode.style.margin = 'auto';
          aNode.style.background = '#303134';
          aNode.style.borderRadius = '30px';
          aNode.style.padding= '14.5px';
          aNode.style.color = 'white';
          aNode.style.textDecoration = 'none';
          aNode.style.marginLeft = '32px';
          aNode.style.fontWeight = 'bolder';
          aNode.href = `https://www.google.com/maps/search/?api=1&query=${params.get('q')}`
          aNode.appendChild(text);
          form.parentNode.insertBefore(aNode, form.nextSibling);
          isMapOnPage = true;
        }
      });
    } 
  }
});
