import { useState } from 'react';

const Question1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({ name: '', email: '', password: '' });
        setErrors({});
        setIsSubmitted(false);
      }, 2000);
    }
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .form-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .form-card {
          background: white;
          width: 100%;
          max-width: 440px;
          border-radius: 24px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
          padding: 50px 40px;
          overflow: hidden;
        }

        .form-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .form-header h1 {
          font-size: 32px;
          color: #1e2937;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .form-header p {
          color: #64748b;
          font-size: 17px;
        }

        .user-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #374151;
          font-size: 15px;
        }

        .form-group input {
          padding: 16px 18px;
          border: 2px solid #e5e7eb;
          border-radius: 14px;
          font-size: 16.5px;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-group input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        .form-group input.error-input {
          border-color: #ef4444;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }

        .error-text {
          color: #ef4444;
          font-size: 13.5px;
          font-weight: 500;
          margin-top: 4px;
        }

        .submit-btn {
          margin-top: 15px;
          padding: 18px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
        }

        .success-message {
          background: #d1fae5;
          color: #065f46;
          padding: 16px 20px;
          border-radius: 14px;
          text-align: center;
          font-weight: 600;
          margin-bottom: 25px;
          border: 1px solid #a7f3d0;
        }

        .form-footer {
          text-align: center;
          margin-top: 30px;
          color: #6b7280;
          font-size: 15px;
        }

        .form-footer a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
        }

        .form-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="form-container">
        <div className="form-card">
          <div className="form-header">
            <h1>Create Account</h1>
            <p>Please fill in your information</p>
          </div>

          {isSubmitted && (
            <div className="success-message">
              ✅ Account created successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error-input' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className={errors.password ? 'error-input' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <div className="form-footer">
            Already have an account? <a href="#">Sign in</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question1;