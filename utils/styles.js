import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#0f1111',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
      marginRight: 10,
    },
  },
  brand: {
    fontFamily: 'Rock Salt', 
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  logo: {
    fontFamily: 'Rock Salt', 
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton:{
    color: '#fff',
    textTransform: 'initial',
  },
  transparentBackgroud:{
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  mt1: { 
    marginTop: '1rem' 
  },
  sort: {
    marginRight: 5,
  },
});
export default useStyles;
