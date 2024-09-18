function retry(fetchData, retries = 3) {
    return new Promise((resolve, reject) => {
        let attempt = 0;

        function fn() {
            fetchData()
                .then((response) => {
                    if (!response.ok) throw new Error("error");
                    return response.json();
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    attempt++;
                    if (attempt < retries) {
                        fn();
                    }
                    reject("Error");
                });
        }
        fn();
    });
}

async function retryFetch(fetchData, retries = 3) {
    let attempt = 0;
    for (attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetchData();
            if (!response.ok) throw new Error("error");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}
