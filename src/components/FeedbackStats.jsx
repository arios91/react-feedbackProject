import PropTypes from 'prop-types';

function FeedbackStats({feedback}) {
    let averageRating  = feedback.reduce((acc, current) => {
        return acc + current.rating
    }, 0) / feedback.length;

    
    averageRating = averageRating.toFixed(1).replace(/[.,]0$/, '');

    return (
        <div className='feedback-stats'>
            <h4>{feedback.length} Reviews</h4>
            <h4>Average Rating: {isNaN(averageRating) ? 0: averageRating}</h4>
        </div>
    )
}

FeedbackStats.propTypes = {
    feedback: PropTypes.array
}

export default FeedbackStats
