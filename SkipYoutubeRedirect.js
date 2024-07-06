// ==UserScript==
// @name     SkipYoutubeRedirect
// @version  1
// @grant    none
// @include  https://www.youtube.com/redirect*
// ==/UserScript==

const params = new URL(location.toString()).searchParams;
const redirectLink = params.get('q');

window.location.href = redirectLink;
