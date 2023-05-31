import { NextResponse } from 'next/server';
import WordExtractor from 'word-extractor';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('search')?.toLocaleLowerCase();
    const filePath = path.join(process.cwd(), '/lib/archive');
    const files = await fs.readdir(filePath);

    if(searchText && searchText.length > 0) {
        return NextResponse.json(
            files.filter(x => x.toLocaleLowerCase().includes(searchText)));
    }

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