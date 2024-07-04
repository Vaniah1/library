import React from "react"
import { YouTube, Twitter, Facebook, Instagram } from "@mui/icons-material"

const Footer: React.FC = () => {
    return (
        <footer className="py-8 text-white bg-blue-500">
            <div className="container flex flex-col items-center justify-between px-4 mx-auto md:flex-row">
                <div className="mb-4 md:mb-0">
                    <p className="text-lg font-semibold">123 Library Street, TW 55555</p>
                    <p className="mt-2">Return Policy</p>
                    <p>Late Fees</p>
                    <p>Library Card Condition</p>
                </div>
                <div className="flex flex-col items-center md:flex-row">
                    <p className="mb-2 text-lg font-semibold md:mb-0 md:mr-4">Socials</p>
                    <div className="flex space-x-4">
                        <YouTube className="cursor-pointer hover:text-red-600" />
                        <Twitter className="cursor-pointer hover:text-blue-400" />
                        <Facebook className="cursor-pointer hover:text-blue-800" />
                        <Instagram className="cursor-pointer hover:text-pink-500" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
