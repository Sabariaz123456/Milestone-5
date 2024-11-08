document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const education = document.getElementById('education').value;
    const expertise = document.getElementById('expertise').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const computerSkills = document.getElementById('computerSkills').value;
    const profilePicture = document.getElementById('profilePicture').files[0];

    // Convert image to Base64 if a profile picture is uploaded
    let profilePictureBase64 = '';
    if (profilePicture) {
        const reader = new FileReader();
        reader.onloadend = function () {
            profilePictureBase64 = reader.result; // This will hold the Base64 image data

            // Generate resume HTML with editable properties
            generateResumeHTML(profilePictureBase64);
        };
        reader.readAsDataURL(profilePicture); // Convert image to Base64
    } else {
        // If no image is uploaded, generate the resume without an image
        generateResumeHTML();
    }

    // Function to generate resume HTML with or without the profile picture
    function generateResumeHTML(profilePictureBase64 = null) {
        let resumeHTML = `
            <div class="resume-header">
                <h2 contenteditable="true">${name}</h2>
                <p contenteditable="true">Email: ${email} | Phone: ${phone} | Address: ${address}</p>
            </div>
            <div class="resume-content">
                <h3>Profile Picture</h3>
                ${profilePictureBase64 ? 
                    `<img src="${profilePictureBase64}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;">` : 
                    `<p>No profile picture uploaded.</p>`
                }

                <h3>Education</h3>
                <p contenteditable="true">${education}</p>

                <h3>Expertise</h3>
                <p contenteditable="true">${expertise}</p>

                <h3>Experience</h3>
                <p contenteditable="true">${experience}</p>

                <h3>Skills</h3>
                <p contenteditable="true">${skills}</p>

                <h3>Computer Skills</h3>
                <p contenteditable="true">${computerSkills}</p>
            </div>
        `;

        // Output the resume to the page
        document.getElementById('resumeOutput').innerHTML = resumeHTML;

        // Add a "Download Resume" button
        const downloadButtonHTML = `<button id="downloadBtn">Download Resume</button>`;
        document.getElementById('resumeOutput').insertAdjacentHTML('beforeend', downloadButtonHTML);

        // Add event listener to the "Download Resume" button
        document.getElementById('downloadBtn').addEventListener('click', function() {
            // Create a Blob from the resume HTML content
            const resumeBlob = new Blob([resumeHTML], { type: 'text/html' });

            // Create a link to trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(resumeBlob);
            downloadLink.download = 'resume.html';  // Filename for the downloaded file
            downloadLink.click();  // Trigger the download
        });

        // Generate a unique ID (using timestamp) for shareable link
        const uniqueId = 'resume_' + new Date().getTime();  // Unique ID using timestamp

        // Store the resume data in localStorage with the unique ID
        const resumeData = {
            name,
            email,
            phone,
            address,
            education,
            expertise,
            experience,
            skills,
            computerSkills,
            profilePictureURL: profilePictureBase64 || null
        };

        localStorage.setItem(uniqueId, JSON.stringify(resumeData));

        // Generate a shareable link for the resume
        const shareableLink = `${window.location.origin}/viewResume.html?id=${uniqueId}`;

        // Display the shareable link
        document.getElementById('shareableLink').innerHTML = `
            Share your resume with this link: <a href="${shareableLink}" target="_blank">${shareableLink}</a>
        `;
    }
});
