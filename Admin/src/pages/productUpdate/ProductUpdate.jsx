import React from 'react';
import './productUpdate.scss';
import { Box, Input, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { publicRequest, userRequest } from '../../requestMethod';
import { useState, useEffect } from 'react';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/slices/productSlice';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const UpdateProduct = () => {
	const theme = useTheme();
	const [color, setColor] = useState('');
	const [size, setSize] = useState([]);
	const [categoryId, setCategoryId] = useState('');
	const [price, setPrice] = useState(null);
	const [priceOld, setPriceOld] = useState('');
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [stock, setStock] = useState(null);
	const [previewSource, setPreviewSource] = useState('');
	const [dataUrlImage, setDataUrlImage] = useState('');
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.product);
	const [category, setCategory] = useState([]);
	const getCategorys = async () => {
		try {
			const response = await axios.get('http://localhost:5500/api/category');
			setCategory(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const navigate = useNavigate();

	const id = useLocation().pathname.split('/')[3];

	const getSingleProduct = async () => {
		try {
			const response = await axios.get(`http://localhost:5500/api/product/${id}`);
			console.log('123', response.data);
			setName(response.data.name);
			setDesc(response.data.desc);
			setColor(response.data.color);
			setPrice(response.data.price);
			setSize(response.data.size);
			setPriceOld(response.data.priceOld);
			setCategoryId(response.data.categoryId);
			setDataUrlImage(response.data.image);
		} catch (error) {}
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

	const handleSubmitForm = (e) => {
		e.preventDefault();
		const data = {
			name,
			desc,
			color,
			size,
			priceOld: parseFloat(priceOld),
			price: parseFloat(price),
			categoryId,
			image: dataUrlImage
		};

		const productCreateRequest = async () => {
			try {
				await userRequest.put(`/product/${id}`, data);
				setPreviewSource('');
				setDataUrlImage('');
			} catch (error) {
				console.log(error);
			}
		};
		productCreateRequest();
		alert('Cập nhật sản phẩm thành công !');
		navigate('/');
	};

	const addSize = (value) => {
		const index = size.indexOf(value);
		if (index !== -1) {
			const newSize = size.filter((item) => item !== value);
			setSize(newSize);
			return;
		}
		setSize([...size, value]);
	};

	useEffect(() => {
		getCategorys();
		getSingleProduct();
	}, []);

	console.log(categoryId);

	return (
		<form id='cate-form' style={{ width: 1000, margin: '0 auto', marginTop: 100 }} onSubmit={handleSubmitForm}>
			<label for='fname'>Tên sản phẩm</label>
			<input
				value={name}
				className='cate-create-input'
				type='text'
				id='fname'
				name='firstname'
				onChange={(e) => setName(e.target.value)}
				placeholder='Tên danh mục'
			/>
			<label for='fname'>Mô tả</label>
			<input
				value={desc}
				className='cate-create-input'
				type='text'
				id='fname'
				name='firstname'
				onChange={(e) => setDesc(e.target.value)}
				placeholder='Mô tả'
			/>
			<label for='fname'>Màu</label>
			<select
				value={color}
				onChange={(e) => setColor(e.target.value)}
				className='select-option-input-create'
				id='country'
				name='country'
			>
				<option disabled selected value=''>
					Chọn màu
				</option>
				{['Trắng', 'Đen', 'Đỏ', 'Xám', 'Xanh', 'Hồng', 'Vàng'].map((item) => {
					return <option value={item}>{item}</option>;
				})}
			</select>
			<label for='fname'>
				Kích cỡ{' '}
				{size?.map((item) => {
					return <span style={{ marginLeft: 20 }}>[ {item} ]</span>;
				})}
			</label>
			<select
				onChange={(e) => addSize(e.target.value)}
				className='select-option-input-create'
				id='country'
				name='country'
			>
				<option disabled selected value=''>
					Chọn kích cỡ
				</option>
				{['S', 'M', 'L', 'XL'].map((item) => {
					return <option value={item}>{item}</option>;
				})}
			</select>
			<label for='fname'>Giá mới</label>
			<input
				value={price}
				className='cate-create-input'
				type='number'
				id='fname'
				name='firstname'
				onChange={(e) => setPrice(e.target.value)}
				placeholder='Giá mới'
			/>
			<label htmlFor=''>Giá cũ</label>
			<input
				value={priceOld}
				className='cate-create-input'
				type='number'
				id='fname'
				name='firstname'
				onChange={(e) => setPriceOld(e.target.value)}
				placeholder='Giá cũ'
			/>
			<label htmlFor=''>Danh mục</label>
			<select
				value={categoryId}
				onChange={(e) => setCategoryId(e.target.value)}
				className='select-option-input-create'
				id='country'
				name='country'
			>
				<option disabled selected value=''>
					Chọn danh mục
				</option>
				{category &&
					category.map((item) => {
						return <option value={item._id}>{item.name}</option>;
					})}
			</select>
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
				value='CẬP NHẬT SẢN PHẨM'
			/>
		</form>
	);
};

export default UpdateProduct;
