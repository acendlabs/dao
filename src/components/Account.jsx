import { useMoralis } from "react-moralis";
import {
  Button,
  Box,
  Alert,
  Chip,
  AppBar,
  Toolbar,
  Avatar,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import QuickMenu from "./QuickMenu";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "components/Blockie";
import Avaxlogo from "./avaxlogo.svg";

function Auth() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    authError,
    user,
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
  } = useMoralis();
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  const [ens, setEns] = useState("");

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
    const isEns = () => {
      if (isAuthenticated && isWeb3Enabled) {
        const _ens = null;
        setEns(_ens);
      }
    };

    isEns();
  }, [enableWeb3, isAuthenticated, isWeb3Enabled]);

  const formatAddress = () => {
    return ens ?? getEllipsisTxt(user.get("ethAddress"));
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background: "inherit",
          padding: 1,
          boxShadow: "none",
        }}
      >
        <Box style={{ width: 50, position: "absolute" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Acend
          </Typography>
        </Box>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 0,
          }}
        >
          <IconButton variant="filled">
            <img src={Avaxlogo} alt="avax logo" style={{ width: 25 }} />
          </IconButton>
          {isAuthenticated && (
            <Tooltip title="click to copy" arrow>
              <Chip
                avatar={
                  <Avatar>
                    <Blockie address={user.get("ethAddress")} size={7} />
                  </Avatar>
                }
                label={formatAddress()}
                onClick={() =>
                  navigator.clipboard.writeText(user.get("ethAddress"))
                }
              />
            </Tooltip>
          )}
          {authError && <Alert severity="error">{authError.message}</Alert>}
          {isAuthenticating ? (
            <LoadingButton loading variant="outlined">
              Connecting
            </LoadingButton>
          ) : !isAuthenticated ? (
            <Button
              onClick={() =>
                !isWeb3Enabled ? enableWeb3() && authenticate() : authenticate()
              }
            >
              Login
            </Button>
          ) : (
            <QuickMenu />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Auth;
