import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import shopApi from '../../api/shopApi';
import { useNavigate } from 'react-router-dom';

export const AdminScreen = () => {
	//estado para contralar la apertura y cierre del modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);

	//estado para guardar los usuarios traidos del backend
	const [cargarUsuarios, setCargarUsuarios] = useState([]);

	//estado para guardar los productos traidos del backend
	const [cargarProductos, setCargarProductos] = useState([]);

	//estado para almacenar los datos del producto que quiero editar
	const [productoEditar, setProductoEditar] = useState({});

	//estado para alamcenar el dato de los pedidos
	const [cargarPedido, setCargarPedido] = useState([]);
	console.log(cargarPedido);

	const navigate = useNavigate();
	//estado para guardar los datos del formulario
	const [formDate, setFormDate] = useState({
		name: '',
		precio: '',
		cantidad: '',
		descripcion: '',
	});

	// onChange es leer los datos cuando vea cambios en el formulario
	const handleChangeForm = (e) => {
		setFormDate({
			...formDate,
			[e.target.name]: e.target.value,
		});
	};

	//on change para leer los datos del edit
	const handleChangeFormEditar = (e) => {
		setProductoEditar({
			...productoEditar,
			[e.target.name]: e.target.value,
		});
	};

	//cuando el usuario haga un submit
	const handleSubmitForm = (e) => {
		e.preventDefault();

		const { name, precio, cantidad, descripcion } = formDate;

		//validaciones
		if (
			name.length === 0 ||
			precio.length === 0 ||
			cantidad.length === 0 ||
			descripcion.length === 0
		) {
			return console.log('todos los campos son obligatorios');
		}
		console.log(formDate);

		guardarProductoDB(name, precio, cantidad, descripcion);

		setIsModalOpen(false);
	};

	//cargarUsuarios desde DB
	const cargarUser = async () => {
		try {
			const resp = await shopApi.get('/admin/usuarios');

			setCargarUsuarios(resp.data.usuarios);
		} catch (error) {
			console.log(error);
		}
	};

	//cargarProductos desde DB
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

	//guardar Producto en DB
	const guardarProductoDB = async (name, precio, cantidad, descripcion) => {
		try {
			const resp = await shopApi.post('/admin/new', {
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

	//funcion para eliminar Productos
	const eliminarProductoClick = async (id) => {
		try {
			const resp = await shopApi.delete(`/admin/eliminar/${id}`);
			console.log(resp);
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	//mandar datos al backend
	const editarProductoDB = async (_id, name, precio, cantidad, descripcion) => {
		try {
			const resp = await shopApi.put('admin/editar', {
				_id,
				name,
				precio,
				cantidad,
				descripcion,
			});

			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	//funcion para cuando se ejecuta el submit del editar
	const handleSubmitFormEditar = (e) => {
		e.preventDefault();
		const { _id, name, precio, cantidad, descripcion } = productoEditar;

		//validaciones
		if (
			name.length === 0 ||
			precio.length === 0 ||
			cantidad.length === 0 ||
			descripcion.length === 0
		) {
			return console.log('todos los campos son obligatorios');
		}

		setIsModalOpenEditar(false);

		editarProductoDB(_id, name, precio, cantidad, descripcion);
	};

	const editarProductoClick = (producto) => {
		setProductoEditar(producto);
		setIsModalOpenEditar(true);
	};

	const cargarPedidosDB = async () => {
		try {
			const resp = await shopApi.get('/admin/pedido');

			setCargarPedido(resp.data.pedido);
		} catch (error) {
			console.log();
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	const clickConfirmarPedido = async ({ _id }) => {
		try {
			const resp = await shopApi.put('admin/confirmar', {
				_id,
			});

			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		cargarUser();
		cargarProductosDB();
		cargarPedidosDB();
	}, []);

	return (
		<>
			<h1 className="text-center p-3">Admin Page</h1>

			<h3>Usuarios</h3>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#ID</th>
						<th>First Name</th>
						<th>Email</th>
					</tr>
				</thead>

				{cargarUsuarios.map((usuario) => {
					return (
						<tbody key={usuario._id}>
							<tr>
								<td>{usuario._id}</td>
								<td>{usuario.name}</td>
								<td>{usuario.email}</td>
							</tr>
						</tbody>
					);
				})}
			</Table>
			<hr />
			<h3 className="mt-5">Productos</h3>

			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#ID</th>
						<th>Nombre Producto</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Descripcion</th>
						<th>Editar</th>
						<th>Eliminar</th>
					</tr>
				</thead>

				{cargarProductos.map((producto) => {
					return (
						<tbody key={producto._id}>
							<tr>
								<td>{producto._id}</td>
								<td>{producto.name}</td>
								<td>{producto.precio}</td>
								<td>{producto.cantidad}</td>
								<td>{producto.descripcion}</td>
								<td>
									<button onClick={() => editarProductoClick(producto)}>
										Editar
									</button>
								</td>
								<td>
									<button onClick={() => eliminarProductoClick(producto._id)}>
										Eliminar
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
			</Table>

			<h2>Pedidos a confirmar</h2>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#ID</th>
						<th>Productos</th>
						<th>Fecha</th>
						<th>Estado del pedido</th>
						<th>icono de button </th>
					</tr>
				</thead>

				{cargarPedido.map((pedido) => {
					return (
						<tbody key={pedido._id}>
							<tr>
								<td>{pedido.user}</td>
								<td>
									{pedido.producto.map((producto, i) => {
										return (
											<div key={i} className="text-white">
												{producto.name}
											</div>
										);
									})}
								</td>
								<td>{pedido.fecha}</td>
								<td>{pedido.estado}</td>

								<td>
									<button onClick={() => clickConfirmarPedido(pedido)}>
										Confirmar
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
			</Table>

			{/* Botón con icono "+" */}
			<div className="d-flex justify-content-end me-5">
				<button
					className="add-product-button border rounded-circle p-3 bg-dark "
					onClick={() => setIsModalOpen(true)}
				>
					<FaPlus className="add-product-icon text-white" />
				</button>
			</div>

			{/* Modal para agregar producto */}
			<Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
				<h2>Agregar producto</h2>
				<Form onSubmit={handleSubmitForm}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={formDate.name}
							onChange={handleChangeForm}
							placeholder="Enter email"
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>precio</Form.Label>
						<Form.Control
							type="number"
							name="precio"
							className="w-50"
							value={formDate.precio}
							onChange={handleChangeForm}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>cantidad</Form.Label>
						<Form.Control
							type="number"
							name="cantidad"
							className="w-50"
							value={formDate.cantidad}
							onChange={handleChangeForm}
						/>
					</Form.Group>
					<Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
						<Form.Label>Descripcion</Form.Label>
						<textarea
							name="descripcion"
							className="w-50"
							value={formDate.descripcion}
							onChange={handleChangeForm}
						></textarea>
					</Form.Group>
					<Button type="submit">Agregar</Button>
				</Form>
			</Modal>

			{/* Modal de Editar */}
			<Modal
				isOpen={isModalOpenEditar}
				onRequestClose={() => setIsModalOpenEditar(false)}
			>
				<h2>Editar producto</h2>
				<Form onSubmit={handleSubmitFormEditar}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={productoEditar.name}
							onChange={handleChangeFormEditar}
							placeholder="Enter email"
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>precio</Form.Label>
						<Form.Control
							type="number"
							name="precio"
							className="w-50"
							value={productoEditar.precio}
							onChange={handleChangeFormEditar}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>cantidad</Form.Label>
						<Form.Control
							type="number"
							name="cantidad"
							className="w-50"
							value={productoEditar.cantidad}
							onChange={handleChangeFormEditar}
						/>
					</Form.Group>
					<Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
						<Form.Label>Descripcion</Form.Label>
						<textarea
							name="descripcion"
							className="w-50"
							value={productoEditar.descripcion}
							onChange={handleChangeFormEditar}
						></textarea>
					</Form.Group>
					<Button type="submit">Agregar</Button>
				</Form>
			</Modal>
		</>
	);
};
