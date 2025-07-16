import { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: string;
  priority: string;
  projectName: string;
  progress: number;
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'assignee', headerName: 'Assignee', width: 130 },
  { field: 'projectName', headerName: 'Project', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'priority', headerName: 'Priority', width: 130 },
  { field: 'dueDate', headerName: 'Due Date', width: 130 },
  { 
    field: 'progress',
    headerName: 'Progress',
    type: 'number',
    width: 110,
    valueFormatter: (params: { value: number }) => `${params.value}%`,
  },
];

// Sample data - replace with actual API data
const sampleTasks: Task[] = [
  { 
    id: 1, 
    title: 'Design Homepage', 
    description: 'Create a modern and responsive homepage design',
    assignee: 'John Doe',
    dueDate: '2024-02-15',
    status: 'In Progress',
    priority: 'High',
    projectName: 'Website Redesign',
    progress: 75
  },
  { 
    id: 2, 
    title: 'API Integration', 
    description: 'Integrate payment gateway API',
    assignee: 'Jane Smith',
    dueDate: '2024-02-28',
    status: 'Pending',
    priority: 'Medium',
    projectName: 'Mobile App Development',
    progress: 30
  },
];

export function Tasks() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowDoubleClick = (params: { row: Task }) => {
    setSelectedTask(params.row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={sampleTasks}
          columns={columns}
          onRowDoubleClick={handleRowDoubleClick}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Title"
                value={selectedTask.title}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Description"
                value={selectedTask.description}
                fullWidth
                multiline
                rows={3}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Project"
                value={selectedTask.projectName}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Assignee"
                value={selectedTask.assignee}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Status"
                  value={selectedTask.status}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Priority"
                  value={selectedTask.priority}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>
              <TextField
                label="Due Date"
                value={selectedTask.dueDate}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Progress"
                value={`${selectedTask.progress}%`}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
