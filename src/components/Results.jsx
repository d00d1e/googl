import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import ReactHtmlParser from "react-html-parser";

import { useStateContext } from "../contexts/Context";
import Loading from "./Loading";

export default function Results() {
  const { results, searchQuery, isLoading, getResults } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (searchQuery) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchQuery} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchQuery}&num=40`);
      }
    }
  }, [location.pathname, searchQuery]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="justify-between space-y-6 sm:px-28 ml-20">
          {results?.map(
            ({ link, title, description }, index) =>
              (
                <div key={index} className="sm:w-full md:max-w-lg">
                  <a href={link} className="text-sm">
                    <p className="text-sm">
                      {link.length > 30 ? link.substring(0, 50) + "..." : link}
                    </p>
                  </a>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700 mt-1 mb-1">
                    {title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {description?.substring(0, 200)}...
                  </p>
                </div>
              )``
          )}
        </div>
      );
    case "/news":
      return (
        <div className="justify-between space-y-6 sm:px-28 ml-20">
          <div className="text-sm text-gray-500">
            About {results.length} results
          </div>
          {results?.map(
            ({ links, id, source, title, published, summary }, index) => (
              <div
                key={index}
                className="sm:w-full md:max-w-2xl border border-gray-200 rounded-md p-4"
              >
                <p className="text-xs text-gray-500 pb-1">{source.title}</p>
                <a
                  key={id}
                  href={links?.[0].href}
                  className="hover:text-blue-700"
                >
                  <p className="text-lg dark:text-white-300 text-black-700 pb-2">
                    {title.split(" - ")[0]}
                  </p>
                </a>
                <div className="text-sm text-gray-500 h-16 whitespace-normal">
                  {ReactHtmlParser(summary)}
                </div>
                <p className="text-gray-500 text-sm">
                  {published?.slice(0, 16)}
                </p>
              </div>
            )
          )}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-start">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              href={href}
              key={index}
              className="sm:p-3 p-5"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={image?.src}
                alt={title}
                loading="lazy"
                className="h-42 w-64 object-contain"
              />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap justify-center">
          {results.map((video, index) => (
            <div key={index} className="p-2 ">
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  width="355"
                  height="200"
                  controls
                />
              )}
            </div>
          ))}
        </div>
      );
    default:
      return "No Results!";
  }
}
