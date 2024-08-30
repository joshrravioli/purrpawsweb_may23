document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu');

    // Firebase configuration and initialization (if not already initialized)
    var firebaseConfig = {
        apiKey: "AIzaSyBXZKN1yGyL8oi1wf4iYG_lsWKhZDjtJ3c",
        authDomain: "purrpauseweb.firebaseapp.com",
        databaseURL: "https://purrpauseweb-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "purrpauseweb",
        storageBucket: "purrpauseweb.appspot.com",
        messagingSenderId: "106624051457",
        appId: "1:106624051457:web:9358340ef0483441ca9300",
        measurementId: "G-Y1NQFJDERG"     
    };

    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Get a reference to the database
    var db = firebase.database();

    // Function to retrieve user type from the database
    function getUserType(userId) {
        return db.ref('users/' + userId).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val().userType;
            } else {
                console.log("No user data found.");
                return null;
            }
        }).catch((error) => {
            console.error("Error retrieving user type:", error);
            return null;
        });
    }

    // // Check if user is logged in
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // User is signed in, get their user type
    //         getUserType(user.uid).then((userType) => {
    //             if (userType) {
    //                 menuIcon.addEventListener('click', function() {
                        if (userType === "fur_parent") {
                            window.location.href = "menu2.html";
                        } else if (userType === "pet_sitter") {
                            window.location.href = "menu.html";
                        } else {
                            console.log("Unknown user type.");
                        }
                    });
//                 } else {
//                     // Handle case where user type is not found
//                     console.log("User type not found.");
//                 }
//             });
//         } else {
//             // No user is signed in, handle accordingly
//             console.log("No user is signed in.");
//             // Redirect to login page if necessary
//             window.location.href = "login.html";
//         }
//     });
// });




/* MAIN MENU */

// Function to handle clicking the "Be a Purr Sitter" button
document.getElementById("be_purr_sitter").addEventListener("click", function() {
    window.location.href = "be_purr_sitter.html"; // Navigate to the "Be a Purr Sitter" page
});

// Function to handle clicking the "Look for a Purr Sitter" button
document.getElementById("look_for_purr_sitter").addEventListener("click", function() {
    window.location.href = "look_for_purr_sitter.html"; // Navigate to the "Look for a Purr Sitter" page
});



/* LOOK FOR PURR SITTER */

// Function to submit form data to Firebase
function submitForm() {
    // Get form input values
    var fullName = document.getElementById("fullName").value;
    var age = document.getElementById("age").value;
    var sex = document.getElementById("sex").value;
    var address = document.getElementById("address").value;
    var petName = document.getElementById("petName").value;
    var species = document.getElementById("species").value;
    var breed = document.getElementById("breed").value;
    var petAge = document.getElementById("petAge").value;
    var petSize = document.getElementById("petSize").value;

    // Create a unique key for the new data entry
    var newEntryKey = db.ref().child('fur_parents').push().key;

    // Prepare the data object to be saved
    var data = {
        fullName: fullName,
        age: age,
        sex: sex,
        address: address,
        petName: petName,
        species: species,
        breed: breed,
        petAge: petAge,
        petSize: petSize
    };

    // Save the data to the database under the 'fur_parents' node with the unique key
    
    db.ref('fur_parents/' + newEntryKey).set(data)
        .then(() => {
            console.log("Form data submitted successfully!");
            alert("Form data submitted successfully!");
            // Redirect to the applicant list/home page
            window.location.href = "applicantlist.html";
        })
        .catch((error) => {
            console.error("Error submitting form data:", error);
            alert("Error submitting form data. Please try again later.");
        });
}

// // Function to clear the form fields after submission
// function clearForm() {
//     document.getElementById("fullName").value = "";
//     document.getElementById("age").value = "";
//     document.getElementById("sex").value = "";
//     document.getElementById("address").value = "";
//     document.getElementById("petName").value = "";
//     document.getElementById("species").value = "";
//     document.getElementById("breed").value = "";
//     document.getElementById("petAge").value = "";
//     document.getElementById("petSize").value = "";
//}



/* BE A PURR SITTER (PET SITTER) */

function nextBtn() {
    // Get form input values
    var fullName = document.getElementById("fullName").value;
    var age = document.getElementById("age").value;
    var sex = document.getElementById("sex").value;
    var address = document.getElementById("address").value;
    var rate = document.getElementById("rate").value;
    var preferredPet = document.getElementById("preferredPet").value;

    // Create a unique key for the new data entry
    var newEntryKey = db.ref().child('pet_sitters').push().key;

    // Prepare the data object to be saved
    var data = {
        fullName: fullName,
        age: age,
        sex: sex,
        address: address,
        rate: rate,
        preferredPet: preferredPet
    };

    // Save the data to the database under the 'pet_sitters' node with the unique key
    db.ref('pet_sitters/' + newEntryKey).set(data)
        .then(() => {
            console.log("Form data submitted successfully!");
            alert("Form data submitted successfully!");
            // Proceed to the questionnaires page after successful submission
            window.location.href = "questionnaires.html";
        })
        .catch((error) => {
            console.error("Error submitting form data:", error);
            alert("Error submitting form data. Please try again later.");
        });
}



// APPLICANT LIST
var firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyBXZKN1yGyL8oi1wf4iYG_lsWKhZDjtJ3c",
    authDomain: "purrpauseweb.firebaseapp.com",
    databaseURL: "https://purrpauseweb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "purrpauseweb",
    storageBucket: "purrpauseweb.appspot.com",
    messagingSenderId: "106624051457",
    appId: "1:106624051457:web:9358340ef0483441ca9300",
    measurementId: "G-Y1NQFJDERG"    
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

function fetchPetSitters() {
    db.ref('pet_sitters').on('value').then(function (snapshot) {
        const petSittersData = snapshot.val();

        if (petSittersData) {
            const petSitters = Object.values(petSittersData);
            renderApplicantsList(petSitters);

            const applicantList = document.getElementById('applicantList');
            applicantList.innerHTML = ''; // Clear previous content

            petSitters.forEach(petSitter => {
                const card = document.createElement('div');
                card.classList.add('applicant-card');

                // Create elements and populate with data
                card.innerHTML = `
                    <h2>${petSitter.fullName}</h2>
                    <p>Age: ${petSitter.age}</p>
                    <p>Address: ${petSitter.address}</p>
                    <p>Rate per Hour: ₱${petSitter.rate}</p>
                    <p>Sex: ${petSitter.sex}</p>
                    <p>Preferred Pet: ${petSitter.preferredPet}</p>
                    <button onclick="contactPetSitter('${petSitter.userId}')">Hire</button> 
                `;

                applicantList.appendChild(card);
            });
        } else {
            console.log("No pet sitters found.");
        }
    }).catch(function (error) {
        console.error("Error fetching pet sitters:", error);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    listenForPetSitterUpdates();
});

document.addEventListener('DOMContentLoaded', fetchPetSitters);

/* // Initialize Firebase
var firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyBXZKN1yGyL8oi1wf4iYG_lsWKhZDjtJ3c",
    authDomain: "purrpauseweb.firebaseapp.com",
    databaseURL: "https://purrpauseweb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "purrpauseweb",
    storageBucket: "purrpauseweb.appspot.com",
    messagingSenderId: "106624051457",
    appId: "1:106624051457:web:9358340ef0483441ca9300",
    measurementId: "G-Y1NQFJDERG"    
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// Function to fetch the list of pet sitters from Firebase and display them
function fetchPetSitters() {
    db.ref('pet_sitters').once('value', function(snapshot) {
        var petSitters = snapshot.val();
        renderApplicantsList(petSitters);
    }, function (error) {
        console.error("Error fetching pet sitters:", error);
    });
}

// Function to render the list of pet sitters
function renderApplicantsList(petSitters) {
    var applicantsList = document.getElementById('applicantList');
    applicantsList.innerHTML = ''; // Clear previous content

    // Loop through the pet sitters and create HTML elements for each
    for (var id in petSitters) {
        if (petSitters.hasOwnProperty(id)) {
            var petSitter = petSitters[id];
            var applicantCard = createApplicantCard(petSitter, id);
            applicantsList.appendChild(applicantCard);
        }
    }
}

// Function to create a pet sitter card element
function createApplicantCard(petSitter, id) {
    var applicantCard = document.createElement('div');
    applicantCard.classList.add('applicant-card');

    var nameElement = document.createElement('h2');
    nameElement.textContent = petSitter.fullName;

    var detailsElement = document.createElement('p');
    detailsElement.innerHTML = `<strong>Address:</strong> ${petSitter.address}<br>` +
                               `<strong>Age:</strong> ${petSitter.age}<br>` +
                               `<strong>Sex:</strong> ${petSitter.sex}<br>` +
                               `<strong>Rate per Hour:</strong> ₱${petSitter.rate}<br>` +
                               `<strong>Preferred Pet:</strong> ${petSitter.preferredPet}`;

    var hireButton = document.createElement('button');
    hireButton.textContent = 'Hire';
    hireButton.onclick = function() {
        contactPetSitter(id);
    };

    applicantCard.appendChild(nameElement);
    applicantCard.appendChild(detailsElement);
    applicantCard.appendChild(hireButton);

    return applicantCard;
}

// Function to handle contacting a pet sitter (placeholder)
function contactPetSitter(petSitterId) {
    alert("Contact functionality for pet sitter ID " + petSitterId + " is not implemented yet.");
}

// Call fetchPetSitters when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchPetSitters();
});
 */


/* LOGIN FUNCTION*/

function login() {
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("Login successful:", user);

            // Fetch user type and form completion status from Realtime Database
            db.ref('users/' + user.uid).once('value')
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        var userType = snapshot.val().userType;
                        var formCompleted = snapshot.val().formCompleted;

                        // Redirect based on user type and form completion status
                        if (userType === "fur_parent" && !formCompleted) {
                            window.location.href = "look_for_purr_sitter.html";
                        } else if (userType === "pet_sitter" && !formCompleted) {
                            window.location.href = "be_purr_sitter.html";
                        } else {
                            // User has completed required forms, proceed to appropriate profile page
                            if (userType === "fur_parent") {
                                window.location.href = "profile2.html";
                            } else if (userType === "pet_sitter") {
                                window.location.href = "profile.html";
                            }
                        }
                    } else {
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        })
        .catch((error) => {
            console.error("Error logging in:", error);
            alert("Login failed: " + error.message);
        });
}

function forgotPassword() {
    var email = document.getElementById("username").value;
    
    if (email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("Password reset email sent!");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error("Error sending password reset email:", errorCode, errorMessage);
                alert("Failed to send password reset email: " + errorMessage);
            });
    } else {
        alert("Please enter your email address.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("logout").addEventListener("click", function(event) {
        event.preventDefault();
        firebase.auth().signOut().then(() => {
            localStorage.clear(); // Clear any stored user info
            window.location.href = "login.html";
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    });
});



/* SIGN UP */
// In sign up html file.



/* ACCOUNT */

function goBack() {
    // Implement back functionality (optional)
    // Redirecting to the previous page or any other action
    window.history.back();
}

document.getElementById("termsCheckbox").addEventListener("change", function() {
    document.getElementById("loginButton").disabled = !this.checked;
});

function showTermsAndPolicies() {
    alert("Your terms and policies content here");
    // Replace the alert with your preferred way to display the terms and policies
}



/* MENU (PET SITTER) */
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("profile").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "profile.html"; // Replace with the actual profile page URL
    });

    document.getElementById("accountPage").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "main.html"; // Replace with the actual account page URL
    });

    document.getElementById("logout").addEventListener("click", function(event) {
        event.preventDefault();
        var confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            window.location.href = "login.html"; // Replace with the actual login page URL
            // You can perform additional logout actions here if needed
        }
    });
});



/* MENU 2 (FUR PARENT) */
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("home").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "applicant_list.html"; // Replace with the actual home page URL
    });

    document.getElementById("profile2").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "profile2.html"; // Replace with the actual profile page URL
    });

    document.getElementById("accountPage").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "main.html"; // Replace with the actual account page URL
    });

    document.getElementById("questionnaires").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "bio.html"; // Replace with the actual bio page URL
    });

    document.getElementById("logout").addEventListener("click", function(event) {
        event.preventDefault();
        var confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            window.location.href = "login.html"; // Replace with the actual login page URL
            // You can perform additional logout actions here if needed
        }
    });
});



/* QUESTIONNAIRES (PET SITTER) */
function goBack() {
    window.history.back();
}

document.getElementById("submitButton").addEventListener("click", function() {
    var answers = [];
    var inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach(function(input) {
        answers.push(input.value);
    });
    console.log(answers); // Replace with your logic to handle form submission
});



/* APPLICANTS LIST (FUR PARENT)*/
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBXZKN1yGyL8oi1wf4iYG_lsWKhZDjtJ3c",
    authDomain: "purrpauseweb.firebaseapp.com",
    databaseURL: "https://purrpauseweb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "purrpauseweb",
    storageBucket: "purrpauseweb.appspot.com",
    messagingSenderId: "106624051457",
    appId: "1:106624051457:web:9358340ef0483441ca9300",
    measurementId: "G-Y1NQFJDERG"     
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// Function to fetch the list of pet sitters from Firebase and display them
function fetchPetSitters() {
    db.ref('pet_sitters').on('value', function(snapshot) {
        var petSitters = snapshot.val();
        renderApplicantsList(petSitters);
    }, function (error) {
        console.error("Error fetching pet sitters:", error);
    });
}

// Function to render the list of pet sitters
function renderApplicantsList(petSitters) {
    var applicantsList = document.getElementById('applicantList');
    applicantsList.innerHTML = ''; // Clear previous content

    // Loop through the pet sitters and create HTML elements for each
    for (var id in petSitters) {
        if (petSitters.hasOwnProperty(id)) {
            var petSitter = petSitters[id];
            var applicantCard = createApplicantCard(petSitter, id);
            applicantsList.appendChild(applicantCard);
        }
    }
}

// Function to create a pet sitter card element
function createApplicantCard(petSitter, id) {
    var applicantCard = document.createElement('div');
    applicantCard.classList.add('applicant-card');

    var nameElement = document.createElement('h2');
    nameElement.textContent = petSitter.fullName;

    var detailsElement = document.createElement('p');
    detailsElement.innerHTML = `<strong>Address:</strong> ${petSitter.address}<br>` +
                               `<strong>Age:</strong> ${petSitter.age}<br>` +
                               `<strong>Sex:</strong> ${petSitter.sex}<br>` +
                               `<strong>Rate per Hour:</strong> ₱${petSitter.rate}<br>` +
                               `<strong>Preferred Pet:</strong> ${petSitter.preferredPet}`;

    var hireButton = document.createElement('button');
    hireButton.textContent = 'Hire';
    hireButton.onclick = function() {
        contactPetSitter(id);
    };

    applicantCard.appendChild(nameElement);
    applicantCard.appendChild(detailsElement);
    applicantCard.appendChild(hireButton);

    return applicantCard;
}

// Function to handle contacting a pet sitter (placeholder)
function contactPetSitter(petSitterId) {
    alert("Contact functionality for pet sitter ID " + petSitterId + " is not implemented yet.");
}

// Call fetchPetSitters when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchPetSitters();
});




/* LOGOUT FUNCTION */
document.addEventListener("DOMContentLoaded", function () {
    // Function to handle logout
    function logout() {
        // Perform logout actions here, such as clearing session data or redirecting to the login page
        // For example, if you're using localStorage for session data, you can clear it like this:
        localStorage.clear();

        // Redirect the user to the login page
        window.location.href = "login.html";
    }

    // Add event listener to the "Log out" link
    const logoutLink = document.getElementById("logout");
    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default link behavior
            logout(); // Call the logout function
        });
    }
});


/* PROFILE2 (FUR PARENT) */

