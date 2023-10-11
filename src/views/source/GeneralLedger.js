import GeneralLedgerHeader from "components/Headers/GeneralLedgerHeader";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Table,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const GeneralLedger = () => {
  const navigate = useNavigate();
  const [prodropdownOpen, setproDropdownOpen] = React.useState(false);
  const [propertyData, setPropertyData] = React.useState([]);
  console.log(propertyData);
  const [selectedAccount, setselectedAccount] = React.useState("Select");
  const [accountData, setAccountData] = React.useState([]);
  const [bankdropdownOpen, setbankDropdownOpen] = React.useState(false);
  const [selectedProp, setSelectedProp] = React.useState("Select");
  const [daterangedropdownOpen, setDateRangeDropdownOpen] =
    React.useState(false);
  const [selecteddaterange, setSelectedDateRAnge] = React.useState("Select");

  const toggle1 = () => setproDropdownOpen((prevState) => !prevState);
  const toggle2 = () => setbankDropdownOpen((prevState) => !prevState);
  const toggle3 = () => setDateRangeDropdownOpen((prevState) => !prevState);

  const handlePropSelection = (propertyType) => {
    setSelectedProp(propertyType);
  };
  const handleAccountSelection = (value) => {
    setselectedAccount(value);
  };
  const handleDateRange = (value) => {
    setSelectedDateRAnge(value);
  };
  React.useEffect(() => {
    // Make an HTTP GET request to your Express API endpoint
    fetch("http://64.225.8.160:4000/rentals/property_onrent")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setPropertyData(data.data);
        } else {
          // Handle error
          console.error("Error:", data.message);
        }
      })
      .catch((error) => {
        // Handle network error
        console.error("Network error:", error);
      });
  }, []);

  React.useEffect(() => {
    // Make an HTTP GET request to your Express API endpoint
    fetch("http://64.225.8.160:4000/addaccount/find_accountname")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setAccountData(data.data);
          console.log(data.data);
        } else {
          // Handle error
          console.error("Error:", data.message);
        }
      })
      .catch((error) => {
        // Handle network error
        console.error("Network error:", error);
      });
  }, []);

  let cookies = new Cookies();
  // Check Authe(token)
  let chackAuth = async () => {
    if (cookies.get("token")) {
      let authConfig = {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
          token: cookies.get("token"),
        },
      };
      // auth post method
      let res = await axios.post(
        "http://64.225.8.160:4000/register/auth",
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
      <GeneralLedgerHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Form>
                  <Row>
                    <Col lg="2">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-property"
                        >
                          Property
                        </label>
                        <br />
                        <Dropdown isOpen={prodropdownOpen} toggle={toggle1}>
                          <DropdownToggle caret style={{ width: "100%" }}>
                            {selectedProp ? selectedProp : "Select"}
                          </DropdownToggle>
                          <DropdownMenu style={{ width: "100%" }}>
                            {propertyData?.map((item) => (
                              <DropdownItem
                                key={item._id}
                                onClick={() =>
                                  handlePropSelection(item.rental_adress)
                                }
                              >
                                {item.rental_adress}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col lg="2">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-account"
                        >
                          Account
                        </label>
                        <br />
                        <Dropdown isOpen={bankdropdownOpen} toggle={toggle2}>
                          <DropdownToggle caret style={{ width: "100%" }}>
                            {selectedAccount} &nbsp;&nbsp;&nbsp;&nbsp;
                          </DropdownToggle>
                          <DropdownMenu style={{ width: "100%" }}>
                            <DropdownItem header style={{ color: "blue" }}>
                              Income Account
                            </DropdownItem>
                            {accountData?.map((item) => (
                              <DropdownItem
                                key={item._id}
                                onClick={() =>
                                  handleAccountSelection(item.account_name)
                                }
                              >
                                {item.account_name}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col lg="2">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-account"
                        >
                          Date Range
                        </label>
                        <br />
                        <Dropdown
                          isOpen={daterangedropdownOpen}
                          toggle={toggle3}
                        >
                          <DropdownToggle caret style={{ width: "100%" }}>
                            {selecteddaterange} &nbsp;&nbsp;&nbsp;&nbsp;
                          </DropdownToggle>
                          <DropdownMenu style={{ width: "100%" }}>
                            <DropdownItem
                              onClick={() => handleDateRange("Last 30 Days")}
                            >
                              Last 30 Days
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDateRange("Last 60 Days")}
                            >
                              Last 60 Days
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDateRange("Last 90 Days")}
                            >
                              Last 90 Days
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDateRange("Current Month")}
                            >
                              Current Month
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDateRange("Current Quater")}
                            >
                              Current Quater
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDateRange("Current Year")}
                            >
                              Current Year
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDateRange("Last Month")}
                            >
                              Last Month
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDateRange("Last Quater")}
                            >
                              Last Quater
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDateRange("Last Year")}
                            >
                              Last Year
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col lg="2">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-unitadd"
                        >
                          From
                        </label>
                        {/* <Input
                          className="form-control-alternative"
                          id="input-unitadd"
                          placeholder=""
                          type="date"
                          name="from"
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="form-control-alternative"
                              name="from"
                              slotProps={{ textField: { size: 'small' } }}
                              id="input-unitadd"
                              placeholder="3000"
                              dateFormat="MM-dd-yyyy"
                              views={['year', 'month', 'day']}
                              // onBlur={leaseFormik.handleBlur}
                              // selected={leaseFormik.values.recuringnextDue_date} // Use 'selected' prop instead of 'value'
                              // onChange={(date) => {
                              //   leaseFormik.setFieldValue("recuringnextDue_date", date); // Update the Formik field value
                              // }}
                            />
                          </LocalizationProvider>
                      </FormGroup>
                    </Col>
                    <Col lg="2">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-unitadd"
                        >
                          To
                        </label>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="form-control-alternative"
                              name="to"
                              slotProps={{ textField: { size: 'small' } }}
                              id="input-unitadd"
                              placeholder="3000"
                              dateFormat="MM-dd-yyyy"
                              views={['year', 'month', 'day']}
                              // onBlur={leaseFormik.handleBlur}
                              // selected={leaseFormik.values.recuringnextDue_date} // Use 'selected' prop instead of 'value'
                              // onChange={(date) => {
                              //   leaseFormik.setFieldValue("recuringnextDue_date", date); // Update the Formik field value
                              // }}
                            />
                          </LocalizationProvider>
                        {/* <Input
                          className="form-control-alternative"
                          id="input-unitadd"
                          placeholder=""
                          type="date"
                          name="to"
                        /> */}
                      </FormGroup>
                    </Col>
                    <Col lg="2">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-unitadd"
                          style={{ paddingBottom: "10px" }}
                        >
                          Account Type
                        </label>
                        <div>
                          <label>
                            <input
                              type="radio"
                              id="radioOption1"
                              name="options"
                              value="option1"
                              className="form-control-alternative"
                              style={{ marginRight: "5px", cursor: "pointer" }} // Add radio button styles here
                            />
                            Cash
                          </label>
                          &nbsp;
                          <label>
                            <input
                              type="radio"
                              id="radioOption1"
                              name="options"
                              value="option1"
                              className="form-control-alternative"
                              style={{ marginRight: "5px", cursor: "pointer" }} // Add radio button styles here
                            />
                            Accrual
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col lg="2">
                      <FormGroup>
                        <Button
                          type="submit"
                          className="btn btn-primary"
                          style={{ background: "green", color: "white" }}
                        >
                          Search
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <div className="table-responsive">
                        <Table
                          className="table table-bordered"
                          style={{
                            borderCollapse: "collapse",
                            border: "2px solid #ddd",
                            overflow: "hidden",
                          }}
                        >
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Property</th>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Amount</th>
                              <th>Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                          </tbody>
                        </Table>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GeneralLedger;
