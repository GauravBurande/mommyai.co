import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: "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",
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
        const prompt = `If I ask inappropriate,contaning maicious or dirty words, explicit, 18+, harmfull for kids story to generate, then decline my request and tell me not to do it, reasons and don't tell me any story!. tell me an entertaining, engaging and imaginative story with a title with a title first. With extreme randomness, of ${userPrompt}. don't overexplain characters, whenever a statement can cause why, who, how and what type of question, explain the statement. don't overexplain useless things.`

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 3000,
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