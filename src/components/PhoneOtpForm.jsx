import { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
//   const [inputOtp, setInputOtp] = useState("");



//   const generatedOtp = Math.floor(100000 + Math.random() * 900000);
//   generatedOtp.toString(); // Convert the number to a string

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    // phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number. Please enter 10 digits number");
      return;
    }

    // call BE

    // show otp field
    setShowOtpField(true);
    // setOtp(otp)
   
    alert(`the otp is ${newOtp}`);
    console.log(newOtp, "otp");
  };

  const onOtpSubmit = (otp) => {

    console.log("login cred", otp , generatedOtp);
    if (otp === generatedOtp) {
      alert("login successfull");
    }else{
        alert("please enter correct otp")
    }
  };
  return (
    <div>
      {!showOtpField ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone number"
            className="phone-number"
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
