import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    const [feedbackToEdit, setFeedbackToEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const res = await fetch('/feedback?_sort=id&_order=desc')
        const data = await res.json();
        setFeedback(data);
        setIsLoading(false);
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFeedback)
        });

        const data = await response.json();
        setFeedback([data, ...feedback]);
    }

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            await fetch(`/feedback/${id}`, {method: 'DELETE'});
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    const editFeedback = (item) => {
        setFeedbackToEdit({item, edit: true});
    }

    const updateFeedback = async (id, updatedItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedItem)
        })

        const data = await response.json();

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item));
    }

    return <FeedbackContext.Provider value ={{
        feedback,
        addFeedback,
        deleteFeedback,
        feedbackToEdit,
        editFeedback,
        updateFeedback,
        isLoading
    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext