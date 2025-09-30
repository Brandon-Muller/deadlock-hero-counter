import React from 'react';
import heroes from '../data/heroes';
import './dropdown.css'; // Assuming you have a CSS file for dropdown styles

const Dropdown = ({ label, onChange, selectedHero }) => {
    return (
        <div className="dropdown-container">
            <label className="dropdown-label">{label}</label>
            <select className="dropdown" onChange={onChange} value={selectedHero}>
                <option value="" disabled>Select a hero</option>
                {heroes.map(hero => (
                    <option key={hero.name} value={hero.name}>
                        <img src={hero.icon} alt={hero.name} className="hero-icon" />
                        {hero.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const Dropdowns = ({ onHeroSelect }) => {
    const [firstHero, setFirstHero] = React.useState('');
    const [secondHero, setSecondHero] = React.useState('');

    const handleFirstHeroChange = (event) => {
        setFirstHero(event.target.value);
        onHeroSelect(event.target.value, secondHero);
    };

    const handleSecondHeroChange = (event) => {
        setSecondHero(event.target.value);
        onHeroSelect(firstHero, event.target.value);
    };

    return (
        <div className="dropdowns">
            <Dropdown label="Select First Hero" onChange={handleFirstHeroChange} selectedHero={firstHero} />
            <Dropdown label="Select Second Hero" onChange={handleSecondHeroChange} selectedHero={secondHero} />
        </div>
    );
};

export default Dropdowns;