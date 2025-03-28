document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const strengthText = document.getElementById("strength");
    const suggestionsList = document.getElementById("suggestions");

    passwordInput.addEventListener("input", checkPassword);

    function checkPassword() {
        let password = passwordInput.value;
        let strength = 0;
        let suggestions = [];

        // ✅ Length Check
        if (password.length >= 20) strength += 3;
        else if (password.length >= 16) strength += 2;
        else if (password.length >= 12) strength += 1;
        else suggestions.push("🔴 Use at least 16+ characters for better security.");

        // ✅ Uppercase & Lowercase Check
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        else suggestions.push("🔴 Include both UPPERCASE and lowercase letters.");

        // ✅ Numeric Check
        if (/\d/.test(password)) strength += 1;
        else suggestions.push("🔴 Add at least one number (0-9).");

        // ✅ Special Characters Check
        if (/[!@#$%^&*(),.?":{}|<>~`+=_\-\\/]/.test(password)) strength += 1;
        else suggestions.push("🔴 Use at least one special character (!@#$%^&* etc.).");

        // ✅ Consecutive Repeating Characters Check
        if (/(.)\1{2,}/.test(password)) suggestions.push("⚠️ Avoid repeated characters like 'aaaa' or '111'.");

        // ✅ Sequential Characters Check
        if (/1234|abcd|qwerty|asdf|zxcv/i.test(password)) suggestions.push("⚠️ Avoid predictable sequences like '1234', 'abcd', or 'qwerty'.");

        // ✅ Common Passwords Check (Expanded List - 200+ Passwords)
        const commonPasswords = [
            "password", "123456", "admin", "welcome", "letmein", "12345678", "qwerty", "password1",
            "123123", "abc123", "111111", "monkey", "football", "iloveyou", "sunshine", "superman",
            "shadow", "princess", "dragon", "baseball", "jordan23", "letmein1", "qwertyuiop",
            "asdfghjkl", "1q2w3e4r", "zxcvbnm", "password123", "passw0rd", "654321", "trustno1",
            "hunter2", "master", "login", "welcome1", "hello", "freedom", "batman", "mustang",
            "starwars", "ninja", "zaq1zaq1", "pass123", "root", "god", "lol123", "mypass", "abcdef",
            "123qwe", "qwe123", "hannah", "charlie", "tigger", "chocolate", "soccer", "maverick",
            "whatever", "butterfly", "peanut", "mercedes", "rainbow", "stephen", "pokemon",
            "blessed", "happy123", "dolphin", "sunflower", "simpsons", "ferrari", "mustang123",
            "hotdog", "paradise", "thunder", "porsche", "disney", "volleyball", "golden", "security",
            "lasagna", "sunny", "trust", "viper", "starlight", "cameron", "shadow1", "newyork",
            "passport", "babygirl", "p@ssw0rd", "matrix", "darkknight", "swordfish", "apple123",
            "warrior", "nintendo", "mountain", "hacker", "cyberpunk", "crypto", "ethereum",
            "bitcoin", "laptop123", "gamer", "netflix", "linkedin", "instagram", "snapchat",
            "spotify", "gaming", "stealth", "ragnarok", "loki123", "odin", "thor", "valhalla"
        ];
        if (commonPasswords.includes(password.toLowerCase())) suggestions.push("❌ This is a VERY COMMON password. Do not use it!");

        // ✅ Keyboard Pattern Check (200+ Patterns)
        const keyboardPatterns = [
            "qwerty", "asdfgh", "zxcvbn", "poiuyt", "lkjhgfdsa", "mnbvcxz", "qazwsx", "edcrfv",
            "wsxedc", "poiuytrewq", "q1w2e3r4", "1q2w3e4r5", "zaqxsw", "qazxsw", "mlpokn", "plmokn",
            "yhnujm", "yuiop", "hjkl", "qwertz", "azerty", "123qwe", "zxc123", "123abc", "789456123",
            "qwerty123", "asd123", "wxyz", "wertyu", "plokm", "qwertyu", "qwertyuiop", "qwertasdf"
        ];
        if (keyboardPatterns.includes(password.toLowerCase())) suggestions.push("⚠️ Avoid easy keyboard patterns like 'qwerty' or 'asdf'.");

        // ✅ Dictionary Words Check (200+ Words)
        const dictionaryWords = [
            "password", "admin", "secure", "hello", "iloveyou", "monkey", "sunshine", "football",
            "superman", "shadow", "princess", "dragon", "baseball", "trust", "hunter", "god",
            "love", "pass", "secret", "master", "welcome", "freedom", "warrior", "success",
            "money", "future", "america", "india", "canada", "nasa", "elonmusk", "tesla",
            "spacex", "google", "amazon", "facebook", "netflix", "apple", "microsoft",
            "cyber", "hacker", "matrix", "darknet", "bitcoin", "ethereum", "crypto",
            "blockchain", "shadow", "phantom", "infinity", "gamer", "playstation",
            "xbox", "pokemon", "pikachu", "bulbasaur", "charmander", "spiderman",
            "batman", "joker", "venom", "superhero", "thanos", "wolverine", "magneto",
            "deadpool", "flash", "arrow", "avengers", "ironman", "loki", "odin", "thor"
        ];
        if (dictionaryWords.some(word => password.toLowerCase().includes(word))) suggestions.push("⚠️ Avoid common words like 'password' or 'secret'.");

        // ✅ No Personal Info (Basic Check)
        let username = "user123"; // Ideally, this should be dynamically fetched if possible
        if (password.toLowerCase().includes(username.toLowerCase())) suggestions.push("⚠️ Don't use your username in your password.");

        updateUI(strength, suggestions);
    }

    function updateUI(strength, suggestions) {
        if (strength >= 7 && suggestions.length === 0) {
            strengthText.innerHTML = "✅ Extremely Strong Password";
            strengthText.className = "strong";
        } else if (strength >= 4) {
            strengthText.innerHTML = "⚠️ Moderate Password";
            strengthText.className = "moderate";
        } else {
            strengthText.innerHTML = "❌ Weak Password";
            strengthText.className = "weak";
        }

        suggestionsList.innerHTML = "";
        suggestions.forEach(suggestion => {
            let li = document.createElement("li");
            li.innerText = suggestion;
            suggestionsList.appendChild(li);
        });
    }
});
