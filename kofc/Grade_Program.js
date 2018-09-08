// ==UserScript==
// @name        Grade Program
// @namespace   https://www.kofcohio.org/GradeProgram
// @include     https://www.kofcohio.org/GradeProgram
// @require     http://code.jquery.com/jquery-1.11.3.min.js
// @version     1
// @grant       none
// ==/UserScript==

// Update the URL and any fields as necessary
var googleFormUrl = '';

var mapping = {
  'MainContent_lblCouncil': [
    0,
    'entry.276113056'
  ],
  'MainContent_lblReportingPeriod': [
    0,
    'entry.1724335898'
  ],
  'MainContent_lblProgramNumber': [
    0,
    'entry.1996594437'
  ],
  'MainContent_lblProgramActivity': [
    0,
    'entry.679715797'
  ],
  'MainContent_lblActivityDescription': [
    0,
    'entry.1784705141'
  ],
  'MainContent_lblNumberOfKnightHours': [
    0,
    'entry.68424075'
  ],
  'MainContent_lblNumberOfKnightsPresent': [
    0,
    'entry.1520972341'
  ],
  'MainContent_lblActivityDate': [
    0,
    'entry.1865331027'
  ],
  'MainContent_lblCreatedBy': [
    0,
    'entry.1202949471'
  ],
  'MainContent_lblCreatedDate': [
    0,
    'entry.994301388'
  ],
  'MainContent_lblSubmittedBy': [
    0,
    'entry.162750060'
  ],  
  'MainContent_lblSubmittersPhone': [
    0,
    'entry.2069050653'
  ],
  'MainContent_lblSubmittersEmail': [
    0,
    'entry.1122200483'
  ],
  'MainContent_txtProgramFeedback': [
    3,
    'entry.340781351'
  ],
  'MainContent_cboProgramStatus': [
    2,
    'entry.870225342'
  ],
  'MainContent_txtProgramPointsAwarded': [
    3,
    'entry.1369105422'
  ]
};
var activities = {
  '21': '21 - Family of the Year',
  '22': '22 - State Matching Funds Participation',
  '23': '23 - Council Choice',
  '24': '24 - Council Choice',
  '25': '25 - Council Choice'
};
var statuses = {
  '1': 'Pending',
  '2': 'Returned',
  '3': 'Graded',
  '4': 'Closed'
};
// Avoid Conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(function ()
{
  var btn = $('<button/>', {
    text: 'Send to Google',
    click: function (e)
    {
      var formData = {
      };
      for (var key in mapping)
      {
        if (mapping[key][0] == 0)
        {
          formData[mapping[key][1]] = $('#' + key).html();
        } 
        else if (mapping[key][0] == 1)
        {
          var val = $('#' + key).val();
          formData[mapping[key][1]] = activities[val];
        } 
        else if (mapping[key][0] == 2)
        {
          var val = $('#' + key).val();
          formData[mapping[key][1]] = statuses[val];
        }
        else if (mapping[key][0] == 3)
        {
          var val = $('#' + key).val();
          formData[mapping[key][1]] = val;
        }
      }
      $.ajax({
        url: googleFormUrl,
        type: 'POST',
        data: formData
      });
      e.preventDefault();
    }
  });
  $('#MainContent_btnSubmit').before(btn);
  
  // Figure out what Council activities have been submitted
  var councilRows = $(".gdvGradePrograms tr").filter(function()
                                   {
                                      return $(this).find('td').filter(function () {
                                         return $(this).text() == 'Family';
                                      }).length > 0;
                                   });
  councilRows.each(function(i, row)
                  {
                    var cells = $(this).find('td');
                    var activityNum = cells.eq(3).text();
                    var status = cells.eq(7).text();
                    var reportingPeriod = cells.eq(0).text();
                    $(".tabs").before("<div style='color:red;font-weight:bold;'>" + activityNum + ": " + status + " (" + reportingPeriod + ")</div>");
                  });
});
