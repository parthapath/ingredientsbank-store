import React from "react";

const HtmlContent = ({ html }) => {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default HtmlContent;
