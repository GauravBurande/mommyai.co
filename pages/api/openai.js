import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(
    req,
    res
) {
    const { userPrompt } = req.body;

    if (!userPrompt) {
        return res
            .status(405)
            .json({ error: true, message: "No input prompt found!" });
    }
    try {

        const messages = [
            { role: "user", content: userPrompt }
        ]

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 2500,
            temperature: 0.8
        });

        const text = response.data.choices[0].message.content?.trim() || "Sorry, there was a problem!";

        res.status(200).json({ success: true, text: text });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: true, message: error.response.data });
        } else {
            res.status(500).json({ error: true, message: error.message });
        }
    }
}