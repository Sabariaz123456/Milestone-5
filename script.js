document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Get input values from the form
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var education = document.getElementById('education').value;
    var expertise = document.getElementById('expertise').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var computerSkills = document.getElementById('computerSkills').value;
    var profilePicture = document.getElementById('profilePicture').files[0];
    // Convert image to Base64 if a profile picture is uploaded
    var profilePictureBase64 = '';
    if (profilePicture) {
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            profilePictureBase64 = reader_1.result; // This will hold the Base64 image data
            // Generate resume HTML with editable properties
            generateResumeHTML(profilePictureBase64);
        };
        reader_1.readAsDataURL(profilePicture); // Convert image to Base64
    }
    else {
        // If no image is uploaded, generate the resume without an image
        generateResumeHTML();
    }
    // Function to generate resume HTML with or without the profile picture
    function generateResumeHTML(profilePictureBase64) {
        if (profilePictureBase64 === void 0) { profilePictureBase64 = null; }
        var resumeHTML = "\n            <div class=\"resume-header\">\n                <h2 contenteditable=\"true\">".concat(name, "</h2>\n                <p contenteditable=\"true\">Email: ").concat(email, " | Phone: ").concat(phone, " | Address: ").concat(address, "</p>\n            </div>\n            <div class=\"resume-content\">\n                <h3>Profile Picture</h3>\n                ").concat(profilePictureBase64 ?
            "<img src=\"".concat(profilePictureBase64, "\" alt=\"Profile Picture\" style=\"max-width: 150px; border-radius: 50%;\">") :
            "<p>No profile picture uploaded.</p>", "\n\n                <h3>Education</h3>\n                <p contenteditable=\"true\">").concat(education, "</p>\n\n                <h3>Expertise</h3>\n                <p contenteditable=\"true\">").concat(expertise, "</p>\n\n                <h3>Experience</h3>\n                <p contenteditable=\"true\">").concat(experience, "</p>\n\n                <h3>Skills</h3>\n                <p contenteditable=\"true\">").concat(skills, "</p>\n\n                <h3>Computer Skills</h3>\n                <p contenteditable=\"true\">").concat(computerSkills, "</p>\n            </div>\n        ");
        // Output the resume to the page
        document.getElementById('resumeOutput').innerHTML = resumeHTML;
        // Add a "Download Resume" button
        var downloadButtonHTML = "<button id=\"downloadBtn\">Download Resume</button>";
        document.getElementById('resumeOutput').insertAdjacentHTML('beforeend', downloadButtonHTML);
        // Add event listener to the "Download Resume" button
        document.getElementById('downloadBtn').addEventListener('click', function () {
            // Create a Blob from the resume HTML content
            var resumeBlob = new Blob([resumeHTML], { type: 'text/html' });
            // Create a link to trigger the download
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(resumeBlob);
            downloadLink.download = 'resume.html'; // Filename for the downloaded file
            downloadLink.click(); // Trigger the download
        });
        // Generate a unique ID (using timestamp) for shareable link
        var uniqueId = 'resume_' + new Date().getTime(); // Unique ID using timestamp
        // Store the resume data in localStorage with the unique ID
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            education: education,
            expertise: expertise,
            experience: experience,
            skills: skills,
            computerSkills: computerSkills,
            profilePictureURL: profilePictureBase64 || null
        };
        localStorage.setItem(uniqueId, JSON.stringify(resumeData));
        // Generate a shareable link for the resume
        var shareableLink = "".concat(window.location.origin, "/viewResume.html?id=").concat(uniqueId);
        // Display the shareable link
        document.getElementById('shareableLink').innerHTML = "\n            Share your resume with this link: <a href=\"".concat(shareableLink, "\" target=\"_blank\">").concat(shareableLink, "</a>\n        ");
    }
});
