export interface Comment {
  id: number
  name: string
  legalNorm: Link[]
  refereces: Link[]
}

export interface Link {
  to: string
  text: string
}
