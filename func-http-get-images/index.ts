import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface HttpResponse {
    status: number
    headers?: { [name: string]: string }
    body?: unknown    
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {

    let status = 200
    let contentType = "application/json"
    let body:object = []

    const items = context.bindings.cosmos
    if (items === undefined) {
        status = 500
    }else {
        for (var i = 0; i < items.length; i++){
            body[i] = { "id": items[i].id, "uri": items[i].uri }
        }
    }

    return {
        status: status,
        headers: { "content-type": contentType },
        body: body
    }
};

export default httpTrigger;