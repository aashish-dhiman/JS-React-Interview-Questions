import { useState } from "react";
import useCookies from "./hooks/CookieHook";

const Cookie = () => {
    const { setCookie, getCookie, deleteCookie } = useCookies();
    const [message, setMessage] = useState("");

    return (
        <div className="flex flex-col gap-5 ">
            <button
                onClick={() => {
                    const res = setCookie("name", "John Doe");
                    setMessage(res);
                }}
            >
                Set Cookie
            </button>
            <button
                onClick={() => {
                    const res = getCookie("name");
                    setMessage(res);
                }}
            >
                Get Cookie
            </button>
            <button
                onClick={() => {
                    const res = deleteCookie("name");
                    setMessage(res);
                }}
            >
                Delete Cookie
            </button>
            {message && (
                <span className="ml-2 text-sm text-green-500">{message}</span>
            )}
        </div>
    );
};

export default Cookie;
