import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// User requested Gemini 3. Adjust model name as needed when available.
// For now using a variable to easily switch.
export const GEMINI_MODEL_NAME = "gemini-pro";

export const aiModel = genAI.getGenerativeModel({
    model: GEMINI_MODEL_NAME,
    generationConfig: {
        temperature: 0.4,
    }
});
