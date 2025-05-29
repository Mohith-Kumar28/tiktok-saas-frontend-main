"use client"

import React from "react"
import { Search as SearchIcon } from "lucide-react"

import type { TOption, TSearchState } from "./types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchProps {
  onSearch?: (query: string, matchIn: string) => void
  initialState?: TSearchState
  matchInOptions: TOption[]
}

export const Search = ({
  onSearch,
  initialState,
  matchInOptions,
}: SearchProps) => {
  const [query, setQuery] = React.useState(initialState?.query || "")
  const [matchIn, setMatchIn] = React.useState(initialState?.matchIn || "all")

  const handleSearch = () => {
    onSearch?.(query, matchIn)
  }

  return (
    <div className="flex w-full max-w-xl items-center gap-0">
      <Select value={matchIn} onValueChange={setMatchIn}>
        <SelectTrigger className="rounded-r-none">
          <span>Match in:</span>
          <SelectValue placeholder="all" />
        </SelectTrigger>
        <SelectContent>
          {matchInOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="rounded-none"
        placeholder="keywords"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch()
          }
        }}
      />
      <Button className="rounded-l-none" onClick={handleSearch}>
        <SearchIcon className="size-4" />
        Search
      </Button>
    </div>
  )
}
