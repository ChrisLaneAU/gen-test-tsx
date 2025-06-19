import OpenAI from 'openai';

export const generateTestContent = async (instructions: string) => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await client.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful code generation assistant.',
      },
      { role: 'user', content: instructions },
    ],
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
};
