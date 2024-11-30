import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_FINANCE_API_KEY;

export async function getInfo({ query }) {
    try {
        const res = await fetch(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${API_KEY}`
        );
        if(res.status === 429) {
            // toast.error("API limit exceeded. Please try again later.");
            alert("API limit exceeded. Please try again later.");
        }
        if (!res.ok) {
            return false;
            // throw new Error(`Response status: ${res.status}`);
        }
        const data = await res.json();
        return data[0];
    } catch (error) {
        console.error(error.message);
    }
}

export async function getTableInfo({ query }) {
    try {
        const res = await fetch(
            `https://financialmodelingprep.com/api/v3/quote/${query}?apikey=${API_KEY}`
        );
        if(res.status === 429) {
            // toast.error("API limit exceeded. Please try again later.");
            alert("API limit exceeded. Please try again later.");
        }
        if (!res.ok) {
            return false;;
            // throw new Error(`Response status: ${res.status}`);
        }
        const data = await res.json();
        return data[0];
    } catch (error) {
        console.error(error.message);
    }
}