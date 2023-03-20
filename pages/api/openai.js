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
        const prompt = `If I ask inappropriate, contaning maicious or dirty words, explicit, story to generate, then decline my request,explain why and don't tell me any story otherwise do as I say! tell me entertaining, engaging and imaginative story with a title with a title first.With extreme randomness, of ${userPrompt}. whenever a statement can cause why, who, how and what type of question, explain the statement. don't overexplain things. Just give me the story with title and nothing else!`

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 1500,
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