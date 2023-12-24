import React from 'react';
import './createuser.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRepassword] = useState('');

	const [userNameError, setUserNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [rePasswordError, setRePasswordError] = useState('');

	const navigate = useNavigate();

	function ValidateEmail(email) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		}
		return false;
	}

	let flagEmpty = 0;
	let flagError = 0;
	const validateEmpty = () => {
		if (userName.trim().length === 0) {
			setUserNameError('Tên người dùng ko được để trống.');
			flagEmpty = 1;
		}

		if (email.trim().length === 0) {
			setEmailError('Email không được để trống.');
			flagEmpty = 1;
		}

		if (password.trim().length === 0) {
			setPasswordError('Mật khẩu không được để trống.');
			flagEmpty = 1;
		}

		if (rePassword.trim().length === 0) {
			setRePasswordError('Mật khẩu không được để trống.');
			flagEmpty = 1;
		}
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		validateEmpty();
		if (flagEmpty === 1) {
			return;
		}
		let emailValidate = ValidateEmail(email);
		if (!emailValidate) {
			setEmailError('Email không hợp lệ.');
			flagError = 1;
		}

		if (password.trim().length < 8 || rePassword.trim().length < 8) {
			setPasswordError('Mật khẩu phải lớn hơn hoặc bằng 8 kí tự');
			flagError = 1;
		}

		if (password.trim() !== rePassword.trim()) {
			setRePasswordError('Mật khẩu nhập lại không khớp nhau');
			flagError = 1;
		}

		if (flagError === 1) {
			return;
		}

		try {
			await axios.post('http://localhost:5500/api/auth/register', {
				userName,
				email,
				password
			});
			alert('Tạo tài khoản thành công !');
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='register-container'>
			<div className='register-wraper'>
				<form onSubmit={handleSubmitForm}>
					<h1>TẠO MỚI NGƯỜI DÙNG</h1>
					<div>
						<label htmlFor=''>
							Tên người dùng<span>*</span>
						</label>
						<span className='register-error'>{userNameError}</span>

						<input
							name='userName'
							type='text'
							placeholder='Tên người dùng'
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor=''>
							Email<span>*</span>
						</label>
						<span className='register-error'>{emailError}</span>

						<input
							name='email'
							type='email'
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor=''>
							Mật khẩu<span>*</span>
						</label>
						<span className='register-error'>{passwordError}</span>

						<input
							name='password'
							type='password'
							placeholder='Mật khẩu'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor=''>
							Nhập lại mật khẩu<span>*</span>
						</label>
						<span className='register-error'>{rePasswordError}</span>

						<input
							name='rePassword'
							type='password'
							placeholder='Nhập lại mật khẩu'
							onChange={(e) => setRepassword(e.target.value)}
						/>
					</div>
					<div>
						<button type='submit'>TẠO</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
