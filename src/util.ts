import type { MDXInstance, Post } from "./types";
import getReadingTime from "reading-time";

export function sortMDByDate(posts: MDXInstance<Post>[] = []) {
	return posts.sort(
		(a, b) =>
			new Date(b.frontmatter.publishDate).valueOf() -
			new Date(a.frontmatter.publishDate).valueOf()
	);
}

// This function expects the @arg posts to be sorted by sortMDByDate()
export function getPreviousAndNextPosts(
	currentSlug: string,
	posts: MDXInstance<Post>[] = []
) {
	const index = posts.findIndex(({ url }) => url === currentSlug);
	return {
		prev: posts[index + 1] ?? null,
		next: posts[index - 1] ?? null,
	};
}

export function getAllTags(posts: MDXInstance<Post>[] = []) {
	const allTags = new Set<string>();
	posts.forEach((post) => {
		post.frontmatter.tags?.map((tag) => allTags.add(tag.toLowerCase()));
	});
	return [...allTags];
}

export function getAllTagsWithCount(posts: MDXInstance<Post>[] = []): {
	[key: string]: number;
} {
	return posts.reduce((prev, post) => {
		const currTags = { ...prev };
		post.frontmatter.tags?.forEach(function (tag) {
			currTags[tag] = (currTags[tag] || 0) + 1;
		});
		return currTags;
	}, {});
}

export function toggleClass(element: HTMLElement, className: string) {
	element.classList.toggle(className);
}

export function elementHasClass(element: HTMLElement, className: string) {
	return element.classList.contains(className);
}

export function getLocaleTime(
	date: number | Date,
	options: Intl.DateTimeFormatOptions = {},
	locale: string | string[] = "en-GB"
) {
	const formatOptions: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
		...options,
	};
	return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}


export const getNormalizedPost = async (post) => {
  const { frontmatter, compiledContent, rawContent, file } = post;
  const ID = file.split("/").pop().split(".").shift();

  return {
    id: ID,

    pubDate: frontmatter.pubDate,
    draft: frontmatter.draft,

    canonical: frontmatter.canonical,
    slug: frontmatter.slug || ID,

    title: frontmatter.title,
    description: frontmatter.description,
    body: compiledContent(),
    image: frontmatter.image,

    excerpt: frontmatter.excerpt,
    authors: frontmatter.authors,
    category: frontmatter.category,
    tags: frontmatter.tags,
    readingTime: Math.ceil(getReadingTime(rawContent()).minutes),
  };
};

async function load() {
	const fetchedPosts = import.meta.glob('../pages/posts/*.md', { eager: true });
  
	const getPost = async (key) => {
	  const url = key.replace('../pages/', '/').replace('.md', '/');
	  const awaitedPost = await fetchedPosts[key].default();
	  const item = { ...awaitedPost.props.frontmatter, url, key };
	  return item;
	};
  
	const mappedPosts = Object.keys(fetchedPosts).map((key) => {
	  const awaitedPost = getPost(key);
	  return awaitedPost;
	});
  
	const results = await Promise.all(mappedPosts);
	return results;
  }
  
  let _posts;
  
  export async function getAllPosts() {
	_posts = _posts || load();
  
	return await _posts;
  }