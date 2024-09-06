// Q. Code a login feature, such that the credentials are stored in the local storage & they get expired after a certain period of time.
// Asked in Groww SDE Intern Frontend

import { useState, useEffect } from "react";

const LoginWithExpiry = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour expiration time in milliseconds

    // Save credentials with expiration
    const handleLogin = (e) => {
        e.preventDefault();

        const currentTime = new Date().getTime();
        const expiryTime = currentTime + EXPIRATION_TIME;

        // Simulate authentication success
        const userData = {
            username,
            password,
            expiry: expiryTime,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        alert("Login successful!");
    };

    useEffect(() => {
        // Check for expiration
        const checkExpiration = () => {
            const storedData = localStorage.getItem("user");

            if (storedData) {
                const { expiry } = JSON.parse(storedData);
                const currentTime = new Date().getTime();

                if (currentTime >= expiry) {
                    localStorage.removeItem("user"); // Clear the expired data
                    alert("Session expired, please log in again.");
                }
            }
        };
        checkExpiration();
    }, []);

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginWithExpiry;
