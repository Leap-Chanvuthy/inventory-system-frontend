import { Button, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../components/const/constant";
import axios from "axios";
import { DangerToast } from "../../components/ToastNotification";
import { Link } from "react-router-dom";

const Login = () => {
  const { error, status } = useSelector((state) => state.auth);
  const [failToastOpen, setFailToastOpen] = useState(false);

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const response = await axios.post(`${BASE_URL}/login`, values);
      console.log(response.data);
      dispatch(signInSuccess(response.data));
    } catch (error) {
      console.log(error.response);
      setFailToastOpen(true);
      dispatch(signInFailure(error?.response?.data?.errors));
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
          onSubmit={handleLogin}
          className="flex flex-col gap-4 max-w-md w-full p-6 my-10 mx-5 h-[30rem] rounded-lg bg-white"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              value={values.email.trim()}
              onChange={handleChange}
              className={`${
                error?.email ? "border-[1.5px] border-red-400 rounded-md" : ""
              } `}
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              value={values.password.trim()}
              onChange={handleChange}
              className={`${
                  error?.password ? "border-[1.5px] border-red-400 rounded-md" : ""
                } `}
              helperText={
                  error?.password && (
                    <>
                      <span className="font-medium text-red-400">{error.password}</span>
                    </>
                  )
                }
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" className="w-full">
            {status == "loading" ? <Spinner /> : "Login"}
          </Button>
          <Link to='/forgot-password'><p className="text-center underline">Forgot password ?</p></Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
