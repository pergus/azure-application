import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { BlobServiceClient } from "@azure/storage-blob"
import { v4 as uuidv4 } from 'uuid';

interface HttpResponse {
    status: number
    headers?: { [name: string]: string }
    body?: unknown    
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {

    const client = BlobServiceClient.fromConnectionString(process.env.pergusimagestore_STORAGE).getContainerClient("images")
    const id = uuidv4()
    const blob = client.getBlockBlobClient(id);
    blob.upload(req.body, Buffer.byteLength(req.body))

    return {
        status: 200,
        body: "https://pergusimagestore.blob.core.windows.net/images/" + id
    }
    
};

export default httpTrigger;