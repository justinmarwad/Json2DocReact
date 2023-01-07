import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import DocxtemplaterHtmlModule from "docxtemplater-html-module";

DATA = {
    title: "My Title",
    description: "My Description",
    items: [{
        name: "Item 1",
        description: "Description 1",
    },]     
}

const Export = () => {    
    function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
    }
    
    const generateDocument = () => {
        loadFile("/Template.docx",
            function (error, content) {
                if (error) {throw error;}
                
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                    modules: [new DocxtemplaterHtmlModule({})],
                });

                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render(DATA);
                
                const blob = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                }); //Output the document using Data-URI
                saveAs(blob, "output.docx");
            }
        );
    };

    return (
        <div className="p-2">
            <button onClick={generateDocument}>
                Generate document
            </button>
        </div>
    );
        
};

export default Export;