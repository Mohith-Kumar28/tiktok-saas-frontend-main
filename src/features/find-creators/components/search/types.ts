export interface TFilterValues {
  gender?: string;
  age?: string;
  videos?: string;
  avgViews?: string;
  engagementRate?: string;
  categories?: string;
  gmv?: string;
  itemsSold?: string;
  gpm?: string;
}

export interface TOption {
  value: string;
  label: string;
}

export interface TFilterSection {
  title: string;
  columns: number;
  filters: Array<{
    name: string;
    options: TOption[];
    placeholder: string;
  }>;
}

export interface TSearchState {
  query: string;
  matchIn: string;
}
