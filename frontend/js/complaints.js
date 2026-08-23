async function loadComplaints() {

    const token =
        localStorage.getItem(
            "token"
        );

    if (!token) {

        window.location.href =
            "login.html";

        return;
    }

    try {

        const response =
            await fetch(
                "/api/complaints/my",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const complaints =
            await response.json();

        const container =
            document.getElementById(
                "complaintsList"
            );

        if (
            !Array.isArray(
                complaints
            )
        ) {

            container.innerHTML =
                "<p>Unable to load complaints.</p>";

            return;
        }

        if (
            complaints.length === 0
        ) {

            container.innerHTML =
                "<p>No complaints submitted yet.</p>";

            return;
        }

        container.innerHTML =
            complaints
                .map(
                    complaint => `
                <div class="card">

                    <h2>
                        ${complaint.title}
                    </h2>

                    <p>
                        ${complaint.description}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${complaint.category}
                    </p>

                    <p>
                        <strong>Department:</strong>
                        ${complaint.department}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${complaint.status}
                    </p>

                    <p>
                        <strong>Coins:</strong>
                        ${complaint.coinsAwarded}
                    </p>

                    ${
                        complaint.status ===
                        "Completed"
                            ? `
                            <a
                                class="btn"
                                href="feedback.html"
                            >
                                Give Feedback
                            </a>
                            `
                            : ""
                    }

                </div>
            `
                )
                .join("");

    } catch (error) {

        console.error(error);

    }
}

loadComplaints();