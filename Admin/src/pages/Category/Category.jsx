import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditNoteIcon from '@mui/icons-material/EditNote';
const Category = () => {
	const [category, setCategory] = useState([]);

	const getCategorys = async () => {
		try {
			const response = await axios.get('http://localhost:5500/api/category');
			setCategory(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:5500/api/category/${id}`);
			alert('Xóa danh mục thành công');
			getCategorys();
		} catch (error) {}
	};

	useEffect(() => {
		getCategorys();
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
					borderRadius: 5,
					border: 'none',
					top: 70,
					backgroundColor: '#EEEEEE',
					color: '#333',
					fontWeight: 'bold',
					border: '1px solid gray'
				}}
			>
				<Link to='/category/create'>TẠO DANH MỤC</Link>
			</button>
			<table id='customers'>
				<tr>
					<th>Ảnh</th>
					<th>Tên danh mục</th>
					<th>Hành động</th>
				</tr>
				{category.map((item) => {
					return (
						<tr key={item._id}>
							<td>
								<img width={120} src={item.image} alt='' />
							</td>
							<td>{item.name}</td>
							<td>
								<Link to={`/category/${item._id}`}>
									<EditNoteIcon
										sx={{ marginRight: 3, cursor: 'pointer', marginTop: 1, color: 'gray' }}
									/>
								</Link>
								<DeleteOutlineOutlinedIcon
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

export default Category;
