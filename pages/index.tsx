import React from "react"
import { GetStaticProps } from "next"
import Page from '../components/page'
import { PrismaClient } from '@prisma/client';

export const getStaticProps: GetStaticProps = async () => {
  let prisma = new PrismaClient();
  const items = await prisma.unit.findMany({
    select: { 
      id: true,
      asset_description: true,
      asset_manufacturer: true,
      asset_model: true,
      part_type: true,
      part_description: true,
      part_number: true,
      price: true
    }
  });
  return { props: { items } };
};

type Props = {
  units: Array<Object>
}

const Index: React.FC<Props> = (props) => {
  return <Page {...props} />
}

export default Index
