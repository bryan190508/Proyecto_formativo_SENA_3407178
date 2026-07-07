import React from "react";
import Sidebar from "./Sidebar";

export default function PanelLayout({ children }) {
    return (
        <div className="layout-cliente">
            <Sidebar />
            <main className="contenido-cliente">
                <div className="main-content">{children}</div>
            </main>
        </div>
    );
}
