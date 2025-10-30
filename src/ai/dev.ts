import { config } from 'dotenv';
config();

import '@/ai/flows/generate-mbom-from-ebom.ts';
import '@/ai/flows/identify-missing-components.ts';