import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import "izmenaProfila.css";

//dodam link za sliku  mozda od doktora!!
import avatar from "assets/img/faces/face-3.jpg";
import "login.js";
import { log } from "util";
import Login from "login";
import slikaLekar from "assets/img/images.jpg"
import axios from "axios";

class izmenaProfila extends Component {
  constructor(props){
    super(props);
    console.log("IZMENA PROFILA LEKARA LEKARA");
    this.state = {
      email: props.email,
      uloga: props.uloga, 
      ime: "",
      telefon: "",
      prezime: "",

    }

  }


  componentWillMount(){
    console.log("wmount")
    const url = 'http://localhost:8025/api/lekari/getLekarByEmail/' + this.state.email;
    // console.log('Email: ' + this.state.email);
    // console.log('url: ' + url);
    axios.get(url)
      .then(Response => {
        console.log("Preuzet lekar: ");
        console.log(Response.data);
      
        this.setState({
          email: Response.data.email
        });
        this.setState({
          ime: Response.data.ime
        });

        this.setState({
          prezime: Response.data.prezime
        });
        this.setState({
          telefon: Response.data.telefon
        });
      })
      
      .catch(error => {
        console.log("Lekar  nije preuzet")
      })
  }
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState.ime = e.value;
 
    console.log(this.state.ime);
    console.log("On change !!!")
    // let formErrors = { ...this.state.formErrors };

    // switch (name) {
    //   case "email":
    //     formErrors.email =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera  " : "";
    //     break;
    //   case "lozinka":
    //     formErrors.lozinka =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    // }
    // if (formErrors.email.length > 0 && formErrors.lozinka.length > 0) {
    //   formErrors.log = "";
    // }
    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  
  handleSumbit = e => {
    e.preventDefault();
    console.log("KLIK SUBMITTT")
    // let formErrors = { ...this.state.formErrors };
      console.log("Izmjena : ---------------")  
      console.log(this.state.ime);
      console.log(this.state.prezime);
    axios
      .put("http://localhost:8025/api/lekari/update", {
        ime: this.state.ime,
        prezime: this.state.prezime,
        telefon: this.state.telefon,
        email: this.state.email
      })
      .then(response => {
        console.log(response.data);
 
      
        this.setState({
          ime: response.data.ime
        });

        this.setState({
          prezime: response.data.prezime
        });

        this.setState({
          telefon: response.data.telefon
        });

        // this.setState({
        //   redirectToReferrer: true
        // });
      })
      .catch(error => {
        console.log("Izmena nije uspela! ")
        //   console.log(error.response);
        // formErrors.log = "Pogresni kredencijali";
        // this.setState({ formErrors }, () => console.log(this.state));
      });
  };

  render() {
    const email = this.state.email;
    const uloga = this.state.uloga;
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const telefon = this.state.telefon;
    // console.log("Prije izmjene : ");
    // console.log(this.state.ime);
    // console.log(this.state.prezime);
    // console.log(this.state.telefon);

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Izmena podataka"
                content={
                  <form onSubmit={this.handleSumbit} className="formaIzmenaProfilaLekara">
                     <div className="ime">
                        <label htmlFor="ime">Ime: </label>
                         {/* <input value={this.state.inputValue} onChange={this.updateInputValue}/> */}
                        <input
                          type="text"
                          name="ime"
                          
                          // defaultValue={ime}
                          // placeholder={this.state.ime}
                          // noValidate
                          // onChange={this.updateInputValue}
                        />
                      </div>
                      <div className="prezime">
                        <label htmlFor="prezime">Prezime: </label>
                        <input
                          type="text"
                          name="prezime"
                          // defaultValue={prezime}
                          // placeholder="prezime"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div>
                      <div className="email">
                        <label htmlFor="email">Email: </label>
                        <input
                          type="email"
                          name="email"
                          // defaultValue={email}
                          // placeholder="email"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div>
                      {/* <div className="klinikaK">
                        <label htmlFor="klinikaK">klinika: </label>
                        <input
                          type="text"
                          name="klinikaK"
                          placeholder="klinikaK"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div> */}
                      {/* <div className="klinika">
                        <label htmlFor="klinika">Klinika: </label>
                        <input
                          type="text"
                          name="klinika"
                          placeholder="klinika"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div> */}
                      <div className="telefon">
                        <label htmlFor="telefon">Broj telefona: </label>
                        <input
                          type="text"
                          name="telefon"
                          // defaultValue={this.state.telefon}
                          // placeholder="telefon"
                          // noValidate
                          // onChange={this.handleChange}
                        />
               
                      {/* <div className="">
                        <label htmlFor="">: </label>
                        <input
                          type="text"
                          name=""
                          placeholder=""
                          // noValidate
                          // onChange={this.handleChange}
                        />*/}
                      </div> 
                      <div className="izmeniPodatkeLekar">
                         <button type="submit">Izmeni podatke</button>
                      </div>
                  </form>
                  // <form className="formUserProfile">
                  //   <FormInputs
                  //     ncols={["col-md-100", "col-md-10"]}
                  //     properties={[
                  //       {
                  //         // label: "Klinika (disabled)",
                  //         label: "Klinika ",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Company",
                  //         defaultValue: "staviti ime od klinike",
                  //         disabled: true
                  //       },
                  //       {
                  //         label: "Email adresa",
                  //         type: "email",
                  //         bsClass: "form-control",
                  //         placeholder: "Email",
                  //         defaultValue: "Emai"
                  //       }
                  //     ]}
                  //   />
                  //    <FormInputs
                  //     ncols={["col-md-10", "col-md-10"]}
                  //     properties={[
                  //       {
                  //         label: "Ime",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "First name",
                  //         defaultValue: "ime"
                  //       },
                  //       {
                  //         label: "Prezime",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Last name",
                  //         defaultValue: "Neko prezime"
                  //       }
                  //     ]}
                  //   />
                  //   <FormInputs
                  //     ncols={["col-md-10000"]}
                  //     properties={[
                  //       {
                  //         label: "Adress",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Home Adress",
                  //         defaultValue:
                  //           "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                  //       }
                  //     ]}
                  //   />

                  //   <Row>
                  //     <Col md={12}>
                  //     </Col>
                  //   </Row>
                  //   <Button bsStyle="info" pullRight fill type="submit">
                  //     Izmeni profil
                  //   </Button>
                  //   <div className="clearfix" />
                  // </form>
                }
              />
            </Col>
            <Col md={4}>
            <Card
                // statsIcon="fa fa-clock-o"
                title="O lekaru"
                // category="Ime"
                content={
                  <div id="a">
                    <div className="slikaKCdiv">
                      <h2> 
                        <img className="slikaLekar" src={slikaLekar}></img>
                      </h2>
                    </div>
                    
                    <div className="typo-line">
                      <h2>
                        <p className="category">Klinika:</p>
                        <label className="adresaKC">ucitati data</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Opis posla:</p>
                        <label className="opisKC">ucitati data</label>
                      </h2>
                    </div>
                    
                    
                    
                  </div>
                }
                
                // category="opis ... naziv adresa i opis  "
                // stats="Campaign sent 2 days ago"
                // content={
                //   <div
                //     id="chartPreferences"
                //     className="ct-chart ct-perfect-fourth"
                //   >
                //     <ChartistGraph data={dataPie} type="Pie" />
                //   </div>
                // }
                // legend={
                //   <div className="legend">{this.createLegend(legendPie)}</div>
                // }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default izmenaProfila;
