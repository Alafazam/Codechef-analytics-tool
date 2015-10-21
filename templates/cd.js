function displayRecentTimeoutError(s, t, e) {
    try {
        if (t == "timeout") {
            $("#statusdiv").html("<center>Oops, we couldn't seem to load the site's recent activity.  Try again soon.</center>")
        }
    } catch (a) {}
}

function displaySsubmisisonTimeOutError(s, t, e) {
    try {
        if (t == "timeout") {
            $("#rankContentDiv").html("<center>Oops, we couldn't seem to load the successfull submission.  Try again soon.</center>")
        }
    } catch (a) {}
}

function displayRanksTimeoutError(s, t, e) {
    try {
        if (t == "timeout") {
            $("#rankdiv").html("<center>Oops, we couldn't seem to load the ranks.  Try again soon.</center>")
        }
    } catch (a) {}
}

function displayTRanksTimeoutError(s, t, e) {
    try {
        if (t == "timeout") {
            $("#trankdiv").html("<center>Oops, we couldn't seem to load the ranks.  Try again soon.</center>")
        }
    } catch (a) {}
}
$("#recentPreviousButtonactive").click(previous);

function previous() {
    $("#ajaxProgressDiv").show();
    var s = $("#recentStart").val();
    var t = $("#recentCount").val();
    var e = s - t - t;
    var a = $("#recentCount").val();
    var r = $("#userid").val();
    $.ajax({
        type: "POST",
        data: "userid=" + r,
        url: "/ajax/recent/" + e + "/" + a + "/",
        cache: false,
        timeout: 3e4,
        success: function(s) {
            $("#statusdiv").html(s)
        },
        error: displayRecentTimeoutError
    })
}
$("#recentNextButtonactive").click(next);

function next() {
    $("#ajaxProgressDiv").show();
    var s = $("#recentStart").val();
    var t = $("#recentCount").val();
    var e = $("#userid").val();
    $.ajax({
        type: "POST",
        data: "userid=" + e,
        url: "/ajax/recent/" + s + "/" + t + "/",
        cache: false,
        timeout: 3e4,
        success: function(s) {
            $("#statusdiv").html(s)
        },
        error: displayRecentTimeoutError
    })
}
$("#recentContestPreviousButtonactive").click(Contestprevious);

function Contestprevious() {
    $("#ContestajaxProgressDiv").show();
    var s = $("#ContestrecentStart").val();
    var t = $("#ContestrecentCount").val();
    var e = s - t - t;
    var a = $("#ContestrecentCount").val();
    var r = $("#userid").val();
    $.ajax({
        type: "POST",
        data: "userid=" + r,
        url: "/ajax/recent/contest/" + $(this).attr("class") + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 3e4,
        success: function(s) {
            $("#statusdiv").html(s)
        },
        error: displayRecentTimeoutError
    })
}
$("#recentContestNextButtonactive").click(Contestnext);

function Contestnext() {
    $("#ContestajaxProgressDiv").show();
    var s = $("#ContestrecentStart").val();
    var t = $("#ContestrecentCount").val();
    var e = $("#userid").val();
    if (!$(this).attr("class")) {
        ajaxurl = "/ajax/recent/contest/" + $("#contestCodeRecentContest").val() + "/" + s + "/" + t + "/"
    } else {
        ajaxurl = "/ajax/recent/contest/" + $(this).attr("class") + "/" + s + "/" + t + "/"
    }
    $.ajax({
        type: "POST",
        data: "userid=" + e,
        url: ajaxurl,
        cache: false,
        timeout: 3e4,
        success: function(s) {
            $("#statusdiv").html(s)
        },
        error: displayRecentTimeoutError
    })
}
$("#recentProblemPreviousButtonactive").click(recentProblemprevious);

function recentProblemprevious() {
    $("#recentProblemajaxProgressDiv").show();
    var s = $("#recentProblemStart").val();
    var t = $("#recentProblemCount").val();
    var e = s - t - t;
    var a = $("#recentProblemCount").val();
    var r = $("#userid").val();
    if ($("#pagename").val() == "fullProblemStatus") {
        $.ajax({
            type: "POST",
            url: "/ajax/recent/practice/" + $(this).attr("class") + "/" + e + "/" + a + "/",
            data: "detail=yes&userid=" + r,
            cache: false,
            timeout: 1e4,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/ajax/recent/practice/" + $(this).attr("class") + "/" + e + "/" + a + "/",
            cache: false,
            timeout: 1e4,
            data: "userid=" + r,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    }
}
$("#recentProblemNextButtonactive").click(recentProblemnext);

function recentProblemnext() {
    $("#recentProblemajaxProgressDiv").show();
    var s = $("#recentProblemStart").val();
    var t = $("#recentProblemCount").val();
    var e = $("#userid").val();
    if (!$(this).attr("class")) {
        ajaxurl = "/ajax/recent/practice/" + $("#problemCodeRecentPractice").val() + "/" + s + "/" + t + "/"
    } else {
        ajaxurl = "/ajax/recent/practice/" + $(this).attr("class") + "/" + s + "/" + t + "/"
    }
    if ($("#pagename").val() == "fullProblemStatus") {
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: "detail=yes&userid=" + e,
            cache: false,
            timeout: 1e4,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    } else {
        $.ajax({
            type: "POST",
            url: ajaxurl,
            cache: false,
            timeout: 1e4,
            data: "userid=" + e,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    }
}
$("#recentPractpreviousButtonactive").click(recentPractprevious);

function recentPractprevious() {
    $("#recentPrctajaxProgressDiv").show();
    var s = $("#recentPractStart").val();
    var t = $("#recentPractCount").val();
    var e = s - t - t;
    var a = $("#recentPractCount").val();
    var r = $("#userid").val();
    $.ajax({
        type: "POST",
        data: "userid=" + r,
        url: "/ajax/recent/practice/" + e + "/" + a + "/",
        cache: false,
        timeout: 1e4,
        success: function(s) {
            $("#statusdiv").html(s)
        },
        error: displayRecentTimeoutError
    })
}
$("#recentPractnextButtonactive").click(recentPractnext);

function recentPractnext() {
    $("#recentPrctajaxProgressDiv").show();
    var s = $("#recentPractStart").val();
    var t = $("#recentPractCount").val();
    var e = $("#userid").val();
    $.ajax({
        type: "POST",
        data: "userid=" + e,
        url: "/ajax/recent/practice/" + s + "/" + t + "/",
        cache: false,
        timeout: 1e4,
        success: function(s) {
            $("#statusdiv").html(s)
        },
        error: displayRecentTimeoutError
    })
}
$("#recentContestProblemPreviousButtonactive").click(recentContestProblemprevious);

function recentContestProblemprevious() {
    $("#recentContestProblemajaxProgressDiv").show();
    var s = $("#recentContestProblemStart").val();
    var t = $("#recentContestProblemCount").val();
    var e = s - t - t;
    var a = $("#recentContestProblemCount").val();
    var r = $("#userid").val();
    classvalue = $(this).attr("class");
    classarray = classvalue.split(" ");
    if ($("#pagename").val() == "fullProblemStatus") {
        $.ajax({
            type: "POST",
            url: "/ajax/recent/contest/" + classarray[0] + "/" + classarray[1] + "/" + e + "/" + a + "/",
            data: "detail=yes&userid=" + r,
            cache: false,
            timeout: 1e4,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/ajax/recent/contest/" + classarray[0] + "/" + classarray[1] + "/" + e + "/" + a + "/",
            cache: false,
            timeout: 1e4,
            data: "userid=" + r,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    }
}
$("#recentContestProblemNextButtonactive").click(recentContestProblemnext);

function recentContestProblemnext() {
    $("#recentContestProblemajaxProgressDiv").show();
    var s = $("#recentContestProblemStart").val();
    var t = $("#recentContestProblemCount").val();
    var e = $("#userid").val();
    if ($(this).attr("class")) {
        classvalue = $(this).attr("class")
    } else {
        classvalue = $("#contestCodeRecentContestProblem").val()
    }
    classarray = classvalue.split(" ");
    if ($("#pagename").val() == "fullProblemStatus") {
        $.ajax({
            type: "POST",
            url: "/ajax/recent/contest/" + classarray[0] + "/" + classarray[1] + "/" + s + "/" + t + "/",
            data: "detail=yes&userid=" + e,
            cache: false,
            timeout: 1e4,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/ajax/recent/contest/" + classarray[0] + "/" + classarray[1] + "/" + s + "/" + t + "/",
            cache: false,
            timeout: 1e4,
            data: "userid=" + e,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    }
}
$("#recentUserPreviousButtonactive").click(previousUser);

function previousUser() {
    $("#ajaxUserProgressDiv").show();
    var s = $("#recentUserStart").val();
    var t = $("#recentUserCount").val();
    var e = s - t - t;
    var a = $("#recentUserCount").val();
    if ($("#pagename").val() == "fullUserStatus") {
        $.ajax({
            type: "POST",
            url: "/ajax/recent/user/" + $(this).attr("class") + "/" + e + "/" + a + "/",
            data: "detail=yes",
            cache: false,
            timeout: 1e4,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    } else {
        $.ajax({
            url: "/ajax/recent/user/" + $(this).attr("class") + "/" + e + "/" + a + "/",
            cache: false,
            timeout: 1e4,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    }
}
$("#recentUserNextButtonactive").click(nextUser);

function nextUser() {
    $("#ajaxUserProgressDiv").show();
    var s = $("#recentUserStart").val();
    var t = $("#recentUserCount").val();
    if ($("#pagename").val() == "fullUserStatus") {
        $.ajax({
            type: "POST",
            url: "/ajax/recent/user/" + $(this).attr("class") + "/" + s + "/" + t + "/",
            data: "detail=yes",
            cache: false,
            timeout: 1e4,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    } else {
        $.ajax({
            url: "/ajax/recent/user/" + $(this).attr("class") + "/" + s + "/" + t + "/",
            cache: false,
            timeout: 1e4,
            success: function(s) {
                $("#statusdiv").html(s)
            },
            error: displayRecentTimeoutError
        })
    }
}
$("#ssubmissionsPreviousButtonactive").click(ssubmissionsPrevious);

function ssubmissionsPrevious() {
    $("#ssubmissionsAjaxProgressDiv").show();
    var s = $("#ssubmissionsStart").val();
    var t = $("#ssubmissionsCount").val();
    var e = s - t - t;
    var a = $("#ssubmissionsCount").val();
    var r = $("#userid").val();
    if ($("#pagename").val() == "fullProblemRank") {
        $.ajax({
            type: "POST",
            url: "/ajax/ssubmissions/practice/" + $(this).attr("class") + "/" + e + "/" + a + "/",
            data: "detail=yes&userid=" + r,
            cache: false,
            timeout: 2e4,
            success: function(s) {
                $("#rankContentDiv").html(s)
            },
            error: displaySsubmisisonTimeOutError
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/ajax/ssubmissions/practice/" + $(this).attr("class") + "/" + e + "/" + a + "/",
            cache: false,
            timeout: 2e4,
            data: "userid=" + r,
            success: function(s) {
                $("#rankContentDiv").html(s)
            },
            error: displaySsubmisisonTimeOutError
        })
    }
}
$("#ssubmissionsNextButtonactive").click(ssubmissionsNext);

function ssubmissionsNext() {
    $("#ssubmissionsAjaxProgressDiv").show();
    var s = $("#ssubmissionsStart").val();
    var t = $("#ssubmissionsCount").val();
    var e = $("#page").val();
    var a = $("#userid").val();
    if (!$(this).attr("class")) {
        ajaxurl = "/ajax/ssubmissions/practice/" + $("#problemCodeSsubPractice").val() + "/"
    } else {
        ajaxurl = "/ajax/ssubmissions/practice/" + $(this).attr("class") + "/" + s + "/" + t + "/"
    }
    if ($("#pagename").val() == "fullProblemRank") {
        $.ajax({
            type: "GET",
            url: ajaxurl,
            data: "detail=yes&userid=" + a,
            cache: false,
            timeout: 2e4,
            success: function(s) {
                $("#rankContentDiv").html(s)
            },
            error: displaySsubmisisonTimeOutError
        })
    } else {
        $.ajax({
            type: "GET",
            url: ajaxurl,
            cache: false,
            timeout: 2e4,
            data: "page=" + e,
            success: function(s) {
                $("#rankContentDiv").html(s)
            },
            error: displaySsubmisisonTimeOutError
        })
    }
}
$("#UserSsubmissionsPreviousButtonactive").click(UserSsubmissionsPrevious);

function UserSsubmissionsPrevious() {
    $("#UserSsubmissionsAjaxProgressDiv").show();
    var s = $("#UserSsubmissionsStart").val();
    var t = $("#UserSsubmissionsCount").val();
    var e = s - t - t;
    var a = $("#UserSsubmissionsCount").val();
    $.ajax({
        url: "/ajax/ssubmissions/user/practice/" + $(this).attr("class") + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 1e4,
        success: function(s) {
            $("#rankContentDiv").html(s)
        },
        error: displaySsubmisisonTimeOutError
    })
}
$("#UserSsubmissionsNextButtonactive").click(UserSsubmissionsNext);

function UserSsubmissionsNext() {
    $("#UserSsubmissionsAjaxProgressDiv").show();
    var s = $("#UserSsubmissionsStart").val();
    var t = $("#UserSsubmissionsCount").val();
    $.ajax({
        url: "/ajax/ssubmissions/user/practice/" + $(this).attr("class") + "/" + s + "/" + t + "/",
        cache: false,
        timeout: 1e4,
        success: function(s) {
            $("#rankContentDiv").html(s)
        },
        error: displaySsubmisisonTimeOutError
    })
}
$("#ssubmissionsContestPreviousButtonactive").click(ssubmissionsContestPrevious);

function ssubmissionsContestPrevious() {
    $("#ssubmissionsAjaxProgressDiv").show();
    var s = $("#ssubmissionsContestStart").val();
    var t = $("#ssubmissionsContestCount").val();
    var e = s - t - t;
    var a = $("#ssubmissionsContestCount").val();
    var r = $("#userid").val();
    classvalue = $(this).attr("class");
    classarray = classvalue.split(" ");
    $.ajax({
        type: "POST",
        url: "/ajax/ssubmissions/contest/" + classarray[0] + "/" + classarray[1] + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 1e4,
        data: "userid=" + r,
        success: function(s) {
            $("#rankContentDiv").html(s)
        },
        error: displaySsubmisisonTimeOutError
    })
}
$("#ssubmissionsContestNextButtonactive").click(ssubmissionsContestNext);

function ssubmissionsContestNext() {
    $("#ssubmissionsAjaxProgressDiv").show();
    var s = $("#ssubmissionsContestStart").val();
    var t = $("#ssubmissionsContestCount").val();
    var e = $("#userid").val();
    if ($(this).attr("class")) {
        classvalue = $(this).attr("class")
    } else {
        classvalue = $("#contestCodeSsubContestProblem").val()
    }
    classarray = classvalue.split(" ");
    $.ajax({
        type: "POST",
        url: "/ajax/ssubmissions/contest/" + classarray[0] + "/" + classarray[1] + "/" + s + "/" + t + "/",
        cache: false,
        timeout: 1e4,
        data: "userid=" + e,
        success: function(s) {
            $("#rankContentDiv").html(s)
        },
        error: displaySsubmisisonTimeOutError
    })
}
$("#PSubmissionsUserPreviousButtonactive").click(PSubmissionsUserPrevious);

function PSubmissionsUserPrevious() {
    $("#PSubmissionsUserAjaxProgressDiv").show();
    var s = $("#PSubmissionsUserStart").val();
    var t = $("#PSubmissionsUserCount").val();
    var e = s - t - t;
    var a = $("#PSubmissionsUserCount").val();
    var r = $("#userid").val();
    classvalue = $(this).attr("class");
    classarray = classvalue.split("-");
    $.ajax({
        type: "POST",
        url: "/ajax/user/problem/" + classarray[0] + "/" + classarray[1] + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 1e4,
        data: "userid=" + r,
        success: function(s) {
            $("#rankContentDiv").html(s)
        },
        error: displaySsubmisisonTimeOutError
    })
}
$("#PSubmissionsUserNextButtonactive").click(PSubmissionsUserNext);

function PSubmissionsUserNext() {
    $("#PSubmissionsUserAjaxProgressDiv").show();
    var s = $("#PSubmissionsUserStart").val();
    var t = $("#PSubmissionsUserCount").val();
    var e = $("#userid").val();
    classvalue = $(this).attr("class");
    classarray = classvalue.split("-");
    $.ajax({
        type: "POST",
        url: "/ajax/user/problem/" + classarray[0] + "/" + classarray[1] + "/" + s + "/" + t + "/",
        cache: false,
        timeout: 1e4,
        data: "userid=" + e,
        success: function(s) {
            $("#rankContentDiv").html(s)
        },
        error: displaySsubmisisonTimeOutError
    })
}
$("#contestRanksPreviousButtonactive").click(contestRanksPrevious);

function contestRanksPrevious() {
    $("#contestRanksAjaxProgressDiv").show();
    var s = $("#contestRanksStart").val();
    var t = $("#contestRanksCount").val();
    var e = s - t - t;
    var a = $("#contestRanksCount").val();
    classvalue = $("#contestCodeRanksContest").val();
    $.ajax({
        url: "/ajax/ranks/contest/" + classvalue + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 3e4,
        success: function(s) {
            $("#rankdiv").html(s)
        },
        error: displayRanksTimeoutError
    })
}
$("#contestRanksNextButtonactive").click(contestRanksNext);

function contestRanksNext() {
    $("#contestRanksAjaxProgressDiv").show();
    var s = $("#contestRanksStart").val();
    var t = $("#contestRanksCount").val();
    classvalue = $("#contestCodeRanksContest").val();
    $.ajax({
        url: "/ajax/ranks/contest/" + classvalue + "/" + s + "/" + t + "/",
        cache: false,
        timeout: 3e4,
        success: function(s) {
            $("#rankdiv").html(s)
        },
        error: displayRanksTimeoutError
    })
}
$("#tcontestRanksPreviousButtonactive").click(tcontestRanksPrevious);

function tcontestRanksPrevious() {
    $("#tcontestRanksAjaxProgressDiv").show();
    var s = $("#tcontestRanksStart").val();
    var t = $("#tcontestRanksCount").val();
    var e = s - t - t;
    var a = $("#tcontestRanksCount").val();
    classvalue = $("#tcontestCodeRanksContest").val();
    $.ajax({
        url: "/ajax/ranks/tcontest/" + classvalue + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 3e4,
        success: function(s) {
            $("#trankdiv").html(s)
        },
        error: displayTRanksTimeoutError
    })
}
$("#tcontestRanksNextButtonactive").click(tcontestRanksNext);

function tcontestRanksNext() {
    $("#tcontestRanksAjaxProgressDiv").show();
    var s = $("#tcontestRanksStart").val();
    var t = $("#tcontestRanksCount").val();
    classvalue = $("#tcontestCodeRanksContest").val();
    $.ajax({
        url: "/ajax/ranks/tcontest/" + classvalue + "/" + s + "/" + t + "/",
        cache: false,
        timeout: 3e4,
        success: function(s) {
            $("#trankdiv").html(s)
        },
        error: displayTRanksTimeoutError
    })
}
$("#tcontestRanksPreviousButtonactive").click(etcontestRanksPrevious);

function etcontestRanksPrevious() {
    $("#tcontestRanksAjaxProgressDiv").show();
    var s = $("#tcontestRanksStart").val();
    var t = $("#tcontestRanksCount").val();
    var e = s - t - t;
    var a = $("#tcontestRanksCount").val();
    classvalue = $("#tcontestCodeRanksContest").val();
    $.ajax({
        url: "/ajax/ranks/etcontest/" + classvalue + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 1e4,
        success: function(s) {
            $("#trankdiv").html(s)
        },
        error: displayTRanksTimeoutError
    })
}
$("#tcontestRanksNextButtonactive").click(etcontestRanksNext);

function etcontestRanksNext() {
    $("#tcontestRanksAjaxProgressDiv").show();
    var s = $("#tcontestRanksStart").val();
    var t = $("#tcontestRanksCount").val();
    classvalue = $("#tcontestCodeRanksContest").val();
    $.ajax({
        url: "/ajax/ranks/etcontest/" + classvalue + "/" + s + "/" + t + "/",
        cache: false,
        timeout: 1e4,
        success: function(s) {
            $("#trankdiv").html(s)
        },
        error: displayTRanksTimeoutError
    })
}
$("#contestCountryRanksPreviousButtonactive").click(contestCountryRanksPrevious);

function contestCountryRanksPrevious() {
    $("#contestRanksAjaxProgressDiv").show();
    var s = $("#contestRanksStart").val();
    var t = $("#contestRanksCount").val();
    var e = s - t - t;
    var a = $("#contestRanksCount").val();
    classvalue = $("#contestCodeRanksContest").val();
    classarray = classvalue.split(" ");
    $.ajax({
        url: "/ajax/ranks/country/contest/" + classarray[0] + "/" + classarray[1] + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 1e4,
        success: function(s) {
            $("#rankdiv").html(s)
        },
        error: displayRanksTimeoutError
    })
}
$("#contestCountryRanksNextButtonactive").click(contestCountryRanksNext);

function contestCountryRanksNext() {
    $("#contestRanksAjaxProgressDiv").show();
    var s = $("#contestRanksStart").val();
    var t = $("#contestRanksCount").val();
    classvalue = $("#contestCodeRanksContest").val();
    classarray = classvalue.split(" ");
    if (!$(this).attr("class")) {
        ajaxurl = "/ajax/ranks/country/contest/" + classarray[0] + "/" + classarray[1] + "/" + s + "/" + t + "/"
    } else {
        ajaxurl = "/ajax/ranks/country/contest/" + classarray[0] + "/" + classarray[1] + "/" + s + "/" + t + "/"
    }
    $.ajax({
        url: ajaxurl,
        cache: false,
        timeout: 1e4,
        success: function(s) {
            $("#rankdiv").html(s)
        },
        error: displayRanksTimeoutError
    })
}
$("#recentUserContestProblemPreviousButtonactive").click(recentUserContestProblemprev);

function recentUserContestProblemprev() {
    $("#recentUserContestProblemajaxProgressDiv").show();
    var s = $("#recentUserContestProblemStart").val();
    var t = $("#recentUserContestProblemCount").val();
    var e = s - t - t;
    var a = $("#recentUserContestProblemCount").val();
    var r = $("#userid").val();
    classvalue = $(this).attr("class");
    classarray = classvalue.split(" ");
    $.ajax({
        type: "POST",
        url: "/ajax/user/contest/problem/" + classarray[0] + "/" + classarray[1] + "/" + classarray[2] + "/" + e + "/" + a + "/",
        cache: false,
        timeout: 1e4,
        data: "userid=" + r,
        success: function(s) {
            $("#statusdiv").html(s)
        },
        error: displayRecentTimeoutError
    })
}
$("#recentUserContestProblemNextButtonactive").click(recentUserContestProblemnext);

function recentUserContestProblemnext() {
    $("#recentUserContestProblemajaxProgressDiv").show();
    var s = $("#recentUserContestProblemStart").val();
    var t = $("#recentUserContestProblemCount").val();
    var e = $("#userid").val();
    classvalue = $(this).attr("class");
    classarray = classvalue.split(" ");
    $.ajax({
        type: "POST",
        url: "/ajax/user/contest/problem/" + classarray[0] + "/" + classarray[1] + "/" + classarray[2] + "/" + s + "/" + t + "/",
        cache: false,
        timeout: 1e4,
        data: "userid=" + e,
        success: function(s) {
            $("#statusdiv").html(s)
        },
        error: displayRecentTimeoutError
    })
}

function getPage(s, t, e) {
    console.log(s)
    console.log(t)

    $.ajax({
        url: s,
        type: "GET",
        data: t,
        cache: false,
        timeout: 1e4,
        dataType: "json",
        success: function(s) {
            $("#rankContentDiv").html(s["content"]);
            var t = e === undefined ? 1 : parseInt(e) + 1;
            var a = "<div align='center' class='pageinfo'><center> - </center></div>";
            if (s["max_page"] > 0) {
                a = "<div align='center' class='pageinfo'><center>" + t + " of " + s["max_page"] + "</center></div>"
            }
            $("#loader").html(a)
        },
        error: function(a, r) {
            try {
                if (e === undefined) {
                    retryButton = '<center><input id="retryButton" type="button" value="Retry"/></center>';
                    $("#rankContentDiv").html(retryButton);
                    $("#retryButton").click(function() {
                        $("#rankContentDiv").html('<p align="center"><img src="/sites/all/themes/abessive/images/ajax-loader.gif" /> Fetching content</p>');
                        getPage(s, t, e)
                    })
                } else {
                    $("#loader").html("<center>Oops! It couldn't load. Try again.</center>")
                }
            } catch (n) {}
        }
    })
}

function set_page(s) {
    var t;
    if (s == "prev") t = $("#prev_p").val();
    else if (s == "next") t = $("#next_p").val();
    return t
}

function onload_getpage_ssubmissions(s) {
    $("#loader").html('<p><img src="/misc/ajax_loader_d.gif" style="width: 120px; height:15px;"/></p>');
    var t = "";
    if ($("#ccode").length != 0) {
        t = "&ccode=" + $("#ccode").val()
    }
    var e = set_page(s);
    var a = "page=" + e + "&pcode=" + $("#pcode").val() + t;
    var r = "/ssubmission/prob";
    getPage(r, a, e)
}

function onload_getpage_recent_activity_contest(s) {
    $("#loader").html('<p><img src="/misc/ajax_loader_d.gif" style="width: 120px; height:15px;"/></p>');
    var t = "";
    if ($("#ccode").length != 0) {
        t = "&ccode=" + $("#ccode").val()
    }
    var e = set_page(s);
    var a = "page=" + e + t;
    var r = "/recent/contest";
    getPage(r, a, e)
}

function onload_getpage_recent_activity_user(s) {
    $("#loader").html('<p><img src="/misc/ajax_loader_d.gif" style="width: 120px; height:15px;"/></p>');
    var t = "";
    if ($("#user_handle").length != 0) {
        t = "&user_handle=" + $("#user_handle").val()
    }
    var e = set_page(s);
    console.log("e:" + e)
    var a = "page=" + e + t;
    var r = "/recent/user";
    getPage(r, a, e)
}