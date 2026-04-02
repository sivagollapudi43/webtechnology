import { useState } from 'react';

const Component3 = () => {
  // Initialize counter with default value using useState
  const [count, setCount] = useState(0);

  // Increment function
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Decrement function
  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  // Reset function
  const reset = () => {
    setCount(0);
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .counter-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .counter-card {
          background: white;
          padding: 60px 50px;
          border-radius: 28px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
          text-align: center;
          width: 100%;
          max-width: 420px;
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          color: #1e2937;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #64748b;
          font-size: 18px;
          margin-bottom: 40px;
        }

        .counter-display {
          font-size: 92px;
          font-weight: 800;
          color: #4f46e5;
          margin: 30px 0;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 20px;
          border: 3px solid #e0e7ff;
        }

        .button-group {
          display: flex;
          gap: 15px;
          margin-top: 40px;
        }

        .btn {
          flex: 1;
          padding: 18px;
          font-size: 18px;
          font-weight: 600;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-increment {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
        }

        .btn-decrement {
          background: linear-gradient(135deg, #ef4444, #f87171);
          color: white;
        }

        .btn-reset {
          background: #64748b;
          color: white;
          font-size: 16px;
        }

        .btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }

        .btn:active {
          transform: scale(0.96);
        }

        .count-label {
          font-size: 14px;
          color: #64748b;
          margin-top: 10px;
          font-weight: 500;
        }
      `}</style>

      <div className="counter-container">
        <div className="counter-card">
          <h1 className="title">Simple Counter</h1>
          <p className="subtitle">Exercise 3 - useState Hook</p>

          <div className="counter-display">
            {count}
          </div>

          <p className="count-label">Current Value</p>

          <div className="button-group">
            <button className="btn btn-decrement" onClick={decrement}>
              - Decrement
            </button>
            
            <button className="btn btn-increment" onClick={increment}>
              + Increment
            </button>
          </div>

          <button className="btn btn-reset" onClick={reset} style={{ marginTop: '15px', width: '100%' }}>
            Reset to Zero
          </button>
        </div>
      </div>
    </>
  );
};

export default Component3;