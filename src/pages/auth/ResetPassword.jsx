import { useState } from 'react';
import { Button, Label, TextInput, Spinner, Alert } from 'flowbite-react';
import axios from 'axios';
import { DangerToast } from '../../components/ToastNotification';
import { BASE_URL } from '../../components/const/constant';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [failToastOpen, setFailToastOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post(`${BASE_URL}/password/reset`, {
        otp,
        password,
        password_confirmation: passwordConfirmation,
      });
      console.log(response)
      setMessage(response.data.message);
      setError('');
      setStatus('succeeded');
      setOtp('');
      setPassword('');
      setPasswordConfirmation ('');

      if (response.status === 200) {
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      }

    } catch (err) {
        console.log(err.response);
      setError(err?.response?.data?.errors || "An unexpected error occurred.");
      setMessage('');
      setStatus('failed');
      setFailToastOpen(true);
    }
  };

  return (
    <div className="h-screen bg-gray-200">
      <div className="flex justify-center">
        <DangerToast
          open={failToastOpen}
          onClose={() => setFailToastOpen(false)}
          message={'Something Went Wrong'}
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md w-full p-6 my-10 mx-5 h-full rounded-lg bg-white"
        >
          <h1 className="text-xl font-bold mb-6 text-center">Reset Password</h1>

          {status == 'succeeded' ? 
            <Alert color="success">
                <span className="font-semibold">{message}</span>
            </Alert> : <></>
          }

          <div>
            <div className="mb-2 block">
              <Label htmlFor="otp" value="OTP" />
            </div>
            <TextInput
              id="otp"
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={error?.otp ? "border-[1.5px] border-red-400 rounded-md" : ""}
              helperText={error?.otp && <span className="font-medium text-red-400">{error.otp}</span>}
            />
          </div>

          {/* Password input */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="New Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error?.password ? "border-[1.5px] border-red-400 rounded-md" : ""}
              helperText={error?.password && <span className="font-medium text-red-400">{error.password}</span>}
            />
          </div>

          {/* Password confirmation input */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="passwordConfirmation" value="Confirm Password" />
            </div>
            <TextInput
              id="passwordConfirmation"
              type="password"
              placeholder="Confirm your new password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className={error?.passwordConfirmation ? "border-[1.5px] border-red-400 rounded-md" : ""}
              helperText={error?.passwordConfirmation && <span className="font-medium text-red-400">{error.passwordConfirmation}</span>}
            />
          </div>

          {/* Submit button */}
          <Button disabled={status == 'loading'} type="submit" className="w-full">
            {status === "loading" ? <Spinner /> : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
