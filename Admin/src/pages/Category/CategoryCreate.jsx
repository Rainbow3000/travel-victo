import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';
import axios from 'axios';
import './category.css';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/slices/productSlice';
const CategoryCreate = () => {
	const [name, setName] = useState('');
	const [dataUrlImage, setDataUrlImage] = useState('');
	const navigate = useNavigate();
	const { isLoading } = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:5500/api/category', { name, image: dataUrlImage });
		alert('Tạo danh mục thành công');
		navigate('/category');
	};

	const handleFileInputChange = (event) => {
		dispatch(setIsLoading(true));
		const file = event.target.files[0];
		const storageRef = ref(storage, file.name);
		uploadBytes(storageRef, file).then((snapshot) => {
			getDownloadURL(ref(storage, file.name)).then((downloadUrl) => {
				setDataUrlImage(downloadUrl);
				dispatch(setIsLoading(false));
			});
		});
	};

	return (
		<>
			<form id='cate-form' style={{ width: 500, margin: '0 auto', marginTop: 200 }} onSubmit={handleSubmit}>
				<label for='fname'>Tên danh mục</label>
				<input
					className='cate-create-input'
					type='text'
					id='fname'
					name='firstname'
					onChange={(e) => setName(e.target.value)}
					placeholder='Tên danh mục'
				/>
				<label htmlFor=''>Ảnh</label>
				<input
					onChange={handleFileInputChange}
					className='cate-create-input'
					type='file'
					id='fname'
					name='firstname'
				/>
				<div>
					{isLoading ? (
						<span style={{ marginTop: 5 }}>Đang tải ảnh...</span>
					) : (
						dataUrlImage && <img width={120} height={120} src={dataUrlImage} alt='' />
					)}
				</div>
				<input
					style={isLoading ? { cursor: 'not-allowed', backgroundColor: '#EEEEEE' } : {}}
					className='cate-create-input-submit'
					type={isLoading ? 'button' : 'submit'}
					value='TẠO DANH MỤC'
				/>
			</form>
		</>
	);
};

export default CategoryCreate;
