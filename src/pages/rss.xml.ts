import rss from '@astrojs/rss'
import type { MarkdownLayoutProps } from 'astro'
import type { Frontmatter } from '@/types'

interface MdxProps extends MarkdownLayoutProps<Frontmatter> {
  url: string
}

const postImportResult = import.meta.glob<MdxProps>('./blog/*.mdx', { eager: true })
const posts = Object.values(postImportResult)
const nonDraftPosts = posts.filter(({ frontmatter }) => !frontmatter.draft)

export const get = () =>
  rss({
    title: 'Manuel’s Blog',
    description: 'Manuel Fessen | UX Designer',
    site: import.meta.env.SITE,
    items: nonDraftPosts.map(({ url, frontmatter }) => ({
      link: url,
      title: frontmatter.title,
      description: frontmatter.description,
      pubDate: new Date(frontmatter.publishedAt),
    })),
    customData: `<language>en-us</language>`,
  })
