
import React from 'react'; 
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from './_actions';
import { alertActions } from './_actions';
import { store } from './_helpers';

class ForgotPassword extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			submitted: false,
			email: '',
		}
	}
	handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email } = this.state;
		const { dispatch } = this.props;
		
        if (email) {
            store.dispatch(userActions.resetpassword(email));
        }
	}
	handleEmailChange = (e) => {
        const { name, value } = e.target;
		this.setState({ [name]: value });
	}
	render(){
		const { email, submitted } = this.state;
		return(	
		<div>
			<h1 className="viesti-login-title">Forgot your password?</h1>
			<div className="viesti-logo">
				<img src="/images/viesti_logo.png" />
			</div>
			<div className='viesti-login-margin'>
				<p>
					Enter your email and we'll send you a new password.
				</p>
			</div>
		<form method='submit' onSubmit={this.handleSubmit}>
		<div className="form-group viesti-login-margin">
			<input className="form-control viesti-login-input" 
				required= 'required'
	            placeholder="E-mail" type="email" 
		        id="Email" name="email" 
		        value={email} 
		    	onChange={this.handleEmailChange}/>
				{submitted /* && wrongEmail || submitted */ && !email &&
					<div className="viesti-text-danger">Invalid e-mail</div>
				}
				</div>
				
				<div className="form-group viesti-login-margin">
				<button type="submit" className="btn viesti-login-button">Send</button>
{/* 				{this.props.resetting &&
					<i className='fa fas-spinner'/>
				} */}
				</div>
		</form>
	</div>
	);
	}
}
class LoginPage extends React.Component{
	constructor(props) {
	super(props);
		this.state = {
	      email: '',
		  password: '',
		  wrongEmail: false,
		  submitted: false
		};
		
	  }	
	  handleChange = (e) => {
        const { name, value } = e.target;
		this.setState({ [name]: value });
/*  		if(name === 'email'){
			var re = new RegExp('^\S+@\S+.\S+$');
			if (re.test(name)){
				this.setState({wrongEmail: false})
			}
			else{
				this.setState({wrongEmail: true});
			}
		}  */
    }	
	
	handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
		const { dispatch } = this.props;
		
        if (email && password) {
            store.dispatch(userActions.login(email, password));
        }
	}
	render(){
		const { email, password, submitted } = this.state;
		const { loggingIn } = this.props;
		return(
			<div>
			<h1 className="viesti-login-title">Login to your account</h1>
			<div className="viesti-logo">
				<img src="/images/viesti_logo.png" />
			</div>
			<form method="post" onSubmit={this.handleSubmit}>
				<div className={"form-group viesti-login-margin" + (submitted && !email ? ' has-error' : '')}>
					<input className="form-control viesti-login-input" 
						required= 'required'
						placeholder="E-mail" type="email" 
						id="Email address" name="email" 
						value={email} 
						onChange={this.handleChange} 
					/>
					{submitted /* && wrongEmail || submitted */ &&!email &&
					<div className="viesti-text-danger">Invalid e-mail</div>
					}
				</div>
				<div className={"form-group viesti-login-margin" + (submitted && !password ? ' has-error' : '')}>
					<input className="form-control viesti-login-input" 
						required='required'
						placeholder="Password" type="password" 
						id="Password" name="password" 
						value={password} 
						onChange={this.handleChange}
					/>
					{submitted && !password &&
					<div className="viesti-text-danger">Password is required</div>
					}
				</div>
				<div className="form-group viesti-login-margin">
					<span className="viesti-forgot-password">
					<Link to='/forgotpassword'>Forgot password?</Link>
					</span>
				</div>
				<div className="form-group viesti-login-margin">
					<button type="submit" className="btn viesti-login-button">Login</button>
					{loggingIn &&
						<i className='fa fas-spinner'/>
				}
				</div>
				<div className="viesti-text-danger">
					   <ul>
					</ul> 
				</div>
			</form>
			</div>
		);
	}
}
const LoginBody = () => (
	<div>
		<Switch>
			<Route exact path='/login' component={LoginPage}/>
			<Route path='/forgotpassword' component={ForgotPassword}/>
		</Switch>
	</div>
)
class Login extends React.Component {
	constructor(props){
		super(props);
		
		//this.props.dispatch(userActions.logout());
	}
	
	render() {
		/* const { resetting } = this.props; */
		return( 
			<div className="viesti-login-background">
			    <div className="viesti-login-container"> 
				<div>
				   <LoginBody/>
				<div className="viesti-sign-up" />	    
				</div>
				</div>
		    </div>
		);	
	}
}
function mapStateToProps(state) {
	const { loggingIn } = state.authentication;
	/* const { resetting } = state.resetpassword; */
    return {
		loggingIn,
		/* resetting */
    };
}
connect(mapStateToProps)(LoginPage);
export default withRouter(connect(mapStateToProps)(Login));