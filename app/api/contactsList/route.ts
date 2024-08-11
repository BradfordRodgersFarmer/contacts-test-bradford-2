import  { NextRequest, NextResponse } from 'next/server'
import { baseDb } from "@/utils/bindings";
export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const contacts = await baseDb.prepare("SELECT first_name as firstName, last_name as lastName, phone ,email, id  FROM contacts where active = 1").all();
    return NextResponse.json({data: contacts.results})
}