// Copyright 2013 Thibaut CONSTANT
// This file is part of MEDIASSISTANT.
// 
//     Mediassistant is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
// 
//     Mediassistant is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
// 
//     You should have received a copy of the GNU General Public License
//     along with Mediassistant.  If not, see <http://www.gnu.org/licenses/>.
// 
//"use strict";
$(document).on("pageinit", function(event) {
    
   //tap on search button on page 1
    $("#btn_search").bind("tap", function() {
        //get to var the inputed date of birth
        var dob = $("#dob").val();
        //ajax query of the date of birth
        $.ajax({
            url: "/search?qdob=" + dob,
            dataType: "json",
            async: true,
            success: function(result) {
               //get the ajax result to varPerson
                var varPerson = result;
                //mustache template of the list
                var varTemplate = "{{#result}}<li><a><h1>{{fname}} {{lname}}</h1><p>{{address}} {{address2}} {{zip}} {{city}} - {{phone}}</p></a></li>{{/result}}";
                //mustache rendering
                var varHtml = Mustache.to_html(varTemplate, varPerson);
                $('#sampleArea').html(varHtml);
                //don't forget to refresh the listview
                $("#sampleArea").listview("refresh");

            }
        });
        //change to the result page
        $.mobile.changePage("search.html#results");
        
    });
});