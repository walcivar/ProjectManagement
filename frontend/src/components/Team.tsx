import { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Chip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  skills: string[];
  activeProjects: number;
}

const columns: GridColDef[] = [
  { 
    field: 'fullName',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params: { row: TeamMember }) => `${params.row.firstName} ${params.row.lastName}`,
  },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'department', headerName: 'Department', width: 130 },
  { 
    field: 'activeProjects',
    headerName: 'Active Projects',
    type: 'number',
    width: 130,
  },
  { 
    field: 'skills',
    headerName: 'Skills',
    width: 200,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {params.value.slice(0, 2).map((skill: string) => (
          <Chip key={skill} label={skill} size="small" />
        ))}
        {params.value.length > 2 && (
          <Chip label={`+${params.value.length - 2}`} size="small" />
        )}
      </Box>
    ),
  },
];

// Sample data - replace with actual API data
const sampleTeamMembers: TeamMember[] = [
  { 
    id: 1, 
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    role: 'Project Manager',
    department: 'Technology',
    joinDate: '2023-01-15',
    skills: ['Project Management', 'Agile', 'Leadership'],
    activeProjects: 3
  },
  { 
    id: 2, 
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    role: 'Senior Developer',
    department: 'Technology',
    joinDate: '2023-03-01',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    activeProjects: 2
  },
];

export function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowDoubleClick = (params: { row: TeamMember }) => {
    setSelectedMember(params.row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Team
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={sampleTeamMembers}
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
        <DialogTitle>Team Member Details</DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="First Name"
                  value={selectedMember.firstName}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Last Name"
                  value={selectedMember.lastName}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>
              <TextField
                label="Email"
                value={selectedMember.email}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Role"
                value={selectedMember.role}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Department"
                value={selectedMember.department}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Join Date"
                value={selectedMember.joinDate}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {selectedMember.skills.map((skill) => (
                    <Chip key={skill} label={skill} />
                  ))}
                </Box>
              </Box>
              <TextField
                label="Active Projects"
                value={selectedMember.activeProjects}
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
