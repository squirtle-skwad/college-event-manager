import React from 'react';

import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as StyledLink,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Link } from 'react-router-dom';
import { useFormState } from 'react-use-form-state';

import lsHelpers from 'util/storage-helpers';
import client from 'util/client';
import CoverImage from 'img/coverImage.jpg';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with ♥︎ by the Comps 17-21 batch.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100vh',
  },
  coverImage: {
    height: '100%',
    maxHeight: '100vh',
    width: 'auto',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSide() {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = React.useState(lsHelpers.useAuthToken());

  const [formState, formInputs] = useFormState({
    rememberMe: lsHelpers.getRememberMe(),
  });

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();
    const { username, password, rememberMe } = formState.values;
    const form = new FormData();
    form.set('username', username);
    form.set('password', password);

    client.login(form)
      .then(() => setLoggedIn(true))
      .catch(console.error);
    lsHelpers.setRememberMe(rememberMe);
  });

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        style={{
          display: 'flex',
        }}
      >
        <img src={CoverImage} className={classes.coverImage} alt="Cover of the page" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Events Dashboard
          </Typography>
          <Typography component="h1" variant="h6">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              {...formInputs.text('username')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              {...formInputs.password('password')}
            />
            <FormControlLabel
              control={<Checkbox {...formInputs.checkbox('rememberMe')} value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <StyledLink component={Link} to="/login" variant="body2">
                  Forgot password?
                </StyledLink>
              </Grid>
              <Grid item>
                <StyledLink component={Link} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </StyledLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignInSide;
