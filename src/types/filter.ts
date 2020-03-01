// Filter Interfaces
export interface IFilterInputProps {
  filterKey: string
  filterValue: boolean|string|number
}

export interface IToggleProps {
  toggleType: string
}

export interface IFilterButton {
  text: string
  onClick: () => void
  onClickOption: (filter: number) => void
  options: string[]
  activeOptions: number[]
  active: boolean
}
