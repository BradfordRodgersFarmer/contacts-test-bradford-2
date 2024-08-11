'use client'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {Contact} from "@/utils/interfaces";
import {History} from "@/app/_components/history";
import {DeleteButton} from "@/app/_components/deleteButton";
import {UpdateContact} from "@/app/_components/updateContact";

export const ContactCard =  ( contact: Contact) => {
    return (
        <Card shadow="sm">
            <CardHeader>
                <Avatar name={contact.firstName[0] + contact.lastName[0]} />
                <h3>{contact.firstName} {contact.lastName}</h3>
            </CardHeader>
            <CardBody>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
            </CardBody>
            <CardFooter>
                <div className={"flex gap-2"}>
                   <History id={contact.id} />
                    <UpdateContact {...contact} />
                    <DeleteButton id={contact.id} />
                </div>
            </CardFooter>
        </Card>
    )
}