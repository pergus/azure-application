import { AzureFunction, Context } from "@azure/functions"
const resizeImg = require('resize-img');


interface Message {
    id: string;
    uri: string;
}

interface Document {
    id: string;
    uri: string;
}

const serviceBusQueueTrigger: AzureFunction = async function(context: Context, busMessage: Message): Promise<void> {
    console.log("busMessage" + busMessage)
    // Get image from Blob storage as input binding
    // Get document from Cosmos DB as input binding

    // Create a thumbnail of the image
    const thumbnail = await resizeImg(context.bindings.image, { width: 128, height: 128 })

    // Store the thumbnail in the blob storage
    context.bindings.thumbnail = thumbnail

    // Add the thumbnail uri to the document and store it in CosmosDB
    context.bindings.newDoc = { ...context.bindings.doc, thumbnail: "https://pergusimagestore.blob.core.windows.net/thumbnails/" + context.bindings.doc.id  + ".jpg" }
};

export default serviceBusQueueTrigger;
