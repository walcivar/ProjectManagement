import { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  progress: number;
}

// Moved columns definition inside the component

// Sample data - replace with actual API data
const sampleProjects: Project[] = [
  { 
    id: 1, 
    name: 'Website Redesign', 
    description: 'Redesign company website with modern UI/UX',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'In Progress',
    priority: 'High',
    progress: 65
  },
  { 
    id: 2, 
    name: 'Mobile App Development', 
    description: 'Develop iOS and Android mobile applications',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    status: 'Planning',
    priority: 'Medium',
    progress: 25
  },
];

const emptyProject: Project = {
  id: 0,
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  status: '',
  priority: '',
  progress: 0,
};

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Project>(emptyProject);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
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
      getActions: (params: { row: Project }) => [
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
    setFormData(emptyProject);
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setFormData({ ...project });
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== project.id));
    }
  };

  const handleRowDoubleClick = (params: { row: Project }) => {
    setSelectedProject(params.row);
    setFormData(params.row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setFormData(emptyProject);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (selectedProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === selectedProject.id ? formData : p
      ));
    } else {
      // Add new project
      setProjects([
        ...projects,
        { ...formData, id: Math.max(...projects.map(p => p.id)) + 1 }
      ]);
    }
    handleCloseModal();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add Project
        </Button>
      </Box>
      
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={projects}
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
        <DialogTitle>{selectedProject ? 'Edit Project' : 'New Project'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
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
