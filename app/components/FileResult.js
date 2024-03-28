'use client'
import { useState } from 'react';

const FileResult = ({ result }) => {
    const [topUsers, setTopUsers] = useState(0);

    let maxUsers = 0
    if (result) {
        maxUsers = Object.keys(result).length;
    }
    
    const handleInputChange = (e) => {
        setTopUsers(e.target.value);
    };

    const getTopKResults = () => {
        if (result) {
            const entries = Object.entries(result);
            entries.sort((a, b) => b[1] - a[1]);
            const sortedData = Object.fromEntries(entries.slice(0, topUsers));
            
            return sortedData;
        } else {
            return null;
        }
    };

    return (
        <div>
            <input type="number" value={topUsers} onChange={handleInputChange} min="0" max={maxUsers} />
            <pre>{JSON.stringify(getTopKResults(), null, 2)}</pre>
        </div>
    );
};

export default FileResult;
