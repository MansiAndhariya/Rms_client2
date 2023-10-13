import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import { RotatingLines } from "react-loader-spinner";

import {
  Card,
  CardHeader,
  Table,
  Container,
  FormGroup,
  Row,
  Button,
  Input,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header";
import Cookies from 'universal-cookie';

const PropertiesTables = () => {
  const navigate = useNavigate();
  const [rentalsData, setRentalsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(true);

  const navigateToPropDetails = (rentalId) => {
    const propDetailsURL = `/admin/PropDetails/${rentalId}`;
    window.location.href = propDetailsURL;
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

  const getRentalsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/rentals/rentals"
      );
      setRentalsData(response.data.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching rental data:", error);
    }
  };

  const deleteRentals = (id) => {
    // Show a confirmation dialog to the user
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this rental property!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete("http://localhost:4000/rentals/rentals/", {
            data: { _id: id },
          })
          .then((response) => {
            if (response.data.statusCode === 200) {
              swal(
                "Success!",
                "Rental property deleted successfully!",
                "success"
              );
              getRentalsData(); // Refresh your rentals data or perform other actions
            }
            else if (response.data.statusCode === 201) {
              swal("Warning!", "Property already assigned to Tenant!", "warning");
              getRentalsData();
            }  
            else {
              swal("", response.data.message, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting rental property:", error);
          });
      } else {
        swal("Cancelled", "Rental property is safe :)", "info");
      }
    });
  };

  useEffect(() => {
    // Fetch initial data
    getRentalsData();
  }, []);

  const editProperty = (id) => {
    navigate(`/admin/rentals/${id}`);
    console.log(id);
  };

  const filterRentalsBySearch = () => {
    if (!searchQuery) {
      return rentalsData;
    }

    return rentalsData.filter((rental) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        rental.rental_adress.toLowerCase().includes(lowerCaseQuery) ||
        rental.property_type.toLowerCase().includes(lowerCaseQuery) ||
        `${rental.rentalOwner_firstName} ${rental.rentalOwner_lastName}`
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        rental.rentalOwner_companyName.toLowerCase().includes(lowerCaseQuery) ||
        `${rental.rental_city}, ${rental.rental_country}`
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        rental.rentalOwner_primaryEmail.toLowerCase().includes(lowerCaseQuery)
      );
    });
  };

  return (
    <>
      <Header />
      <Container className="mt--8" fluid>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <h1 style={{ color: "white" }}>Properties</h1>
            </FormGroup>
          </Col>
          <Col className="text-right" xs="12" sm="6">
            <Button
              color="primary"
              href="#rms"
              onClick={() => navigate("/admin/rentals")}
              size="sm"
              style={{ background: "white", color: "blue" }}
            >
              Add New Property
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <div className="col">
            {loader ? (
              <div className="d-flex flex-direction-row justify-content-center align-items-center p-5 m-5">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={loader}
                />
              </div>
            ) : (
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col xs="12" sm="6">
                      <FormGroup>
                        <Input
                          fullWidth
                          type="text"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{
                            width: "100%",
                            maxWidth: "200px",
                            minWidth: "200px",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Address</th>
                      <th scope="col">Property Type</th>
                      <th scope="col">Rental Owners</th>
                      <th scope="col">Rental Company Name</th>
                      <th scope="col">Locality</th>
                      <th scope="col">Primary Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterRentalsBySearch().map((rental) => (
                      <tr
                        key={rental._id}
                        onClick={() => navigateToPropDetails(rental._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{rental.rental_adress}</td>
                        <td>{rental.property_type}</td>
                        <td>{`${rental.rentalOwner_firstName} ${rental.rentalOwner_lastName}`}</td>
                        <td>{rental.rentalOwner_companyName}</td>
                        <td>{`${rental.rental_city}, ${rental.rental_country}`}</td>
                        <td>{rental.rentalOwner_primaryEmail}</td>
                        <td>{rental.rentalOwner_phoneNumber}</td>
                        <td>
                          <div style={{ display: "flex", gap: "5px" }}>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteRentals(rental._id);
                              }}
                            >
                              <DeleteIcon />
                            </div>
                            &nbsp; &nbsp; &nbsp;
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                editProperty(rental._id);
                              }}
                            >
                              <EditIcon />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            )}
          </div>
        </Row>
        <br />
        <br />
      </Container>
    </>
  );
};

export default PropertiesTables;
