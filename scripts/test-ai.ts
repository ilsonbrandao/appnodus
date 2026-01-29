import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

async function main() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ GEMINI_API_KEY not found in env");
        return;
    }
    console.log("🔑 API Key found (termina com ...", process.env.GEMINI_API_KEY.slice(-4), ")");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Lista de modelos para testar
    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    for (const name of candidates) {
        console.log(`\n🤖 Testando modelo: ${name}...`);
        try {
            const model = genAI.getGenerativeModel({ model: name });
            const result = await model.generateContent("Diga 'OK' se estiver funcionando.");
            const response = await result.response;
            console.log(`✅ SUCESSO! O modelo '${name}' respondeu:`, response.text());
            console.log(`\n👉 CONCLUSÃO: Devemos configurar o sistema para usar '${name}'.`);
            return;
        } catch (error: any) {
            // Captura msg de erro resumida
            let msg = error.message || "Erro desconhecido";
            if (msg.includes("[404")) msg = "404 Model Not Found (Não existe ou sem acesso)";
            console.error(`❌ Falha no '${name}':`, msg);
        }
    }
    console.log("\n⚠️ Nenhum modelo funcionou. Possível problema com a Chave de API (Billing, Região ou validade).");
}

main();
