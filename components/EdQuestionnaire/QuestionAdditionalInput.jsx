import React from 'react';

export const QuestionAdditionalInput = ({
    id,
    name,
    placeholder,
    value,
    onChange,
    disabled = false,
    type = 'textarea',
    className = '',
    subtext
}) => {
    const inputClasses = `
        quiz-option-input-${name} 
        form-${type === 'textarea' ? 'textarea' : 'input'} 
        block w-full rounded 
        ${type === 'textarea' ? 'h-[100px]' : 'h-[45px]'} 
        text-sm border border-gray-400 p-2 
        ${className}
    `;

    return (
        <div className="quiz-option text-left block w-full text-center py-5">
            <label htmlFor={id} className="quiz-option-label block text-center pb-2 text-sm">
                {placeholder}
            </label>

            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={name}
                    className={inputClasses}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    placeholder={subtext}
                    suppressHydrationWarning={true}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    className={inputClasses}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    placeholder={subtext}
                    suppressHydrationWarning={true}
                />
            )}
        </div>
    );
};