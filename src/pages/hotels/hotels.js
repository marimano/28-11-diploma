import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../redux/slices/hotelsReducer";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

import './hotels.styles.scss';

export default () => {
  const isLoading = useSelector(state => state.hotels.isLoading);
  const hotelsList = useSelector(state => state.hotels.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotels())
  }, []);

  return <div className="hotels">
    {isLoading ? 
        'Loading...' : 
        <div className='hotels-list'>
          {hotelsList.map(({ id, name, address, city, state, country_code, url }) => {
            return <Card key={id} sx={{ minWidth: 275, maxWidth: 275 }}>
              <CardContent>
                <img className="hotels-list-item-img" src={url}/>
                <h3>{name}</h3>
                <div>address: {address}</div>
                <div>city: {city}, state: {state}, country code: {country_code}</div>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          })}
        </div>
      }
  </div>
}