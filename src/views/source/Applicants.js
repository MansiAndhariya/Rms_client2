
import {
    Badge,
    Card,
    CardHeader,
    // CardFooter,
    // DropdownMenu,
    // DropdownItem,
    // UncontrolledDropdown,
    // DropdownToggle,
    // Media,
    // Pagination,
    // PaginationItem,
    // PaginationLink,
    // Progress,
    Table,
    Container,
    Row,
  
    // UncontrolledTooltip,
  } from "reactstrap";
  // core components
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import Cookies from 'universal-cookie';


  import ApplicantHeader from "components/Headers/ApplicantHeader";
  import * as React from "react";
  import axios from "axios";

  
  
  const PropertiesTables = () => {
    const [rentalsData, setRentalsData] = useState([]);

    const getRentalsData = async () => {
      try {
        const response = await axios.get(
          " http://localhost:4000/applicant/applicant"
        );
        setRentalsData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      getRentalsData();
    }, []);


    let navigate = useNavigate();
    const handleCloseButtonClick = () => {
      
      navigate('../Agent');
    };
    
    let cookies = new Cookies();
    // Check Authe(token)
    let chackAuth = async () => {
      if (cookies.get("token")) {
        let  authConfig = {
          headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
          token: cookies.get("token"),
        },
      };
      // auth post method
      let res = await axios.post(
        "http://localhost:4000/register/auth",
        { purpose: "validate access" },
        authConfig
      );
      if (res.data.statusCode !== 200) {
        // cookies.remove("token");
        navigate("/auth/login");
      }
    } else {
      navigate("/auth/login");
    }
  };

  React.useEffect(() => {
    chackAuth();
  }, [cookies.get("token")]);


    
    return (
      <>
        <ApplicantHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Applicants</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">FirstName</th>
                      <th scope="col">LastName</th>

                      {/* <th scope="col">Listed</th> */}
                      {/* <th scope="col">Unit</th> */}
                      {/* <th scope="col">Phone</th> */}
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Property</th>


                      {/* <th scope="col">Last Updated</th> */}
                      {/* <th scope="col">% complete</th> */}

                    </tr>
                  </thead>
                  <tbody>
                  {rentalsData.map((applicant, index) => (
                    <tr key={index}>
                      
                      <td>{applicant.applicant_firstName}</td>
                      <td>{applicant.applicant_lastName}</td>
                       <td>{applicant.applicant_email}</td>
                      <td>{applicant.applicant_phoneNumber}</td>
                      <td>{applicant. applicant_property}</td>
                     

                    </tr>
                  ))}
  
                    
                  </tbody>
                </Table>
               
              </Card>
            </div>
          </Row>
          <br />
          <br />
         
        </Container>
      </>
    );
  };
  
  export default PropertiesTables;
  