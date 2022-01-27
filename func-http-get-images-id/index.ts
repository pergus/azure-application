import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface HttpResponse {
    status: number
    headers?: { [name: string]: string }
    body?: unknown    
}

interface Image {
    id: string
    uri: string
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, image: Image): Promise<HttpResponse> {
    
    
    let status = 200
    let contentType = "application/json"
    let body:object = null

    if (image === undefined) {
        status = 400
    }
    
    return {
        status: status,
        headers: { "content-type": contentType },
        body: image
    }

};

export default httpTrigger;