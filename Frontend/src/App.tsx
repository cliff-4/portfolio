import { useState } from "react";
import Home from "./Home";
import Contacts from "./Contact";
import Projects from "./Projects";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Window from "./Template";

interface navButtonProps {
    text: string;
    linkto: string;
    currPage: string;
    setCurrPage: React.Dispatch<React.SetStateAction<string>>;
}

function NavButton({ text, linkto, currPage, setCurrPage }: navButtonProps) {
    const currButtonTheme = () => {
        if (currPage == text) return "bg-theme3 text-theme6";
        return "bg-theme6 text-theme3";
    };
    return (
        <Link to={linkto}>
            <button
                className={
                    `
                border-none rounded-lg p-2 text-lg
                w-24
                inline-flex items-center justify-center overflow-hidden
                font-bold
                hover:bg-theme3 hover:text-theme6 hover:scale-105
                transition-all
                font-mono
                
                ` + currButtonTheme()
                }
                onClick={() => {
                    setCurrPage(text);
                    console.log("Current page set to " + text);
                }}
            >
                {text}
            </button>
        </Link>
    );
}

const NavBar = () => {
    const [currPage, setCurrPage] = useState("Home");
    return (
        <div className="absolute w-full px-5 bottom-5 lg:bottom-10 flex justify-center z-0">
            <div
                className="
                    sm:w-fit p-2 m-2
                    rounded-lg
                    flex justify-around gap-2 sm:gap-4 flex-row
                    bg-theme1/90
                "
            >
                <NavButton
                    text="Home"
                    linkto="/"
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                />
                <NavButton
                    text="Projects"
                    linkto="/projects"
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                />
                <NavButton
                    text="Contact"
                    linkto="/contact"
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                />
            </div>
        </div>
    );
};

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Window>
                    <div className="h-full w-full flex flex-col">
                        <Routes>
                            <Route path="/" Component={Home} />
                            <Route path="/contact" Component={Contacts} />
                            <Route path="/projects" Component={Projects} />
                            <Route
                                path="*"
                                element={
                                    <>
                                        <h1 className="text-white">
                                            Default Page Content
                                        </h1>
                                        {}
                                    </>
                                }
                            />
                        </Routes>
                    </div>
                </Window>
                <NavBar />
            </BrowserRouter>
        </>
    );
}
