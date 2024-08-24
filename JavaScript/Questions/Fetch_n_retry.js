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
