import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function Login() {
              const [email, setEmail] = useState("");
              const [password, setPassword] = useState("");
              const { login } = useAuth();
              const navigate = useNavigate();
              const handleSubmit = () => {
                            if (!email || !password) {
                                          alert("Please fill all the fields");
                                          return;
                            }
                            const role = login(email, password);
                            if (!role) {
                                          alert("Invaild Credentials");
                                          return;
                            }
                            role === "admin"
                                          ? navigate("/admin/dashboard")
                                          : navigate("/customers/dashboard")

              }
              return (
                            <div>
                                          <h2>Login</h2>
                                          <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                                          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                          <button onClick={handleSubmit}>Login</button>
                            </div>
              )

}