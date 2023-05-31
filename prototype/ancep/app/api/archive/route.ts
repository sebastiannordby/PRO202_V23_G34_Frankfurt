import { NextResponse } from 'next/server';
import WordExtractor from 'word-extractor';
import fs from 'fs';
import path from 'path';

    // const { searchParams } = new URL(request.url);
    // const doc = searchParams.get('doc');

export function GET(request: Request) {
    const filePath = path.join(process.cwd(), '/lib/archive');
    const files = fs.readdirSync(filePath);

    return NextResponse.json(files);
}

export async function POST(request: Request) {
    const {fileName} = await request.json();

    console.log({
        fileName
    });

    const filePath = path.join(process.cwd(), '/lib/archive/' + fileName);
    console.log('FilePath: ', filePath);
    const extractor = new WordExtractor();
    const extracted = await extractor.extract(filePath);    

    return NextResponse.json(extracted.getBody());
}