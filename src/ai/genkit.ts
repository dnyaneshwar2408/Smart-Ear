import {genkit} from 'genkit';
import {ollama} from 'genkitx-ollama';

export const ai = genkit({
  plugins: [
    ollama({
      models: [
        {name: 'gemma3', type: 'generate'},
        {name: 'gemma:2b', type: 'generate'},
      ],
      serverAddress: 'http://127.0.0.1:11434', // default address
    }),
  ],
  model: 'ollama/gemma:2b',
});
