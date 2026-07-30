document.addEventListener('DOMContentLoaded', function () {

    // --- AFFILIATE LINK & GCLID LOGIC ---
    function setupAffiliateRedirect() {
        const params = new URLSearchParams(window.location.search);
        const gclid = params.get('gclid');
        const source = gclid ? 'ads_eu' : 'organic_eu';
        const gclidValue = gclid || 'N/A'; // Use 'N/A' if gclid is not present

        const baseUrl = 'https://epcmonster.com/?a=2397&c=7854';
        const finalUrl = `${baseUrl}&s1=${source}&s2=${gclidValue}`;
        
        // Find all affiliate links and update their href attribute
        const affiliateLinks = document.querySelectorAll('.affiliate-link');
        affiliateLinks.forEach(link => {
            link.href = finalUrl;
        });

        // Return the final URL so we can use it for the popup redirect
        return finalUrl;
    }

    const finalAffiliateUrl = setupAffiliateRedirect();

    // --- ACCORDION LOGIC ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            
            // Toggle active class on the clicked item
            const isActive = accordionItem.classList.contains('active');
            
            // Close all items before opening the new one
            accordionHeaders.forEach(h => h.parentElement.classList.remove('active'));

            // If it wasn't already active, open it
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // --- VERIFICATION POPUP LOGIC ---
    const popupOverlay = document.getElementById('verification-popup-overlay');
    const verifyButton = document.getElementById('verify-button');
    const popupContent = document.getElementById('popup-content');
    const popupVerifying = document.getElementById('popup-verifying');
    const progressBarInner = document.getElementById('progress-bar-inner');
    
    // Ensure the popup exists before adding listeners
    if (verifyButton) {
        verifyButton.addEventListener('click', () => {
            // 1. Switch to the "verifying" view
            popupContent.style.display = 'none';
            popupVerifying.style.display = 'block';

            // 2. Start the progress bar animation (by setting its width)
            // Use a short timeout to allow the element to be displayed first
            setTimeout(() => {
                progressBarInner.style.width = '100%';
            }, 100);

            // 3. Wait for the animation to finish
            setTimeout(() => {
                // 4. Change text to "Verified"
                const verifyingTitle = popupVerifying.querySelector('.popup-title');
                if (verifyingTitle) {
                    verifyingTitle.textContent = 'Verifiziert ✓';
                    // Check for French version
                    if (document.documentElement.lang === 'fr') {
                         verifyingTitle.textContent = 'Vérifié ✓';
                    }
                }
                
                 // 5. Wait a moment, then redirect
                setTimeout(() => {
                    window.location.href = finalAffiliateUrl;
                }, 750); // 0.75 second delay after verification

            }, 2500); // 2.5 seconds for progress bar
        });
    }
});

