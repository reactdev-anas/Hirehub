import { Button } from "@/components/ui/button"
import { FaTimes } from "react-icons/fa";
import { toast } from "sonner"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'

const SignUp = ({ setShowSignUpModal }) => {
  const [signUp, setSignUp] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: "user", // default role
  })

  useEffect(() => {
    const getId = document.getElementById('sign-up')
    setSignUp(getId)
  }, [])

  if (!signUp) {
    return null;
  }

  const handleChange = (e) => {
    const updatedChanges = { ...formData, [e.target.name]: e.target.value }
    setFormData(updatedChanges)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // {* Login Logic *}
    if (isLogin) {
      const getAllUserCredentials = JSON.parse(localStorage.getItem('userData'))
      const isMatched = getAllUserCredentials.find((user) => user.email === formData.email && user.password === formData.password)
      if (isMatched) {
        toast.success("Successfully LogedIn ! ✔️")
        sessionStorage.setItem('loggedInDetail', JSON.stringify(isMatched))
        setShowSignUpModal(false)
      } else {
        toast.error('Invalid Credentials ! ❌')
      }
    } else {
      // { * Sign up Logic * }
      const getAllUserData = JSON.parse(localStorage.getItem('userData')) || []

      const isAlreadyExist = getAllUserData.some(
        (user) => user.email === formData.email
      );

      if (isAlreadyExist) {
        toast.error("Email already registered ❌");
        return;
      }
      toast.success('Successfully created Acoount ! ✔️')


      const updatedUserData = [...getAllUserData, formData]
      localStorage.setItem('userData', JSON.stringify(updatedUserData))
      setShowSignUpModal(false)
    }
  }
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-brightness-50">

      <Card className="w-full max-w-sm rounded">

        <CardHeader>
          <CardTitle  > {!isLogin ? "Sign Up to your account" : "Login to your account"}  </CardTitle>

          <CardDescription>
            {!isLogin ? "  Enter your name,email and password below to create  your account" : "Enter your email below to login to your account"}
          </CardDescription>
          <CardAction >
            <Button onClick={() => setIsLogin(!isLogin)} variant="link">{!isLogin ? 'Sign Up' : 'Login'}</Button>
          </CardAction>
        </CardHeader>

        <form onSubmit={handleSubmit} >

          <CardContent>

            <div className="flex flex-col gap-6">
              {!isLogin && <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name='name'
                  type="text"
                  placeholder="name"
                  required
                  onChange={handleChange}
                />
              </div>
              }
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name='email'
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder='password...' required name='password' onChange={handleChange} />
              </div>



              {/* ✅ Select Role Dropdown */}
              {!isLogin && (
                <div className="grid gap-2">
                  <Label htmlFor="role">Select Role</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                    required
                  >
                    <option value="user">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>
              )}




            </div>

          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full mt-4 cursor-pointer">
              {isLogin ? 'Login' : 'Sign up'}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </form>

      </Card>
    </div>,
    signUp
  )
}

export default SignUp