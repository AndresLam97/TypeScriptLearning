import readline from 'readline';

export const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

export function getNumberInput(message: string): Promise<number> {
   return new Promise(res => {
       rl.question(message, ans => res(Number(ans.trim())));
   });
}

export function getStringInput(message: string): Promise<string> {
   return new Promise(res => {
       rl.question(message, ans => res(ans.trim()));
   });
}