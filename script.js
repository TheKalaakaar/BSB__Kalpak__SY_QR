document.addEventListener('DOMContentLoaded', function() {
    // 1. Get the assignment ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get('id'); // e.g., "assignment1"

    if (!assignmentId) {
        // No ID provided in URL, maybe show a default message or redirect
        document.getElementById('assignment-content').innerHTML = "<p>No assignment selected.</p>";
        return; // Stop execution
    }

    // 2. Fetch the JSON data
    fetch('assignments.json')
        .then(response => response.json())
        .then(assignments => {
            // 3. Find the assignment with the matching ID
            const assignment = assignments.find(assgn => assgn.id === assignmentId);

            if (!assignment) {
                // Assignment not found, display an error message
                document.getElementById('assignment-content').innerHTML = "<p>Assignment not found.</p>";
                return; // Stop execution
            }

            // 4. Populate the HTML template with the assignment data
            document.getElementById('assignment-title').textContent = assignment.title;
            document.getElementById('assignment-purpose').textContent = assignment.purpose;
            document.getElementById('assignment-media').textContent = assignment.media;
            document.getElementById('assignment-description').textContent = assignment.description;

            // 5. (Optional) Display images if you have them
            if (assignment.images && assignment.images.length > 0) {
                const imagesContainer = document.getElementById('assignment-images');
                imagesContainer.innerHTML = ''; // Clear any previous content
                assignment.images.forEach(imageName => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageName; // Assuming images are in the same folder
                    imgElement.alt = assignment.title + " - Image";
                    imagesContainer.appendChild(imgElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching assignments:', error);
            document.getElementById('assignment-content').innerHTML = "<p>Error loading assignment details.</p>";
        });
});