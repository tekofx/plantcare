import { Title } from '@mantine/core';
import axios from 'axios';

import { cookies } from 'next/headers';

async function getPlants() {
  const cookieStore = cookies();
  const token = cookieStore.get('TOKEN').value;
  const res = await axios.get('http://localhost:3001/plants', { headers: { Authorization: `Bearer ${token}` } });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.data;
}
export default async function HomePage() {
  const plants = await getPlants();

  return (
    <>
      {plants.map((plant) => (
        <div key={plant.id}>
          <h1>{plant.name}</h1>
          <p>{plant.description}</p>
        </div>
      ))}
      <Title>My Plants</Title>
    </>
  );
}
