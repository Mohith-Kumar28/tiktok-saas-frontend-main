import PageContainer from '@/components/layout/page-container';
import InfluencersList from './components/influencers-list';
import SearchAndFilters from './components/search/search-and-filters';

const FindCreatorsViewPage = () => {
  return (
    <PageContainer scrollable={false}>
      <SearchAndFilters />

      <InfluencersList />
    </PageContainer>
  );
};

export default FindCreatorsViewPage;
