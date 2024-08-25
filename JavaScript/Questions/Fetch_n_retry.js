// Method 1 -> using try catch
async function fetchWithRetry(url, retries = 3, delay = 1000) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
        }

        return response;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying... (${retries - 1} attempts left)`);
            return fetchWithRetry(url, retries - 1, delay);
        } else {
            throw new Error(
                `Failed after ${retries} retries: ${error.message}`
            );
        }
    }
}

fetchWithRetry("https://jsonplaceholder1.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Final error:", error));

////////////////////////////////////////////////////////////////

// Method 2 -> using for loop with try catch
async function fetchDataWithRetries(apiCall, retries = 3) {
    let attempts = 0;
    let error;

    for (attempts = 0; attempts < retries; attempts++) {
        try {
            const response = await apiCall();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            error = err;
            console.log(`Attempt ${attempts + 1} failed: ${err.message}`);
        }
    }

    throw new Error(`Failed after ${retries} retries: ${error.message}`);
}

const apiCall = () => fetch("https://api.example.com/data");

fetchDataWithRetries(apiCall, 3)
    .then((data) => console.log("Data:", data))
    .catch((err) => console.error("Error:", err));

///////////////////////////////////////////////////////////////////////////

// Method 3 -> using promise
function fetchDataWithRetries(apiCall, retries = 3) {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        function attempt() {
            apiCall()
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => resolve(data))
                .catch((err) => {
                    attempts++;
                    console.log(`Attempt ${attempts} failed: ${err.message}`);
                    if (attempts < retries) {
                        attempt();
                    } else {
                        reject(
                            new Error(
                                `Failed after ${retries} retries: ${err.message}`
                            )
                        );
                    }
                });
        }

        attempt();
    });
}

const apiCall1 = () => fetch("https://api.example.com/data");

fetchDataWithRetries(apiCall1, 3)
    .then((data) => console.log("Data:", data))
    .catch((err) => console.error("Error:", err));
