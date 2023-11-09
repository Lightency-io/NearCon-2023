import { ReadDTO } from '@energyweb/origin-energy-api-react-query-client';
import { ComposedPublicDevice } from '@energyweb/origin-ui-device-data';
import { useSmartMeterTableLogic } from '@energyweb/origin-ui-device-logic';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useSmartMeterTableEffects = (device: ComposedPublicDevice) => {
  const [reads, setReads] = useState<ReadDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(device)

  useEffect(() => {
    const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:3030/api/meter-reads/${device.smartMeterId}`; // Replace with your actual API endpoint
      const filter = {
      start: '2023-08-01T23:00:00.000Z',
      end: '2024-08-15T22:59:59.999Z',
      limit: 10, // Set the desired limit value
      offset: 0,
       };
    
    const response = await axios.get(apiUrl, { params: filter });
    console.log('response',response);    
    setReads(response.data);
    console.log('response',response);
    setLoading(false);
    } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
    }
    };
    
    fetchData(); // Call the async function
    }, [device.smartMeterId]);


  const tableProps = useSmartMeterTableLogic({
    device,
    reads,
    loading: false,
  });

  return tableProps;
};