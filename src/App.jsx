import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Formik, useFormik } from "formik";

function App() {
  const formik = useFormik({
    initialValues: {
      otp: {
        digitOne: "",
        digitTwo: "",
        digitThree: "",
        digitFour: "",
        digitFive: "",
        digitSix: "",
      },
    },
  });

  const inputRef = useRef({});
  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  });

  useEffect(() => {
    inputRef.current[0].focus();
    inputRef.current[0].addEventListener("paste", pasteText);

    return () => inputRef.current[0].removeEventListener("paste", pasteText);
  }, []);

  const pasteText = (e) => {
    const clipboardText = e.clipboardData.getData("text");
    const fieldValues = {};
    Object.keys(otp).forEach((key, i) => {
      fieldValues[key] = clipboardText[i];
    });

    setOtp(fieldValues);
    inputRef.current[5].focus();
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (/[a-z]/gi.test(value)) return;

    setOtp((preV) => ({
      ...preV,
      [name]: value.slice(-1),
    }));

    // e.target.nextSibling.focus()
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackSpace = (e, index) => {
    if (e.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const renderInput = () => {
    return Object.keys(otp).map((key, index) => (
      <input
        type="text"
        className="w-16 h-12 rounded-md mr-3 text-center text-xl"
        value={otp[key]}
        key={index}
        name={key}
        ref={(element) => (inputRef.current[index] = element)}
        onChange={(e) => handleChange(e, index)}
        onKeyUp={(e) => handleBackSpace(e, index)}
      />
    ));
  };

  return (
    <form action="">
      <h3 className="text-3xl mb-8">Please fill in the OTP</h3>
      <Formik>
        <div>{renderInput()}</div>
      </Formik>
      <button className="mt-4 w-32 border border-solid">Submit</button>
    </form>
  );
}

export default App;
