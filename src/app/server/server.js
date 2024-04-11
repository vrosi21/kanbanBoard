const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Enable CORS
app.use(cors());

// Define API endpoint for workspaces
const workspaces = require('./workspaces.json');
app.get('/api/workspaces', (req, res) => {
	res.json(workspaces);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
