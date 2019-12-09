/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Search = ({ list }) => {
  const dispatch = useDispatch();

  return (
    <Autocomplete
      id="combo-box-demo"
      freeSolo
      onChange={(event, val) => {
        if (val && val.user) dispatch({ type: 'UPDATE_USER', payload: val.user });
      }}
      disableOpenOnFocus
      options={list}
      getOptionLabel={(option) => option.user}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="חפש שם משתמש" variant="outlined" fullWidth />
      )}
    />
  );
};

export default Search;
