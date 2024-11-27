import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Attendance from '../pages/Attendance';
import LeaveManagement from '../pages/Leave';
import EmployeeManagement from '../pages/Employees';
import { Chart } from './chart';
import Payments from '../pages/Payments';
import Folder from './folder';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Attendance" {...a11yProps(0)} />
          <Tab label="Leave" {...a11yProps(1)} />
          <Tab label="Employees" {...a11yProps(2)} />
          <Tab label="Payments" {...a11yProps(3)} />
          <Tab label="Folder" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Attendance />
        <Chart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LeaveManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EmployeeManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Payments />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Folder />
      </CustomTabPanel>
    </Box>
  );
}