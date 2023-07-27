import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const filename2 = fileURLToPath(import.meta.url);
const _dirname = dirname(filename2);



export const pathToSrc = path.dirname(path.resolve(_dirname));
export const BLOCK_TIME = 5 * 60 * 1000;
export const MAX_LOGIN_ATTEMPT_TO_BLOCK = 15;
