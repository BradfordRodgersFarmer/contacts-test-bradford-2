import  { NextRequest, NextResponse } from 'next/server'
import { baseDb } from "@/utils/bindings";
export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const firstName =  searchParams.get("firstName")
    const lastName =  searchParams.get("lastName")
    const email = searchParams.get("email")
    const phone = searchParams.get("phone")

    if (!firstName || !lastName || !email || !phone) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 500 })
    }

    const checkEmail = await baseDb.prepare("SELECT * FROM contacts WHERE email = ?").bind(email).all();
    if (checkEmail.results.length) {
        return NextResponse.json({ message: 'Email already exists' }, { status: 500 })
    }
    await new Promise(resolve => setTimeout(resolve, 20000));
    const insert = await baseDb.prepare("INSERT INTO contactsCreate (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)").run(firstName, lastName, email, phone);
    const id = insert.meta.last_row_id;
    await baseDb.prepare("INSERT INTO audit_log (action, created_at, old_value, new_value, contact_id ) VALUES (?, ?, ?, ?, ? )").run('create', new Date().toISOString(), '', `firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phone: ${phone}`, id);
    return NextResponse.json({ message: 'Contact created successfully' })
}

export async function POST(
    req: Request
) {
    // @ts-ignore
    const { firstName, lastName, email, phone } = await req.json();
    if (!firstName || !lastName || !email || !phone) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 500 })
    }

    const checkEmail = await baseDb.prepare("SELECT * FROM contacts WHERE email = ?").bind(email).all();
    if (checkEmail.results.length) {
        return NextResponse.json({ message: 'Email already exists' }, { status: 500 })
    }
    await new Promise(resolve => setTimeout(resolve, 20000));
    const insert = await baseDb.prepare("INSERT INTO contacts (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)").bind(firstName, lastName, email, phone).run();
    const id = insert.meta.last_row_id;
    await baseDb.prepare("INSERT INTO audit_log (action, created_at, old_value, new_value, contact_id ) VALUES (?, ?, ?, ?, ? )").bind('create', new Date().toISOString(), '', `firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phone: ${phone}`, id).run();
    return NextResponse.json({ message: 'Contact created successfully' })
}