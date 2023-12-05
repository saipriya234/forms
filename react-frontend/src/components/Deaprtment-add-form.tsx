import  { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dropdownOptions = [
  { title: 'Option 1' },
  { title: 'Option 2' },
  { title: 'Option 3' },
];

export default function DeaprtmentAddForm() {
  const [formData, setFormData] = useState({
    departmentName: '',
    location: '',
    departmentAdmin: [],
    sites: [],
  });

  const [validationErrors, setValidationErrors] = useState({
    departmentName: '',
    location: '',
    departmentAdmin: '',
    sites: '',
  });

  const isSubmitDisabled = Object.values(validationErrors).some((error) => error !== '') || Object.values(formData).some((value) => !value);

  const handleInputChange = (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: value.trim() ? '' : `${fieldName} is required.`,
    }));
  };

  const handleAutocompleteChange = (fieldName: string) => (_: any, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: value.length > 0 ? '' : `${fieldName} is required.`,
    }));
  };

  const handleSubmit = () => {
    setValidationErrors({
      departmentName: !formData.departmentName ? 'Please enter Department Name.' : '',
      location: !formData.location ? 'Please enter Location.' : '',
      departmentAdmin: formData.departmentAdmin.length === 0 ? 'Please select at least one Department Admin.' : '',
      sites: formData.sites.length === 0 ? 'Please select at least one Site.' : '',
    });

    if (!isSubmitDisabled) {
      console.log('Form submitted:', formData);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Department Add Form</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Department Name"
            size="small"
            placeholder="Department Name"
            value={formData.departmentName}
            onChange={handleInputChange('departmentName')}
            helperText={validationErrors.departmentName}
            error={!!validationErrors.departmentName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Location"
            size="small"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange('location')}
            helperText={validationErrors.location}
            error={!!validationErrors.location}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
          size="small"
            multiple
            options={dropdownOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </li>
            )}
            style={{ width: '100%' }}
            value={formData.departmentAdmin}
            onChange={handleAutocompleteChange('departmentAdmin')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Department Admin"
                placeholder="select"
                helperText={validationErrors.departmentAdmin}
                error={!!validationErrors.departmentAdmin}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
          size="small"
            multiple
            options={dropdownOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </li>
            )}
            style={{ width: '100%' }}
            value={formData.sites}
            onChange={handleAutocompleteChange('sites')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sites"
                placeholder="select"
                helperText={validationErrors.sites}
                error={!!validationErrors.sites}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        style={{ width: 'fit-content', alignSelf: 'flex-start', marginTop: '16px' }}
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}

