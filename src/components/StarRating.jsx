import React, { useState } from 'react';
export const StarRating = ({ rating, mode, size = 'md', onChange, }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const getFontSizeClass = () => {
        switch (size) {
            case 'sm':
                return 'fs-6';
            case 'lg':
                return 'fs-3';
            case 'md':
            default:
                return 'fs-5';
        }
    };
    const handleClick = (index) => {
        if (mode === 'interactive' && onChange) {
            onChange(index);
        }
    };
    const handleMouseEnter = (index) => {
        if (mode === 'interactive') {
            setHoverRating(index);
        }
    };
    const handleMouseLeave = () => {
        if (mode === 'interactive') {
            setHoverRating(0);
        }
    };
    const fontSizeClass = getFontSizeClass();
    return (<div className="d-inline-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map((index) => {
            const isFilled = index <= (hoverRating || rating);
            return (<button key={index} type="button" className={`btn p-0 bg-transparent border-0 d-inline-flex align-items-center justify-content-center ${mode === 'interactive' ? 'cursor-pointer' : 'pe-none'}`} onClick={() => handleClick(index)} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} disabled={mode === 'display'} style={{ outline: 'none' }} aria-label={mode === 'interactive' ? `Rate ${index} out of 5 stars` : undefined}>
            <i className={`bi bi-star-fill ${fontSizeClass} ${isFilled ? 'star-filled text-teal' : 'star-empty text-black-50'}`} style={{
                    transition: 'color 0.15s ease',
                }}></i>
          </button>);
        })}
    </div>);
};
export default StarRating;
