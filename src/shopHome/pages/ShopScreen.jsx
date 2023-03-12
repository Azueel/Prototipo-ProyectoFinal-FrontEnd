import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shopApi from '../../api/shopApi';
import '../css/card.css';

export const ShopScreen = () => {
	const navigate = useNavigate();
	const [cargarProductos, setCargarProductos] = useState([]);

	const cargarProductosDB = async () => {
		try {
			const resp = await shopApi.get('/admin/productos');

			setCargarProductos(resp.data.productos);
		} catch (error) {
			console.log();
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	const agregarProducto = async ({ name, precio, cantidad, descripcion }) => {
		try {
			const resp = await shopApi.post('/shop/', {
				name,
				precio,
				cantidad,
				descripcion,
			});

			console.log(resp);
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	useEffect(() => {
		cargarProductosDB();
	}, []);

	return (
		<div>
			{cargarProductos.map((producto) => {
				return (
					<div key={producto._id} className="card">
						<h2>Menu: {producto.name}</h2>
						<p>Precio: ${producto.precio}</p>
						<p>Cantidad: {producto.cantidad}</p>
						<p>Descripcion:{producto.descripcion}</p>

						<button onClick={() => agregarProducto(producto)}>Agregar pedido</button>
					</div>
				);
			})}
		</div>
	);
};
