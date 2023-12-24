import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/slices/productSlice';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from 'axios';
import './user.css';
const Product = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.product);

	const { users } = useSelector((state) => state.user);
	const [user, setUser] = useState([]);

	console.log(users);

	const navigate = useNavigate();
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	const getUser = async () => {
		try {
			const response = await axios.get('http://localhost:5500/api/user');
			setUser(response.data);
		} catch (error) {}
	};

	const handleDelete = async (userId) => {
		let text = 'Bạn có chắc muốn xóa người dùng này không ?';
		if (window.confirm(text) === true) {
			await axios.delete(`http://localhost:5500/api/user/${userId}`);
			alert('Xóa người dùng thành công !');
			getUser();
		} else {
			text = 'Đã hủy!';
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Box sx={{ width: '100%', marginTop: 10 }}>
			<button
				style={{
					position: 'fixed',
					right: 10,
					height: 40,
					outline: 'none',
					padding: 10,
					border: 'none',
					top: 70,
					backgroundColor: '#EEEEEE',
					color: '#333',
					fontWeight: 'bold',
					border: '1px solid gray'
				}}
			>
				<Link to='/user/create'>TẠO TÀI KHOẢN</Link>
			</button>

			<table id='customers'>
				<tr>
					<th>Tên người dùng</th>
					<th>Email</th>
					<th>Trạng thái</th>
					<th>Thao tác</th>
				</tr>
				{user
					.filter((item) => item.isAdmin !== true)
					.map((item) => {
						return (
							<tr>
								<td>{item.userName}</td>
								<td>{item.email}</td>
								<td>{item.status === 'Active' ? 'Hoạt động' : 'Ngưng hoạt động'}</td>
								<td>
									<Link to={`/user/update/${item._id}`}>
										<EditNoteIcon
											className='update-icon'
											sx={{ marginRight: 3, cursor: 'pointer', marginTop: 1, color: 'gray' }}
										/>
									</Link>
									<DeleteOutlineOutlinedIcon
										className='delete-icon'
										sx={{ cursor: 'pointer' }}
										onClick={() => handleDelete(item._id)}
										color='error'
									/>
								</td>
							</tr>
						);
					})}
			</table>
		</Box>
	);
};

export default Product;
