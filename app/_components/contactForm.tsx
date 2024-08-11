import {Button, ModalFooter} from "@nextui-org/react";
import React from "react";
// @ts-ignore
export const ContactForm = ({ handleSubmit, onSubmit, register,errors, onClose, buttonText }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-[#3C6382] text-sm font-bold mb-2" htmlFor="name">
                    First Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="firstName"
                    {...register("firstName", {required: true, maxLength: 180})}
                />
                {errors.firstName?.type === "required" && (
                    <p role="alert" className="text-red-600 mb-2">First name is required</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-[#3C6382] text-sm font-bold mb-2" htmlFor="name">
                    First Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="lastName"
                    {...register("lastName", {required: true, maxLength: 180})}
                />
                {errors.lastName?.type === "required" && (
                    <p role="alert" className="text-red-600 mb-2">Last name is required</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-[#3C6382] text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email", {required: true, maxLength: 180})}
                />
                {errors.email?.type === "required" && (
                    <p role="alert" className="text-red-600 mb-2">Email is required</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-[#3C6382] text-sm font-bold mb-2" htmlFor="phone">
                    Phone
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    placeholder="Phone"
                    {...register("phone", {required: true, maxLength: 180})}
                />
                {errors.phone?.type === "required" && (
                    <p role="alert" className="text-red-600 mb-2">Phone is required</p>
                )}
            </div>

            <ModalFooter>
                <Button type="submit">{buttonText}</Button>
                <Button onPress={onClose} color="danger">Close</Button>
            </ModalFooter>
        </form>
    )
}