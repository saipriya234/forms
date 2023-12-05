import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Grid, Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = ['a', 'b', 'c', 'd', 'e', 'f'];

interface CheckboxesTagsProps {}

interface FormData {
  companyName: string;
  companyUrl: string;
  tutorials: string[];
  simulations: string[];
  primaryPhoneNumber: string;
  adminLinkExtension: string;
  companyAdmin: string[];
  companyOptions: string;
}

interface FormErrors {
  companyName: string;
  companyUrl: string;
  tutorials: string;
  simulations: string;
  primaryPhoneNumber: string;
  adminLinkExtension: string;
  companyAdmin: string;
  companyOptions: string;
}

const CompanyAddForm: React.FC<CheckboxesTagsProps> = () => {
  const initialFormData: FormData = {
    companyName: '',
    companyUrl: '',
    tutorials: [],
    simulations: [],
    primaryPhoneNumber: '',
    adminLinkExtension: '',
    companyAdmin: [],
    companyOptions: '',
  };

  const initialFormErrors: FormErrors = {
    companyName: '',
    companyUrl: '',
    tutorials: '',
    simulations: '',
    primaryPhoneNumber: '',
    adminLinkExtension: '',
    companyAdmin: '',
    companyOptions: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  
    setFormErrors((prevErrors) => {
      let error = '';
      if (Array.isArray(value)) {
        error = value.length > 0 ? '' : `${field} is required`;
      } else {
        error = value.trim() !== '' ? '' : `${field} is required`;
      }
      return { ...prevErrors, [field]: error };
    });
  };
  
  const handleSubmit = () => {
    console.log(formData);
    const errors: Partial<FormErrors> = {};
    Object.keys(formData).forEach((key) => {
      const field = key as keyof FormData;
      const value = formData[field];

      if (Array.isArray(value)) {
        errors[field] = value.length > 0 ? '' : `${field} is required`;
      } else {
        errors[field] = value.trim() ? '' : `${field} is required`;
      }
    });

    if (Object.values(errors).some((error) => !!error)) {
      setFormErrors(errors as FormErrors);
      console.log('Form has errors. Cannot submit.');
      return;
    }
  };

  const areAllFieldsFilled = Object.values(formData).every(
    (value) => (Array.isArray(value) ? value.length > 0 : value.trim() !== '')
  );
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '80%', padding: '20px' }}>
    <form>
      <Typography variant="h4" sx={{ color: 'black', fontFamily: 'Arial, sans-serif' }}>
        Company Add Form
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TextField label="Company Name" fullWidth variant="outlined" value={formData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} error={Boolean(formErrors.companyName)} helperText={formErrors.companyName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Company Url" fullWidth variant="outlined" value={formData.companyUrl} onChange={(e) => handleInputChange('companyUrl', e.target.value)} error={Boolean(formErrors.companyUrl)} helperText={formErrors.companyUrl}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete multiple id="checkboxes-tags-demo-1" options={top100Films} disableCloseOnSelect getOptionLabel={(option) => option} value={formData.tutorials} onChange={(_, newValue) => handleInputChange('tutorials', newValue)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option}
              </li>
            )}
            style={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} label="Tutorials" placeholder="Favorites" variant="outlined" error={Boolean(formErrors.tutorials)} helperText={formErrors.tutorials}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete multiple id="checkboxes-tags-demo-2" options={top100Films} disableCloseOnSelect getOptionLabel={(option) => option} value={formData.simulations} onChange={(_, newValue) => handleInputChange('simulations', newValue)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option}
              </li>
            )}
            style={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} label="Simulations" placeholder="Favorites" variant="outlined" error={Boolean(formErrors.simulations)} helperText={formErrors.simulations}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="PrimaryPhoneNumber" fullWidth variant="outlined" value={formData.primaryPhoneNumber} onChange={(e) => handleInputChange('primaryPhoneNumber', e.target.value)} error={Boolean(formErrors.primaryPhoneNumber)} helperText={formErrors.primaryPhoneNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AdminLinkExtension" fullWidth variant="outlined" value={formData.adminLinkExtension} onChange={(e) => handleInputChange('adminLinkExtension', e.target.value)} error={Boolean(formErrors.adminLinkExtension)} helperText={formErrors.adminLinkExtension}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete multiple id="checkboxes-tags-demo-3" options={top100Films} disableCloseOnSelect getOptionLabel={(option) => option} value={formData.companyAdmin} onChange={(_, newValue) => handleInputChange('companyAdmin', newValue)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option}
              </li>
            )}
            style={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} label="Company Admin" placeholder="Favorites" variant="outlined" error={Boolean(formErrors.companyAdmin)} helperText={formErrors.companyAdmin}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Company Options" fullWidth variant="outlined" value={formData.companyOptions} onChange={(e) => handleInputChange('companyOptions', e.target.value)} error={Boolean(formErrors.companyOptions)} helperText={formErrors.companyOptions}
          />
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!areAllFieldsFilled} >
          Submit
        </Button>
      </Grid>
      </Grid>
    </form> 
    </div>
    </div>
  );
};
export default CompanyAddForm;