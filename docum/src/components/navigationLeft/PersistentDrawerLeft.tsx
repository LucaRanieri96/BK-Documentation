import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('Overview');
  const [submenuOpen, setSubmenuOpen] = React.useState<{ [key: string]: boolean }>({
    Inference: false,
    'Use Cases': false,
    Models: false,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (text: string) => {
    if (['Inference', 'Use Cases', 'Models'].includes(text)) {
      setSubmenuOpen((prev) => ({ ...prev, [text]: !prev[text] }));
    } else {
      setContent(text);
    }
  };

  const handleSubmenuItemClick = (main: string, sub: string) => {
    setContent(`${main} - ${sub}`);
  };

  type SubmenuItems = {
    [key: string]: string[];
  };

  const submenuItems: SubmenuItems = {
    Inference: ["Inference 1", "Inference 2", "Inference 3"],
    "Use Cases": ["Use Cases A", "Use Cases B", "Use Cases C"],
    Models: ["Models X", "Models Y", "Models Z"],
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            BK - Documentation
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Overview', 'Inference', 'Use Cases', 'Models'].map((text) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuItemClick(text)}>
                  <ListItemText primary={text} />
                  {['Inference', 'Use Cases', 'Models'].includes(text) && (submenuOpen[text] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {['Inference', 'Use Cases', 'Models'].includes(text) && (
                <Collapse in={submenuOpen[text]} timeout="auto" unmountOnExit>
                  <div className='h-full flex ml-4'>
                    <div className='h-full w-1 bg-blue-600'></div>
                    <List component="div" disablePadding className='w-full'>
                      {submenuItems[text].map((subtext) => (
                        <ListItem key={subtext} disablePadding>
                          <ListItemButton onClick={() => handleSubmenuItemClick(text, subtext)}>
                            <ListItemText primary={subtext} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          {content}
        </Typography>
      </Main>
    </Box>
  );
}
