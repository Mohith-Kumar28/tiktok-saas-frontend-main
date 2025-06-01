import { z } from "zod"

export const filterValuesSchema = z.object({
  gender: z.string().optional(),
  age: z.string().optional(),
  videos: z.string().optional(),
  avgViews: z.string().optional(),
  engagementRate: z.string().optional(),
  categories: z.string().optional(),
  gmv: z.string().optional(),
  itemsSold: z.string().optional(),
  gpm: z.string().optional(),
})

// Get the TypeScript type from the schema
export type TFilterValues = z.infer<typeof filterValuesSchema>

export interface TOption {
  value: string
  label: string
}

export interface TFilterSection {
  title: string
  columns: number
  filters: Array<{
    name: string
    options: TOption[]
    placeholder: string
  }>
}

export interface TSearchState {
  query: string
  matchIn: string
}
