# Implementation of the Login System with Test Cases

# Dictionary to store user information (username: password)
user_data = {}


def create_user(username, password):
    """Create a new user."""
    user_data[username] = password


def login(username, password):
    """Attempt to log in a user and return True if successful, False otherwise."""
    if username in user_data and user_data[username] == password:
        return True
    else:
        return False


# Test Case 1: Successful Login
create_user("user123", "pass456")
result1 = login("user123", "pass456")
assert result1 == True, f"Test Case 1 failed: Expected True, Got {result1}"
print("Test Case 1 passed: Successful Login")

# Test Case 2: Unsuccessful Login (Wrong Password)
result2 = login("user123", "wrongpass")
assert result2 == False, f"Test Case 2 failed: Expected False, Got {result2}"
print("Test Case 2 passed: Unsuccessful Login (Wrong Password)")

# Test Case 3: Unsuccessful Login (Nonexistent User)
result3 = login("nonexistent", "anypassword")
assert result3 == False, f"Test Case 3 failed: Expected False, Got {result3}"
print("Test Case 3 passed: Unsuccessful Login (Nonexistent User)")

# Test Case 4: Successful Login after Creating a New User
create_user("newuser", "newpass")
result4 = login("newuser", "newpass")
assert result4 == True, f"Test Case 4 failed: Expected True, Got {result4}"
print("Test Case 4 passed: Successful Login after Creating a New User")

# Test Case 5: Unsuccessful Login (Empty Password)
create_user("emptyuser", "")  # User with an empty password
result5 = login("emptyuser", "")
assert result5 == False, f"Test Case 5 failed: Expected False, Got {result5}"
print("Test Case 5 passed: Unsuccessful Login (Empty Password)")

# Additional Test Cases can be added as needed
