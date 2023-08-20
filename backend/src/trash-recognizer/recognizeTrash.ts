import fetch from 'node-fetch';
import fs from 'fs';

export async function recognizeTrash(data: Buffer): Promise<boolean> {
    fs.writeFileSync('image.jpg', data);
    const d: { score: number; label: string }[] = await query(data);
    if (!(d instanceof Array)) return false;
    return d.sort((a, b) => b.score - a.score)[0].score > 0.2;
}

async function query(data: Buffer) {
    const response = await fetch('https://api-inference.huggingface.co/models/yangy50/garbage-classification', {
        headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
        method: 'POST',
        body: data,
    });
    const result = await response.json();
    return result;
}
