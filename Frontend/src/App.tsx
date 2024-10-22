import { useState } from "react";
import Home from "./Home";
import Contacts from "./Contact";

const Pages = Object.freeze({
    size: 2,
    allPages: ["Home", "Contact"],
    HOME: 0,
    CONTACT: 1,
});

const currPage = (page: number) => {
    switch (page) {
        case Pages.HOME:
            return <Home />;
        case Pages.CONTACT:
            return <Contacts />;
        default:
            return <h1 className="text-white">An error occured... :(</h1>;
    }
};

export default function App() {
    const [page, setPage] = useState(0);
    const [buttonName, setButtonName] = useState(Pages.allPages[1]);
    return (
        <>
            <button
                className="
                absolute bottom-10 left-10
                inline-flex items-center justify-center overflow-hidden
                bg-theme6 hover:text-white transition-all
                font-mono
                "
                onClick={() => {
                    setButtonName(Pages.allPages[page % Pages.allPages.length]);
                    console.log(`Page name set to ${buttonName}`);
                    setPage((page + 1) % Pages.size);
                }}
            >
                {buttonName}
            </button>
            {currPage(page)}
        </>
    );
}
