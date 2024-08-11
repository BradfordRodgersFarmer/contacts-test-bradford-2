import  { NextRequest, NextResponse } from 'next/server'
import { baseDb } from "@/utils/bindings";
export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const firstName = searchParams.get("firstName")
    const lastName = searchParams.get("lastName")
    const email = searchParams.get("email")
    const phone = searchParams.get("phone")
    const id = searchParams.get("id")

    if (!id) {
        return NextResponse.json({message: 'id is required'}, {status: 500})
    }

    const checkContact = await baseDb.prepare("SELECT * FROM contacts WHERE id = ?").bind(id).all();
    if (!checkContact.results.length) {
        return NextResponse.json({message: 'Contact does not exist'}, {status: 500})
    }

    const checkEmail = email ? await baseDb.prepare("SELECT * FROM contacts WHERE email = ?").bind(email).all() : null;
    const oldContact = checkContact.results[0];
    if (checkEmail.results.length && checkEmail.results[0].id !== id) {
        return NextResponse.json({message: 'Email already exists'}, {status: 500})
    }
    await baseDb.prepare("UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?").bind(firstName, lastName, email, phone, id).run();

    await baseDb.prepare("INSERT INTO audit_log (action, created_at, old_value, new_value, contact_id ) VALUES (?, ?, ?, ?,?)").bind('update', new Date().toISOString(), `firstName: ${oldContact.firstName}, lastName: ${oldContact.lastName}, email: ${oldContact.email}, phone: ${oldContact.phone}`, `firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phone: ${phone}`, id).run();
    return NextResponse.json({message: 'Contact updated successfully'})
}

export const POST = async (req: Request) => {
    // @ts-ignore
    const { firstName, lastName, email, phone, id } = await req.json();

    if (!id) {
        return NextResponse.json({message: 'id is required'}, {status: 500})
    }

    const checkContact = await baseDb.prepare("SELECT * FROM contacts WHERE id = ?").bind(id).all();
    if (!checkContact.results.length) {
        return NextResponse.json({message: 'Contact does not exist'}, {status: 500})
    }
    const oldContact = checkContact.results[0];

    const checkEmail = email ? await baseDb.prepare("SELECT * FROM contacts WHERE email = ?").bind(email).all() : null;

    if (checkEmail.results.length && checkEmail.results[0].id !== id) {
        return NextResponse.json({message: 'Email already exists'}, {status: 500})
    }

    await baseDb.prepare("UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?").bind(firstName, lastName, email, phone, id).run();

    await baseDb.prepare("INSERT INTO audit_log (action, created_at, old_value, new_value, contact_id ) VALUES (?, ?, ?, ?,?)").bind('update', new Date().toISOString(), `firstName: ${oldContact.first_name}, lastName: ${oldContact.last_name}, email: ${oldContact.email}, phone: ${oldContact.phone}`, `firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phone: ${phone}`, id).run();
    return NextResponse.json({message: 'Contact updated successfully'})
}