import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useStateContext } from "../contexts/Context";
import Loading from "./Loading";

export default function Results() {
  const { results, searchTerm, isLoading, getResults } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    getResults("/search/q=elon+musk&num=100");
  }, []);

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
      return "IMAGES";
    case "/vidoes":
      return "VIDEOS";
    default:
      return "ERROR!";
  }
}
