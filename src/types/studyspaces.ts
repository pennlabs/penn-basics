// Studyspaces Interfaces
export type TSpaceId = string

export interface ILocation {
  lat: number
  lng: number
}

export interface ISpace {
  name: string
  address: string

  /**
   * URL to an image of the studyspace
   */
  image?: string

  /**
   * Attribution for who created this image / where it came from
   */
  imageCredit?: {
    /**
     * Link to where photo was taken or who created it
     */
    link: string

    /**
     * Name of who or what took the picture
     */
    name?: string
  }
  description: string
  start: number[]
  end: number[]
  outlets: number
  quiet: number
  groups: number
  tags: string[]
  location?: {
    lat: number
    lng: number
  }
}

export type ISpaceWithSpaceID = ISpace & { spaceID: TSpaceId }

export type ISpaceDocument = ISpace & Document

export type ISpaceWithHoursAndOpenAndSpaceId = ISpace & {
  open: boolean
  hours: string
  spaceID: TSpaceId
}