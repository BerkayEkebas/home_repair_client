import AdminLayout from "./AdminLayout";
import MainLayout from "./MainLayout";
import { isAdmin } from "../Config/isAdmin";


// LocalStorage'dan isAdmin bilgisini al


// Kullanıcının admin olup olmadığına göre layout'u belirleyin
const Layout = isAdmin ? AdminLayout : MainLayout;



export default Layout;