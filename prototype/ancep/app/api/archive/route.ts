import { NextResponse } from 'next/server';
import WordExtractor from 'word-extractor';
import fs from 'fs';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const doc = searchParams.get('doc');

    console.log('Search params: ', searchParams);

    if(!doc) {
        const files = fs.readdirSync("lib/archive");
        
        console.log('Files fetch');

        return NextResponse.json(files);
    } 

    const extractor = new WordExtractor();
    const extracted = await extractor.extract("lib/archive/" + doc);    

    return NextResponse.json(extracted.getBody());
}