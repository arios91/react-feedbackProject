import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
    const {addFeedback, feedbackToEdit, updateFeedback} = useContext(FeedbackContext);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(feedbackToEdit.edit === true){
            setBtnDisabled(false);
            setText(feedbackToEdit.item.text);
            setRating(feedbackToEdit.item.rating)
        }
    }, [feedbackToEdit]);

    const handleTextChange = (e) => {
        setText(e.target.value)
        if(text === ''){
            setBtnDisabled(true);
            setMessage(null);
        }else if(text !== '' && text.trim().length <= 10){
            setMessage('Review must be at least 10 characters');
            setBtnDisabled(true);
        }else{
            setBtnDisabled(false);
            setMessage(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating
            }
            if(feedbackToEdit.edit === true){
                updateFeedback(feedbackToEdit.item.id, newFeedback);
            }else{
                addFeedback(newFeedback);
            }
            setText('');
            setRating(10);
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>Rate your service</h2>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input type="text" placeholder='Write a review' onChange={handleTextChange} value={text}/>
                    <Button type="submit" isDisabled={btnDisabled}>{feedbackToEdit.edit === true ? 'Update' : 'Submit'}</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
