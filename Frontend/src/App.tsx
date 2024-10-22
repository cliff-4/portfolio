import { useState } from "react";
import Home from "./Home";
import Contacts from "./Contact";
import Projects from "./Projects";

const Pages = Object.freeze({
    allPages: ["Home", "Projects", "Contact"],
    HOME: 0,
    PROJECTS: 1,
    CONTACT: 2,
});

const currPage = (page: number) => {
    switch (page) {
        case Pages.HOME:
            return <Home />;
        case Pages.CONTACT:
            return <Contacts />;
        case Pages.PROJECTS:
            return <Projects />;
        default:
            return <h1 className="text-white">An error occured... :(</h1>;
    }
};

export default function App() {
    const [page, setPage] = useState(0);
    return (
        <>
            <button
                className="
                absolute bottom-10 left-10
                min-w-24 max-w-24
                inline-flex items-center justify-center overflow-hidden
                bg-theme6 hover:text-white transition-all
                font-mono
                "
                onClick={() => {
                    setPage((page + 1) % Pages.allPages.length);
                }}
            >
                {Pages.allPages[(page + 1) % Pages.allPages.length]}
            </button>
            {currPage(page)}
        </>
    );
}
