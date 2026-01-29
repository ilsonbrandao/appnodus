// Usando fetch direto para evitar problemas com a biblioteca SDK
const API_KEY = process.env.GEMINI_API_KEY;

export async function generateAIAnalysis(prompt: string) {
    if (!API_KEY) {
        throw new Error("GEMINI_API_KEY is not defined in .env");
    }

    // Use gemini-1.5-flash (faster and more reliable for free tier)
    const model = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

    // console.log("DEBUG: Calling Gemini REST API:", model);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API REST Error:", response.status, errorText);
            throw new Error(`Gemini API Error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error("Gemini Unexpected Response:", JSON.stringify(data));
            throw new Error("Invalid response format from Gemini");
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("AI Generation Failed:", error);

        // Simple fallback to avoid crashing UI, but informative
        return "⚠️ A IA não pôde processar a solicitação no momento. Verifique a API Key ou tente novamente mais tarde.";
    }
}
