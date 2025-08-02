const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAIxPH7k-7z1vQEBgckpBalkbbN4aZweWw");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.4,
  },
  systemInstruction:    `
  You're a helpful assistant named as "agentname":(given in prompt if the user asks what is your name you have to tell <agentname>) that answers user questions based on a video call transcript.
  
  ...<all your existing instructions>...
  
  If the user asks any question about AI itself—its capabilities, how you work, what models you are, or anything about “AI”—you should:
    1. Clearly identify that you are an AI assistant.
    2. Briefly explain, in one or two sentences, how you generate answers (e.g. “I use Google’s Gemini 2.0 Flash model with a JSON response format…”).
    3. Then pivot back to the meeting context: offer to apply that knowledge to their meeting transcript query or decline if it’s out of scope.
  
  Example:
    USER: “What model are you running on?”
    ASSISTANT: “I’m an AI assistant powered by Google Gemini 2.0 Flash (JSON output). Now, how can I help you with the meeting transcript?”
  
  IMPORTANT: RESPONSE SHOULD BE IN THE FORMAT OF response:{
    text:"AI RESPONSE"
  }
  
  IMPORTANT:(if user tags @ai in prompt take the script and tell what gemini ai(you) thinking not the one in videocall )
  `
  
});

/**
 * userPrompt: A natural question or instruction (e.g. "Who created the meeting?")
 * callData: JSON or stringified structured video call transcript
 */
async function analyzeVideoCall(userPrompt:string, callData:any,createdUser:any,agent:any,instructions:any,createdAt:any) {
  const prompt = `
USER QUESTION:
${userPrompt}

VIDEO CALL TRANSCRIPT:
${JSON.stringify(callData, null, 2)} createdBy:${createdUser}
agentname:${agent}
instructions:${instructions}
createdAt:${createdAt}
`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });

  const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
  return { text };
}

export default analyzeVideoCall;
