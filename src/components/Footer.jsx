import { GithubIcon, Heart, Instagram, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="w-full h-12 px-4 flex items-center justify-between bg-black rounded-t-lg">
            <div className="text-lg md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-white to-green-300">
                Rusty Genius
            </div>

            <div className="hidden md:flex text-sm md:text-lg items-center gap-1 text-gray-300">
                We’d love your feedback! Arigato <Heart className="h-6 w-6 text-blue-500" />
            </div>
            <div className="flex items-center gap-4">
                <Link to="https://www.linkedin.com/in/sumit-singh-developer"><Linkedin className="h-6 w-6 md:h-8 md:w-8 text-blue-500 cursor-pointer" /></Link>
                <Link to="https://github.com/Rusty-98"><GithubIcon className="h-6 w-6 md:h-8 md:w-8 text-white cursor-pointer" /></Link>
                <Link to="https://www.instagram.com/rustygenius_98/"><Instagram className="h-6 w-6 md:h-8 md:w-8 text-violet-500 cursor-pointer" /></Link>
            </div>
        </div>
    )
}

export default Footer




