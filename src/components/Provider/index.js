import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create PaperCountContext
const Context = createContext();

// PaperCountProvider to provide the paperCount value
export const Provider = ({ children }) => {
    const [paperCount, setPaperCount] = useState(500); // Default value

    // Fetch the paper count from the server
    useEffect(() => {
        const fetchPaperCount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/user/1');
                if (response.status === 200) {
                    setPaperCount(response.data.data.pages); // Set paper count from response
                } else {
                    console.log('Data not found', response.data.message);
                }
            } catch (e) {
                if (e.response) {
                    console.log(`Error from server: ${e.response.data.message || 'unknown error'}`);
                } else if (e.request) {
                    console.log('Cannot connect to the server');
                } else {
                    console.log('Error:', e.message);
                }
            }
        };

        fetchPaperCount(); // Call the async function
    }, []); // This will run only once after the initial render

    // Function to update paperCount
    const updatePaperCount = (count) => {
        setPaperCount(count); // Update state
    };

    return <Context.Provider value={{ paperCount, updatePaperCount }}>{children}</Context.Provider>;
};

// Hook to use the PaperCountContext in components
export const useProvider = () => useContext(Context);
