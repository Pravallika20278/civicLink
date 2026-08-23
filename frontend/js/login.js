const API = "/api";

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const data = {
                name:
                    document.getElementById(
                        "name"
                    ).value,

                phone:
                    document.getElementById(
                        "phone"
                    ).value,

                email:
                    document.getElementById(
                        "email"
                    ).value,

                gender:
                    document.getElementById(
                        "gender"
                    ).value,

                place:
                    document.getElementById(
                        "place"
                    ).value,

                address:
                    document.getElementById(
                        "address"
                    ).value,

                profession:
                    document.getElementById(
                        "profession"
                    ).value
            };

            try {

                const response =
                    await fetch(
                        `${API}/auth/register`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    data
                                )
                        }
                    );

                const result =
                    await response.json();

                document.getElementById(
                    "message"
                ).textContent =
                    result.message;

                if (response.ok) {

                    setTimeout(() => {
                        window.location.href =
                            "login.html";
                    }, 1000);

                }

            } catch (error) {

                document.getElementById(
                    "message"
                ).textContent =
                    "Server error";

            }

        }
    );
}


async function sendOTP() {

    const phone =
        document.getElementById(
            "loginPhone"
        ).value;

    try {

        const response =
            await fetch(
                `${API}/auth/send-otp`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        phone
                    })
                }
            );

        const result =
            await response.json();

        document.getElementById(
            "loginMessage"
        ).textContent =
            result.message +
            " Demo OTP: " +
            result.demoOTP;

        if (response.ok) {

            document.getElementById(
                "otpSection"
            ).style.display =
                "block";

        }

    } catch (error) {

        document.getElementById(
            "loginMessage"
        ).textContent =
            "Server error";

    }
}


async function verifyOTP() {

    const phone =
        document.getElementById(
            "loginPhone"
        ).value;

    const otp =
        document.getElementById(
            "otp"
        ).value;

    try {

        const response =
            await fetch(
                `${API}/auth/verify-otp`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        phone,
                        otp
                    })
                }
            );

        const result =
            await response.json();

        if (response.ok) {

            localStorage.setItem(
                "token",
                result.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    result.user
                )
            );

            window.location.href =
                "dashboard.html";

        } else {

            document.getElementById(
                "loginMessage"
            ).textContent =
                result.message;

        }

    } catch (error) {

        document.getElementById(
            "loginMessage"
        ).textContent =
            "Server error";

    }
}


function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "user"
    );

    window.location.href =
        "login.html";
}