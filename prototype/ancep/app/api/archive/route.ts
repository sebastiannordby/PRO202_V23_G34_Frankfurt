import { NextResponse } from 'next/server';
import WordExtractor from 'word-extractor';
import fs from 'fs/promises';
import path from 'path';

    // const { searchParams } = new URL(request.url);
    // const doc = searchParams.get('doc');

export async function GET(request: Request) {
    const filePath = path.join(process.cwd(), '/lib/archive');
    const files = await fs.readdir(filePath);

    return NextResponse.json(files);
}

export async function POST(request: Request) {
    const {fileName} = await request.json();

    console.log({
        fileName
    });

    const filePath = path.join(process.cwd(), '/lib/archive/' + fileName);
    const fileContent = await fs.readFile(filePath);
    const fileContentStr = fileContent.toString();

    return NextResponse.json({
        text: fileContentStr
    });
}