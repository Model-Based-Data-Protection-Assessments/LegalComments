export interface Comment {
  id: number
  legalTerm: string
  usedIn: Link[]
  description: string
  relatedComments: number[]
  basedOn: Link[]
  references: Link[]
  constraint: string
}

export interface Link {
  to: string
  text: string
}

export type CommentKeys = keyof Comment
