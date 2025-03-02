import React from "react"
import { connect } from 'react-redux'
import { Redirect, Link } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify';

import { register } from "../actions/register"
import Layout from "../components/layout/layout"
import Checkbox from "@material-ui/core/Checkbox"
import MaterialLink from "@material-ui/core/Link"

class RegisterPage extends React.Component {

  constructor(props) {
    super(props)
    var referer = '/'
    if (this.props.location.state) {
      referer = this.props.location.state.referer || '/';
    }
    this.state = { referer, creds: { email: '', password: ''},termsAccepted:false}
    this.handleChange = this._handleChange.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.emailIsValid = this._emailIsValid.bind(this)
    this.handleCheckbox = this._handleCheckbox.bind(this)
  }
  
  _handleChange(event) {
    this.setState({ ...this.state,
      creds: { ...this.state.creds, [event.target.id]: event.target.value }
    });
  }

  _handleCheckbox(){
    this.setState({...this.state,termsAccepted:!this.state.termsAccepted})
  }

  _emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  _handleSubmit(event) {
    event.preventDefault();
    if(this.emailIsValid(this.state.creds.email)) {
      this.props.dispatch(register(this.state.creds,this.state.termsAccepted))
    } else {
      toast.error("Username must be a valid email address")
    }

  }

  render() {

    if (this.props.isAuthenticated) {
      return <Redirect to={this.state.referer} />
    }

    return (
      <Layout pageTitle="Register">
        <Grid container spacing={0} className="main login-form-area" justify="center">
          <Grid item xs={10} md={9} xl={6}>
            <h2>Sign Up</h2>
            <form>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  placeholder="Email"
                  fullWidth
                  margin="normal"
                  onChange={event => this.handleChange(event)}
                  value={this.state.creds.email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  placeholder="Password"
                  fullWidth
                  margin="normal"
                  onChange={event => this.handleChange(event)}
                  value={this.state.creds.password}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Checkbox checked={this.state.termsAccepted} onChange={this.handleCheckbox}/>
              By joining or logging in you accept turq.io's<MaterialLink href="http://turq.io/terms/Terms_of_Service.pdf"> Terms of Service.</MaterialLink>
              <Grid item container xs={12} justify="space-between">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.handleSubmit(e)}
                    disabled={!this.state.termsAccepted}
                    >
                      Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <div className="login-switch">
                    <span>Already Have an Account?&nbsp;<Link to={{pathname: "/login", state: { referer: this.state.referer}}}>Sign In</Link></span>
                  </div>
                </Grid>
              </Grid>
              </form>
            </Grid>
          </Grid>
      </Layout>
    )
  }
}

function mapStateToProps(state) {

  const { auth } = state
  const { isAuthenticated } = auth
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(RegisterPage)