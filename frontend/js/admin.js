async function adminLogin() {

    const name =
        document.getElementById(
            "adminName"
        ).value;

    const department =
        document.getElementById(
            "adminDepartment"
        ).value;

    const password =
        document.getElementById(
            "adminPassword"
        ).value;

    const response =
        await fetch(
            "/api/admin/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    name,
                    department,
                    password
                })
            }
        );

    const result =
        await response.json();

    if (response.ok) {

        localStorage.setItem(
            "adminToken",
            result.token
        );

        document.getElementById(
            "loginBox"
        ).style.display =
            "none";

        document.getElementById(
            "dashboard"
        ).style.display =
            "block";

        loadAdminComplaints();

    } else {

        document.getElementById(
            "adminMessage"
        ).textContent =
            result.message;

    }
}


async function loadAdminComplaints() {

    const token =
        localStorage.getItem(
            "adminToken"
        );

    const response =
        await fetch(
            "/api/admin/complaints",
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
            "adminComplaints"
        );

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
                        User:
                        ${complaint.user?.name || "Unknown"}
                    </p>

                    <p>
                        Category:
                        ${complaint.category}
                    </p>

                    <p>
                        Current Status:
                        ${complaint.status}
                    </p>

                    <select
                        id="dept-${complaint._id}"
                    >

                        <option>
                            Sanitation
                        </option>

                        <option>
                            Electricity
                        </option>

                        <option>
                            Roads
                        </option>

                        <option>
                            Water Department
                        </option>

                        <option>
                            Drainage Department
                        </option>

                        <option>
                            Municipal
                        </option>

                        <option>
                            Traffic Department
                        </option>

                    </select>

                    <button
                        onclick="assignComplaint('${complaint._id}')"
                    >
                        Assign Department
                    </button>

                    <button
                        onclick="updateStatus('${complaint._id}', 'In Progress')"
                    >
                        In Progress
                    </button>

                    <button
                        onclick="updateStatus('${complaint._id}', 'Completed')"
                    >
                        Completed
                    </button>

                </div>
            `
            )
            .join("");
}


async function assignComplaint(id) {

    const token =
        localStorage.getItem(
            "adminToken"
        );

    const department =
        document.getElementById(
            `dept-${id}`
        ).value;

    const response =
        await fetch(
            `/api/admin/complaints/${id}/assign`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    department
                })
            }
        );

    const result =
        await response.json();

    alert(result.message);

    loadAdminComplaints();
}


async function updateStatus(
    id,
    status
) {

    const token =
        localStorage.getItem(
            "adminToken"
        );

    const response =
        await fetch(
            `/api/admin/complaints/${id}/status`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    status
                })
            }
        );

    const result =
        await response.json();

    alert(result.message);

    loadAdminComplaints();
}