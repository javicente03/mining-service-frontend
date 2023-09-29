import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Home, StackedLineChart, FormatListBulletedSharp, Add, FileCopySharp, Settings, Logout } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import { AuthLogout } from '../../utils/AuthService';
import icon_home from '../../assets/img/icon-home.png';
import icon_dashboard from '../../assets/img/icon-dashboard.png';
import icon_ots from '../../assets/img/icon-ots.png';
import icon_solicitudes from '../../assets/img/icon-solicitudes.png';
import icon_settings from '../../assets/img/icon-settings.png';
import icon_logout from '../../assets/img/icon-logout.png';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SidebarLess({
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
                {/* <img src={logo} alt="logo" style={{
                    width: '100%',
                }} /> */}
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