import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider, useDisclosure} from "@nextui-org/react";
import {PressEvent} from "@react-types/shared";
import {Contact} from "@/utils/interfaces";
import {ContactForm} from "@/app/_components/contactForm";

export  const UpdateContact = (contact: Contact) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                phone: contact.phone
            }
        }
    );
    const onSubmit: SubmitHandler<any> = async (data) => {
        setLoading(true);
        try {
            data.id = contact.id;
            const response = await fetch('/api/contactsUpdate', {
                method: 'POST',
                body: JSON.stringify(data),
            })
            // close modal

            if(response.ok) {
                onOpenChange();
                setLoading(false);
            }
            else {
                const body  = await response.json();
                setError(body.message)
            }
        }catch (e) {
            setError("internal server error")
            console.error(e)
        }
    }

    return (
        <>
            <Button onPress={onOpen} size="md" className="ml-auto mr-auto bg-blue-900 text-white">Edit</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>

                    {(onClose: ((e: PressEvent) => void) | undefined) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Contact</ModalHeader>
                            <ModalBody>
                                {loading && ( <div className="text-green-600 font-bold">Creating...</div> )}
                                {error !== '' && ( <div className="text-red-600 font-bold">{error}</div> )}
                                <ContactForm handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors} onClose={onClose} buttonText="Update"/>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}