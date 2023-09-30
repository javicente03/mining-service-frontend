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
import icon_plus from '../../assets/img/icon-plus.png';
import logo from '../../assets/img/logo_sidebar.png';

const drawerWidth = 240;

export const Sidebar = () => {

    // obtener la ruta actual
    const currentPath = window.location.pathname;
    const navigateTo = useNavigate();

    const opts = [
        {
            name: 'Inicio',
            link: '/home',
            icon: <Home />,
            iconImg: icon_home,
            now: currentPath === '/home' || currentPath === '/', 
        },
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: <StackedLineChart />,
            iconImg: icon_dashboard,
            now: currentPath === '/dashboard',
        },
        {
            name: 'Listado de OTs',
            link: '/ots',
            icon: <FormatListBulletedSharp />,
            iconImg: icon_ots,
            now: currentPath === '/ots',
        },
        {
            name: 'Nueva Solicitud',
            link: '/requests/create',
            icon: <Add fontSize="large" />,
            iconImg: icon_plus,
            now: currentPath === '/requests/create',
        },
        {
            name: 'Mis Solicitudes',
            link: '/requests',
            icon: <FileCopySharp />,
            iconImg: icon_solicitudes,
            now: currentPath === '/ot-details',
        },
        {
            name: 'Configuración',
            link: '/settings',
            icon: <Settings />,
            iconImg: icon_settings,
            now: currentPath === '/settings',
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
            >
                <Toolbar style={{backgroundColor: '#272936'}} >
                    <img src={logo} alt="logo" style={{width: '70%', height: '90%', objectFit: 'contain', margin: '0 auto'}} />
                </Toolbar>

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
                                                <img src={opt.iconImg} alt={opt.name} style={{width: '40px', height: '40px', objectFit: 'contain'}} />
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