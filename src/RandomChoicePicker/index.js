import React from 'react';
import './style.css';

const RandomChoicePicker = () => {
    const [choices, setChoices] = React.useState([]);
    const refs = {};
    
    const pickRandomTag = () => {
        return refs[Math.floor(Math.random() * Object.keys(refs).length)];
    }
    
    const highlightTag = (tag) => {
        tag.classList.add('highlight')
    }
    
    const unHighlightTag = (tag) => {
        tag.classList.remove('highlight')
    }

    const randomSelect = () => {
        const times = 30
    
        const interval = setInterval(() => {
            const randomTag = pickRandomTag()
        
            if (randomTag !== undefined) {
                highlightTag(randomTag)
    
                setTimeout(() => {
                    unHighlightTag(randomTag)
                }, 150)
            }
        }, 150);
    
        setTimeout(() => {
            clearInterval(interval)
    
            setTimeout(() => {
                const randomTag = pickRandomTag()
    
                highlightTag(randomTag)
            }, 100)
    
        }, times * 100)
    }

    const handleChange = (e) => {
        if(e.key === 'Enter') {
            setTimeout(() => {
                e.target.value = ''
            }, 10);
            return randomSelect();
        }
        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
        setChoices(tags);
    }

    return (
        <div className="container">
            <h3>
                Enter all of the choices divided by a comma (','). 
                <br /> 
                Press enter when you're done
            </h3>
            <textarea 
                placeholder="Enter choices here..."
                onKeyUp={handleChange}
            >
            </textarea>
            <div>
                {choices.map((choice, index) => (
                    <span key={index} className="tag" ref={(el) => refs[index] = el}>
                        {choice}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default RandomChoicePicker
