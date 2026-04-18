const { streamText } = require('ai');
const { google } = require('@ai-sdk/google');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  try {
    const result = streamText({
      model: google('gemini-1.5-flash'),
      messages: [{role: 'user', content: 'test'}],
    });
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
    console.log('\nDone.');
  } catch(e) {
    console.error('Error:', e);
  }
}
run();
