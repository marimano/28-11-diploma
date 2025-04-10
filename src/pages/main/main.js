import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinations } from "../../redux/slices/destinationReducer";

export default () => {
  const isLoading = useSelector(state => state.destinations.isLoading);
  const destinationsList = useSelector(state => state.destinations.list);
  const selectedDestination = useSelector(state => state.destinations.selectedDestination);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDestinations())
  }, []);

  const formik = useFormik({
    initialValues: {
      destination: selectedDestination, checkIn: null, checkOut: null, adults: null, children: null
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    }
  });

  if (isLoading) {
    return 'loading...'
  }

  return <div className="main">
      <form className="main-search" onSubmit={formik.handleSubmit}>
        <div>
        <FormControl fullWidth>
          <InputLabel id="destination">Destination</InputLabel>
           <Select
              labelId="destination"
              id="demo-simple-select"
              name="destination"
              value={formik.values.destination}
              label="Destination"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.destination && Boolean(formik.errors.destination)}
              
            >
              {destinationsList.map(({ id, label }) => {
                return <MenuItem key={id} value={id}>{label}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <button>SUBMIT</button>
        </div>
      </form>
  </div>
}