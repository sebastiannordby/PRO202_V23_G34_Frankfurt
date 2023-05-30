import { NextResponse } from 'next/server';
import WordExtractor from 'word-extractor';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const doc = searchParams.get('doc');
    const filePath = path.join(process.cwd(), '/lib/archive');

    console.log('Filepath: ', filePath);

    console.log('Search params: ', searchParams);

    if(!doc) {
        const files = fs.readdirSync(filePath);
        console.log('Files fetch');

        return NextResponse.json(files);
    } 

    const extractor = new WordExtractor();
    const extracted = await extractor.extract(filePath + "/" + doc);    

    return NextResponse.json(extracted.getBody());
}