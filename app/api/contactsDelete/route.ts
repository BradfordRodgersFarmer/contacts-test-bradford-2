import  { NextRequest, NextResponse } from 'next/server'
import { baseDb } from "@/utils/bindings";
export const runtime = 'edge';

export async function DELETE(request: NextRequest) {
   // set the contact to inactive
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
    // delete the contact
    await baseDb.prepare("DELETE FROM contacts WHERE id = ?").bind(id).run();

    return NextResponse.json({message: 'Contact deleted successfully'})
}