import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AdminScreen } from '../admin/pages/AdminScreen';
import { LoginScreen } from '../auth/pages/LoginScreen';
import { RegisterScreen } from '../auth/pages/RegisterScreen';
import { PedidoScreen } from '../shopHome/pages/PedidoScreen';
import { ShopScreen } from '../shopHome/pages/ShopScreen';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginScreen />} />
				<Route path="/register" element={<RegisterScreen />} />

				<Route path="/shop" element={<ShopScreen />} />

				<Route path="/admin" element={<AdminScreen />} />
				<Route path="/pedido" element={<PedidoScreen />} />
			</Routes>
		</BrowserRouter>
	);
};
