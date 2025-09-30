import React, { useState, useEffect } from 'react';
import { getHeroCounters } from '../data/heroes'; // Assuming this function fetches counters based on selected heroes

const CounterDisplay = ({ selectedHero1, selectedHero2 }) => {
    const [counters, setCounters] = useState([]);

    useEffect(() => {
        if (selectedHero1 && selectedHero2) {
            const heroCounters = getHeroCounters(selectedHero1, selectedHero2);
            setCounters(heroCounters);
        }
    }, [selectedHero1, selectedHero2]);

    return (
        <div className="counter-display">
            <h2>Hero Counters</h2>
            {counters.length > 0 ? (
                <ul>
                    {counters.map((counter, index) => (
                        <li key={index}>
                            <img src={counter.icon} alt={counter.name} className="hero-icon" />
                            <span>{counter.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Select heroes to see their counters.</p>
            )}
        </div>
    );
};

export default CounterDisplay;