async function createCommunity() {

    const token =
        localStorage.getItem(
            "token"
        );

    const name =
        document.getElementById(
            "communityName"
        ).value;

    const description =
        document.getElementById(
            "communityDescription"
        ).value;

    const response =
        await fetch(
            "/api/communities",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    name,
                    description
                })
            }
        );

    const result =
        await response.json();

    alert(result.message);

    loadCommunities();
}


async function loadCommunities() {

    const response =
        await fetch(
            "/api/communities"
        );

    const communities =
        await response.json();

    const container =
        document.getElementById(
            "communitiesList"
        );

    container.innerHTML =
        communities
            .map(
                community => `
                <div class="card">

                    <h3>
                        ${community.name}
                    </h3>

                    <p>
                        ${community.description}
                    </p>

                    <button
                        onclick="joinCommunity('${community._id}')"
                    >
                        Join Community
                    </button>

                </div>
            `
            )
            .join("");
}


async function joinCommunity(id) {

    const token =
        localStorage.getItem(
            "token"
        );

    const response =
        await fetch(
            `/api/communities/${id}/join`,
            {
                method: "POST",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const result =
        await response.json();

    alert(result.message);
}


loadCommunities();