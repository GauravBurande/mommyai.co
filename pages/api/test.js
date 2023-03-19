import { Configuration, OpenAIApi } from "openai";

export default async function handler(
    req,
    res
) {
    const { userPrompt, key } = req.body;

    const config = new Configuration({
        apiKey: key,
    });
    const openai = new OpenAIApi(config);

    if (!userPrompt) {
        return res
            .status(405)
            .json({ error: true, message: "No input prompt found!" });
    }
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: userPrompt,
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const text = response.data.choices[0].text?.trim() || "Sorry, there was a problem!";

        res.status(200).json({ success: true, text: text });
    } catch (error) {
        res.status(500).json({ error: true, message: error });
        console.log(error)
    }
}