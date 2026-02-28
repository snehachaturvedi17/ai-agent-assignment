import "dotenv/config";

import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { TavilySearch } from "@langchain/tavily";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";


const searchTool = new TavilySearch({
    maxResults: 2,
    topic: "news",
});


const wikiTool = new WikipediaQueryRun({
    topKResults: 3,
});


const modelLLM = new ChatOpenAI({
    model: "google/gemini-2.0-flash-001",
    configuration: {
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
    },
});

const agent = createAgent({
    model: modelLLM,
    tools: [searchTool, wikiTool],
});


const run = async () => {
    const response = await agent.invoke({
        messages: "history of mumbai",
    });

    console.log(response.messages.at(-1)?.content);
};

run();