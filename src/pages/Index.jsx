import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import DoctorCard from './components/Card';
import Filters from './components/Filters';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    gender: '',
    availableToday: '',
    feesMin: '',
    feesMax: ''
  });

  const fetchDoctors = async () => {
    try {
      const { gender, availableToday, feesMin, feesMax } = filters;
      const query = [];

      if (gender) query.push(`gender=${gender}`);
      if (availableToday) query.push(`availableToday=${availableToday}`);
      if (feesMin) query.push(`feesMin=${feesMin}`);
      if (feesMax) query.push(`feesMax=${feesMax}`);

      const queryString = query.length ? `?${query.join('&')}` : '';

      const res = await axios.get(`http://localhost:5000/api/doctors/list-doctor-with-filter${queryString}`);
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      
      <Head>
        <title>Find General Physicians - Apollo 24x7</title>
        <meta name="description" content="Find the best general physicians and internal medicine doctors online at Apollo 24x7. Consult with top doctors near you." />
        <link rel="canonical" href="https://www.apollo247.com/specialties/general-physician-internal-medicine" />
      </Head>

      
      <Header />

      
      <div className="container mx-auto p-4">
        <Filters filters={filters} setFilters={setFilters} applyFilters={fetchDoctors} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
