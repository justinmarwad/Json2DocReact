import { TemplateHandler } from 'easy-template-x';

DATA = {
    title: "My Title",
    description: "My Description",
    items: [{
        name: "Item 1",
        description: "Description 1",
    },]     
}
function saveFile(filename, blob) {

    // get downloadable url from the blob
    const blobUrl = URL.createObjectURL(blob);

    // create temp link element
    let link = document.createElement("a");
    link.download = filename;
    link.href = blobUrl;

    // use the link to invoke a download
    document.body.appendChild(link);
    link.click();

    // remove the link
    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
    }, 0);
}


const Export = () => {

    async function processTemplateWithETX() {
        // 1. read template file
        // const response = await fetch('/DebateTemplate.docx');
        const response = await fetch('/SimpleTemplate.docx');
        const templateFile = await  response.blob();

        // 2. process the template
        const handler = new TemplateHandler();
        const doc = await handler.process(templateFile, DATA);

        // 3. save output
        saveFile('output.docx', doc);
    }

    return (
        <div className="p-2">
            <button onClick={processTemplateWithETX}>
                Generate document
            </button>
        </div>
    );
        
};

export default Export;