let meetings = JSON.parse(localStorage.getItem("momMeetings")) || [];

function addMeeting() {

    const title = document.getElementById("meetingTitle").value;
    const date = document.getElementById("meetingDate").value;
    const participants = document.getElementById("participants").value;
    const agenda = document.getElementById("agenda").value;
    const notes = document.getElementById("notes").value;

    if (title === "" || date === "") {
        alert("Please enter the meeting title and date.");
        return;
    }

    const meeting = {
        id: Date.now(),
        title: title,
        date: date,
        participants: participants,
        agenda: agenda,
        notes: notes,
        tasks: []
    };

    meetings.push(meeting);

    saveMeetings();

    clearForm();

    displayMeetings();
}

function saveMeetings() {
    localStorage.setItem(
        "momMeetings",
        JSON.stringify(meetings)
    );
}

function clearForm() {

    document.getElementById("meetingTitle").value = "";
    document.getElementById("meetingDate").value = "";
    document.getElementById("participants").value = "";
    document.getElementById("agenda").value = "";
    document.getElementById("notes").value = "";
}

function displayMeetings() {

    const meetingList =
        document.getElementById("meetingList");

    meetingList.innerHTML = "";

    meetings.forEach((meeting) => {

        meetingList.innerHTML += `

            <div class="meeting">

                <h3>📋 ${meeting.title}</h3>

                <p>
                    <strong>📅 Date:</strong>
                    ${meeting.date}
                </p>

                <p>
                    <strong>👥 Participants:</strong>
                    ${meeting.participants || "Not provided"}
                </p>

                <p>
                    <strong>📝 Agenda:</strong>
                    ${meeting.agenda || "Not provided"}
                </p>

                <p>
                    <strong>💬 Notes:</strong>
                    ${meeting.notes || "Not provided"}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteMeeting(${meeting.id})">
                    🗑️ Delete Meeting
                </button>

            </div>
        `;
    });

    updateDashboard();
}

function deleteMeeting(id) {

    meetings = meetings.filter(
        meeting => meeting.id !== id
    );

    saveMeetings();

    displayMeetings();
}

function updateDashboard() {

    document.getElementById("totalMeetings").textContent =
        meetings.length;

    let totalTasks = 0;
    let completedTasks = 0;

    meetings.forEach(meeting => {

        if (meeting.tasks) {

            totalTasks += meeting.tasks.length;

            completedTasks += meeting.tasks.filter(
                task => task.completed === true
            ).length;
        }
    });

    document.getElementById("totalTasks").textContent =
        totalTasks;

    document.getElementById("completedTasks").textContent =
        completedTasks;
}

displayMeetings();
