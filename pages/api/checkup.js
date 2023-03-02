import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: localStorage.getItem('apiKey'),
});

const gpt3 = new OpenAIApi(config);

export default async function handler(
    req,
    res
) {
    const { prompt } = req.body;

    if (!prompt) {
        return res
            .status(405)
            .json({ error: true, message: "No input prompt found" });
    }

    res.status(200).json({ apiKey, prompt: prompt });
    try {
        const response = await gpt3.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            temperature: 0.8,
            max_tokens: 4000,
        });
        const text = response.data.choices[0].text?.trim() || "Sorry, there was a problem!";

        res.status(200).json({ success: true, text: text });
        console.log(text)
    } catch (error) {
        res.status(500).json({ error: true, message: error });
        console.log(error)
    }
}