const userData =
    JSON.parse(
        localStorage.getItem("user")
    );

if (!userData) {
    window.location.href =
        "login.html";
}

if (userData) {

    document.getElementById(
        "coins"
    ).textContent =
        userData.coins;

    document.getElementById(
        "creditScore"
    ).textContent =
        userData.creditScore;
}

function logout() {

    localStorage.clear();

    window.location.href =
        "login.html";
}