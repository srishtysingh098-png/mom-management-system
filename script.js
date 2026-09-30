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

function addTask() {

    const meetingId =
        Number(document.getElementById("taskMeeting").value);

    const taskName =
        document.getElementById("taskName").value;

    const person =
        document.getElementById("taskPerson").value;

    const deadline =
        document.getElementById("taskDeadline").value;

    if (meetingId === 0 || taskName === "") {
        alert("Please select a meeting and enter a task.");
        return;
    }

    const meeting = meetings.find(
        meeting => meeting.id === meetingId
    );

    if (!meeting) {
        alert("Meeting not found.");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        person: person,
        deadline: deadline,
        completed: false
    };

    meeting.tasks.push(task);

    saveMeetings();

    document.getElementById("taskName").value = "";
    document.getElementById("taskPerson").value = "";
    document.getElementById("taskDeadline").value = "";

    displayMeetings();
    displayTasks();
}

function displayTaskMeetings() {

    const select =
        document.getElementById("taskMeeting");

    select.innerHTML =
        '<option value="0">Select Meeting</option>';

    meetings.forEach(meeting => {

        select.innerHTML += `
            <option value="${meeting.id}">
                ${meeting.title}
            </option>
        `;
    });
}

function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    meetings.forEach(meeting => {

        meeting.tasks.forEach(task => {

            taskList.innerHTML += `

                <div class="meeting">

                    <h3>
                        ${task.completed ? "✅" : "📌"}
                        ${task.name}
                    </h3>

                    <p>
                        <strong>Meeting:</strong>
                        ${meeting.title}
                    </p>

                    <p>
                        <strong>Assigned To:</strong>
                        ${task.person || "Not assigned"}
                    </p>

                    <p>
                        <strong>Deadline:</strong>
                        ${task.deadline || "No deadline"}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${task.completed ? "Completed" : "Pending"}
                    </p>

                    <button
                        onclick="toggleTask(${meeting.id}, ${task.id})">
                        ${task.completed
                            ? "Mark Pending"
                            : "Mark Completed"}
                    </button>

                </div>
            `;
        });
    });

    displayTaskMeetings();
    updateDashboard();
}

function toggleTask(meetingId, taskId) {

    const meeting = meetings.find(
        meeting => meeting.id === meetingId
    );

    if (!meeting) return;

    const task = meeting.tasks.find(
        task => task.id === taskId
    );

    if (!task) return;

    task.completed = !task.completed;

    saveMeetings();

    displayTasks();
}

displayMeetings();
displayTasks();
function searchMeetings() {

    const searchText =
        document.getElementById("searchMeeting")
        .value
        .toLowerCase();

    const meetingList =
        document.getElementById("meetingList");

    meetingList.innerHTML = "";

    const filteredMeetings = meetings.filter(meeting => {

        return (
            meeting.title.toLowerCase().includes(searchText) ||
            meeting.participants.toLowerCase().includes(searchText) ||
            meeting.agenda.toLowerCase().includes(searchText) ||
            meeting.notes.toLowerCase().includes(searchText)
        );

    });

    filteredMeetings.forEach(meeting => {

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
}
