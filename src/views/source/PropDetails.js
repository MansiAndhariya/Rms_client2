import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from 'components/Headers/Header';
import {
  Card,
  CardHeader,
  FormGroup,
  Container,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
import Cookies from 'universal-cookie';

const PropDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [propertyDetails, setpropertyDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const getRentalsData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/rentals/rentals_summary/${id}`);
      setpropertyDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tenant details:', error);
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getRentalsData();
    console.log(id);
  }, [id]);

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
      <Header />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup className="">
              <h1 style={{ color: 'white' }}>
                Property Details
              </h1>
            </FormGroup>
          </Col>
          <Col className="text-right" xs="12" sm="6">
            <Button
              color="primary"
              href="#rms"
              onClick={() => navigate("/admin/propertiesTable")}
              size="sm"
              style={{ background: "white", color: "blue" }}
            >
              Back
            </Button>
          </Col>
        </Row><br />
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Summary</h3>
              </CardHeader>
              <div className="table-responsive">
                <Table className="align-items-center table-flush" responsive style={{ width: "100%" }}>
                  {loading ? (
                    <tbody>
                      <tr>
                        <td>Loading Property details...</td>
                      </tr>
                    </tbody>
                  ) : error ? (
                    <tbody>
                      <tr>
                        <td>Error: {error.message}</td>
                      </tr>
                    </tbody>
                  ) : propertyDetails._id ? (
                    <>
                      <tbody>
                        <tr>
                          <th colSpan="2" className="text-primary text-lg">Property Details</th>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Image</td>
                          <td><img src={propertyDetails.propertyres_image || propertyDetails.property_image} alt="Property Details" style={{ maxWidth: '8rem' }} /></td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Property Type</td>
                          <td>{propertyDetails.property_type || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Address</td>
                          <td>{propertyDetails.rental_adress || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">City</td>
                          <td>{propertyDetails.rental_city || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Country</td>
                          <td>{propertyDetails.rental_country || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Postcode</td>
                          <td>{propertyDetails.rental_postcode || "N/A"}</td>
                        </tr>
                      </tbody>

                      <tbody>
                        <tr>
                          <th colSpan="2" className="text-primary text-lg">Rental Owner Details</th>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">First Name</td>
                          <td>{propertyDetails.rentalOwner_firstName || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Last Name</td>
                          <td>{propertyDetails.rentalOwner_lastName || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Company Name</td>
                          <td>{propertyDetails.rentalOwner_companyName || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">E-Mail</td>
                          <td>{propertyDetails.rentalOwner_primaryEmail || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Phone Number</td>
                          <td>{propertyDetails.rentalOwner_phoneNumber || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Home Number</td>
                          <td>{propertyDetails.rentalOwner_homeNumber || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Business Number</td>
                          <td>{propertyDetails.rentalOwner_businessNumber || "N/A"}</td>
                        </tr>
                      </tbody>

                      <tbody>
                        <tr>
                          <th colSpan="2" className="text-primary text-lg">Account Details</th>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Operating Account</td>
                          <td>{propertyDetails.rentalOwner_operatingAccount || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Property Reserve</td>
                          <td>{propertyDetails.rentalOwner_propertyReserve || "N/A"}</td>
                        </tr>
                      </tbody>

                      <tbody>
                        <tr>
                          <th colSpan="2" className="text-primary text-lg">Staff Details</th>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Staff Member</td>
                          <td>{propertyDetails.staffMember || "N/A"}</td>
                        </tr>
                      </tbody>

                      <tbody>
                        <tr>
                          <th colSpan="2" className="text-primary text-lg">Unit Details</th>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Unit</td>
                          <td>{propertyDetails.rental_units || propertyDetails.rentalcom_units || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Unit Address</td>
                          <td>{propertyDetails.rental_unitsAdress || propertyDetails.rentalcom_unitsAdress || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Bed</td>
                          <td>{propertyDetails.rental_bed || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">Bath</td>
                          <td>{propertyDetails.rental_bath || "N/A"}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold text-md">SQFT</td>
                          <td>{propertyDetails.rental_soft || propertyDetails.rentalcom_soft || "N/A"}</td>
                        </tr>
                      </tbody>
                    </>
                  ) : (
                    <tbody>
                      <tr>
                        <td>No details found.</td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </div>
            </Card>
          </div>
        </Row>
        <br />
        <br />
      </Container>
    </>
  );
};

export default PropDetails;
