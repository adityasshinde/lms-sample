import React, { useState } from 'react';

const CourseCurriculum = () => {
    const [accordionItems, setAccordionItems] = useState([
        {
            id: 1,
            title: 'Welcome to the Course and Overview',
            duration: '8 lectures • 47m',
            lectures: [
                { id: 1, title: 'Importing the libraries', duration: '5:30' },
                { id: 2, title: 'Importing the libraries', duration: '7:30' },
                { id: 3, title: 'Importing the libraries', duration: '3:30' },
                { id: 4, title: 'Importing the libraries', duration: '8:30' },
            ],
        },
        {
            id: 2,
            title: 'Python Application Engine',
            duration: '2 lectures • 12m',
            lectures: [
                { id: 1, title: 'Data Manipulation Tools', duration: '6:30' },
                { id: 2, title: 'Importing the libraries', duration: '8:30' },
            ],
        },
        // ... add more accordion items as needed
    ]);

    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <div className="course-curriculum pt-8 pb-12">
            <div className="course-curriculum mb-4">
                <h4 className='font-bold text-lg'>Curriculum</h4>
            </div>
            <ul>
                <li>15 lectures • 2h 29m 12s total length</li>
            </ul>
            <div className="course-curriculum-accordion mt-8">
                <div className="accordion" id="accordionExample">
                    {accordionItems.map((item, index) => (
                        <div key={item.id} className="accordion-item">
                            <div className="accordion-body" id={`heading${item.id}`}>
                                <button
                                    className={`accordion-button ${activeAccordion === index ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className="accordion-header">
                                        <span className="accordion-tittle">
                                            <span>{item.title}</span>
                                        </span>
                                        <span className="accordion-tittle-inner">
                                            <span>{item.duration}</span>
                                        </span>
                                    </span>
                                </button>
                            </div>
                            <div
                                id={`collapse${item.id}`}
                                className={`accordion-collapse collapse ${activeAccordion === index ? 'show' : ''}`}
                                aria-labelledby={`heading${item.id}`}
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    {item.lectures.map((lecture) => (
                                        <div key={lecture.id} className="course-curriculum-content flex justify-between items-center">
                                            <div className="course-curriculum-info">
                                                <i className="flaticon-youtube"></i>
                                                <h4>{lecture.title}</h4>
                                            </div>
                                            <div className="course-curriculum-meta">
                                                <span>{lecture.duration}</span>
                                                <span className="time"> <i className="flaticon-lock"></i></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseCurriculum;
