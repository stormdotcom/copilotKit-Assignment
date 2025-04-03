import {
    CopilotRuntime,
    ExperimentalEmptyAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
    langGraphPlatformEndpoint
    // ...
} from "@copilotkit";
import { NextRequest } from "next/server";

// You can use any service adapter here for multi-agent support.
const serviceAdapter = new ExperimentalEmptyAdapter();

const runtime = new CopilotRuntime({
    remoteEndpoints: [
        langGraphPlatformEndpoint({
            deploymentUrl: "your-api-url", // make sure to replace with your real deployment url,
            langsmithApiKey: "sv2_pt_26322adbab5240d08ef73ad64556f2c3_ecf47fea0f", // only used in LangGraph Platform deployments
            agents: [ // List any agents available under "graphs" list in your langgraph.json file; give each a description explaining when it should be called.
                {
                    name: 'sample_agent',
                    description: 'A helpful LLM agent.',
                    assistantId: 'your-assistant-ID' // optional, but recommended!
                }
            ]
        }),
    ],
});

export const POST = async (req: NextRequest) => {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: "/api/copilotkit",
    });

    return handleRequest(req);
};