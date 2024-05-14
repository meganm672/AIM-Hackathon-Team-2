import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
const PrioritySelect = ({goalData}) => {
    const [priority, setPriority] = useState('');

    const handleChange = (event) => {
        setPriority(event.target.value);
    };



    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel >Priority</InputLabel>
                <Select
                    id="demo-simple-select"
                    value={priority}
                    label="Priority"
                    onChange={handleChange}
                >
                    <MenuItem value={Low}>
                        <Chip>
                            Low
                        </Chip>
                    </MenuItem>
                    <MenuItem value={Medium}>
                        <Chip>
                            Medium
                        </Chip>
                    </MenuItem>
                    <MenuItem value={High}>
                        <Chip>
                            High
                        </Chip>
                    </MenuItem>
                    <MenuItem value={Critical}>
                        <Chip>
                            Critical
                        </Chip>
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default PrioritySelect;