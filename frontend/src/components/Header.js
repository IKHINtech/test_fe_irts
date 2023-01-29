import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Widgets from '@mui/icons-material/Widgets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchAppBar from './SearchBox';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useDispatch, useSelector } from 'react-redux'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'


const pages = ['HomePage', 'Products'];

const ResponsiveAppBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOrderPage = () => {
        if (userInfo == null) {
            navigate('/login')
        } else {

            navigate('/orders')
        }

    }
    const handleCart = () => {
        if (userInfo == null) {
            navigate('/login')
        } else {

            navigate('/cart')
        }
    }
    const handleLanding = () => {
        navigate('/landing')
    }
    const handlingProducts = () => {
        navigate('/*')
    }

    return (
        <AppBar position="static" color='primary'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Widgets sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        uBox
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem key={1} onClick={handleLanding}>
                                <Typography textAlign="center">Home Page</Typography>
                            </MenuItem>
                            <MenuItem key={2} onClick={handlingProducts}>
                                <Typography textAlign="center">Product</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Widgets sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        uBox
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button
                            key={'home'}
                            onClick={handleLanding}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Homepage
                        </Button>

                        <Button
                            key={'home'}
                            onClick={handlingProducts}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Products
                        </Button>



                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* <Route path="/about" component={<SearchAppBar history={history}} /> */}
                        {/* <Routes>
                        <Route
                            // path=":userId"
                            render={({ history }) =>
                                <SearchAppBar history={history} />
                            }
                        />
                    </Routes> */}

                        <SearchAppBar />

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton >
                            <FavoriteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white', }} />
                        </IconButton>
                        <IconButton onClick={handleOrderPage} >

                            <LocalShippingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white', }} />
                        </IconButton>
                        <IconButton onClick={handleCart}>
                            <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white', }} />
                        </IconButton>

                        {userInfo ? (<Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userInfo.name} />
                            </IconButton>
                        </Tooltip>) : (<Link to={'/login'}>
                            <Typography variant="outlined"  >
                                Login
                            </Typography>

                        </Link>)
                        }
                        {userInfo && userInfo.isAdmin && (
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to={'/profile'}>
                                        <Typography textAlign="center">Profile</Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to={'/admin/userlist'}>
                                        <Typography textAlign="center">Users</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to={'/admin/productlist'}>
                                        <Typography textAlign="center">Products</Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to={'/admin/orderlist'}>
                                        <Typography textAlign="center">Orders</Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem onClick={logoutHandler}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>

                            </Menu>
                        )}
                        {userInfo && !userInfo.isAdmin && (
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to={'/profile'}>
                                        <Typography textAlign="center">Profile</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={logoutHandler}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>

                            </Menu>

                        )}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;