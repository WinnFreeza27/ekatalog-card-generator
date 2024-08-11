import { NextResponse } from "next/server";
import scrape from "@/lib/scrape"; // Adjust this path based on your actual directory structure

export async function GET(req) {
    try {
        const link = req.nextUrl.searchParams.get('link');
        const data = await scrape(link);
        return NextResponse.json(data, { status: 200 }); // Use NextResponse.json for JSON responses
    } catch (error) {
        console.error("Error during scraping:", error);
        return NextResponse.json({ error: 'Failed to scrape data' }, { status: 500 });
    }
}
