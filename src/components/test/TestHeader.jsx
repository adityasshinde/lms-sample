import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
  Typography,
  Collapse,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { IconMenu2, IconX } from "@tabler/icons";
import logo from '../../asset/images/takshLogo.png';
import { useAuth, useCustomizer } from "../../hooks/hooks";
import GradientButton from "../form/GradientButton";
import { setAuthState } from "../../store/slices/authSlice";
import NormalButton from "../form/NormalButton";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
import { PauseCircle, XCircle } from "@phosphor-icons/react";

const TestHeader = ({ endTime, title, setExitDialogOpen, submitTestOnTimeUp }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false);
  const [hasTimeUpBeenCalled, setHasTimeUpBeenCalled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Calculate time left between current time and end time
  function calculateTimeLeft() {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else if (!hasTimeUpBeenCalled) {
      setHasTimeUpBeenCalled(true);
      submitTestOnTimeUp();
    }

    return timeLeft;
  }

  // useEffect to update the timer every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timer when component unmounts
    return () => clearTimeout(timer);
  });

  const customizer = useCustomizer();
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    position: 'relative',
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled color="default">
      <ToolbarStyled sx={{ padding: '1rem', marginY: 'auto', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #4B4B4D21' }}>
        <div className="flex items-center">
          <img
            src={logo}
            alt='logo'
            style={{
              width: lgUp ? '150px' : '100px',
              margin: '0 2rem',
            }}
          />
        </div>
        <Typography sx={{ color: '#85878D', fontSize: '1.1rem', fontWeight: 'bold' }}>{title}</Typography>
        <Stack spacing={1} direction="row" alignItems="center" justifyContent='space-between' minWidth='350px'>
          {(timeLeft?.hours !== undefined || timeLeft?.minutes || timeLeft?.seconds) && <Typography sx={{ color:(timeLeft?.hours===0 && timeLeft?.minutes===0 && timeLeft?.seconds<=59)?'#cf0000':'#008001', fontSize: '1.1rem', fontWeight: 'bold' }}>
            {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
          </Typography>}
          <div className="flex items-center justify-center px-4">
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '5px 10px', border: '2px solid #207EB8', fontWeight: 'bold', color: '#207EB8', borderRadius: '8px', margin: '0 10px' }}><PauseCircle stroke={1.5} style={{ marginRight: '5px' }} size={20} /> PAUSE</button>
            <button onClick={() => setExitDialogOpen(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#D94214', fontWeight: "bold", border: '2px solid #D94214', padding: '5px 10px', color: 'white', borderRadius: '8px', margin: '0 10px' }}><XCircle stroke={1.5} style={{ marginRight: '5px' }} size={20} /> EXIT</button>
          </div>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default TestHeader;
