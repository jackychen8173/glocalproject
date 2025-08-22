import React from "react";

const Footer = () => (
  <footer
  className="text-center text-muted mt-4 mb-5"
  style={{ fontSize: "0.9rem" }}
>
  <div>
    Data Source:{" "}
    <a
      href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XBZHKC"
      target="_blank"
      rel="noreferrer"
    >
      CES 2021 Dataset
    </a>
  </div>
  <div>
    Stephenson, Laura B.; Harell, Allison; Rubenson, Daniel; Loewen, Peter John
    (2022). <em>2021 Canadian Election Study (CES)</em>.{" "}
    <a
      href="https://doi.org/10.7910/DVN/XBZHKC"
      target="_blank"
      rel="noreferrer"
    >
      https://doi.org/10.7910/DVN/XBZHKC
    </a>. Harvard Dataverse, V1.
  </div>
</footer>

);

export default Footer;
