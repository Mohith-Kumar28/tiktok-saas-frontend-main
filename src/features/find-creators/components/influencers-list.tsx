import type { Influencer } from "../constants/mock-api"

import { tableSearchParamsSchema } from "../schemas/search-params"

import { fakeInfluencers } from "../constants/mock-api"
import { createSearchParamsHelpers } from "@/lib/search-params"

import { InfluencersTable } from "./influencers-table"
import { columns } from "./influencers-table/columns"

type InfluencersListPage = {}

export default async function InfluencersList({}: InfluencersListPage) {
  const { searchParamsCache } = createSearchParamsHelpers(
    tableSearchParamsSchema
  )

  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page")
  const search = searchParamsCache.get("name")
  const pageLimit = searchParamsCache.get("perPage")
  const categories = searchParamsCache.get("category")

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories }),
  }

  const data = await fakeInfluencers.getInfluencers(filters)
  const totalInfluencers = data.total_influencers
  const influencers: Influencer[] = data.influencers

  return (
    <InfluencersTable
      data={influencers}
      totalItems={totalInfluencers}
      columns={columns}
    />
  )
}

// 'use client';
// import { fakeInfluencers, Influencer } from '@/constants/mock-api';
// import { useSearchParams } from 'next/navigation';
// import { InfluencersTable } from './influencers-table';
// import { columns } from './influencers-table/columns';
// import { useEffect, useState } from 'react';

// type InfluencersListPage = {};

// export default function InfluencersList({}: InfluencersListPage) {
//   const searchParams = useSearchParams();
//   const page = searchParams.get('page') || '1';
//   const search = searchParams.get('name');
//   const pageLimit = searchParams.get('perPage') || '10';
//   const categories = searchParams.get('category');

//   const [influencers, setInfluencers] = useState<Influencer[]>([]);
//   const [totalInfluencers, setTotalInfluencers] = useState(0);

//   useEffect(() => {
//     const fetchInfluencers = async () => {
//       const filters = {
//         page: parseInt(page),
//         limit: parseInt(pageLimit),
//         ...(search && { search }),
//         ...(categories && { categories })
//       };

//       const data = await fakeInfluencers.getInfluencers(filters);
//       const totalInfluencers = data.total_influencers;
//       const influencers: Influencer[] = data.influencers;
//       console.log(data);
//       setInfluencers(influencers);
//       setTotalInfluencers(totalInfluencers);
//     };
//     fetchInfluencers();
//   }, [page, pageLimit, search, categories]);

//   return (
//     <InfluencersTable
//       data={influencers}
//       totalItems={totalInfluencers}
//       columns={columns}
//     />
//   );
// }
