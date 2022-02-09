import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { BlobServiceClient } from "@azure/storage-blob"
import { v4 as uuidv4 } from 'uuid';

interface HttpResponse {
    status: number
    headers?: { [name: string]: string }
    body?: unknown    
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
    
    const id = uuidv4()
    let status = 201
    let body:object = null
    let contentType = "application/json"

    if (req.headers["content-type"] == "application/octet-stream"){

        // Add the image to the image container in the Blob
        const client = BlobServiceClient.fromConnectionString(process.env.pergusimagestore_STORAGE).getContainerClient("images")    
        const blob = client.getBlockBlobClient(id + ".jpg");
        await blob.upload(req.body, Buffer.byteLength(req.body))

        //body = { "id": id, "uri": "https://pergusimagestore.blob.core.windows.net/images/" + id  + ".jpg"}
        body = { "id": id, "uri": "https://pergusxqodmsj6q5ckm.blob.core.windows.net/images/" + id  + ".jpg"}

        // Add the body to the images container in cosmosDB
        context.bindings.cosmos = body

        // Sent the body to the message bus
        context.bindings.busOut = body

    }else {
            status = 500,
            body = { response: req.headers["content-type"] + " is not a valid Content-Type" }
            context.log.error("Internal server error when storing image")
    }



    return {
        status: status,
        headers: { "content-type": contentType },
        body: body
    }
    
};

export default httpTrigger;