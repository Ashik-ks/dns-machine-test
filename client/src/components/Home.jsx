import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import Footer from './Footercontent';
const Home = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <div className='homebody'>
            <nav className="text-white px-10 py-6 relative z-10 flex justify-between items-center">
                {/* "DeepSoftNet" on the left side for large screens */}
                <div className="text-white font-bold text-xl hidden sm:block">
                    DeepSoftNet
                </div>

                {/* Menu items on the right side for large screens */}
                <ul className="flex justify-end gap-x-7 hidden sm:flex">
                    <li>
                        <a 
                            href="#home" 
                            className="text-md" 
                            onClick={(e) => {
                                e.preventDefault();  
                                navigate('/'); 
                            }}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#menu" 
                            className="text-md" 
                            onClick={(e) => {
                                e.preventDefault();  
                                navigate('/menu'); 
                            }}
                        >
                            Menu
                        </a>
                    </li>
                    <li><a href="#about" className="text-md">Make A Reservation</a></li>
                    <li><a href="#contact" className="text-md">Contact</a></li>
                </ul>

                {/* Hamburger icon for small screens */}
                <div className={`sm:hidden absolute top-2 right-4 z-20 flex items-center justify-end w-full`}>
                    <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold text-xl">
                        DeepSoftNet
                    </div>
                    <FaBars className="text-white text-3xl" onClick={toggleMenu} />
                </div>                
            </nav>

            {isOpen && (
                <div className="sm:hidden absolute top-0 right-0 w-1/2 h-full bg-black text-white flex justify-center items-start z-30">
                    <div className="absolute top-4 left-4">
                        <FaTimes 
                            className="text-white text-3xl cursor-pointer" 
                            onClick={toggleMenu} 
                        />
                    </div>

                    <ul className="flex flex-col items-start text-white mt-20 w-full">
                        <li>
                            <a 
                                className="text-md px-2 font-bold" 
                                onClick={(e) => {
                                    e.preventDefault();  
                                    navigate('/');
                                    setIsOpen(false);
                                }}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a 
                                className="text-md px-2 font-bold" 
                                onClick={(e) => {
                                    e.preventDefault();  
                                    navigate('/menu');
                                    setIsOpen(false); 
                                }}
                            >
                                Menu
                            </a>
                        </li>
                        <li>
                            <a 
                                className="text-md px-2 font-bold mb-1" 
                                onClick={() => setIsOpen(false)} 
                            >
                                Make A Reservation
                            </a>
                        </li>
                        <li>
                            <a 
                                className="text-md px-2 font-bold" 
                                onClick={() => setIsOpen(false)} 
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            )}

            <div className="h-screen flex items-center justify-center bg-cover bg-center relative">
                <div className="text-center text-white p-6 rounded-md z-10">
                    <h1 className="text-4xl font-bold mb-4">"Taste the Magic in Every Bite!"</h1>
                    <p className="text-xl">Delicious food made with love and passion.</p>
                </div>
            </div>
            <Footer />

        </div>

    );
};

export default Home;
