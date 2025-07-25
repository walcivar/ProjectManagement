import { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

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

const emptyTask: Task = {
  id: 0,
  title: '',
  description: '',
  assignee: '',
  dueDate: '',
  status: '',
  priority: '',
  projectName: '',
  progress: 0,
};

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Task>(emptyTask);

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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params: { row: Task }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditClick(params.row)}
          showInMenu={false}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row)}
          showInMenu={false}
        />,
      ],
    },
  ];

  const handleAddNew = () => {
    setFormData(emptyTask);
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setFormData({ ...task });
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
  };

  const handleRowDoubleClick = (params: { row: Task }) => {
    setSelectedTask(params.row);
    setFormData(params.row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setFormData(emptyTask);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (selectedTask) {
      // Update existing task
      setTasks(tasks.map(t => 
        t.id === selectedTask.id ? formData : t
      ));
    } else {
      // Add new task
      setTasks([
        ...tasks,
        { ...formData, id: Math.max(...tasks.map(t => t.id)) + 1 }
      ]);
    }
    handleCloseModal();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Tasks
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add Task
        </Button>
      </Box>
      
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tasks}
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
        <DialogTitle>{selectedTask ? 'Edit Task' : 'New Task'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Project"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Box>
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Progress"
              name="progress"
              type="number"
              value={formData.progress}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
