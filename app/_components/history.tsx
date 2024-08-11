import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider, useDisclosure} from "@nextui-org/react";
import {AuditLog} from "@/utils/interfaces";
import { PressEvent } from "@react-types/shared";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export const History = ({id} : {id:string}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { data , error, isLoading } = useSWR(`/api/auditLogs?id=${id}`, fetcher, { refreshInterval: 10000 })
    return (
        <>
            <Button onPress={onOpen}>History</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
                <ModalContent>
                    {(onClose: ((e: PressEvent) => void) | undefined) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                {isLoading && <p>Loading...</p>}
                                {!isLoading && data.data.map((log :AuditLog) => {
                                    return (
                                        <div key={log.id} className="text-blue-950 flex-col">
                                            <div>Action: {log.action} - {log.date}</div>
                                            <div>Old value: {log.oldValue}</div>
                                            <div>New value: {log.newValue}</div>
                                            <Divider className="my-4" />
                                        </div>
                                    )
                                })}
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose}>Close</Button>
                            </ModalFooter>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}