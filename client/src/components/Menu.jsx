import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Footer from './Footercontent'

const Menu = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [menu, setMenu] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                let response = await axios.get(`http://localhost:3000/api/get-menu`);
                setMenu(response.data.data);
                setSelectedMenu(response.data.data[0]?._id);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        fetchMenu();
    }, []);


    useEffect(() => {
        const fetchItems = async () => {
            if (selectedMenu) {
                try {
                    let response = await axios.get(`http://localhost:3000/api/get-items`, {
                        params: {
                            menu: selectedMenu,
                            page: currentPage,
                            limit: 3,
                        }
                    });
                    setItems(response.data.data.data);
                    setTotalPages(response.data.data.totalPages);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            }
        };
        fetchItems();
    }, [selectedMenu, currentPage]);

    const handleItemClick = (item) => {
        setSelectedMenu(item._id);
        setCurrentPage(1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="menubody">
            <nav className="text-white px-10 py-6 relative z-10 flex justify-between items-center">
                <div className="text-white font-bold text-xl hidden sm:block">
                    DeepSoftNet
                </div>

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
                    <li><a href="#form" className="text-md" onClick={(e) => {
                        e.preventDefault();
                        navigate('/form');
                    }}>Add Something</a></li>

                </ul>

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
                        <li><a href="#menu" className="text-md px-2 font-bold" onChange={() => navigate('/home')}>Add Something</a></li>
                    </ul>
                </div>
            )}

            <div className="flex mt-30 justify-center bg-cover bg-center relative">
                <div className="text-center text-white p-6 rounded-md z-10 w-full max-w-4xl mx-auto">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block px-4 py-2">
                        MENU
                    </div>
                    <span className="text-lg sm:text-xl md:text-2xl mb-4 px-4 sm:px-6 md:px-8 block w-full sm:max-w-4xl md:max-w-5xl mx-auto text-center">
                        Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.
                    </span>
                </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
                {menu && menu.map(item => (
                    <div
                        key={item._id}
                        className={`text-center text-white px-4 py-2 border-2 cursor-pointer 
                            ${selectedMenu === item._id ? 'bg-blue-500 border-white' : 'bg-black border-blue-500'}`}
                        onClick={() => handleItemClick(item)}
                    >
                        <span className="font-bold">{item.name}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8 w-4/5 mx-auto rounded-lg p-4 border-2 border-gray-800">
                {/* Heading */}
                <div className="text-center mb-6 flex items-center justify-center">
                    <div className="w-16 border-t-3 mt-2 border-gray-500"></div>
                    <h2 className="text-5xl font-bold text-white mx-4">
                        {selectedMenu
                            ? `${menu.find(m => m._id === selectedMenu)?.name || 'Menu'} Items`
                            : "Menu Items"}
                    </h2>
                    <div className="w-16 border-t-2 mt-2 border-gray-500"></div>
                </div>




                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items && items.map(item => (
                        <div key={item._id} className="text-white px-4 py-2 m-2 rounded-lg">
                            {/* Name and Price with dotted line */}
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-2xl tracking-wide">{item.name}</span>
                                <span className="flex-1 border-b border-dotted mx-2 pb-4"></span>
                                <span className="font-bold text-2xl tracking-wide">${item.price}</span>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-gray-300 tracking-wide">{item.description}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        className="text-white px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        &larr; Prev
                    </button>
                    <button
                        className="text-white px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>



            <Footer />


        </div>
    );
};

export default Menu;
