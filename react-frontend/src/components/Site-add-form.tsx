import React, { useState } from 'react';
import { TextField, Typography, Grid, Container, Autocomplete, Checkbox, Button } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface FormData {
  name: string;
  location: string;
  selectedSimulators: string[];
  selectedSiteAdmins: string[];
  [key: string]: string | string[]; 
}

interface SiteAddFormProps {}

const SiteAddForm: React.FC<SiteAddFormProps> = () => {
  const simulatorOptions = ['Auto', 'Manual', 'Semi-Auto', 'Semi-Manual', 'Optional', 'Customise'];
  const siteAdminOptions = ['shiva', 'tejesh', 'priya', 'naresh', 'gyandeep', 'rukesh'];

  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    selectedSimulators: [],
    selectedSiteAdmins: [],
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    location: false,
    simulators: false,
    siteAdmins: false,
  });

  const validateForm = (): boolean => {
    const newFormErrors = {
      name: formData.name.trim() === '',
      location: formData.location.trim() === '',
      simulators: formData.selectedSimulators.length === 0,
      siteAdmins: formData.selectedSiteAdmins.length === 0,
    };

    setFormErrors(newFormErrors);

    return Object.values(newFormErrors).every((error) => !error);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (name: string) => {
    const trimmedValue = formData[name];
    setFormData((prevData) => ({
      ...prevData,
      [name]: trimmedValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: trimmedValue === '',
    }));
  };

  const handleSimulatorChange = (_: {}, newValue: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedSimulators: newValue,
    }));
  };

  const handleSiteAdminChange = (_: {}, newValue: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedSiteAdmins: newValue,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      setFormData({
        name: '',
        location: '',
        selectedSimulators: [],
        selectedSiteAdmins: [],
      });
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <div>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '80%', padding: '20px' }}>
            <Typography component="h1" variant="h5">
              Site Add Form
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Name *</Typography>
                  <TextField
                    label="Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    error={formErrors.name}
                    helperText={formErrors.name && '* Required'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Location *</Typography>
                  <TextField
                    label="Location"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    onBlur={() => handleBlur('location')}
                    error={formErrors.location}
                    helperText={formErrors.location && '* Required'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Simulator *</Typography>
                  <Autocomplete
                    multiple
                    id="Simulator"
                    options={simulatorOptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    value={formData.selectedSimulators}
                    onChange={handleSimulatorChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Simulator"
                        placeholder="Simulators"
                        error={formErrors.simulators}
                        helperText={formErrors.simulators && '* Required'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Site Admin</Typography>
                  <Autocomplete
                    multiple
                    id="Site Admin"
                    options={siteAdminOptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    value={formData.selectedSiteAdmins}
                    onChange={handleSiteAdminChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Site-Admin"
                        placeholder="Site-Admins"
                        error={formErrors.siteAdmins}
                        helperText={formErrors.siteAdmins && '* Required'}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Typography variant="caption" color="error" style={{ marginTop: '10px' }}>
                * Required fields
              </Typography>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SiteAddForm;