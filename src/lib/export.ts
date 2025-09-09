export function exportTableToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; label: string }[]
) {
  if (!data.length) return

  const headers = columns
    ? columns.map((col) => col.label)
    : Object.keys(data[0])

  const csvContent = [
    headers.join(","),
    ...data.map((row) => {
      const values = columns
        ? columns.map((col) => row[col.key])
        : Object.values(row)
      return values
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    }),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
