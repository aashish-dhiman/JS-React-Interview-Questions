/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const OtpLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtpForm, setShowOtpForm] = useState(false);
    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // phone validations
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Invalid Phone Number");
            return;
        }

        setShowOtpForm(true);
    };
    const onOtpSubmit = (otp) => {
        alert("Login Successful with otp:" + otp);
    };

    return (
        <div>
            {!showOtpForm ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                    <input
                        type="text"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                        autoFocus={true}
                    />
                    <button className="bg-gray-300 p-1 border" type="submit">SUBMIT</button>
                </form>
            ) : (
                <div>
                    <p>Enter OTP sent to {phoneNumber}</p>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>
            )}
        </div>
    );
};

export default OtpLogin;

function OtpInput({ length = 4, onOtpSubmit = () => {} }) {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);
    console.log('inputRefs: ', inputRefs);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // submit trigger-> use newOtp not the otp as it'll not be updated immediately
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

        // Move to next input if current field is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            // inputRefs.current[index + 1].focus();
            inputRefs.current[newOtp.indexOf("")].focus();
        }
    };

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // optional-> move to the first empty otp input
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div>
            {otp.map((value, index) => {
                return (
                    <input
                        key={index}
                        type="text"
                        ref={(input) => (inputRefs.current[index] = input)}
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-10 h-10 m-2 text-center text-lg border"
                    />
                );
            })}
        </div>
    );
}
