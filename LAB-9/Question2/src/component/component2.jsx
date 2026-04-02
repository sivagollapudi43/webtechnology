import { useState } from 'react';

const Component2 = () => {
  // Student data (passed as props to reusable card)
  const students = [
    {
      name: "Siva Kumar",
      department: "Computer Science and Engineering",
      marks: 92,
      rollNo: "CSE22045"
    },
    {
      name: "Priya Sharma",
      department: "Electronics and Communication",
      marks: 85,
      rollNo: "ECE22112"
    },
    {
      name: "Rahul Verma",
      department: "Mechanical Engineering",
      marks: 78,
      rollNo: "MECH22345"
    },
    {
      name: "Ananya Reddy",
      department: "Information Technology",
      marks: 95,
      rollNo: "IT22078"
    }
  ];

  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    return "D";
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', system-ui, sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
          min-height: 100vh;
          padding: 40px 20px;
        }

        .app-container {
          max-width: 1300px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .header h1 {
          font-size: 42px;
          color: #1e2937;
          margin-bottom: 12px;
        }

        .header p {
          font-size: 19px;
          color: #64748b;
        }

        .students-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 30px;
          justify-items: center;
        }

        /* Student Card Styles */
        .student-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          width: 100%;
          max-width: 340px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .student-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .avatar {
          width: 85px;
          height: 85px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-size: 36px;
        }

        .student-name {
          font-size: 22px;
          font-weight: 700;
          color: #1e2937;
          margin-bottom: 5px;
        }

        .department {
          color: #64748b;
          font-size: 15px;
          font-weight: 500;
        }

        .info-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          font-size: 15px;
        }

        .info-label {
          color: #64748b;
          font-weight: 600;
        }

        .info-value {
          font-weight: 600;
          color: #1e2937;
        }

        .marks-container {
          background: #f0f9ff;
          padding: 18px;
          border-radius: 14px;
          text-align: center;
          margin-top: 15px;
        }

        .marks {
          font-size: 32px;
          font-weight: 700;
          color: #6366f1;
        }

        .grade {
          font-size: 15px;
          color: #10b981;
          font-weight: 600;
          margin-top: 5px;
        }
      `}</style>

      <div className="app-container">
        <div className="header">
          <h1>Student Directory</h1>
          <p>Reusable Student Card Component using Props</p>
        </div>

        <div className="students-grid">
          {students.map((student, index) => (
            <div key={index} className="student-card">
              <div className="card-header">
                <div className="avatar">👨‍🎓</div>
                <h3 className="student-name">{student.name}</h3>
                <p className="department">{student.department}</p>
              </div>

              <div className="info-section">
                <div className="info-row">
                  <span className="info-label">Roll No</span>
                  <span className="info-value">{student.rollNo}</span>
                </div>

                <div className="marks-container">
                  <div className="marks">{student.marks}</div>
                  <div className="grade">Grade: {getGrade(student.marks)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Component2;