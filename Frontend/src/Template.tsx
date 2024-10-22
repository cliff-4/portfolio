import React, { ReactNode } from "react";

interface WindowProps {
    children?: ReactNode;
}

const Window: React.FC<WindowProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-theme3 p-5">
            <div
                className="
                    w-full h-full p-10
                    bg-theme3 rounded-lg
                    flex items-center justify-center space-x-10
                    shadow-[rgba(0,0,15,0.3)_5px_5px_10px_5px]
                "
            >
                {children}
            </div>
        </div>
    );
};

export default Window;
