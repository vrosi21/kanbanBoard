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

// GET request to fetch the next available workspace id
let nextWorkspaceId = workspaces.length + 1; // Initialize with the next id
app.get('/api/workspaces/nextId', (req, res) => {
	res.json({ id: nextWorkspaceId });
	nextWorkspaceId++; // Increment the next id for the next workspace
});

// POST request to create a new workspace
app.post('/api/workspaces', (req, res) => {
	const newWorkspace = req.body; // Assign the next available id to the new workspace
	workspaces.push(newWorkspace);
	// Assuming you want to send back the updated list of workspaces
	res.json(workspaces);
});

// DELETE request to delete a workspace by ID
app.delete('/api/workspaces/:id', (req, res) => {
	const workspaceId = req.params.id; // Extract workspace ID from request parameters

	// Find index of workspace in the workspaces array
	const workspaceIndex = workspaces.findIndex(
		(workspace) => workspace.id === workspaceId
	);

	if (workspaceIndex !== -1) {
		// Remove workspace from array
		const deletedWorkspace = workspaces.splice(workspaceIndex, 1)[0];
		res.json({
			success: true,
			message: `Workspace with ID ${workspaceId} deleted successfully.`,
		});
	} else {
		// Workspace not found, send 404 response
		res.status(404).json({
			success: false,
			message: `Workspace with ID ${workspaceId} not found.`,
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
