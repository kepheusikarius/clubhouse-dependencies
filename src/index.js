import dotenv from 'dotenv';
import { loadConfig } from './config.mjs';
import { start } from './app.mjs';

dotenv.config();
loadConfig();
start();
