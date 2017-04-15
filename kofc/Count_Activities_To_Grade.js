// ==UserScript==
// @name        Count Activities to Grade
// @namespace   https://www.kofcohio.org/GradePrograms
// @include     https://www.kofcohio.org/GradePrograms
// @require     http://code.jquery.com/jquery-1.11.3.min.js

// @version     1
// @grant       none
// ==/UserScript==

// Avoid Conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(function ()
{
var rowCount = $(".gdvGradePrograms tr").length - 1;
  $(".gdvGradePrograms").before("<div id='programCount' style='color:red;font-weight:bold;'>Programs to Grade: " + rowCount + "</div>");
});
