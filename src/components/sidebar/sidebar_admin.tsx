import { Fragment } from "react";
import { Drawer, Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { Home, StackedLineChart, FormatListBulletedSharp, Add, FileCopySharp, Settings, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthLogout } from "../../utils/AuthService";
import icon_home from '../../assets/img/icon-home.png';
import icon_dashboard from '../../assets/img/icon-dashboard.png';
import icon_ots from '../../assets/img/icon-ots.png';
import icon_solicitudes from '../../assets/img/icon-solicitudes.png';
import icon_settings from '../../assets/img/icon-settings.png';
import icon_logout from '../../assets/img/icon-logout.png';
import icon_perfil from '../../assets/img/icon-perfil.png';
import icon_requests from '../../assets/img/icon-requests.png';
import icon_insumos from '../../assets/img/icon-insumos.png';
import icon_ots_create from '../../assets/img/icon-ots-create.png';
import './sidebar.css'

const drawerWidth = 240;

export const SidebarAdmin = () => {

    // obtener la ruta actual
    const currentPath = window.location.pathname;
    const navigateTo = useNavigate();

    const opts = [
        {
            name: 'Inicio',
            link: '/admin',
            icon: <Home />,
            iconImg: icon_home,
            now: currentPath === '/admin/home' || currentPath === '/admin', 
        },
        {
            name: 'Perfiles',
            link: '/admin/profiles',
            icon: <Home />,
            iconImg: icon_perfil,
            now: currentPath === '/admin/profiles',
        },
        {
            name: 'Dashboard',
            link: '/admin/dashboard',
            icon: <StackedLineChart />,
            iconImg: icon_dashboard,
            now: currentPath === '/admin/dashboard',
        },
        {
            name: 'Insumos',
            link: '/admin/supplies',
            icon: <StackedLineChart />,
            iconImg: icon_insumos,
            now: currentPath === '/admin/supplies',
        },
        {
            name: 'Solicitudes de clientes',
            link: '/admin/requests',
            icon: <StackedLineChart />,
            iconImg: icon_requests,
            now: currentPath === '/admin/requests',
        },
        {
            name: 'Crear OTs',
            link: '/admin/ots/create',
            icon: <Add fontSize="large" />,
            iconImg: icon_ots_create,
            now: currentPath === '/admin/ots/create',
        },
        {
            name: 'Lista de Actividades',
            link: '/admin/activities',
            icon: <FileCopySharp />,
            iconImg: icon_solicitudes,
            now: currentPath === '/admin/ot-details',
        },
        {
            name: 'Listado de OTs',
            link: '/admin/ots',
            icon: <FormatListBulletedSharp />,
            iconImg: icon_ots,
            now: currentPath === '/admin/ots',
        },
        {
            name: 'Configuración',
            link: '/admin/settings',
            icon: <Settings />,
            iconImg: icon_settings,
            now: currentPath === '/admin/settings',
        },
        {
            name: 'Cerrar sesión',
            icon: <Logout />,
            iconImg: icon_logout,
            opt: () => {
                AuthLogout()
                navigateTo('/login')
            }
        }
    ]

    return (
        <Fragment>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    display: { xs: 'none', md: 'flex' }
                }}
                variant="permanent"
                anchor="left"
                className="sidebar-menu"
            >
                <Toolbar style={{backgroundColor: '#272936'}}/>
                <Divider />
                <List>
                    {opts.map((opt, index) => (
                        opt.opt ? (
                            <ListItem disablePadding style={{cursor: 'pointer'}} key={index} onClick={opt.opt}>
                                <ListItemButton>
                                    <ListItemIcon style={{color: 'inherit'}}>
                                        {/* {opt.icon} */}
                                        {
                                            opt.iconImg ? (
                                                <img src={opt.iconImg} alt={opt.name} style={{width: '40px'}} />
                                            ) : (
                                                opt.icon
                                            )
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={opt.name} sx={{color: 'inherit'}} />
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            <Link to={opt.link} key={index} style={{textDecoration: 'none', color: 'inherit'}}>
                                <ListItem disablePadding style={{
                                    backgroundColor: opt.now ? '#f2f9ff' : 'inherit'
                                }}>
                                    <ListItemButton>
                                        <ListItemIcon style={{
                                            color: opt.now ? '#4598d3' : 'inherit'
                                        }}>
                                            {/* {opt.icon} */}
                                            {
                                                opt.iconImg ? (
                                                    <img src={opt.iconImg} alt={opt.name} style={{width: '40px'}} />
                                                ) : (
                                                    opt.icon
                                                )
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={opt.name} sx={{
                                            color: opt.now ? '#4598d3' : 'inherit'
                                        }} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        )
                    ))}
                </List>
            </Drawer>
        </Fragment>
    )
}