import React, { useEffect, useMemo } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import {

  Employees,
  Patients,
  Users,
  FilterUserByStatus,
  FilterPatientByStatus,
  FilterResultByPatient, Results, FilterResultByDoctor, FilterResultByDoctorAppo, FilterResultByDoctorAppoForPatientView
} from '../../../action/action'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export default function Navbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



  // useEffect(() => {
  //   dispatch(Patients())
  // }, [])
  useEffect(() => { dispatch(Employees()) }, [])
  useEffect(() => { dispatch(Users()) }, [])
  useEffect(() => { dispatch(Results()) }, [])
  useEffect(() => { dispatch(FilterPatientByStatus()) }, [])
  useEffect(() => { dispatch(FilterUserByStatus()) }, [])
  useEffect(() => { dispatch(FilterResultByDoctor()) }, [])
  useEffect(() => { dispatch(FilterResultByPatient()) }, [])
  useEffect(() => { dispatch(FilterResultByDoctorAppo()) }, [])
  useEffect(() => { dispatch(FilterResultByDoctorAppoForPatientView()) }, [])

  const emp = useSelector(state => state.rootEmployeeList.employees)
  const user = useSelector(state => state.rootUserList.user)
  const userFilter = useSelector(state => state.rootUserFilterByStatus.user)
  const patient = useSelector(state => state.rootPatientList.patients)
  const result = useSelector(state => state.rootResultList.caseResult)
  const filterResult = useSelector(state => state.rootResultFilterByDoctor.caseResult);
  const filterResultByPatient = useSelector(state => state.rootResultFilterByPatient.caseResult);
  const newPatient = useSelector(state => state.rootPatientListByStatus.patients)
  const filterAppointement = useSelector(state => state.rootResultByDoctorAppoForPatientView.caseResult)
  const filterAppoByDoctor = useSelector(state => state.rootResultFilterByDoctorAppo.caseResult)
  // const ViewedPatient = useSelector(state=>state.rootPatientViewed.patients)
  const userFilterRows = useMemo(() => userFilter.map((rowUfil, index) => ({ ...rowUfil, id: rowUfil.uid })), [userFilter]);

  // const viewedPatientRow = useMemo(() => ViewedPatient.map((row, index) => ({ ...row, id: row.uid })), [user]);
  const userRole = localStorage.getItem("role")

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    const id = localStorage.getItem("UID")
    const role = localStorage.getItem('role')
    const uid = parseInt(id)
    if (role === 'admin' || role === 'doctor') {
      navigate(`/employee/update/${uid}`)
    } else {
      navigate(`/patient/update/${uid}`)
    }
  };
  const handleUserAccount = () => {
    const id = localStorage.getItem("UID")
    const uid = parseInt(id)
    navigate(`/user/updateaccount/${uid}`)
  };
  const handleResultViewForPatient = () => {
    const id = localStorage.getItem("UID")
    const uid = parseInt(id)
    navigate(`/result/patient/${uid}`)
  }
  const handleAppointementViewForPatient = () => {
    const id = localStorage.getItem("UID")
    const uid = parseInt(id)
    navigate(`/appointement/patient/${uid}`)

  }
  const handleResultView = () => {
    navigate('/result')
  }
  const handlePatientView = () => {
    navigate('/patient')
  }
  const gotoHome = () => {
    navigate('/dashboard')
  }
  const gotoHomeDoct = () => {
    navigate('/patient')
  }
  const gotoAccounts = () => {
    navigate('/user')
  }
  const gotoBlockedAcc = () => {
    navigate('/user/blockedaccounts')
  }
  const gotoAppointements = () => {
    navigate('/appointement')
  }
  //  const del = Confirm("aryou sure")

  const logout = () => {
    if (userRole === 'patient') {
      navigate('/')
    } else if (userRole === 'doctor' || userRole === 'admin') {
      navigate('/logout')
    }
  }




  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleUserAccount}>Change Password</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  /********* MOBILE VIEW        **********************/
  /// //

  /********* ADMIN"S NAVBAR VIEW *********************/

  const renderMobileMenu = (
    // if(userRole === 'admin'){}
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit"
        >
          <LogoutIcon />
        </IconButton>
      </MenuItem>
    </Menu>
  );



  /**IOS VIEW********************************************** */
  /***********ADMIN'S NAVBAR VIEW********************************* */
  if (userRole === 'admin') {

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <IconButton
                size="large"
                aria-label="users list"
                color="inherit"
                onClick={gotoHome}
              >
                <HomeIcon />
                Home
              </IconButton>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Blocked Accounts">
                <IconButton
                  size="large"
                  aria-label="notify"
                  color="inherit"
                  onClick={gotoBlockedAcc}
                >
                  <Badge badgeContent={userFilterRows.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title='Profile'>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit" >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title='Logout'>
                <IconButton
                  size="large"
                  aria-label="users list"
                  color="inherit"
                  onClick={logout}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>

            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
    //**DOCTOR'S NAVBAR VIEW00*********************** */
    /************************************************ */
  } else if (userRole === 'doctor') {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="users list"
              color="inherit"
              onClick={gotoHomeDoct}
            >
              <HomeIcon />
              Home
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="notifications"
                color="inherit"
                onClick={handlePatientView}
              >
                <Badge badgeContent={newPatient.length} color="error">
                  New Patients
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="notifications"
                color="inherit"
                onClick={handleResultView}
              >
                <Badge badgeContent={filterResult.length} color="error">
                  Results
                </Badge>
              </IconButton>

              <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                onClick={gotoAppointements}
              >

                <Badge badgeContent={filterAppoByDoctor.length} color="error">
                  Appointements
                </Badge>
              </IconButton>
              <Tooltip title="Profile">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={logout}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );

  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              onClick={handleResultViewForPatient}
            >
              Home
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleResultViewForPatient}
              >
                <Badge badgeContent={filterResultByPatient.length} color="error">
                  Result
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                onClick={handleAppointementViewForPatient}
              >
                <Badge badgeContent={0} color="error">
                  Appointement
                </Badge>
              </IconButton>
              <Tooltip title='Profile view'>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title='Logout'>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={logout}
                  color="inherit"
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  }
}