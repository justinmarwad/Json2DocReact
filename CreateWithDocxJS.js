import React, { useRef, useEffect } from 'react';
import { AlignmentType, Document, Footer, Header, Packer, PageBreak, PageNumber, Paragraph, TextRun, TableOfContents, StyleLevel, HeadingLevel  } from "docx";
import { saveAs } from 'file-saver';

const Export = () => {


  const doc = new Document({
    sections: [
        {
            properties: {
                titlePage: true,
            },
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun("My Title "),
                                new TextRun({
                                    children: ["Page ", PageNumber.CURRENT],
                                }),
                            ],
                        }),
                    ],
                }),
                first: new Header({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun("First Page Header "),
                                new TextRun({
                                    children: ["Page ", PageNumber.CURRENT],
                                }),
                            ],
                        }),
                    ],
                }),
            },
            footers: {
                default: new Footer({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun("My Title "),
                                new TextRun({
                                    children: ["Footer - Page ", PageNumber.CURRENT],
                                }),
                            ],
                        }),
                    ],
                }),
                first: new Footer({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun("First Page Footer "),
                                new TextRun({
                                    children: ["Page ", PageNumber.CURRENT],
                                }),
                            ],
                        }),
                    ],
                }),
            },
            children: [

                new TableOfContents("Summary", {
                    hyperlink: true,
                    headingStyleRange: "1-5",
                    stylesWithLevels: [new StyleLevel("MySpectacularStyle", 1)],
                }),
                new Paragraph({
                    text: "Header #1",
                    heading: HeadingLevel.HEADING_1,
                    pageBreakBefore: true,
                }),
                new Paragraph("I'm a little text very nicely written.'"),
                new Paragraph({
                    text: "Header #2",
                    heading: HeadingLevel.HEADING_1,
                    pageBreakBefore: true,
                }),
                new Paragraph("I'm a other text very nicely written.'"),
                new Paragraph({
                    text: "Header #2.1",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph("I'm a another text very nicely written.'"),
                new Paragraph({
                    text: "My Spectacular Style #1",
                    style: "MySpectacularStyle",
                    pageBreakBefore: true,
                }),

                new Paragraph({
                    children: [new TextRun("First Page"), new PageBreak()],
                }),
                new Paragraph("Second Page"),
            ],
        },
    ],
});

  // export the file
  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });

  return(
    <div> 
      <h1>Export - Finished</h1>
    </div>
  );
};
  
  export default Export;