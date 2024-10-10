import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.products);

    const [newProduct, setNewProduct] = useState({
        name : '',
        price : '',
        description : ''
    });

    const handleAddProduct = () => {

        dispatch(addProduct({
            id: productList.length + 1,
            name: newProduct.name,
            price: `$${newProduct.price}`,
            description: newProduct.description,
        }));
        setNewProduct({ name: '', price: '', description: '' }); 
    };

    const handleRemoveProduct = (id) => {
        dispatch(removeProduct(id));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    return (
        <div className='isolate bg-white px-16 py-8 sm:py-32 lg:px-8'>
            <h2 className='text-6xl font-semibold py-5'>Product List</h2>
            <ul>
                {productList.map(product => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`} className='text-xl'>
                            {product.name} - {product.price}
                        </Link>
                        <button onClick={() => handleRemoveProduct(product.id)}
                            className='ml-4 mb-3 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            {/* ฟอร์มสำหรับเพิ่มสินค้า */}
            <div>
            <h3 className='text-4xl font-semibold text-white mb-10 text-center'>Add New Product</h3>
                <p className='text-2xl'>Product Name:
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        className="ml-4 mb-3 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    />
                </p>
                <p className='text-2xl'>Product Price:
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        className="ml-4 mb-3 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    />
                </p>
                <p className='text-2xl'>Product Description:
                    <input
                        type="text"
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                        className="ml-4 mb-3 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    />
                </p>
                <button onClick={handleAddProduct}
                    className='block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                    Add Product
                </button>
            </div>
        </div>
    );
}

export default Products;