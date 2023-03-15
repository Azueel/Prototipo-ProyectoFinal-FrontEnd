import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shopApi from '../../api/shopApi';

export const PedidoScreen = () => {
	const navigate = useNavigate();
	const [cargarPedido, setCargarPedido] = useState([]);
	const [precioFinal, setPrecioFinal] = useState('');

	const cargarPedidosUsuarioDB = async () => {
		try {
			const resp = await shopApi.get('/shop');

			setCargarPedido(resp.data.cargarProducto);
		} catch (error) {
			console.log();
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	const sacarPedido = async ({ _id }) => {
		try {
			const resp = await shopApi.delete(`/shop/${_id}`);
			console.log(resp);
		} catch (error) {
			console.log();
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	const precioTotal = () => {
		let total = 0;

		const sumaProducto = cargarPedido.map((producto) => {
			return (total += parseInt(producto.precio));
		});

		setPrecioFinal(sumaProducto.pop());
	};

	const confirmarPedido = async () => {
		try {
			const resp = await shopApi.post('/shop/pedido', {
				menu: cargarPedido,
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
		precioTotal();
	}, [cargarPedidosUsuarioDB]);

	useEffect(() => {
		cargarPedidosUsuarioDB();
	}, []);

	return (
		<div>
			{cargarPedido.map((producto) => {
				return (
					<div key={producto._id} className="card">
						<h2>{producto.name}</h2>
						<p>Precio: ${producto.precio}</p>
						<p>Cantidad: {producto.cantidad}</p>
						<p>descripcion: {producto.descripcion}</p>

						<button
							onClick={() => sacarPedido(producto)}
							className="w-25 bg-danger text-white"
						>
							x
						</button>
					</div>
				);
			})}
			<hr />
			<div>
				<p>
					Total: <span>${precioFinal}</span>
				</p>

				<button onClick={confirmarPedido}>Confirmar Pedido</button>
			</div>
		</div>
	);
};
