import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
//load pdf
const loader = new PDFLoader("ATM Simulation System.pdf");
const docs =  loader.load();


let textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

let embeddingModel = new OllamaEmbeddings({
    model: "",
});

