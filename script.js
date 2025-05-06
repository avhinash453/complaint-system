document.addEventListener('DOMContentLoaded', () => {
    const complaintForm = document.getElementById('complaint-form');
    const studentNameInput = document.getElementById('student-name');
    const complaintTextInput = document.getElementById('complaint-text');
    const complaintsDiv = document.getElementById('complaints');
    const allComplaintsDiv = document.getElementById('all-complaints');
    const toggleAdminButton = document.getElementById('toggle-admin');
    const adminSection = document.getElementById('admin-complaints');

    // Load complaints from localStorage
    let complaints = JSON.parse(localStorage.getItem('complaints')) || [];

    // Display complaints for the student
    function displayStudentComplaints() {
        complaintsDiv.innerHTML = '';
        const studentName = studentNameInput.value.trim();
        const studentComplaints = complaints.filter(c => c.name === studentName);
        studentComplaints.forEach(complaint => {
            const div = document.createElement('div');
            div.className = 'complaint';
            div.innerHTML = `<strong>${complaint.name}</strong>: ${complaint.text} <em>(${complaint.date})</em>`;
            complaintsDiv.appendChild(div);
        });
    }

    // Display all complaints for admin
    function displayAllComplaints() {
        allComplaintsDiv.innerHTML = '';
        complaints.forEach(complaint => {
            const div = document.createElement('div');
            div.className = 'complaint';
            div.innerHTML = `<strong>${complaint.name}</strong>: ${complaint.text} <em>(${complaint.date})</em>`;
            allComplaintsDiv.appendChild(div);
        });
    }

    // Handle form submission
    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = studentNameInput.value.trim();
        const text = complaintTextInput.value.trim();
        if (name && text) {
            const complaint = {
                name,
                text,
                date: new Date().toLocaleString()
            };
            complaints.push(complaint);
            localStorage.setItem('complaints', JSON.stringify(complaints));
            complaintTextInput.value = '';
            displayStudentComplaints();
            displayAllComplaints();
        }
    });

    // Toggle admin view
    toggleAdminButton.addEventListener('click', () => {
        adminSection.style.display = adminSection.style.display === 'none' ? 'block' : 'none';
        if (adminSection.style.display === 'block') {
            displayAllComplaints();
        }
    });

    // Update student complaints when name input changes
    studentNameInput.addEventListener('input', displayStudentComplaints);
});