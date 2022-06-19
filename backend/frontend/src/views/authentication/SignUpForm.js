import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import ToggleButton from "react-toggle-button";
import history from 'history.js'
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    personalnumber: "",
    password: "",
    role: "",
    gdodid: "",
    hativaid: "",
    ogdaid: "",
    pikodid: "",

    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
  });

  const [gdods, setGdods] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  const [pikods, setPikods] = useState([]);

  const loadGdods = () => {
    axios
      .get("http://localhost:8000/api/gdod")
      .then((response) => {
        setGdods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadHativas = () => {
    axios
      .get("http://localhost:8000/api/hativa")
      .then((response) => {
        setHativas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadOgdas = () => {
    axios
      .get("http://localhost:8000/api/ogda")
      .then((response) => {
        setOgdas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadPikods = () => {
    axios
      .get("http://localhost:8000/api/pikod")
      .then((response) => {
        setPikods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setData({ ...data, [evt.target.name]: value });
  }

  const clickSubmit = (event) => {
    CheckSignUpForm(event);
  };

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    var flag = true;
    var ErrorReason = "";
    if (data.name == "") {
      flag = false;
      ErrorReason += "שם ריק \n";
    }
    if (data.lastname == "") {
      flag = false;
      ErrorReason += "שם משפחה ריק \n";
    }
    if (data.personalnumber == "") {
      flag = false;
      ErrorReason += "מס אישי ריק \n";
    }
    if (data.password == "") {
      flag = false;
      ErrorReason += "סיסמא ריקה \n";
    }
    if (data.role == "") {
      flag = false;
      ErrorReason += "הרשאה ריקה \n";
    } else {
      if (data.role === "0") {
      }
      if (data.role === "1") {
        if (data.gdodid === "") {
          flag = false;
          ErrorReason += "גדוד ריק \n";
        }
      }
      if (data.role === "2") {
        if (data.hativaid === "") {
          flag = false;
          ErrorReason += "חטיבה ריקה \n";
        }
      }
      if (data.role === "3") {
        if (data.ogdaid === "") {
          flag = false;
          ErrorReason += "אוגדה ריקה \n";
        }
      }
      if (data.role === "4") {
        if (data.pikodid === "") {
          flag = false;
          ErrorReason += "פיקוד ריק \n";
        }
      }
    }
    if (flag == true) {
      FixUser(event);
    } else {
      toast.error(ErrorReason);
    }
  };

  const FixUser = (event) => {
    event.preventDefault();
    if (data.role === "0") {
      delete data.gdodid;
      delete data.hativaid;
      delete data.ogdaid;
      delete data.pikodid;
    }
    if (data.role === "1") {
      delete data.hativaid;
      delete data.ogdaid;
      delete data.pikodid;
    }
    if (data.role === "2") {
      delete data.gdodid;
      delete data.ogdaid;
      delete data.pikodid;
    }
    if (data.role === "3") {
      delete data.gdodid;
      delete data.hativaid;
      delete data.pikodid;
    }
    if (data.role === "4") {
      delete data.gdodid;
      delete data.hativaid;
      delete data.ogdaid;
    }
    SignUp(event);
  };

  const SignUp = (event) => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false });
    const user = {
      name: data.name,
      lastname: data.lastname,
      password: data.password,
      role: data.role,
      personalnumber: data.personalnumber,
      gdodid: data.gdodid,
      hativaid: data.hativaid,
      ogdaid: data.ogdaid,
      pikodid: data.pikodid,
    };
    axios
      .post(`http://localhost:8000/api/signup`, user)
      .then((res) => {
        setData({ ...data, loading: false, error: false, successmsg: true });
        toast.success(`הרשמתך נקלטה בהצלחה, מתן ההרשאות יתבצע תוך עד 72 שעות`);
        history.push(`/signin`);
        console.log(res.data);
      })
      .catch((error) => {
        setData({
          ...data,
          errortype: error.response.data.error,
          loading: false,
          error: true,
        });
      });
  };

  const redirectUser = () => {
    if (data.redirectToReferrer) {
      return <Redirect to="/signin" />;
    }
  };

  const showSuccess = () => (
    <div
      className="alert alert-info "
      style={{ textAlign: "right", display: data.successmsg ? "" : "none" }}
    >
      <h2>הבקשה נשלחה למנהל המערכת</h2>
      <Link to="/signin">להתחברות</Link>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ textAlign: "right", display: data.error ? "" : "none" }}
    >
      <h2>שגיאה בשליחת הטופס</h2>
    </div>
  );
  const showLoading = () => (
    <div
      className="alert alert-success"
      style={{ textAlign: "right", display: data.loading ? "" : "none" }}
    >
      <h2>{"בטעינה"}</h2>
    </div>
  );

  useEffect(() => {
    loadGdods();
    loadHativas();
    loadOgdas();
    loadPikods();
  }, []);

  useEffect(() => {
    setData({ ...data, password: data.personalnumber });
  }, [data.personalnumber]);

  const signUpForm = () => (
    <>
      <Container className="" dir='rtl'>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>הרשמה</small>
                </div>
                <Form role="form">
                  <FormGroup>
                    <Input
                      placeholder="שם פרטי"
                      name="name"
                      type="string"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      placeholder="שם משפחה"
                      name="lastname"
                      type="string"
                      value={data.lastname}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <Input
                      placeholder="מספר אישי"
                      name="personalnumber"
                      type="string"
                      value={data.personalnumber}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  {/*<FormGroup>
                    <Input placeholder="סיסמא" name="password" type="password" value={data.password} onChange={handleChange} />
                  </FormGroup>*/}

                  <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    הרשאה
                  </div>
                  <FormGroup dir="rtl">
                    <Input
                      type="select"
                      name="role"
                      value={data.role}
                      onChange={handleChange}
                    >
                      <option value="">הרשאה</option>
                      <option value="0">מנהל מערכת</option>
                      <option value="1">הרשאת גדוד</option>
                      <option value="2">הרשאת חטיבה</option>
                      <option value="3">הרשאת אוגדה</option>
                      <option value="4">הרשאת פיקוד</option>
                    </Input>
                  </FormGroup>

                  {data.role === "0" ? (
                    <div>מנהל מערכת</div>
                  ) : data.role === "1" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        גדוד
                      </div>
                      <FormGroup dir="rtl">
                        <Input
                          type="select"
                          name="gdodid"
                          value={data.gdodid}
                          onChange={handleChange}
                        >
                          <option value={""}>גדוד</option>
                          {gdods.map((gdod, index) => (
                            <option value={gdod._id}>{gdod.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : data.role === "2" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        חטיבה
                      </div>
                      <FormGroup dir="rtl">
                        <Input
                          type="select"
                          name="hativaid"
                          value={data.hativaid}
                          onChange={handleChange}
                        >
                          <option value={""}>חטיבה</option>
                          {hativas.map((hativa, index) => (
                            <option value={hativa._id}>{hativa.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : data.role === "3" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        אוגדה
                      </div>
                      <FormGroup dir="rtl">
                        <Input
                          type="select"
                          name="ogdaid"
                          value={data.ogdaid}
                          onChange={handleChange}
                        >
                          <option value={""}>אוגדה</option>
                          {ogdas.map((ogda, index) => (
                            <option value={ogda._id}>{ogda.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : data.role === "4" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        פיקוד
                      </div>
                      <FormGroup dir="rtl">
                        <Input
                          type="select"
                          name="pikodid"
                          value={data.pikodid}
                          onChange={handleChange}
                        >
                          <option value={""}>פיקוד</option>
                          {pikods.map((pikod, index) => (
                            <option value={pikod._id}>{pikod.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : data.role === "" ? (
                    <div>נא להכניס הרשאה</div>
                  ) : null}

                  <div className="text-center">
                    <button onClick={clickSubmit} className="btn">
                      הרשם
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );


  return (
    <>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
          </Col>
        </Row>
      </Container>
    </>
  );
}