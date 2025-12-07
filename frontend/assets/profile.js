// Profile page functionality

document.addEventListener('DOMContentLoaded', async function () {
    if (!checkAuth()) return;

    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const categoriesList = document.getElementById('categories-list');
    const languageSelect = document.getElementById('language');
    const countrySelect = document.getElementById('country');
    const preferencesForm = document.getElementById('preferences-form');

    const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

    try {
        // Load user profile
        const user = await getUserProfile();
        profileName.textContent = user.name;
        profileEmail.textContent = user.email;

        // Set preferences
        const prefs = user.preferences || {};
        languageSelect.value = prefs.language || 'en';
        countrySelect.value = prefs.country || 'us';

        // Render categories
        categoriesList.innerHTML = categories.map(cat => {
            const isChecked = prefs.categories && prefs.categories.includes(cat);
            return `
                <label class="checkbox-label">
                    <input type="checkbox" value="${cat}" ${isChecked ? 'checked' : ''}>
                    ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
            `;
        }).join('');

        // Handle form submission
        preferencesForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const selectedCategories = Array.from(
                document.querySelectorAll('.checkbox-label input:checked')
            ).map(input => input.value);

            const updatedPreferences = {
                categories: selectedCategories || ['general'],
                language: languageSelect.value,
                country: countrySelect.value
            };

            try {
                await updatePreferences(updatedPreferences);
                showMessage('success-message', 'Preferences updated successfully!', 'success');
            } catch (error) {
                showMessage('error-message', error.message);
            }
        });

    } catch (error) {
        showMessage('error-message', error.message);
    }
});
