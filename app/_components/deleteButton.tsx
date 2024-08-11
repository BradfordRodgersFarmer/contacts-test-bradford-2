import React from 'react'
import {Button} from "@nextui-org/react";

export const DeleteButton= ({id} : {id:string}) => {
    return (
        <Button
            size="md"
            color="danger"
            onClick={() => {
                fetch(`/api/contactsDelete?id=${id}`, {
                    method: 'DELETE',
                })
            }}
        >
            Delete
        </Button>
    )
}