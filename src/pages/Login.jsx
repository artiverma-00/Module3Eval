import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
                                          : navigate("/customer/dashboard")
              }
              return (
                            <div className="login-container">
                              <div className="login-card">
                                <h2>Welcome to Login</h2>
                                <div className="form-group">
                                  <label>Email Address</label>
                                  <input 
                                    type="email"
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Password</label>
                                  <input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                  />
                                </div>
                                <button className="login-button" onClick={handleSubmit}>
                                  Login
                                </button>
                                <div className="demo-credentials">
                                  <p><strong>Demo Credentials:</strong></p>
                                  <p> Admin: admin@gmail.com</p>
                                  <p> Password: admin1234</p>
                                  <hr />
                                  <p> Customer: customer@gmail.com</p>
                                  <p> Password: customer1234</p>
                                </div>
                              </div>
                            </div>
                            )

              }
