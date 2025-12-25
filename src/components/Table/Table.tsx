import "@/App.css"
import {useState} from "react";

export const Table = () => {
    const [matrix, setMatrix] = useState(null)

    return (
        <div className="table">
            {!matrix && (
                <>
                    <h1 className="empty-table-h">TABLE</h1>
                </>
            )}
        </div>
    )
}