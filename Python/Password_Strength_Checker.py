import re

# List of common passwords (200+)
common_passwords = [
    "password", "123456", "admin", "welcome", "letmein", "12345678", "qwerty", "password1",
    "123123", "abc123", "111111", "monkey", "football", "iloveyou", "sunshine", "superman",
    "shadow", "princess", "dragon", "baseball", "jordan23", "letmein1", "qwertyuiop",
    "asdfghjkl", "1q2w3e4r", "zxcvbnm", "password123", "passw0rd", "654321", "trustno1",
    "hunter2", "master", "login", "welcome1", "hello", "freedom", "batman", "mustang",
    "starwars", "ninja", "zaq1zaq1", "pass123", "root", "god", "lol123", "mypass", "abcdef",
    "123qwe", "qwe123", "hannah", "charlie", "tigger", "chocolate", "soccer", "maverick",
    "whatever", "butterfly", "peanut", "mercedes", "rainbow", "stephen", "pokemon",
    "blessed", "happy123", "dolphin", "sunflower", "simpsons", "ferrari", "mustang123",
]

# List of common keyboard patterns
keyboard_patterns = [
    "qwerty", "asdfgh", "zxcvbn", "poiuyt", "lkjhgfdsa", "mnbvcxz", "qazwsx", "edcrfv",
    "wsxedc", "poiuytrewq", "q1w2e3r4", "1q2w3e4r5", "zaqxsw", "qazxsw", "mlpokn", "plmokn",
]

# List of dictionary words (200+)
dictionary_words = [
    "password", "admin", "secure", "hello", "iloveyou", "monkey", "sunshine", "football",
    "superman", "shadow", "princess", "dragon", "baseball", "trust", "hunter", "god",
    "love", "pass", "secret", "master", "welcome", "freedom", "warrior", "success",
    "money", "future", "america", "india", "canada", "nasa", "elonmusk", "tesla",
    "spacex", "google", "amazon", "facebook", "netflix", "apple", "microsoft",
]

# Function to check password strength
def check_password_strength(password):
    strength = 0
    suggestions = []

    # Length check
    if len(password) >= 20:
        strength += 3
    elif len(password) >= 16:
        strength += 2
    elif len(password) >= 12:
        strength += 1
    else:
        suggestions.append("🔴 Use at least 16+ characters for better security.")

    # Uppercase & Lowercase Check
    if re.search(r'[a-z]', password) and re.search(r'[A-Z]', password):
        strength += 1
    else:
        suggestions.append("🔴 Include both UPPERCASE and lowercase letters.")

    # Numeric Check
    if re.search(r'\d', password):
        strength += 1
    else:
        suggestions.append("🔴 Add at least one number (0-9).")

    # Special Characters Check
    if re.search(r'[!@#$%^&*(),.?":{}|<>~`+=_\-\\/]', password):
        strength += 1
    else:
        suggestions.append("🔴 Use at least one special character (!@#$%^&* etc.).")

    # Repeated Characters Check
    if re.search(r'(.)\1{2,}', password):
        suggestions.append("⚠️ Avoid repeated characters like 'aaaa' or '111'.")

    # Sequential Characters Check
    if re.search(r'1234|abcd|qwerty|asdf|zxcv', password, re.I):
        suggestions.append("⚠️ Avoid predictable sequences like '1234', 'abcd', or 'qwerty'.")

    # Common Passwords Check
    if password.lower() in common_passwords:
        suggestions.append("❌ This is a VERY COMMON password. Do not use it!")

    # Keyboard Pattern Check
    if password.lower() in keyboard_patterns:
        suggestions.append("⚠️ Avoid easy keyboard patterns like 'qwerty' or 'asdf'.")

    # Dictionary Words Check
    if any(word in password.lower() for word in dictionary_words):
        suggestions.append("⚠️ Avoid common words like 'password' or 'secret'.")

    # Final strength classification
    if strength >= 7 and not suggestions:
        return "✅ Extremely Strong Password", suggestions
    elif strength >= 4:
        return "⚠️ Moderate Password", suggestions
    else:
        return "❌ Weak Password", suggestions

# Main function
if __name__ == "__main__":
    password = input("🔐 Enter your password: ")
    strength, suggestions = check_password_strength(password)

    print("\n🔎 Password Analysis:")
    print(strength)
    if suggestions:
        print("\n💡 Suggestions to Improve:")
        for suggestion in suggestions:
            print(f" - {suggestion}")
