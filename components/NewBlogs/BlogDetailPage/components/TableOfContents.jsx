"use client";

import { useEffect, useState } from 'react';

export default function TableOfContents({ content, activeSection, onSectionChange }) {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        if (content) {
            // Parse HTML content to extract headings
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

            const extractedHeadings = Array.from(headingElements).map((heading, index) => {
                const text = heading.textContent.trim();
                const level = parseInt(heading.tagName.charAt(1));
                const id = `heading-${index}`;

                // Add ID to the heading element
                heading.id = id;

                return {
                    id,
                    text,
                    level,
                    element: heading
                };
            });

            setHeadings(extractedHeadings);
        }
    }, [content]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            onSectionChange(sectionId);
        }
    };

    if (headings.length === 0) {
        return (
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Content</h3>
                <p className="text-gray-600 text-sm">No sections available</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 rounded-lg p-4 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
            <nav className="space-y-2">
                {headings.map((heading) => (
                    <button
                        key={heading.id}
                        onClick={() => scrollToSection(heading.id)}
                        className={`block text-left w-full text-sm transition-colors ${activeSection === heading.id
                            ? 'text-blue-600 font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                            } ${heading.level === 1 ? 'font-semibold' :
                                heading.level === 2 ? 'font-medium ml-2' :
                                    heading.level === 3 ? 'ml-4' :
                                        heading.level === 4 ? 'ml-6' :
                                            heading.level === 5 ? 'ml-8' :
                                                'ml-10'
                            }`}
                    >
                        {heading.text}
                    </button>
                ))}
            </nav>
        </div>
    );
}
