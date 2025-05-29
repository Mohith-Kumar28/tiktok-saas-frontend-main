import type { TFilterSection, TOption } from "./types"

// Search options
export const matchInOptions: TOption[] = [
  { value: "all", label: "all" },
  { value: "creators", label: "creators" },
  { value: "videos", label: "videos" },
  { value: "products", label: "products" },
]

export const filterSections: TFilterSection[] = [
  {
    title: "Followers",
    columns: 4,
    filters: [
      {
        name: "gender",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        placeholder: "Gender",
      },
      {
        name: "age",
        options: [
          { value: "13-17", label: "13-17" },
          { value: "18-24", label: "18-24" },
          { value: "25-34", label: "25-34" },
          { value: "35+", label: "35+" },
        ],
        placeholder: "Age",
      },
    ],
  },
  {
    title: "Content performance",
    columns: 4,
    filters: [
      {
        name: "videos",
        options: [
          { value: "0-10", label: "0-10" },
          { value: "11-50", label: "11-50" },
          { value: "51-100", label: "51-100" },
          { value: "100+", label: "100+" },
        ],
        placeholder: "Videos",
      },
      {
        name: "avgViews",
        options: [
          { value: "0-1k", label: "0-1K" },
          { value: "1k-5k", label: "1K-5K" },
          { value: "5k-10k", label: "5K-10K" },
          { value: "10k+", label: "10K+" },
        ],
        placeholder: "Avg. views",
      },
      {
        name: "engagementRate",
        options: [
          { value: "0-1", label: "0-1%" },
          { value: "1-3", label: "1-3%" },
          { value: "3-5", label: "3-5%" },
          { value: "5+", label: "5%+" },
        ],
        placeholder: "Engagement rate",
      },
    ],
  },
  {
    title: "Sales performance",
    columns: 4,
    filters: [
      {
        name: "categories",
        options: [
          { value: "fashion", label: "Fashion" },
          { value: "beauty", label: "Beauty" },
          { value: "lifestyle", label: "Lifestyle" },
          { value: "tech", label: "Tech" },
        ],
        placeholder: "Categories",
      },
      {
        name: "gmv",
        options: [
          { value: "0-1k", label: "0-1K" },
          { value: "1k-5k", label: "1K-5K" },
          { value: "5k-10k", label: "5K-10K" },
          { value: "10k+", label: "10K+" },
        ],
        placeholder: "GMV",
      },
      {
        name: "itemsSold",
        options: [
          { value: "0-100", label: "0-100" },
          { value: "101-500", label: "101-500" },
          { value: "501-1000", label: "501-1000" },
          { value: "1000+", label: "1000+" },
        ],
        placeholder: "Items sold",
      },
      {
        name: "gpm",
        options: [
          { value: "0-10", label: "0-10%" },
          { value: "11-20", label: "11-20%" },
          { value: "21-30", label: "21-30%" },
          { value: "30+", label: "30%+" },
        ],
        placeholder: "GPM",
      },
    ],
  },
]
