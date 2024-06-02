import { IoLogoWhatsapp } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import ReadCompleteAddress from "./ReadCompleteAddress";
import StarRating from "./StarRating";

const SearchResult = () => {
    const ratings = [10,1,1,1];

    const handleOpenWhatsApp = () => {
        window.open("https://wa.me/918601021155", "_blank");
    }

    const handleMakeCall = () => {
        window.open("tel:+918601021155", "_blank");
    }

    const handleOpenDirection = () => {
        const address = encodeURIComponent("ithum tower sector-62, Noida, India");
        const locationUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
        window.open(locationUrl, "_blank");
    }

    return (
        <div className="flex items-center py-10 flex-col gap-5">
            <div className="p-6 shadow-md flex flex-col gap-5 bg-white w-[95%] md:w-[70%]">
                <div className="flex gap-2 border w-full">
                    <div className="md:w-[20%]">
                        <img className="w-full" src="https://cdn.pixabay.com/photo/2020/04/17/19/48/city-5056657_640.png" alt="" />
                    </div>
                    <div className="md:w-[99%]">
                        <p className="font-bold md:text-2xl uppercase">Keep it short and simple</p>
                        <div>
                            <p className="font-bold">User Review</p>
                            <StarRating ratings={ratings} />
                        </div>
                        <ReadCompleteAddress text="C-8/212, Ground Floor, lorem200 vhfkfhk fvdhk,,df hdfhjkhdf hfvhjkdfhjk  Laxmi hgdf ghdhdfrgtsfges Nagar, Delhi - 110092 (Guru Nanak Pura) dfnj sdbkhjkjk hbjkgdjk ghfdjk gbjkdfhjdf jgkfjd;dfn " maxChar={100} />
                        <p className="pt-2">+91 8601021155</p>
                    </div>
                </div>
                <div className="flex justify-between gap-2 flex-wrap">
                    <button className="py-1 rounded-sm cursor-pointer px-3 bg-blue-700 text-white hover:text-blue-700 hover:bg-white duration-300 border border-blue-700" onClick={() => handleOpenDirection()}><span className="flex items-center gap-1 "><MdSubdirectoryArrowRight className="text-xl" /> Direction</span></button>
                    <button className="py-1 rounded-sm cursor-pointer px-3 bg-red-700 text-white hover:text-red-700 hover:bg-white duration-300 border border-red-700" onClick={() => handleMakeCall()}><span className="flex items-center gap-1 "><IoCall className="text-xl" /> Call Now</span></button>
                    <button className="py-1 rounded-sm cursor-pointer px-3 bg-violet-700 text-white hover:text-violet-700 hover:bg-white duration-300 border border-violet-700"><span className="flex items-center gap-1 "><SiGmail className="text-xl" /> Sent Enquiry</span></button>
                    <button className="py-1 rounded-sm cursor-pointer px-3 bg-green-700 text-white hover:text-green-700 hover:bg-white duration-300 border border-green-700" onClick={() => handleOpenWhatsApp()}><span className="flex items-center gap-1 "><IoLogoWhatsapp className="text-xl" /> Chat</span></button>
                </div>
            </div>
        </div>
    )
}

export default SearchResult