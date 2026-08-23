const complaintForm =
    document.getElementById(
        "complaintForm"
    );

let latitude = null;
let longitude = null;

function getLocation() {

    if (!navigator.geolocation) {

        document.getElementById(
            "locationStatus"
        ).textContent =
            "Location is not supported.";

        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {

            latitude =
                position.coords.latitude;

            longitude =
                position.coords.longitude;

            document.getElementById(
                "latitude"
            ).value =
                latitude;

            document.getElementById(
                "longitude"
            ).value =
                longitude;

            document.getElementById(
                "locationStatus"
            ).textContent =
                `Location captured: ${latitude}, ${longitude}`;

        },

        function () {

            document.getElementById(
                "locationStatus"
            ).textContent =
                "Unable to get location. Enter address manually.";

        }
    );
}


complaintForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token) {

            window.location.href =
                "login.html";

            return;
        }

        const formData =
            new FormData();

        formData.append(
            "title",
            document.getElementById(
                "title"
            ).value
        );

        formData.append(
            "description",
            document.getElementById(
                "description"
            ).value
        );

        formData.append(
            "category",
            document.getElementById(
                "category"
            ).value
        );

        formData.append(
            "address",
            document.getElementById(
                "address"
            ).value
        );

        formData.append(
            "latitude",
            document.getElementById(
                "latitude"
            ).value
        );

        formData.append(
            "longitude",
            document.getElementById(
                "longitude"
            ).value
        );

        const files =
            document.getElementById(
                "media"
            ).files;

        for (
            let i = 0;
            i < files.length;
            i++
        ) {

            formData.append(
                "media",
                files[i]
            );

        }

        try {

            const response =
                await fetch(
                    "/api/complaints",
                    {
                        method: "POST",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        },

                        body: formData
                    }
                );

            const result =
                await response.json();

            document.getElementById(
                "reportMessage"
            ).textContent =
                result.message;

            if (response.ok) {

                document.getElementById(
                    "reportMessage"
                ).textContent =
                    "Complaint submitted! You earned 10 coins.";

                complaintForm.reset();

            }

        } catch (error) {

            document.getElementById(
                "reportMessage"
            ).textContent =
                "Server error.";

        }

    }
);