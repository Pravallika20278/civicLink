const registerForm = document.getElementById("registerForm");

const message = document.getElementById("message");

const registerButton = document.getElementById("registerButton");

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const phoneInput = document.getElementById("phone");


/* ================================
   SHOW / HIDE PASSWORD
================================ */

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent = "🙈";

    } else {

        password.type = "password";

        togglePassword.textContent = "👁";

    }

});


/* ================================
   PHONE NUMBER
================================ */

phoneInput.addEventListener("input", function () {

    phoneInput.value =
        phoneInput.value.replace(/\D/g, "");

});


/* ================================
   MESSAGE
================================ */

function showMessage(text, type) {

    message.textContent = text;

    message.className = "message " + type;

}


/* ================================
   REGISTER FORM
================================ */

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const passwordValue =
        document.getElementById("password").value;

    const gender =
        document.getElementById("gender").value;

    const profession =
        document.getElementById("profession").value.trim();

    const address =
        document.getElementById("address").value.trim();


    /* ================================
       VALIDATION
    ================================ */

    if (name.length < 2) {

        showMessage(
            "Please enter your full name.",
            "error"
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        showMessage(
            "Please enter a valid 10-digit phone number.",
            "error"
        );

        return;
    }


    if (!email.includes("@")) {

        showMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;
    }


    if (passwordValue.length < 6) {

        showMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    if (!gender) {

        showMessage(
            "Please select your gender.",
            "error"
        );

        return;
    }


    if (!address) {

        showMessage(
            "Please enter your address.",
            "error"
        );

        return;
    }


    /* ================================
       USER DATA
    ================================ */

    const userData = {

        name: name,

        phone: phone,

        email: email,

        password: passwordValue,

        gender: gender,

        profession: profession,

        address: address

    };


    /* ================================
       BUTTON
    ================================ */

    registerButton.disabled = true;

    registerButton.textContent =
        "Creating Account...";


    try {

        const response = await fetch(
            "/api/auth/register",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData)

            }
        );


        const data = await response.json();


        if (response.ok) {

            showMessage(
                data.message ||
                "Registration successful!",
                "success"
            );


            registerForm.reset();


            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1500);


        } else {

            showMessage(
                data.message ||
                "Registration failed.",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        showMessage(
            "Unable to connect to the server.",
            "error"
        );


    } finally {

        registerButton.disabled = false;

        registerButton.textContent =
            "Create Account";

    }

});