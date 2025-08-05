import React from 'react'
import { IoTicket } from "react-icons/io5";

export default function CinemagicIcon() {
    return (
        <div className="flex flex-col items-center justify-between transform scale-125 hover:cursor-pointer">

            <IoTicket size={40} />
            <p className="text-2xl font-bold max-lg:text-2xl max-md:text-xl max-sm:text-lg max-xs:text-sm">Cinemagic</p>
        </div>
    );
}
