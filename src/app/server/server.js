const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8081;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.json()); // Parse JSON bodies

// Enable CORS
app.use(
	cors({
		origin: 'http://localhost:4200', // Angular application's domain
	})
);

// Define API endpoint for workspaces
let workspaces = require('./workspaces.json');

// GET request to fetch all workspaces
app.get('/api/workspaces', (req, res) => {
	res.json(workspaces);
});

// POST request to create a new workspace
app.post('/api/workspaces', (req, res) => {
	const newWorkspace = req.body;
	workspaces.push(newWorkspace);
	// Assuming you want to send back the updated list of workspaces
	res.json(workspaces);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
