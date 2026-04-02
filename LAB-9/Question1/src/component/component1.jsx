import { useState } from 'react';

const Component1 = () => {
  const student = {
    name: "Sai siva mani",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    section: "A",
    rollNo: "CSE22045",
    email: "siva.kumar@example.com",
  };

  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .profile-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .profile-card {
          background: white;
          width: 100%;
          max-width: 460px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.35);
        }

        /* Header */
        .profile-header {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 60px 30px 45px;
          text-align: center;
          position: relative;
        }

        .avatar-container {
          width: 130px;
          height: 130px;
          margin: 0 auto 20px;
          background: white;
          border-radius: 50%;
          padding: 10px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
        }

        .avatar {
          width: 100%;
          height: 100%;
          background: #f3e8ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 58px;
          box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .profile-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .profile-header p {
          font-size: 17px;
          opacity: 0.95;
          font-weight: 500;
        }

        /* Body */
        .profile-body {
          padding: 35px 30px 40px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #64748b;
          font-weight: 600;
          font-size: 15.5px;
        }

        .info-value {
          color: #1e2937;
          font-weight: 600;
          font-size: 16.5px;
        }

        .academic-badge {
          background: #f8fafc;
          text-align: center;
          padding: 16px;
          border-radius: 14px;
          margin: 30px 0;
          color: #475569;
          font-weight: 600;
          font-size: 15.5px;
        }

        .contact-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 16.5px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.3s ease;
        }

        .contact-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 25px rgba(99, 102, 241, 0.35);
        }

        .contact-info {
          margin-top: 18px;
          padding: 18px;
          background: #f8fafc;
          border-radius: 14px;
          font-size: 15px;
          line-height: 1.7;
          color: #334155;
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-card">
          {/* Header Section */}
          <div className="profile-header">
            <div className="avatar-container">
              <div className="avatar">🎓</div>
            </div>
            <h1>{student.name}</h1>
            <p>Student Profile</p>
          </div>

          {/* Details Section */}
          <div className="profile-body">
            <div className="info-item">
              <span className="info-label">Department</span>
              <span className="info-value">{student.department}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Year</span>
              <span className="info-value">{student.year}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Section</span>
              <span className="info-value">{student.section}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Roll Number</span>
              <span className="info-value">{student.rollNo}</span>
            </div>

            <div className="academic-badge">
              Academic Year 2025-26
            </div>

            {/* Contact Button */}
            <button 
              className="contact-btn"
              onClick={() => setShowContact(!showContact)}
            >
              {showContact ? "Hide Contact Information" : "Show Contact Information"}
            </button>

            {showContact && (
              <div className="contact-info">
                📧 <strong>Email:</strong> {student.email}<br />
                📱 <strong>Phone:</strong> +91 98765 43210
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Component1;