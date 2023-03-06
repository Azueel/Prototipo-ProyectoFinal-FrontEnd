import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import shopApi from '../../api/shopApi';

export const AdminScreen = () => {
	//estado para contralar la apertura y cierre del modal
	const [isModalOpen, setIsModalOpen] = useState(false);

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
	};

	//cargarUsuarios desde DB
	const cargarUser = () => {};

	//cargarProductos desde DB
	const cargarProductos = () => {};

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
			console.log(error);
		}
	};

	return (
		<>
			<h1 className="text-center p-3">Admin Page</h1>

			<h3>Usuarios</h3>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
					</tr>
				</thead>
			</Table>
			<hr />
			<h3 className="mt-5">Productos</h3>

			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
						<th>description</th>
					</tr>
				</thead>
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
		</>
	);
};
