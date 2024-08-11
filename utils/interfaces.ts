
export interface AuditLog {
    id: string;
    action: string;
    date: string;
    oldValue: string;
    newValue: string;
}

export  interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    id: string;
}
