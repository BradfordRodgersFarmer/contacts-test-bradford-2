import  { NextRequest, NextResponse } from 'next/server'
import { baseDb } from "@/utils/bindings";
export const runtime = 'edge';

export async function GET(request: NextRequest) {
    // get the audit logs for the contact by id
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id")
    // id does not exist throw error
    if (!id) {
        return NextResponse.json({message: 'id is required'}, {status: 500})
    }
    // check to see if the contact exists in the database if not return an error
    const checkContact = await baseDb.prepare("SELECT * FROM contacts WHERE id = ?").bind(id).all();
    if (!checkContact.results.length) {
        return NextResponse.json({message: 'Contact does not exist'}, {status: 500})
    }
    // get the audit logs
    const auditLogs = await baseDb.prepare("SELECT action, created_at as date, old_value as oldValue, new_value as newValue FROM audit_log WHERE contact_id = ? order by created_at desc").bind(id).all();
    return NextResponse.json({data: auditLogs.results})
}