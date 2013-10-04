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
$(document).on("pageinit", function() {
    var var_mtxtnumbers = ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"];
    var var_ftxtnumbers = ["une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"];
    var var_everytxtnumbers = ["", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"];
    var var_scheme = ["le matin", "à 10h", "le midi", "à 16h", "le soir", "au coucher"];
    var var_meal = ["", "avant le repas, ", "pendant le repas, ", "après le repas, ", "à distance des repas, "];
    var var_duration = ["heure", "jour", "semaine", "mois"];
    var var_durationplural = ["heures", "jours", "semaines", "mois"];
    var var_everyselect = ["toutes les", "tous les", "toutes les", "tous les"];

    var setprescriptiontext = function() {
        var var_intake;
        var var_schemephrase;
        var var_phrase;
        var var_schemechecked = [];
        var var_intakechecked = $("input[name=rc-intake]:checked").val();
        var var_mealchecked = $("input[name=rc-meal]:checked").val();
        var var_everychecked = $("input[name=rc-every]:checked").val();
        var var_everytypechecked = $("input[name=rc-everytype]:checked").val();
        var var_durationchecked = $("input[name=rc-duration]:checked").val();
        var var_durationtypechecked = $("input[name=rc-durationtype]:checked").val();
      
        if (var_intakechecked == "0") {
            var_intake = "prise";
        }
        else {
            var_intake = "prises";
        }

        $("input[name=cb-scheme]:checked").each(function() {
            var_schemechecked.push(parseInt($(this).val(),10));

        });

        if (var_schemechecked.lengh === undefined) {
            var_schemephrase = " ";
        }
        else {
            var_schemephrase = "";
        }
        var i = 0;
        var_schemechecked.map(function(item) {

            if (i === 0) {
                var_schemephrase = ", ";
            }

            i++;

            if (var_schemechecked.length == i && var_schemechecked.length > 1) {
                var_schemephrase += " et ";
                var_schemephrase += var_scheme[item];
                var_schemephrase += ", ";
            }
            else {
                if (var_schemechecked.length - 1 == i) {
                    var_schemephrase += var_scheme[item];

                }
                else {
                    var_schemephrase += var_scheme[item];
                    var_schemephrase += ", ";
                }
            }

        });
        var_phrase = var_ftxtnumbers[var_intakechecked] + " " + var_intake + var_schemephrase + var_meal[var_mealchecked] + var_everyselect[var_everytypechecked] + " " + var_everytxtnumbers[var_everychecked] + " " + var_durationplural[var_everytypechecked] + " " + "pendant" + " " + var_mtxtnumbers[var_durationchecked] + " " + var_duration[var_durationtypechecked];
        $('#prescriptiontext').val(var_phrase);
    };
    setprescriptiontext();
    $("input").change(function() {
        setprescriptiontext();
    });
});