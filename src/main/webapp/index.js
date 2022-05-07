let baseURL_dev_car = "http://localhost:8080/";
let baseURL_dev_user = "http://localhost:8081/";
$(document).ready(function() {
    localStorage.setItem("selectedCurrency", "USD");
    var username, password, id
    $("#register").on("click", function () {
        username = $("#username").val()
        password = $("#password").val()
        if(username.length < 5 || password.length < 5) {
            alert("invalid Input. Username and Password must contain at least 5 characters.")
            $("#username").val("")
            $("#password").val("")
        } else {
            $.ajax({
                url: baseURL_dev_user + "register",
                type: "POST",
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }).done(function (responseJSON) {
                alert("You are registered and able to login now.")
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
        url: baseURL_dev_user + "login",
        type: "POST",
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        data: JSON.stringify({
            "username": username,
            "password": password
        })
    }).done(function (responseJSON) {
        let id = responseJSON.id;
        localStorage.setItem("id", id);
        localStorage.setItem("username", username);
    }).fail(function (xhr) {
        alert(xhr.responseText);
        $("#username").val('')
        $("#password").val('')
        $("#login").attr("action", "")
    });
}