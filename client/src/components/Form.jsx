import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios'; // Import axios for API calls
import Footer from './Footercontent';

const Form = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  
  // State variables for the forms
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [menuid, setMenuid] = useState('');
  console.log("rere : ",name,description,menuid,price)
  
  const [showAddMenuForm, setShowAddMenuForm] = useState(false); // State to show Add Menu Form
  const [showAddItemForm, setShowAddItemForm] = useState(false); // State to show Add Item Form

  // Fetch menu list for dropdown
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        let response = await axios.get(`http://localhost:3000/api/get-menu`);
        setMenu(response.data.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenu();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    setShowAddMenuForm(false);
    setShowAddItemForm(false);
  };

  // Input change handlers
  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    if (name === 'menuName') setName(value);
    if (name === 'menuDescription') setDescription(value);
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    if (name === 'itemName') setName(value);
    if (name === 'itemDescription') setDescription(value);
    if (name === 'itemPrice') setPrice(value);
    if (name === 'menuDropdown') setMenuid(value);
  };

  const addMenu = async (e) => {
    e.preventDefault(); 
    if (!name || !description) {
      alert('Please fill out all fields');
      return;
    }
    
    try {
      const response = await axios.post(`http://localhost:3000/api/create-menu`, {
        name,
        description
      });
      console.log('Menu added successfully:', response.data);
      setName(''); 
      setDescription('');
      closeForm(); 
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };
  
  const addItem = async (e) => {
    console.log("button clicked")
    e.preventDefault(); 
    if (!name || !description || !price || !menuid) {
      alert('Please fill out all fields');
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:3000/api/create-menu-item`, {
        name,
        description,
        price,
        menuId: menuid
      });
      console.log('Item added successfully:', response.data);
      setName(''); 
      setDescription('');
      setPrice('');
      setMenuid('');
      closeForm(); 
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  

  return (
    <div className="formbody">
      {/* Navigation Bar */}
      <nav className="text-white px-10 py-6 relative z-10 flex justify-between items-center">
        <div className="text-white font-bold text-xl hidden sm:block">DeepSoftNet</div>
        <ul className="flex justify-end gap-x-7 hidden sm:flex">
          <li>
            <a href="#home" className="text-md" onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}>Home</a>
          </li>
          <li>
            <a href="#menu" className="text-md" onClick={(e) => {
              e.preventDefault();
              navigate('/menu');
            }}>Menu</a>
          </li>
          <li><a href="#about" className="text-md">Make A Reservation</a></li>
          <li><a href="#contact" className="text-md">Contact</a></li>
        </ul>
        <div className="sm:hidden absolute top-2 right-4 z-20 flex items-center justify-end w-full">
          <FaBars className="text-white text-3xl" onClick={toggleMenu} />
        </div>
      </nav>

      {/* Add Menu and Add Item Buttons */}
      <div className="flex justify-center mt-10 gap-5">
        <button
          onClick={() => setShowAddMenuForm(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Menu
        </button>
        <button
          onClick={() => setShowAddItemForm(true)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg"
        >
          Add Item
        </button>
      </div>

      {/* Add Menu Form */}
      {showAddMenuForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            {/* Close Button */}
            <FaTimes
              className="absolute top-2 right-2 text-2xl cursor-pointer text-black"
              onClick={closeForm}
            />
            <h2 className="text-xl font-bold mb-4">Add Menu</h2>
            <form onSubmit={addMenu}>
              <div className="mb-4">
                <label htmlFor="menuName" className="block text-sm font-semibold">Menu Name</label>
                <input
                  id="menuName"
                  name="menuName"
                  type="text"
                  value={name}
                  onChange={handleMenuChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="menuDescription" className="block text-sm font-semibold">Description</label>
                <textarea
                  id="menuDescription"
                  name="menuDescription"
                  rows="4"
                  value={description}
                  onChange={handleMenuChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg w-full"
              >
                Add Menu
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Item Form */}
      {showAddItemForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            {/* Close Button */}
            <FaTimes
              className="absolute top-2 right-2 text-2xl cursor-pointer text-black"
              onClick={closeForm}
            />
            <h2 className="text-xl font-bold mb-4">Add Item</h2>
            <form onSubmit={addItem}>
              <div className="mb-4">
                <label htmlFor="itemName" className="block text-sm font-semibold">Item Name</label>
                <input
                  id="itemName"
                  name="itemName"
                  type="text"
                  value={name}
                  onChange={handleItemChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="itemDescription" className="block text-sm font-semibold">Description</label>
                <textarea
                  id="itemDescription"
                  name="itemDescription"
                  rows="4"
                  value={description}
                  onChange={handleItemChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="itemPrice" className="block text-sm font-semibold">Price</label>
                <input
                  id="itemPrice"
                  name="itemPrice"
                  type="number"
                  value={price}
                  onChange={handleItemChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="menuDropdown" className="block text-sm font-semibold">Select Menu</label>
                <select
                  id="menuDropdown"
                  name="menuDropdown"
                  value={menuid}
                  onChange={handleItemChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {menu.map((menuItem) => (
                    <option key={menuItem._id} value={menuItem._id}>
                      {menuItem.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg w-full"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
