const url = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

if (!url || !apiKey) {
  throw new Error('API URL or API Key is missing in environment variables.');
}
export const sendMessage = async (message: string, onProgress: (chunk: string) => void) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3', 
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 512,
        temperature: 0.1,
        top_p: 0.9,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Handle streaming response
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        chunk
          .split('\n') 
          .filter((line) => line.startsWith('data: '))
          .forEach((line) => {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.choices[0].delta.content) {
                onProgress(json.choices[0].delta.content);
              }
            } catch (error) {
              console.error('Error parsing chunk:', error);
            }
          });
      }
    }
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};