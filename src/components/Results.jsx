import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

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
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/news":
      return "NEWS";
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.image_results?.map(
            ({ image, link: { href, title } }, index) => (
              <a
                href={href}
                key={index}
                className="sm:p-3 p-5"
                target="_blank"
                rel="noreferrer"
              >
                <img src={image?.src} alt={title} loading="lazy" />
                <p className="w-36 break-words text-sm mt-2">{title}</p>
              </a>
            )
          )}
        </div>
      );
    case "/vidoes":
      return "VIDEOS";
    default:
      return "ERROR!";
  }
}
