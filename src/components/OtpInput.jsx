import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  console.log("otp", inputRefs);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // move to next input field if it is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    console.log(e.key, "keyy");
    if (e.key === "ArrowLeft" && index >0)  inputRefs.current[index - 1].focus()

    if (e.key === "ArrowRight" && index< length -1)  inputRefs.current[index + 1].focus()
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1,1)

    // optional
    if (index>0 && !otp[index -1] ){
        inputRefs.current[otp.indexOf("")].focus()
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            ref={(input) => {
              inputRefs.current[index] = input;
            }}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onClick={() => handleClick(index)}
            className="otp-input"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
