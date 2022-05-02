// sobald sich der User einlogged, wird der username, die userID und der token im localstorage gespeichert
$(document).ready(function() {
    localStorage.setItem("selectedCurrency", "USD");
    var username, password, userID
    $("#register").on("click", function () {
        username = $("#username").val()
        password = $("#password").val()
        if(username.length < 5 || password.length < 5) {
            alert("invalid Input. Username and Password must contain at least 5 characters.")
            $("#username").val("")
            $("#password").val("")
        } else {
            $.ajax({
                url: "http://localhost:8080/register",
                type: "POST",
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }).done(function (responseJSON) {
                userID = responseJSON.id
                alert(userID + " registriert")
                $("#username").val('')
                $("#password").val('')
            }).fail(function (xhr) {
                alert(xhr.responseText);
                $("#username").val('')
                $("#password").val('')
            })
        }
    });
})
function saveData(){
    var username = $("#username").val()
    var password = $("#password").val()
    $.ajax({
        url: "http://localhost:8080/login",
        type: "POST",
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        data: JSON.stringify({
            "username": username,
            "password": password
        })
    }).done(function (responseJSON) {
        let userID = responseJSON.userId;
        let jwtToken = responseJSON.jwtToken;
        localStorage.setItem("userID", userID);
        localStorage.setItem("username", username)
        localStorage.setItem("token", "Bearer " + jwtToken);
        console.log("Token: " + jwtToken)
        //alert(responseJSON[0].id);
    }).fail(function (xhr) {
        alert(xhr.responseText);
        $("#username").val('')
        $("#password").val('')
        $("#login").attr("action", "")
    });
}