import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from '../../api/api'
import SearchInput from './searchInput'
import { useNavigate } from "react-router-dom";
import { Input} from 'semantic-ui-react'

export const SearchResults = () => {
    const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const { slug } = useParams();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const searchPatient = async () => {
      try {
        const { data } = await api.get(`patient/search?query=${query}`);
        setSearchResults(data.firstName);
        } catch (error) {
         setError(error.response?.data?.message);
         }
        };
        searchPatient();
       }, []);

  return (
    <div>
        
      {searchResults.map((searchResult) => (
        <div
          key={searchResult.uid} >
          <p>{searchResult.firstName}</p>
        </div>
      ))}
    </div>
  )
}