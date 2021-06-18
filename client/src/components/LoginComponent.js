import { useState, useEffect } from "react"
import { Form, Col, Button, Modal, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { baseUrl } from "../shared/baseUrl";

function Login(props) {

    const [show, setShow] = useState(false);
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [passwordMatchText, setPasswordMatchText] = useState('');
    const [usernameTakenText, setUsernameTakenText] = useState('')
    const [statusText, setStatusText] = useState({variant: '',text: ''})
    const [loggingIn, setLoggingIn] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    
    const history = useHistory()

    useEffect(() => {
        const username = localStorage.getItem('username')
        const password = localStorage.getItem('password')
        if(username && password) {
          fetch(baseUrl + 'login',{
            method:'POST',
            headers: {
                "content-type":'application/json'
            },
            body:JSON.stringify({
              username,
              password
            }),
            credentials: "include"
          }).then(res => {
            if(res.ok) {
                history.push('/items');
            }
          })
        }
      },[history])
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const passwordsMatch = () => {
        return (regConfirmPassword === regPassword)
    }

    const checkPasswords = (confPass) => {
        setRegConfirmPassword(confPass);
        if(confPass !== regPassword)
            setPasswordMatchText("Passwords do not match")
        else
            setPasswordMatchText("")
    }

    const register = (e) => {
        e.preventDefault()
        if(passwordsMatch()) {
            setRegistering(true)
            fetch(baseUrl+'register', {
                method:'POST',
                headers: {
                    "content-type":'application/json'
                },
                body:JSON.stringify({
                username: regUsername,
                password: regPassword  
                }),
                credentials: "include"
            }).then(res => {
                if(res.ok) {
                    setStatusText({variant:'success',text:'Registered succesfully!'})
                    setRegConfirmPassword('')
                    setRegPassword('')
                    setRegUsername('');
                    setUsernameTakenText('');
                    setPasswordMatchText('')
                    handleClose()
                }
                else res.json().then(data => setUsernameTakenText(data.message));
                setRegistering(false)
            }).catch(err => {
                setRegistering(false)
                setPasswordMatchText("Server down. Refresh the page or try again later.")
            })
        }
        else
            setPasswordMatchText("Passwords do not match")
    }

    const login = (e) => {
        e.preventDefault()
        setStatusText("Letting you in 🔑")
        setLoggingIn(true)
        fetch(baseUrl+'login', {
            method:'POST',
            headers: {
                "content-type":'application/json'
            },
            body:JSON.stringify({
              username: loginUsername,
              password: loginPassword  
            }),
            credentials: "include"
        }).then(res => {
            if(res.ok) {
                localStorage.setItem('username', rememberMe ? loginUsername : '');
                localStorage.setItem('password', rememberMe ? loginPassword : '');
                history.push('/items');
            }
            else {
                setLoggingIn(false)
                res.json().then((data) => setStatusText({variant:'danger',text:data.info.message})
                ) 
            }
        }).catch(err => {
            setLoggingIn(false)
            setStatusText(err.message+". Refresh the page or try again later.")
        })
    }

    return(
        <>
            <div className='login-page'>
                <Col sm={7} md={6} lg={5} xl={4}>
                    <div className='login-card'>
                        <h1>hi, there</h1>
                        <fieldset disabled={loggingIn}>
                            <Form onSubmit={(e) => login(e)}>
                                <Form.Group>
                                    <Form.Control type='text' required value={loginUsername} placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type='password' required value={loginPassword} placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Check style={{textAlign:'left',marginBottom:'0.5rem',color:'darkblue'}} 
                                    type='checkbox' label={'Remember me?'} checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}/>
                                <Button type='submit' block ><i className={!loggingIn?'fa fa-sign-in-alt' : 'fa fa-spin fa-spinner'} />{' '}Login</Button>
                            </Form>
                        </fieldset>
                        
                        <h6 className='text-muted mt-5 mb-3'>New here?</h6>
                        <Button variant='outline-secondary' onClick={handleShow}>
                            <i className='fa fa-plus'></i>{' '}Create Account
                        </Button>
                    </div>
                    <Alert variant={statusText.variant} style={{position:'fixed',bottom:'10px',left:'50%',transform:'translateX(-50%)'}}>
                        <b>{statusText.text}</b>
                    </Alert>
                </Col>
            </div>
            <Modal className='signup-modal' onHide={handleClose} show={show} size='md' centered>
                <Modal.Header closeButton><h4 className='text-primary mb-0'>Sign Up</h4></Modal.Header>
                <Modal.Body>
                    <fieldset disabled={registering}>
                        <Form onSubmit={(e) => register(e)} >
                            <Form.Group>
                                <Form.Label for="regUsername">Username</Form.Label>
                                <Form.Control autoComplete='new-username' type='text' required value={regUsername} onChange={(e) => setRegUsername(e.target.value)} onFocus={() => setUsernameTakenText('')}></Form.Control>
                                <Form.Text className='text-danger'>{usernameTakenText}</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label for="regPassword">Password</Form.Label>
                                <Form.Control autoComplete='new-password' type='password' required value={regPassword} onChange={(e) => setRegPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='password' required value={regConfirmPassword} onChange={(e) => checkPasswords(e.target.value)}></Form.Control>
                                <Form.Text className='text-danger'>{passwordMatchText}</Form.Text>
                            </Form.Group>
                            <Button type='submit' block variant='outline-primary'>{registering? <i className='fa fa-spin fa-spinner'>{' '}</i>:"Register"} </Button>
                        </Form>
                    </fieldset>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Login;