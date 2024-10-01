import React, { useState } from 'react';
import '../../Style/BodyCss/Login.css'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if(response.status == 400) {
        setErrorMessage(response.message)
      }
  
      const result = await response.json(); // Now this will expect valid JSON
      console.log(result); // Check the JSON response
  
      alert(result.message); // Display success message
      localStorage.setItem('token', result.token); 
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error response:', error.response);
        
        // Handle 400 Bad Request errors
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message || "Invalid request. Please check your input.");
        } 
        // Handle 401 Unauthorized errors
        else if (error.response.status === 401) {
          setErrorMessage(error.response.data.message || "Invalid username or password.");
        }
        // Handle other error status codes
        else {
          setErrorMessage(error.response.data.message || "An error occurred during login.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
        setErrorMessage("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage("An error occurred. Please try again.");
      }
    }

  };

  return (
    <div className="login-container">
      <div className="form-login-container">
        <div className="form-login-header">
          <h3>TTFILM</h3>
          <p>LET YOUR HAIR DOWN</p>
          <h2>LOGIN</h2>
        </div>
        <div className="form-seciton">
          <form className="form-seciton-container" onSubmit={handleSubmit}>
            <div className="form-seciton_input">
              <input
                className="formlogin-inputvalue"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-seciton_input mt-3">
              <input
                className="formlogin-inputvalue"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-seciton_btn mt-3">
              <button className="login-btn" type="submit">
                Đăng nhập
              </button>
            </div>
            <div className="form-section_register mt-3">
                <span>
                    Bạn chưa có tài khoản?  
                </span>
                <Link to={'/register'} className='register-btn' >
                    Đăng ký
                </Link>
            </div>
            {errorMessage && (
              <div className="alert alert-danger alert-message mt-3">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;