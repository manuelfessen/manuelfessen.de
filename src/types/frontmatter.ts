export interface Frontmatter {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author?:string
  tags: string[]
  slug: string
  minutesRead: string
  draft?: boolean
  hero?: string
  pinned?: boolean
  externalLink?: string
}
