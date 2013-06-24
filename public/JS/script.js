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
$(document).on("pageinit"); {
    //
    //----------SOCKET.IO----------
    var io;
    var socket = io.connect('http://mediassistant.tetraib.c9.io');
    //connection test
    socket.on('connected', function(data) {
        console.log("conecté!");
    });
    //
    //----------PAGE INDEX----------
    //change texte du bouton nouveau recherche avancée

    var birth = $("#dob").val();
    var dob = new Date(birth);
    var nextpage = "/advsearch";
    //
    $("#dob").change(function() {
        birth = $("#dob").val();
        dob = new Date(birth);
        if (dob == "Invalid Date") {
            $("#advsearch").attr("value", "Recherche anvancée").button("refresh");
            nextpage = "/advsearch";
        }
        else {
            $("#advsearch").attr("value", "Suivant").button("refresh");
            nextpage = "/searchlist";
        }
    });
    $("#advsearch").bind("tap", function() {
        $.mobile.changePage(nextpage);
    });
    //
    //----------PAGE SEARCHLIST----------    
    $("#btnnew").bind("tap", function() {
        $.mobile.changePage("/advsearch");
    });
}
