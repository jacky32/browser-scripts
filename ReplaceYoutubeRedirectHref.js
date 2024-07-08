// ==UserScript==
// @name     ReplaceYoutubeRedirectHref
// @version  1
// @grant    none
// @include  https://www.youtube.com/*
// ==/UserScript==

const observeDOM = (function() {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function(obj, callback) {
    if (!obj || obj.nodeType !== 1 || !MutationObserver) return; 

    const mutationObserver = new MutationObserver(callback);
    mutationObserver.observe(obj, { childList: true, subtree: true });
    return mutationObserver;
  }
})();

observeDOM(document.querySelector('html'), (newNodes) => {
  const validNodes = newNodes.filter((node) => node.target.nodeName == 'A' && node.target.href.includes('youtube.com/redirect'));
	validNodes.forEach((a) => {
    a.target.href = new URL(a.target.href).searchParams.get('q');
  });
});

