import React from "react";
import { useLocation } from "react-router-dom";

export const UrlExtract = () => {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const url = new URL(window.location.href);

  // Get the path segments
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Get the hash
  const hash = url.hash;

  const result = `${lastSegment}${hash}`;
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const NavBarMiddle = () => {
  return (
    <div>
      <h1 style={{ color: "white" }}>
        <UrlExtract />
      </h1>
    </div>
  );
};

export default NavBarMiddle;
