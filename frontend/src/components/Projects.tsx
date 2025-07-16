import { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

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
];

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

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowDoubleClick = (params: { row: Project }) => {
    setSelectedProject(params.row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={sampleProjects}
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
        <DialogTitle>Project Details</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Name"
                value={selectedProject.name}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Description"
                value={selectedProject.description}
                fullWidth
                multiline
                rows={3}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Status"
                value={selectedProject.status}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Priority"
                value={selectedProject.priority}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Start Date"
                  value={selectedProject.startDate}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="End Date"
                  value={selectedProject.endDate}
                  InputProps={{ readOnly: true }}
                />
              </Box>
              <TextField
                label="Progress"
                value={`${selectedProject.progress}%`}
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
