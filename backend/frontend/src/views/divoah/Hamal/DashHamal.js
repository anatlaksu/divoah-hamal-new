import React, { useState, useEffect } from "react";

import { Link, withRouter, Redirect } from "react-router-dom";
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
  Collapse,
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import { Line, Pie, Doughnut, PolarArea } from 'react-chartjs-2';
import Select from 'components/general/Select/AnimatedSelect'
import { isAuthenticated } from "auth";


const AdminSignInForm = () => {

  const { user } = isAuthenticated();

  const [reportDB, setReportDB] = useState([]);
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState([]);

  const [gdods, setGdods] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  const [pikods, setPikods] = useState([]);

  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const toggleCollapse = () => {
      setcollapseOpen(!collapseOpen);
  };

 const eventTypeArray = {
  "בחר": "",
  "1": "תאונת כלי רכב",
  "2": "התהפכות",
  "3": "הנתקות גלגל",
  "4": "שריפה",
  "5": "אירוע נשק / תחמושת",
  "6": 'תאונת עבודה אנשי טנ"א',
  "7": "פריקת מטפים",
  "8": "אפידמיה",
  "9": "חילוץ",
  "10": 'נזק לתשתיות אחזקה / הח"י',
  "11": "אי קיום שגרת אחזקה",
  "12": "אחר",
  "רק'ם": 'רק"ם',
}

const loadPikods = async () => {
  await axios.get("http://localhost:8000/api/pikod",)
      .then(response => {
          setPikods(response.data);
      })
      .catch((error) => {
          console.log(error);
      })
}

const loadOgdas = async (pikodids) => {
  let temppikodids = pikodids;
  if (temppikodids != undefined && !temppikodids.isArray) {
      temppikodids = [pikodids]
  }
  let temppikodsogdas = [];
  if (temppikodids != undefined && temppikodids.length > 0) {
      for (let i = 0; i < temppikodids.length; i++) {
          await axios.post("http://localhost:8000/api/ogda/ogdasbypikodid", { pikod: temppikodids[i] })
              .then(response => {
                  for (let j = 0; j < response.data.length; j++)
                      temppikodsogdas.push(response.data[j])
              })
              .catch((error) => {
                  console.log(error);
              })
      }
  }
  setOgdas(temppikodsogdas);
}

const loadHativas = async (ogdaids) => {
  let tempogdaids = ogdaids;
  if (tempogdaids != undefined && !tempogdaids.isArray) {
      tempogdaids = [ogdaids]
  }
  let tempogdashativas = [];
  if (tempogdaids != undefined && tempogdaids.length > 0) {
      for (let i = 0; i < tempogdaids.length; i++) {
          await axios.post("http://localhost:8000/api/hativa/hativasbyogdaid", { ogda: tempogdaids[i] })
              .then(response => {
                  for (let j = 0; j < response.data.length; j++)
                      tempogdashativas.push(response.data[j])
              })
              .catch((error) => {
                  console.log(error);
              })
      }
  }
  setHativas(tempogdashativas);
}

const loadGdods = async (hativaids) => {
  let temphativaids = hativaids;
  if (temphativaids != undefined && !temphativaids.isArray) {
      temphativaids = [hativaids]
  }
  let temphativasgdods = [];
  if (temphativaids != undefined && temphativaids.length > 0) {
      for (let i = 0; i < temphativaids.length; i++) {
          await axios.post("http://localhost:8000/api/gdod/gdodsbyhativaid", { hativa: temphativaids[i] })
              .then(response => {
                  for (let j = 0; j < response.data.length; j++)
                      temphativasgdods.push(response.data[j])
              })
              .catch((error) => {
                  console.log(error);
              })
      }
  }
  setGdods(temphativasgdods);
} 

const loadReports = () => {
  axios
  .get(`http://localhost:8000/report/`)
  .then((response) => {
    console.log(response.data);
    setReportDB(response.data);
  })
  .catch((error) => {
    console.log(error);
    setIsError(true);
  });
};

function handleChange2(selectedOption, name) {
  if (!(selectedOption.value == "בחר"))
    setData({ ...data, [name]: selectedOption.value });
  else {
    let tempdata = { ...data };
    delete tempdata[name];
    setData(tempdata);
  }
}

const options = {
  responsive: true,
  plugins: {
      legend: {
        display: false
      },
  },
}

const  labels = ['תאונת כלי רכב', 'התהפכות', 'הנתקות גלגל', 'שריפה', 'אירוע נשק / תחמושת', 'תאונת עבודה אנשי טנ"א', 'פריקת מטפים', 'אפידמיה', 'חילוץ', 'נזק לתשתיות אחזקה / הח"י', 'אי קיום שגרת אחזקה', 'אחר' , 'רק"ם'];

function sumtypereport(arr1,arr2,arr3){
  let alldata= [];
  for(let i=0;i<arr1.length;i++){
    let sum=0;
    for(let j=0;j<arr2.length;j++){
      if(arr3[arr2[j].typevent] == arr1[i])
         sum ++;
    }
    alldata[i]=sum;
  }
  return alldata;
}

const dataevent = {
  labels: labels,
  datasets: [
      {
          label: '# of Votes',
          data: sumtypereport(labels,reportDB,eventTypeArray),
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(157, 241, 223, 1)',
            'rgba(130, 0, 0, 1)',
            'rgba(78, 108, 80, 1)',
            'rgba(207, 77, 206, 1)',
            'rgba(61, 23, 102, 1)',
            'rgba(0, 255, 246, 1)',
            'rgba(255, 173, 188, 1)',
        ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(157, 241, 223, 1)',
            'rgba(130, 0, 0, 1)',
            'rgba(78, 108, 80, 1)',
            'rgba(207, 77, 206, 1)',
            'rgba(61, 23, 102, 1)',
            'rgba(0, 255, 246, 1)',
            'rgba(255, 173, 188, 1)',
          ],
          borderWidth: 1,
      },
  ],
};

function getcolor(){
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function randomcolor(arr1){
  const colors= [];
  for(let i=0;i<arr1.length;i++){
    colors.push(getcolor());
    console.log(colors);
  }
  return colors;
}

function sumogda(arr1,arr2){
  let sumallogdas= [];
  for(let i=0;i<arr1.length;i++){
    let sum=0;
    for(let j=0;j<arr2.length;j++){
      if(arr2[j].ogda == arr1[i]._id)
         sum ++;
    }
    sumallogdas[i]=sum;
  }
  return sumallogdas;
}

const arryogda=ogdas.filter((ogda)=>ogda.pikod == data.pikod);

const dataogda = {
  labels: arryogda.map((ogda)=>ogda.name),
  datasets: [
      {
          label: '# of Votes',
          data: sumogda(arryogda,reportDB),
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(157, 241, 223, 1)',
            'rgba(130, 0, 0, 1)',
            'rgba(78, 108, 80, 1)',
            'rgba(207, 77, 206, 1)',
            'rgba(61, 23, 102, 1)',
            'rgba(0, 255, 246, 1)',
            'rgba(255, 173, 188, 1)',
        ],
          borderColor: [
            'rgba(200, 200, 200, 0.75)',
          ],
          borderWidth: 1,
      },
  ],
};

function sumhativa(arr1,arr2){
  let sumallhativas= [];
  for(let i=0;i<arr1.length;i++){
    let sum=0;
    for(let j=0;j<arr2.length;j++){
      if(arr2[j].hativa == arr1[i]._id)
         sum ++;
    }
    sumallhativas[i]=sum;
  }
  return sumallhativas;
}

const arryhativa=hativas.filter((hativa)=>hativa.ogda == data.ogda);

const datahativa = {
  labels: arryhativa.map((hativa)=>hativa.name),
  datasets: [
      {
          label: '# of Votes',
          data: sumhativa(arryhativa,reportDB),
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(157, 241, 223, 1)',
            'rgba(130, 0, 0, 1)',
            'rgba(78, 108, 80, 1)',
            'rgba(207, 77, 206, 1)',
            'rgba(61, 23, 102, 1)',
            'rgba(0, 255, 246, 1)',
            'rgba(255, 173, 188, 1)',
        ],
          borderColor: [
            'rgba(200, 200, 200, 0.75)',
          ],
          borderWidth: 1,
      },
  ],
};

function sumgdod(arr1,arr2){
  let sumallgdods= [];
  for(let i=0;i<arr1.length;i++){
    let sum=0;
    for(let j=0;j<arr2.length;j++){
      if(arr2[j].gdod == arr1[i]._id)
         sum ++;
    }
    sumallgdods[i]=sum;
  }
  return sumallgdods;
}

const arrygdod=gdods.filter((gdod)=>gdod.hativa == data.hativa);

const datagdod = {
  labels: arrygdod.map((gdod)=>gdod.name),
  datasets: [
      {
          label: '# of Votes',
          data: sumgdod(arrygdod,reportDB),
          backgroundColor: randomcolor(arrygdod),
          borderColor: [
            'rgba(200, 200, 200, 0.75)',
          ],
          borderWidth: 1,
      },
  ],
};

const initWithUserData = () => {
  setData({
    ...data,
    pikod: user.pikod,
  });
  loadReports();
  loadPikods();
};

  useEffect(() => {
    initWithUserData();
  }, []);

  useEffect(() => {
    setOgdas([]);
    loadOgdas(data.pikod);
  }, [data.pikod]);

  useEffect(() => {
    setHativas([]);
    loadHativas(data.ogda);
  }, [data.ogda]);

  useEffect(() => {
    setGdods([]);
    loadGdods(data.hativa);
  }, [data.hativa]);

function getname(idnum,arr){
  for(let i=0;i<arr.length;i++)
  {
    if(arr[i]._id==idnum)
    return arr[i].name;
  }
}

const reportbypikod= reportDB.filter((report)=> report.pikod==data.pikod);

  return (
    <div>
      <Container className="mt--8 pb-5">
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h3 className="card-category text-center">טבלת אירועים</h3>
              </CardHeader>
              <CardBody>
                <table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">פיקוד</th>
                      <th className="text-center">סוג אירוע</th>
                      <th className="text-center">פירוט האירוע</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportbypikod.map((report, index) => (
                      <tr>
                        <td>
                          <p>{getname(report.pikod,pikods)}</p>
                        </td>
                        <td>{eventTypeArray[report.typevent]}</td>
                        <td>{report.pirot}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
                <Card className="card-chart">
                <CardHeader>
                    <h3 className="card-category text-center">
                      {" "}
                      אירועים לפי סוג אירוע
                    </h3>
                  </CardHeader>
                  <CardBody>
                  <Doughnut data={dataevent} options={options}/>
                  </CardBody>
                </Card>
          </Col>
          <Col lg="3">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category text-center">
                      {" "}
                      מספר אירועים לפי אוגדה
                    </h3>
                  </CardHeader>
                  <CardBody>
                  <Doughnut data={dataogda} options={options}/>
                  </CardBody>
                </Card>
              </Col>
          </Row>
          <Row>
          <div style={{ width: '100%', margin: 'auto', textAlign: 'right' }}>
            <Button onClick={toggleCollapse} style={{}}>סינון</Button>
            <Collapse isOpen={collapseOpen}>
                <Card style={{ background: 'rgb(228,228,228,0.2)' }}>
                    <Row style={{ margin: '0px' }}>
                    <Col xs={12} md={8} style={{ textAlign: 'right' }}>
                        <Row style={{ paddingTop: '10px', marginBottom: '15px' }}>
                    {((data.pikod) && !(data.hativa)) ?
                      <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                        <h6>אוגדה</h6>
                        <Select data={ogdas} 
                        handleChange2={handleChange2} 
                        name={'ogda'} val={data.ogda ? data.ogda : undefined} />
                      </Col> :
                      <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                        <h6>אוגדה</h6>
                        <Select data={ogdas}
                         handleChange2={handleChange2}
                          name={'ogda'} val={data.ogda ? data.ogda : undefined} isDisabled={true} />
                      </Col>}
                  <>
                    {((data.ogda) && !(data.gdod)) ?
                      <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                        <h6>חטיבה</h6>
                        <Select data={hativas}
                         handleChange2={handleChange2} 
                         name={'hativa'} val={data.hativa ? data.hativa : undefined} />
                      </Col> :
                      <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                        <h6>חטיבה</h6>
                        <Select data={hativas}
                         handleChange2={handleChange2}
                          name={'hativa'} val={data.hativa ? data.hativa : undefined} isDisabled={true} />
                      </Col>}
                  </>
                  </Row>
                  </Col>
                    </Row>
                </Card>
             </Collapse>
          </div>
          </Row>

              <Row>
              {((data.pikod) && (data.ogda) && !(data.hativa)) ?
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category text-center">
                      {" "}
                      מספר אירועים לפי חטיבה
                    </h3>
                  </CardHeader>
                  <CardBody>
                  <Doughnut data={datahativa} options={options}/>
                  </CardBody>
                </Card>
              </Col> : null}
              <>
             {((data.ogda) && (data.hativa)) ?
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category text-center">
                      {" "}
                      מספר אירועים לפי גדוד
                    </h3>
                  </CardHeader>
                  <CardBody>
                  <Doughnut data={datagdod} options={options} />
                  </CardBody>
                </Card>
              </Col> :null}
              </>
            </Row>

      </Container>
    </div>
  );
};

export default AdminSignInForm;
