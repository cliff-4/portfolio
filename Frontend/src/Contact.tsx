import React, { useEffect, useState } from "react";
import contactJsonLocal from "../data/contact.json";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

interface contactCard {
    name: keyof typeof ContactIcons;
    display: string;
    link: string;
}

const ContactIcons = {
    GitHub: (
        <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path
                fillRule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clipRule="evenodd"
            />
        </svg>
    ),
    "E-mail": (
        <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
        >
            <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
            />
        </svg>
    ),
    LinkedIn: (
        <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 448 512"
        >
            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
        </svg>
    ),
    Discord: (
        <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 640 512"
        >
            <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
        </svg>
    ),
    Default: (
        <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
        </svg>
    ),
};

const ContactLine: React.FC<{ contact: contactCard }> = ({ contact }) => {
    const icon =
        contact.name in ContactIcons
            ? ContactIcons[contact.name]
            : ContactIcons.Default;
    return (
        <li className="flex group">
            <div className="w-full flex justify-center">
                <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        text-black
                        bg-theme4 rounded-lg m-1 px-2
                        flex-none flex items-center justify-center
                        group-hover:bg-theme6 group-hover:text-theme3 transition-all
                    "
                >
                    {icon}
                </a>
                <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                            min-w-[100px] max-w-[310px]
                            bg-theme3 rounded-lg m-1 px-3 py-1
                            shadow-sm group-hover:shadow-lg
                            flex-1 text-center
                            group-hover:scale-105 transition-all
                            font-mono
                            overflow-scroll
                        "
                >
                    {contact.display}
                </a>
            </div>
        </li>
    );
};

const Contacts = () => {
    const [contacts, setContact] = useState<contactCard[]>([]);

    useEffect(() => {
        const fetchContacts = async () => {
            setContact(contactJsonLocal as contactCard[]);
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/contact`);
                setContact((await response.json()) as contactCard[]);
                console.log("Successfully procured Contacts!");
            } catch (e) {
                console.log(e);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className="h-full flex justify-center">
            <div className="h-full w-full max-w-[500px]  flex flex-col p-5 justify-center">
                <p
                    className="
                            mb-2
                            px-5 py-2
                            w-fit
                            bg-theme4
                            rounded-lg
                            text-2xl
                            font-mono
                        "
                >
                    Contact Me!
                </p>
                <ul
                    className="
                            p-5
                            bg-theme2 rounded-lg
                            transition-all
                            space-y-2
                        "
                >
                    {contacts.map((contact, index) => (
                        <ContactLine key={index} contact={contact} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Contacts;
