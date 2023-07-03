import React from 'react';
import './message-error.css';

const MessageError = ({ messageError }) => {
    return (
        <div className='message-error'>{messageError}</div>
    )
}

export default MessageError