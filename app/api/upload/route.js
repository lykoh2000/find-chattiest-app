import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        const formData = await req.formData();

        const file = formData.get("file");
        if (!file) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        // Read the file
        const fileBytes  = await file.arrayBuffer();
        const fileContent = Buffer.from(fileBytes).toString('utf8');

        // Validate the file format
        const regex = /<.+?>/g;
        
        // Test the regular expression against the string
        const hasUser = regex.test(fileContent);
        if (!hasUser) {
            console.log('Invalid File Format');
            return NextResponse.json({ message: "Invalid file format.",  status: 400 });
        }
        // Calculate the chattiest user
        const wordCountPerUser = {};
        let currentUser = null;
        const lines = fileContent.split('\n');
        lines.forEach(line => {
            const matches = line.match(/<([^>]+)>\s(.+)/);
            if (matches && matches.length === 3) {
                const user = matches[1];
                const words = matches[2].split(' ');
                currentUser = user; 
                wordCountPerUser[user] = (wordCountPerUser[user] || 0) + words.length;
            } else if (currentUser) {
                const words = line.split(' ');
                wordCountPerUser[currentUser] = (wordCountPerUser[currentUser] || 0) + words.length;
            }
        });

        return NextResponse.json({ message: "Success", status: 200, data: wordCountPerUser });
    } catch (error) {
        return NextResponse.json({ message: error, status: 500 });
    }
};