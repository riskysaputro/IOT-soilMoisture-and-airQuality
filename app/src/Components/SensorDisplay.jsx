import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SensorDisplay = () => {
  const [data, setData] = useState([]);

  const fetchSensorData = async () => {
    const res = await axios.get('http://localhost:3000/api/sensor');
    setData(res.data);
  };
  console.log(data);
  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 10000); // refresh setiap 10 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-600">
      <h2 className="text-3xl font-bold">Data Sensor</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>No</th>
            <th>Waktu</th>
            <th>Kelembaban Tanah</th>
            <th>Kualitas Udara</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
              <td>{row.soil_moisture}</td>
              <td>{row.air_quality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorDisplay;
