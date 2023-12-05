import { useState, ChangeEvent, FormEvent } from 'react';
import {TextField, Button, Typography, Grid, Container,InputAdornment,IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

interface FormErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const DepartAdminAddForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: value.trim() === '' && name !== 'middleName',
    });
  };

  const handleBlur = (name: string): void => {
    setFormErrors({
      ...formErrors,
      [name]: formData[name].trim() === '',
    });
  };

  const handleTogglePasswordVisibility = (): void => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleToggleConfirmPasswordVisibility = (): void => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newFormErrors: FormErrors = {
      firstName: formData.firstName.trim() === '',
      lastName: formData.lastName.trim() === '',
      email: formData.email.trim() === '',
      password: formData.password.trim() === '',
      confirmPassword:
        formData.confirmPassword.trim() === '' ||
        formData.confirmPassword !== formData.password,
    };

    setFormErrors(newFormErrors);

    const isFormComplete =
      Object.values(newFormErrors).every((error) => !error)

    if (isFormComplete) {
      console.log('Form submitted:', formData);
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <Container component="main" maxWidth="md">
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '80%', padding: '20px' }}>        
    <Typography component="h1" variant="h5">
          DepartAdmin Add Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField  label="First Name"  type="text"  fullWidth  margin="normal"  variant="outlined"  name="firstName"  value={formData.firstName}  onChange={handleInputChange}  onBlur={() => handleBlur('firstName')}  error={formErrors.firstName}  helperText={formErrors.firstName && 'First Name is required'}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField  label="Middle Name"  type="text"  fullWidth  margin="normal"  variant="outlined"  name="middleName"  value={formData.middleName}  onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField  label="Last Name"  type="text"  fullWidth  margin="normal"  variant="outlined"  name="lastName"  value={formData.lastName}  onChange={handleInputChange}  onBlur={() => handleBlur('lastName')}  error={formErrors.lastName}  helperText={formErrors.lastName && 'Last Name is required'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" type="email" fullWidth margin="normal" variant="outlined" name="email" value={formData.email} onChange={handleInputChange} onBlur={() => handleBlur('email')} error={formErrors.email} helperText={formErrors.email && 'Email is required'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  label="Password"  type={passwordVisibility ? 'text' : 'password'}  fullWidth  margin="normal"  variant="outlined"  name="password"  value={formData.password}  onChange={handleInputChange}  onBlur={() => handleBlur('password')}  error={formErrors.password}  helperText={formErrors.password && 'Password is required'}  InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {passwordVisibility ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Confirm Password" type={confirmPasswordVisibility ? 'text' : 'password'} fullWidth margin="normal" variant="outlined" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} onBlur={() => handleBlur('confirmPassword')} error={formErrors.confirmPassword} helperText={
                  formErrors.confirmPassword &&
                  'Passwords do not match or are empty'
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {confirmPasswordVisibility ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </form>
      </div>
      </div>
    </Container>
  );
};

export default DepartAdminAddForm;