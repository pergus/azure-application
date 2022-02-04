import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface HttpResponse {
    status: number
    headers?: { [name: string]: string }
    body?: unknown    
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('HTTP trigger function processed a request.');
    
    const body = {
        text: "No Jokes Today..."
    }

    context.res = {
        status: 200,
        headers: {
            "content-type": "application/json"
        },
        body
    };

};

export default httpTrigger;