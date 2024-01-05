import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Home, StackedLineChart, FormatListBulletedSharp, Add, FileCopySharp, Settings, Logout, BusinessCenter, Business } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import { AuthLogout } from '../../utils/AuthService';
import icon_home from '../../assets/img/icon-home.png';
import icon_dashboard from '../../assets/img/icon-dashboard.png';
import icon_ots from '../../assets/img/icon-ots.png';
import icon_solicitudes from '../../assets/img/icon-solicitudes.png';
import icon_settings from '../../assets/img/icon-settings.png';
import icon_logout from '../../assets/img/icon-logout.png';
import icon_perfil from '../../assets/img/icon-perfil.png';
import icon_companies from '../../assets/img/icon-companies.png';
import icon_requests from '../../assets/img/icon-requests.png';
import icon_insumos from '../../assets/img/icon-insumos.png';
import icon_ots_create from '../../assets/img/icon-ots-create.png';
import logo from '../../assets/img/logo_sidebar.png';
import './sidebar.css'

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SidebarLessAdmin({
    isOpenDrawer,
    setIsOpenDrawer
}: {
    isOpenDrawer: boolean,
    setIsOpenDrawer: (isOpenDrawer: boolean) => void
}): JSX.Element {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

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
            name: 'Empresas',
            link: '/admin/companies',
            icon: <Business />,
            iconImg: icon_companies,
            now: currentPath === '/admin/companies', 
        },
        {
            name: 'Perfiles',
            link: '/admin/users',
            icon: <Home />,
            iconImg: icon_perfil,
            now: currentPath === '/admin/users',
        },
        // {
        //     name: 'Dashboard',
        //     link: '/admin/dashboard',
        //     icon: <StackedLineChart />,
        //     iconImg: icon_dashboard,
        //     now: currentPath === '/admin/dashboard',
        // },
        {
            name: 'Insumos',
            link: '/admin/insumos',
            icon: <StackedLineChart />,
            iconImg: icon_insumos,
            now: currentPath === '/admin/insumos',
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
        // {
        //     name: 'Configuración',
        //     link: '/admin/settings',
        //     icon: <Settings />,
        //     iconImg: icon_settings,
        //     now: currentPath === '/admin/settings',
        // },
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


    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{
                width: '100%',
                height: '100px',
                backgroundColor: '#272936',
            }}>
                <img src={logo} alt="logo" style={{width: '70%', height: '90%', objectFit: 'contain' }} />
            </div>
            <List>
                {opts.map((opt, index) => (
                    opt.opt ? (
                        <ListItem disablePadding style={{ cursor: 'pointer' }} key={index} onClick={opt.opt}>
                            <ListItemButton>
                                <ListItemIcon style={{ color: 'inherit' }}>
                                    {/* {opt.icon} */}
                                    {
                                        opt.iconImg ? (
                                            <img src={opt.iconImg} alt={opt.name} style={{ width: '40px' }} />
                                        ) : (
                                            opt.icon
                                        )
                                    }
                                </ListItemIcon>
                                <ListItemText primary={opt.name} sx={{ color: 'inherit' }} />
                            </ListItemButton>
                        </ListItem>
                    ) : (
                        <Link to={opt.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                                                <img src={opt.iconImg} alt={opt.name} style={{ width: '40px' }} />
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
        </Box>
    );

    return (
        <React.Fragment>
            <Drawer
                anchor={'left'}
                open={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, display: { xs: 'flex', md: 'none' } }}
            >
                {list('left')}
            </Drawer>
        </React.Fragment>
    );
}