import { useState } from 'react';
import shopApi from '../../api/shopApi';
import { useNavigate } from 'react-router-dom';
import './css/auth.css';

export const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [msgError, setMsgError] = useState('');
	const navigate = useNavigate();

	const startRegister = async (name, email, password) => {
		try {
			const resp = await shopApi.post('/auth/new', {
				name,
				email,
				password,
			});
			localStorage.setItem('token', resp.data.token);
			navigate('/shop');
		} catch ({ response }) {
			setError(true);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		//validaciones
		if (!name || !email || !password) {
			setError(true);
			setMsgError('Todos los campos son obligatorios');
			return;
		}

		setError(false);

		//enviar datos a la funcion del backend
		startRegister(name, email, password);
	};

	return (
		<div className="register-container">
			<form className="form-container" onSubmit={handleSubmit}>
				<h1>Registro</h1>

				{error ? <h3 className="errorStyle">{msgError}</h3> : ''}

				<div className="input-container">
					<label htmlFor="name">Nombre:</label>
					<input
						type="text"
						id="name"
						placeholder="Introduce tu nombre"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="email">Correo electrónico:</label>
					<input
						type="email"
						id="email"
						placeholder="Introduce tu correo electrónico"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="password">Contraseña:</label>
					<input
						type="password"
						id="password"
						placeholder="Introduce tu contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Registrarse</button>
			</form>
		</div>
	);
};
