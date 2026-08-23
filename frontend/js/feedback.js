const feedbackForm =
    document.getElementById(
        "feedbackForm"
    );

feedbackForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const token =
            localStorage.getItem(
                "token"
            );

        const complaintId =
            document.getElementById(
                "complaintId"
            ).value;

        const rating =
            document.getElementById(
                "rating"
            ).value;

        const comment =
            document.getElementById(
                "comment"
            ).value;

        try {

            const response =
                await fetch(
                    "/api/feedback",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            complaintId,
                            rating,
                            comment
                        })
                    }
                );

            const result =
                await response.json();

            document.getElementById(
                "feedbackMessage"
            ).textContent =
                result.message;

            if (response.ok) {

                document.getElementById(
                    "feedbackMessage"
                ).textContent =
                    "Feedback submitted! You earned 5 coins.";

            }

        } catch (error) {

            document.getElementById(
                "feedbackMessage"
            ).textContent =
                "Server error.";

        }

    }
);