import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider, useDisclosure} from "@nextui-org/react";
import {PressEvent} from "@react-types/shared";
import {ContactForm} from "@/app/_components/contactForm";

export  const CreateContact = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit: SubmitHandler<any> = async (data) => {
        setLoading(true);
        try {
            const response = await fetch('/api/contactsCreate', {
                method: 'POST',
                body: JSON.stringify(data),
            })
            // close modal
            console.log(response)
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
            <Button onPress={onOpen} size="lg" className="ml-auto mr-auto">Create Contact</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>

                    {(onClose: ((e: PressEvent) => void) | undefined) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Contact</ModalHeader>
                            <ModalBody>
                                {loading && ( <div className="text-green-600 font-bold">Creating...</div> )}
                                {error !== '' && ( <div className="text-red-600 font-bold">{error}</div> )}
                                <ContactForm handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors} onClose={onClose} buttonText="Create"/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}