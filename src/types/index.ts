export { type Frontmatter } from './frontmatter'

type SiteMeta = {
	title: string
	description: string
	publishedAt?: string
	image?: string;
	imageTwitter?: string;
};
  

export type {
	SiteMeta,
}