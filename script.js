let userForm = document.getElementById("registrationForm");

// Function to retrieve entries from localStorage
const retrieveEntries = () => {
    const entries = localStorage.getItem("userEntries");
    return entries ? JSON.parse(entries) : [];
};

// Function to display entries in the table
const displayEntries = () => {
    const entries = retrieveEntries();
    const rows = entries
        .map((entry) => {
            return `
                <tr>
                    <td>${entry.name}</td>
                    <td>${entry.email}</td>
                    <td>${entry.password}</td>
                    <td>${entry.dob}</td>
                    <td>${entry.acceptedTerms ? "Yes" : "No"}</td>
                </tr>
            `;
        })
        .join("");

    let details = document.getElementById("user-entries");
    details.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>Terms of Conditions</th>
        </tr>
        ${rows}
    `;
};

// Array to hold user entries
let userEntries = retrieveEntries();

const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();

    // Adjust age if the birthday hasn't occurred this year yet
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    return age;
};

// Function to handle form submission
const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTerms,
    };

    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries();
};

// Event listener for form submission
userForm.addEventListener("submit", saveUserForm);

// Display entries on page load
displayEntries();
