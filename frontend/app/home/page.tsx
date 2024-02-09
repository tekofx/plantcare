import PlantCard from "@/components/PlantCard";
import { Grid, GridCol, Title } from '@mantine/core';
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
      <Title>My Plants</Title>
      <Grid>
        {plants.map((plant) => (
          <GridCol span={4} key={plant.id}>
            <PlantCard plant={plant} />
          </GridCol>
        ))}
      </Grid>
    </>
  );
}
