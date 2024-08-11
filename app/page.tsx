'use client'
import React from "react";
import useSWR from 'swr'
import {ContactCard} from '@/app/_components/contactCard'
import {Contact} from "@/utils/interfaces";
import { fetcher } from "@/utils/fetcher";
import {LoadingSkeleton} from "@/app/_components/loadingSkeleton";
import {CreateContact} from "@/app/_components/createContact";

export default function Home() {
    const { data , error, isLoading } = useSWR('/api/contactsList', fetcher, { refreshInterval: 10000 })
    if (isLoading) return <LoadingSkeleton />
    return (
        <>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {data.data.map((contact: Contact) => (
                    <ContactCard key={contact.id} {...contact} />
                ))}

            </div>
            <footer className="bg-[#3C6382] fixed bottom-0 w-full">
                <div className="bg-[#1F2937] h-[5px] w-full">
                </div>
                <div className="bg-white h-[1px] w-full">
                </div>
                <CreateContact />
            </footer>
        </>
    );
}



