document.addEventListener('DOMContentLoaded', () => {
    // Star button functionality
    const starButtons = document.querySelectorAll('.star-button');
    starButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const linkId = button.getAttribute('data-id');
            const starIcon = button.querySelector('.star-icon');
            starIcon.classList.toggle('text-yellow-400');
 
            // Optional AJAX call to update star status
            try {
                const response = await fetch(`/links/${linkId}/star`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ starred: starIcon.classList.contains('text-yellow-400') }),
                });
 
                if (!response.ok) {
                    throw new Error('Failed to update star status');
                }
 
                console.log(`Toggled star for link ${linkId}`);
            } catch (error) {
                console.error(error);
                starIcon.classList.toggle('text-yellow-400'); // Revert change on error
            }
        });
    });
 
    // Newsletter subscription feedback
    const newsletterForm = document.querySelector('form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.querySelector('input[type="email"]');
        const successMessage = document.getElementById('newsletter-success');
        if (emailInput.value) {
            successMessage.classList.remove('hidden'); // Show success message
            setTimeout(() => {
                successMessage.classList.add('hidden'); // Hide after 3 seconds
            }, 3000);
            emailInput.value = ''; // Clear the email input
        }
    });
 
    // Tag visibility for mobile
    const tagContainer = document.getElementById('tag-container');
    const tags = tagContainer.querySelectorAll('.tag-item');
 
    function updateTagVisibility() {
        const isMobile = window.innerWidth < 768;
        tags.forEach((tag, index) => {
            if (isMobile && index >= 10) {
                tag.classList.add('hidden');
            } else {
                tag.classList.remove('hidden');
            }
        });
    }
 
    // Initial visibility setup
    updateTagVisibility();
 
    // Update on window resize
    window.addEventListener('resize', updateTagVisibility);
});

