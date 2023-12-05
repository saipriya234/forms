import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    Grid,
    InputLabel,
    Paper,
    Stack,
    TextField,
    Toolbar,
    Typography,
    styled,
  } from "@mui/material";
  import { top100Films } from "../stores/formStore";
  import { Item } from "../theme/formTheme";
  import { ChangeEvent, SyntheticEvent, useState } from "react";
  import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
  import CheckBoxIcon from "@mui/icons-material/CheckBox";
  import { formType } from "../types/formType";
  
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  
  export function Form() {
    const [data, setData] = useState<formType[]>([]);
  
    const [errors, setErrors] = useState({
      tutorialName: false,
      title: false,
    });
  
    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const name = event.target.name;
      const value = event.target.value;
      setData((prev) => {
        return { ...prev, [name]: value };
      });
      setErrors({
        ...errors,
        [name]: value.trim() === "",
      });
    };
  
    const handleAuthorChange = (
      event: React.SyntheticEvent,
      values: formType[],
      author: formType[]
    ) => {
      setData((prev) => {
        return { ...prev, author: values };
      });
    };
    const handleStateChange = (
      event: React.SyntheticEvent,
      values: formType[],
      state: formType[]
    ) => {
      setData((prev) => {
        return { ...prev, state: values };
      });
    };
  
    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(data);
    };
  
    return (
      <Container component={Paper}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography>Tutorial Add Form</Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Item>
                  Tutorial Name
                  <TextField
                    name="tutorialName"
                    type="text"
                    placeholder="Tutorial Name"
                    onChange={handleChange}
                    error={errors.tutorialName}
                    helperText={
                      errors.tutorialName && "Tutorial Name is required"
                    }
                  />
                  Description
                  <TextField
                    name="description"
                    placeholder="Tutorial Description"
                    onChange={handleChange}
                  />
                  Author
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={top100Films}
                    onChange={handleAuthorChange}
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
                    // style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Checkboxes"
                        placeholder="Select"
                      />
                    )}
                  />
                  Published Date
                  <TextField
                    name="publishedDate"
                    type="date"
                    onChange={handleChange}
                  />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  Title
                  <TextField
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Tutorial Title"
                    error={errors.title}
                    helperText={errors.title && "Title is required"}
                  />
                  State
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={top100Films}
                    disableCloseOnSelect
                    onChange={handleStateChange}
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
                    // style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Checkboxes"
                        placeholder="Select"
                      />
                    )}
                  />
                </Item>
              </Grid>
              <Button type="submit" variant="contained" disabled>
                Submit
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Container>
    );
  }