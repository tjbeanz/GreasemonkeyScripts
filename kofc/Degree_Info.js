// ==UserScript==
// @name        Degree Info
// @namespace   https://www.kofcohio.org/DisplayDegrees
// @include     https://www.kofcohio.org/DisplayDegrees
// @require     http://code.jquery.com/jquery-1.11.3.min.js
// @version     1
// @grant       none
// ==/UserScript==

// Avoid Conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(function ()
{
  var rowCount = $("#MainContent_dgvDegreeList tr").length - 1;
  $("#divMainBody").before("<div id='degreeCount' style='color:red;font-weight:bold;'># of Degrees: " + rowCount + "</div>");
  
  var btn = $('<button/>', {
    text: 'Capture Degree Info',
    click: function (e)
    {
     var degreeData = [];
      
      // Figure out what Council activities have been submitted
      var degreeRows = $("#MainContent_dgvDegreeList tr").filter(function(){
        return $(this).find('td').length > 0;
      });
      degreeRows.each(function(i, row)
                      {
                        var cells = $(this).find('td');
                        var date = cells.eq(2).text();
                        var degree = cells.eq(3).text();
                        var time = cells.eq(4).text();
                        var council = cells.eq(5).text();
                        var diocese = cells.eq(6).text();
                        var location = cells.eq(7).text();
                        var contact = cells.eq(8).text();
                        var phone = cells.eq(9).text();
                        var email = cells.eq(10).text();
                        var notes = cells.eq(11).text();
        
                        var degreeEnum = degree=="1st" ? 1 : degree=="2nd" ? 2 : degree=="1st-2nd" ? 3 : 4;
                        
                        degreeData.push({
                          "Date":date,
                          "Degree":degree,
                          "DegreeEnum":degreeEnum,
                          "Time":time,
                          "Council":council,
                          "Diocese":diocese,
                          "Location":location,
                          "Contact":contact,
                          "Phone":phone,
                          "Email":email,
                          "Notes":notes
                        });
                     });
                      
      var degreeDataString = JSON.stringify(degreeData);
      var link = $("#downloadlink");
      link.attr('href', window.URL.createObjectURL(new Blob([degreeDataString], {type: 'text/plain'})));
      link.show();
      
      e.preventDefault();    
  }
  });
  $('#degreeCount').after(btn);
  btn.after('<a download="degreeinfo.json" id="downloadlink" style="display: none">Download</a>');
  
});
