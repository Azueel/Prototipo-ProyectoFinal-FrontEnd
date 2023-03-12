import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import shopApi from '../../api/shopApi';

export const PedidoScreen = () => {
	const navigate = useNavigate();

	const cargarPedidosUsuarioDB = async () => {
		try {
			const resp = await shopApi.get('/shop');

			console.log(resp.data.cargarProducto);
		} catch (error) {
			console.log();
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	useEffect(() => {
		cargarPedidosUsuarioDB();
	}, []);

	return <div>PedidoScreen</div>;
};
