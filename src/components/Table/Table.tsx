import "@/App.css"
import { useContext } from "react";
import { MatrixContext } from "@/context/MatrixContext";

export const Table = () => {
    const ctx = useContext(MatrixContext);
    if (!ctx) throw new Error("Table must be used inside MatrixProvider");

    const { matrix } = ctx;

    return (
        <div className="table">
            {matrix.length === 0 && (
                <>
                    <h1 className="empty-table-h">TABLE</h1>
                </>
            )}
        </div>
    )
}