const express = require('express');
const app = express();

// ==========================================
// 1. GLOBAL MIDDLEWARE
// Applied to every single incoming request
// ==========================================

// Global Middleware 1: Request Logger
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`\n[${timestamp}] ${req.method} request to ${req.url}`);
    // next() passes control to the next middleware in the stack
    next(); 
};

// Global Middleware 2: Request Preprocessing
const requestPreprocessor = (req, res, next) => {
    console.log(' -> Global Middleware: Preprocessing request data...');
    // We can attach new data to the 'req' object for later routes to use
    req.customData = { processedAt: Date.now(), status: 'Active' };
    next();
};

// Apply global middlewares using app.use()
// Order matters! logger runs first, then preprocessor
app.use(requestLogger);
app.use(requestPreprocessor);


// ==========================================
// 2. ROUTE-SPECIFIC MIDDLEWARE
// Applied only to specific routes
// ==========================================

// Route Middleware A: Mock Authentication
const checkAuth = (req, res, next) => {
    console.log(' -> Route Middleware: Checking user authentication...');
    // Simulating an authenticated user
    req.user = { username: 'admin_user', role: 'admin' }; 
    next();
};

// Route Middleware B: Role Verification
const verifyAdmin = (req, res, next) => {
    console.log(` -> Route Middleware: Verifying role for ${req.user.username}...`);
    if (req.user.role === 'admin') {
        console.log(' -> Route Middleware: Admin access granted.');
        next(); // Proceed to the final route handler
    } else {
        console.log(' -> Route Middleware: Access denied.');
        res.status(403).send('Forbidden: Admins only.');
    }
};


// ==========================================
// 3. ROUTES & ROUTE HANDLERS
// ==========================================

// Public Route: Only hits global middleware
app.get('/', (req, res) => {
    console.log(' -> Route Handler: Executing GET /');
    res.send('Welcome to the Public Home Page!');
});

// Protected Route: Demonstrates Middleware Chaining
// Execution flow: Global -> checkAuth -> verifyAdmin -> final handler
app.get('/dashboard', checkAuth, verifyAdmin, (req, res) => {
    console.log(' -> Route Handler: Executing GET /dashboard');
    
    // Accessing the data attached by our preprocessor middleware
    res.json({
        message: `Welcome to the secure dashboard, ${req.user.username}!`,
        metadata: req.customData
    });
});


// ==========================================
// 4. SERVER INITIALIZATION
// ==========================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Try visiting / and /dashboard to see middleware in action.');
});