import axios from '../../api/axios';
import './HsCode.css'
import { useState, useEffect } from 'react';

const HS_CODE_URL = '/api/training/hscodes';

const HsCode = () => {
  const [options, setOptions] = useState([]);
  const authToken = localStorage.getItem('token');

  const config = {
    headers: { 'Authorization': 'Bearer ' + authToken }
  };

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const response = await axios.get(HS_CODE_URL,config);
      const hsCodes = response.data.items;
      const results = []
      // Store results in the results array
      hsCodes.forEach((value) => {
        results.push({
          key: value.name,
          value: value.code,
        });
      });
      // Update the options state
      setOptions([
        {key: 'Select a HS code', value: ''}, 
        ...results
      ])
    }
    // Trigger the fetch
    fetchData();
  }, []);

  return (
    <div>
      <select >
      {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </select>  
    </div>
  );
}

export default HsCode;
