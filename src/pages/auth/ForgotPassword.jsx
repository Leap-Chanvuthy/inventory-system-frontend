// import { useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../../components/const/constant';

// function ForgotPassword() {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${BASE_URL}/password/send-otp`, { email });
//             setMessage(response.data.message);
//             setError('');
//         } catch (err) {
//             setError(err.response.data.message || 'An error occurred.');
//             setMessage('');
//         }
//     };

//     return (
//         <div>
//             <h1>Forgot Password</h1>
//             {message && <p style={{ color: 'green' }}>{message}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Send OTP</button>
//             </form>
//         </div>
//     );
// }

// export default ForgotPassword;

import { Button, Label, TextInput, Spinner, Toast, Alert } from "flowbite-react";
import { useState } from "react";
import { BASE_URL } from "../../components/const/constant";
import axios from "axios";
import { DangerToast } from "../../components/ToastNotification";
import { FaTelegramPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [failToastOpen, setFailToastOpen] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await axios.post(
        `${BASE_URL}/password/send-otp`,
        values
      );
      console.log(response);
      setMessage(response.data.message);
      setError("");
      setStatus("succeeded");
      setValues({
        email : ""
      })

      if (response.status === 200) {
        setTimeout(() => {
          navigate('/reset-password');
        }, 4000);
      }
    } catch (err) {
      console.log(err.response);
      setError(err?.response?.data?.errors || "An unexpected error occurred.");
      setMessage("");
      setStatus("failed");
      setFailToastOpen(true);
    }
  };

  return (
    <div className="h-screen bg-gray-200">
      <div className="flex justify-center">
        <DangerToast
          open={failToastOpen}
          onClose={() => setFailToastOpen(false)}
          message="Something Went Wrong!"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md w-full p-6 my-10 mx-5 h-full rounded-lg bg-white"
        >
          <h1 className="text-xl font-bold mb-6 text-center">
            Reset Account Password
          </h1>
          {status == 'succeeded' ? 
            <Alert color="success">
                <span className="font-semibold">{message}</span>
            </Alert> : <></>
          }
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              value={values.email}
              onChange={handleChange}
              className={
                error ? "border-[1.5px] border-red-400 rounded-md" : ""
              }
              helperText={
                error?.email && (
                  <>
                    <span className="font-medium text-red-400">
                      {error.email}
                    </span>
                  </>
                )
              }
            />
          </div>
          <Button disabled={status == 'loading'} type="submit" className="w-full">
            {status === "loading" ? <Spinner /> : "Send OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
