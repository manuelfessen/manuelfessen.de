import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-base font-medium hover:underline text-skin-accent",
  };

  return (
    <li className="flex flex-col space-y-1">
      <a
        href={href}
        className="-mx-3 flex flex-col px-3 text-base tracking-tight hover:!no-underline"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
        <p>{description}</p>
      </a>
    </li>
  );
}
