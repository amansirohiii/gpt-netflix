import OpenAI from 'openai';
import { OPENAI_API } from './constants';

const openai = new OpenAI({
  apiKey: OPENAI_API,
  dangerouslyAllowBrowser: true  
});
export default openai;