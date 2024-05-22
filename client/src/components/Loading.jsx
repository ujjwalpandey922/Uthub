import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loading = () => {
  function Box({ children }) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "15px",
          display: "block",
          lineHeight: 1.5,
          marginBottom: "0.5rem",
          width: 300,
          height: 200,
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
        {[...Array(9)].map((_, index) => (
          <Box key={index}>
            <Skeleton height="100%" width="100%" />
          </Box>
        ))}
      </SkeletonTheme>
    </div>
  );
};

export default Loading;
