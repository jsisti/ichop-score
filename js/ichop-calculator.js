$(document).ready(function () {

    // Show ICHOP3 Calculator
    $('#show-ichop-3-calculator').click(function (evt) {
        $("#ichop-3-calculator").show();
        $("#ichop-12-calculator").hide();
        $("#show-ichop-3-calculator").addClass("active");
        $("#show-ichop-12-calculator").removeClass("active");
        calculateIchop3Score();
    });

    // Show ICHOP12 Calculator
    $('#show-ichop-12-calculator').click(function (evt) {
        $("#ichop-12-calculator").show();
        $("#ichop-3-calculator").hide();
        $("#show-ichop-3-calculator").removeClass("active");
        $("#show-ichop-12-calculator").addClass("active");
        calculateIchop12Score();
    });

    // Calculate ICHOP3 Score
    $("#calculate-ichop-3-score").click(function (evt) {
        calculateIchop3Score();

    });
    // Calculate ICHOP12 Score
    $("#calculate-ichop-12-score").click(function (evt) {
        calculateIchop12Score();

    });

    // Listen for text field changes in ICHOP3 calculator
    $("#ichop-3-calculator input").on('input', function (evt) {
        calculateIchop3Score();
    });

    // Listen for text field changes in ICHOP12 calculator
    $("#ichop-12-calculator input").on('input', function (evt) {
        calculateIchop12Score();
    });

    // Listen for radio button changes in ICHOP3 calculator
    $('#ichop-3-calculator input[type=radio]').change(function () {
        calculateIchop3Score();
    });
    // Listen for radio button changes in ICHOP12 calculator
    $('#ichop-12-calculator input[type=radio]').change(function () {
        calculateIchop12Score();
    });

    function calculateIchop3Score() {
        // Get input values
        var gcsScore = parseInt($("input[name=option-ichop-3-gcs]:checked").val());
        var nihssScore = parseInt($("input[name=option-ichop-3-nihss]:checked").val());
        var apache2Score = parseInt($("#ichop-3-apache-ii-score").val()) || 0;
        var hemVol = parseInt($("input[name=option-ichop-3-hem-vol]:checked").val());
        var mrsScore = parseInt($("input[name=option-ichop-3-mrs]:checked").val());

        var rawIchop3Score = ((20.0 * gcsScore) + (nihssScore) + (2.0 * apache2Score) + (1.5 * hemVol) + (8.0 * mrsScore)) / 11.0;
        var roundedIchop3Score = Math.round(rawIchop3Score);
        var pctPoorOutcome = ichop3Outcomes[roundedIchop3Score];

        var resultText = roundedIchop3Score + " points. " + pctPoorOutcome + " % where poor 3 month outcomes were present.";
        if ($("#ichop-3-score-result").length) {
            $("#ichop-3-score-result").html(resultText);
        } else {
            $("#ichop-3-calculator form").prepend("<div class='alert alert-info' id='ichop-3-score-result'>" + resultText + "</div>");
        }
    }
    function calculateIchop12Score() {
        // Get input values
        var gcsScore = parseInt($("input[name=option-ichop-12-gcs]:checked").val());
        var nihssScore = parseInt($("input[name=option-ichop-12-nihss]:checked").val());
        var apache2Score = parseInt($("#ichop-12-apache-ii-score").val()) || 0;
        var mrsScore = parseInt($("input[name=option-ichop-12-mrs]:checked").val());

        var rawIchop12Score = gcsScore + nihssScore + 2.0 * apache2Score + mrsScore;
        var roundedIchop12Score = Math.round(rawIchop12Score);
        var pctPoorOutcome = ichop3Outcomes[roundedIchop12Score];

        var resultText = roundedIchop12Score + " points. " + pctPoorOutcome + " % where poor 12 month outcomes were present.";
        if ($("#ichop-12-score-result").length) {
            $("#ichop-12-score-result").html(resultText);
        } else {
            $("#ichop-12-calculator form").prepend("<div class='alert alert-info' id='ichop-12-score-result'>" + resultText + "</div>");
        }
    }

    // Lookup table for poor 3 month outcomes
    ichop3Outcomes = {
        0: 0,
        1: 12,
        2: 27,
        3: 51,
        4: 66,
        5: 80,
        6: 92,
        7: 96,
        8: 96
    };

    // Lookup table for poor 12 month outcomes
    ichop12Outcomes = {

    }
});
