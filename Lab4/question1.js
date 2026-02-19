const usernameInput = document.getElementById("username");
const statusText = document.getElementById("status");
const loader = document.getElementById("loader");
const form = document.getElementById("registerForm");
const submitBtn = form.querySelector("button");

let isUsernameAvailable = false;

usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim().toLowerCase();

    if (username.length < 3) {
        statusText.textContent = "";
        submitBtn.disabled = true;
        return;
    }

    checkUsername(username);
});

/* -----------------------------
   AJAX using Fetch API
------------------------------ */
function checkUsername(username) {
    loader.style.display = "block";
    statusText.textContent = "";
    submitBtn.disabled = true;

    fetch("question1.json")          // AJAX request to local JSON file
        .then(response => response.json())
        .then(data => {
            loader.style.display = "none";

            if (data.users.includes(username)) {
                statusText.textContent = "Username already taken";
                statusText.className = "error";
                isUsernameAvailable = false;
            } else {
                statusText.textContent = "Username available";
                statusText.className = "success";
                isUsernameAvailable = true;
                submitBtn.disabled = false;
            }
        })
        .catch(() => {
            loader.style.display = "none";
            statusText.textContent = "Error checking username";
            statusText.className = "error";
        });
}

/* -----------------------------
   Prevent form submission
------------------------------ */
form.addEventListener("submit", event => {
    if (!isUsernameAvailable) {
        event.preventDefault();
        alert("Please choose an available username.");
    } else {
        alert("Registration successful!");
    }
});