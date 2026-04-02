import { useState, useEffect } from 'react';

const Question3 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getFakeDepartment = (id) => {
    const departments = [
      "Computer Science and Engineering",
      "Electronics and Communication",
      "Mechanical Engineering",
      "Information Technology",
      "Civil Engineering",
      "Electrical Engineering"
    ];
    return departments[(id - 1) % departments.length];
  };

  const getFakeMarks = (id) => 65 + ((id * 7) % 30);

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

        html, body, #root {
          height: 100%;
          width: 100%;
        }

        .app-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
          font-family: 'Segoe UI', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          padding: 40px 30px;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
          flex-shrink: 0;
        }

        .header h1 {
          font-size: 52px;
          font-weight: 800;
          color: #1e2937;
          margin-bottom: 12px;
        }

        .header p {
          font-size: 21px;
          color: #64748b;
        }

        .students-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 35px;
          flex: 1;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
        }

        .student-card {
          background: white;
          border-radius: 28px;
          padding: 35px 30px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          border: 1px solid #e2e8f0;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .student-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 35px 70px rgba(0, 0, 0, 0.18);
        }

        .card-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .avatar {
          width: 110px;
          height: 110px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 48px;
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.4);
        }

        .student-name {
          font-size: 26px;
          font-weight: 700;
          color: #1e2937;
          margin-bottom: 8px;
        }

        .department {
          color: #64748b;
          font-size: 17px;
          font-weight: 500;
        }

        .info-section {
          margin-top: auto;
          padding-top: 25px;
          border-top: 1px solid #f1f5f9;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          font-size: 17px;
        }

        .info-label {
          color: #64748b;
          font-weight: 600;
        }

        .info-value {
          font-weight: 700;
          color: #1e2937;
        }

        .marks-container {
          background: linear-gradient(135deg, #f0f9ff, #dbeafe);
          padding: 28px 20px;
          border-radius: 20px;
          text-align: center;
          margin-top: 25px;
        }

        .marks {
          font-size: 48px;
          font-weight: 800;
          color: #4f46e5;
        }

        .grade {
          font-size: 18px;
          color: #10b981;
          font-weight: 700;
          margin-top: 8px;
        }

        .loading, .error {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: #64748b;
          text-align: center;
        }

        .error {
          color: #ef4444;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid #e2e8f0;
          border-top: 6px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="app-container">
        <div className="header">
          <h1>Student Directory</h1>
          <p>Exercise 3: Fetching Data from External API</p>
        </div>

        {loading && (
          <div className="loading">
            <div>
              <div className="spinner"></div>
              Fetching student data from API...
            </div>
          </div>
        )}

        {error && (
          <div className="error">
            ❌ {error}<br />
            Please check your internet connection.
          </div>
        )}

        {!loading && !error && (
          <div className="students-grid">
            {users.map((user) => {
              const marks = getFakeMarks(user.id);
              return (
                <div key={user.id} className="student-card">
                  <div className="card-header">
                    <div className="avatar">👨‍🎓</div>
                    <h3 className="student-name">{user.name}</h3>
                    <p className="department">{getFakeDepartment(user.id)}</p>
                  </div>

                  <div className="info-section">
                    <div className="info-row">
                      <span className="info-label">Email</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">City</span>
                      <span className="info-value">{user.address.city}</span>
                    </div>

                    <div className="marks-container">
                      <div className="marks">{marks}</div>
                      <div className="grade">Grade: {getGrade(marks)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Question3;