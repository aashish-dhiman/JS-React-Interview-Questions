const useCookies = () => {
    const setCookie = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
        return "Cookie Set Successfully!";
    };

    const getCookie = (name) => {
        const cookie = localStorage.getItem(name)
            ? JSON.parse(localStorage.getItem(name))
            : undefined;
        return cookie;
    };

    const deleteCookie = (name) => {
        let message;
        if (localStorage.getItem(name)) {
            localStorage.removeItem(name);
            message = "Cookie Deleted Successfully!";
        } else {
            message = "Cookie Not Found!";
        }
        return message;
    };

    return { setCookie, getCookie, deleteCookie };
};

export default useCookies;
