import { Route, Routes } from "react-router-dom";
import AvisoCarrito from "./components/AvisoCarrito";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RutaAdmin from "./components/RutaAdmin";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Carrito from "./pages/Carrito";
import Categorias from "./pages/Categorias";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import CompraFallida from "./pages/CompraFallida";
import Contacto from "./pages/Contacto";
import DetalleProducto from "./pages/DetalleProducto";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Nosotros from "./pages/Nosotros";
import Ofertas from "./pages/Ofertas";
import Productos from "./pages/Productos";
import Registro from "./pages/Registro";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import LayoutAdmin from "./pages/admin/LayoutAdmin";
import ResumenAdmin from "./pages/admin/ResumenAdmin";

function App() {
  return (
    <>
      <Navbar />
      <main className="contenido-principal">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-fallida" element={<CompraFallida />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/admin"
            element={
              <RutaAdmin>
                <LayoutAdmin />
              </RutaAdmin>
            }
          >
            <Route index element={<ResumenAdmin />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="pedidos" element={<AdminPedidos />} />
          </Route>
          <Route path="*" element={<p className="text-center py-5">Página no encontrada.</p>} />
        </Routes>
      </main>
      <Footer />
      <AvisoCarrito />
    </>
  );
}

export default App;
