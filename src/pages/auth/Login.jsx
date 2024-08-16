import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Test from "../../components/Test";

const Login = () => {
  return (
    <div className="">
        <div className="flex items-center justify-center min-h-screen ">
          <form className="flex flex-col gap-4 max-w-md w-full p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </div>
        
    </div>
  );
};

export default Login;
