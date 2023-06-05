export function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email')?.toLocaleLowerCase() ?? '';

    

}