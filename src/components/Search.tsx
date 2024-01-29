import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo } from "react";
import Card from "@components/Card";
import type { CollectionEntry } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { getCollection } from "astro:content";

export type SearchItem = {
  title: string;
  description: string;
  data: CollectionEntry<"blog">["data"];
  slug: string;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );
  const [sortedPosts, setSortedPosts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const delay = 600;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["title", "description"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList]
  );

  useEffect(() => {
    // Reset and hide results message when inputVal changes
    setShowResults(false);

    // Set a delay to show results
    const timer = setTimeout(() => {
      if (inputVal.length > 1) {
        setShowResults(true);
      }
    }, delay);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, [inputVal]); // Dependency on inputVal

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
      setSearchResults(inputResult);

      if (inputVal.length > 0) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("q", inputVal);
        const newRelativePathQuery =
          window.location.pathname + "?" + searchParams.toString();
        history.replaceState(history.state, "", newRelativePathQuery);
      } else {
        history.replaceState(history.state, "", window.location.pathname);
      }
    }, delay);

    return () => clearTimeout(timer); // Clear timeout on cleanup
  }, [inputVal, fuse]);

  useEffect(() => {
    const loadSortedPosts = async () => {
      const posts = await getCollection("blog", ({ data }) => !data.draft);
      setSortedPosts(getSortedPosts(posts));
    };

    loadSortedPosts();
  }, []);

  return (
    <>
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
        </span>
        <input
          className="block w-full border border-skin-fill border-opacity-40 bg-skin-fill py-3 pl-10 mb-6 pr-3 placeholder:italic placeholder:text-opacity-75 focus:border-skin-accent focus:outline-none"
          placeholder="Search for anything..."
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          ref={inputRef}
        />
      </label>

      {inputVal.length === 0 && (
        <ul className="flex flex-col gap-7 sm:gap-4">
          {sortedPosts.map(({ data, slug }) => (
            <Card href={`/blog/${slug}`} frontmatter={data} key={slug} />
          ))}
        </ul>
      )}

      {showResults &&
        (inputVal.length > 1 ? (
          <div className="mt-2">
            Found {searchResults?.length} {searchResults?.length === 1 ? " result" : " results"} for '{inputVal}'
          </div>
        ) : (
          <div className="mt-2">No results, try again.</div>
        ))}

      <ul className="mt-4 flex flex-col gap-7 sm:gap-4">
        {searchResults &&
          searchResults.map(({ item, refIndex }) => (
            <Card
              href={`/blog/${item.slug}`}
              frontmatter={item.data}
              key={`${refIndex}-${item.slug}`}
            />
          ))}
      </ul>
    </>
  );
}
