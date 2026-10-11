const reportForm = document.getElementById("reportForm");
const reportsList = document.getElementById("reportsList");
const loadingIndicator = document.getElementById("loading");

// 1. Fetch and display existing reports from Supabase
async function fetchReports() {
    try {
        const { data, error } = await db
            .from("civic_reports")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        loadingIndicator.style.display = "none";
        reportsList.innerHTML = "";

        if (!data || data.length === 0) {
            reportsList.innerHTML = "<p>No reports found. Be the first to report!</p>";
            return;
        }

        data.forEach((report) => {
            const card = document.createElement("div");
            card.className = "report-item";
            card.innerHTML = `
        <div class="report-header">
          <h3>${report.title}</h3>
          <span class="badge ${report.status.toLowerCase()}">${report.status}</span>
        </div>
        <p class="meta"><strong>Category:</strong> ${report.category} | <strong>Location:</strong> ${report.location}</p>
        <p class="desc">${report.description}</p>
        <small class="time">${new Date(report.created_at).toLocaleString()}</small>
      `;
            reportsList.appendChild(card);
        });
    } catch (err) {
        console.error("Error fetching reports:", err.message);
        loadingIndicator.innerText = "Failed to load reports.";
    }
}

// 2. Submit a new report to Supabase
reportForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    const newReport = {
        title: document.getElementById("title").value.trim(),
        category: document.getElementById("category").value,
        location: document.getElementById("location").value.trim(),
        description: document.getElementById("description").value.trim(),
    };

    try {
        const { error } = await db.from("civic_reports").insert([newReport]);

        if (error) throw error;

        alert("Report submitted successfully!");
        reportForm.reset();
        fetchReports(); // Refresh the list
    } catch (err) {
        alert("Error saving report: " + err.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Report";
    }
});

// Load reports on startup
document.addEventListener("DOMContentLoaded", fetchReports);