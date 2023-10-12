import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  FormGroup,
  Row,
  Col,
  Input
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import StaffHeader from "components/Headers/StaffHeader";
import Cookies from "universal-cookie";

const StaffWorkTable = () => {
  const navigate = useNavigate();
  const [workData, setWorkData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loader, setLoader] = useState(true);
  const [staffmember_name, setStaffMember] = useState("");
  const [staffDetails, setStaffDetails] = useState({});
  console.log('staffname', staffmember_name)
  console.log(staffDetails);
  console.log('workData', workData)

  let cookies = new Cookies();
  // let cookies = new Cookies();
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

  let cookie_id = cookies.get("Staff ID");

  const getWorkData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/addstaffmember/staffmember_summary/${cookie_id}`
      );
      if (response.data && response.data.data) {
        console.log(response.data.data);
        setStaffDetails(response.data.data);
        setStaffMember(response.data.data.staffmember_name)

      } else {
        console.error("Invalid or missing data in API response.");
      }
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getWorkData();
  }, []);

  const getRentalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/workorder/workorder/by-staff-member/${staffmember_name}`
      );
      setWorkData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching work order data:", error);
    }
  };

  React.useEffect(() => {
    if (staffmember_name) {
      getRentalData();
    }
    //console.log(staffmember_name)
  }, [staffmember_name]);




  // Log staffmember_name after setting it
  console.log("staffmember_name:", staffmember_name);

  const navigateToDetails = (workorder_id) => {
    // const propDetailsURL = `/admin/WorkOrderDetails/${tenantId}`;
    navigate(`/staff/staffworkdetails/${workorder_id}`);
    console.log(workorder_id);
  };

  const filterRentalsBySearch = () => {
    if (!searchQuery) {
      return workData;
    }
  
    return workData.filter((rental) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        rental.work_subject.toLowerCase().includes(lowerCaseQuery) ||
        rental.work_category.toLowerCase().includes(lowerCaseQuery) ||
        rental.status.toLowerCase().includes(lowerCaseQuery) ||
        rental.rental_adress.toLowerCase().includes(lowerCaseQuery)||
        rental.staffmember_name.toLowerCase().includes(lowerCaseQuery)||
        rental.priority.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }; 

  return (
    <>
      <StaffHeader />
      <Container className="mt--8" fluid>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <h1 style={{ color: "white" }}>Work Orders</h1>
            </FormGroup>
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
                      <th scope="col">Work Order</th>
                      <th scope="col">Property</th>
                      <th scope="col">Category</th>
                      <th scope="col">Assigned</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterRentalsBySearch().map((vendor) => (
                      <tr
                        key={vendor._id}
                        onClick={() =>
                          navigateToDetails(vendor.workorder_id)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td>{vendor.work_subject}</td>
                        <td>{`${vendor.unit_no} ${vendor.staffmember_name}`}</td>
                        <td>{vendor.work_category}</td>
                        <td>{vendor.staffmember_name}</td>
                        <td>{vendor.status}</td>
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

export default StaffWorkTable;
