import React, { ChangeEvent } from 'react';

interface RangeSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    id: string;
}

export default function RangeSlider({ label, value, min, max, onChange, id }: RangeSliderProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value, 10));
    };

    return (
        <div className="range-group">
            <label htmlFor={id} className="range-group__label">
                <span>{label}</span>
                <span className="range-group__value">{value}</span>
            </label>
            <input
                type="range"
                className="range-slider"
                id={id}
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}
