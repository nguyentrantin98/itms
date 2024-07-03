import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Client } from 'htmljs-code'
import { Toast } from 'htmljs-code/lib/toast'
import { useSelector, useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector((state) => state.UserName ?? "johndoe");
  const password = useSelector((state) => state.Password ?? "secret");
  const handlerLogin = async () => {
    var res = await Client.Instance.SubmitAsync({
      Url: `/api/auth/login`,
      JsonData: JSON.stringify({
        UserName: userName,
        TanentCode: "dev",
        AutoSignIn: true,
        Password: password
      }),
      IsRawString: true,
      Method: "POST",
      AllowAnonymous: true,
    });
    Client.Token = res.token;
    dispatch({ type: 'set', isAuthenticated: true });
    navigate('/home');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'UserName') {
      dispatch({ type: 'set', UserName: value })
    } else if (name === 'Password') {
      dispatch({ type: 'set', Password: value })
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="UserName"
                        value={userName}
                        name="UserName"
                        onInput={handleInputChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        value={password}
                        name="Password"
                        type="password"
                        onInput={handleInputChange}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handlerLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
