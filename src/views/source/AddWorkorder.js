import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
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

import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import AddWorkorderHeader from "components/Headers/AddWorkorderHeader";
import swal from "sweetalert";
import ClearIcon from "@mui/icons-material/Clear";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddWorkorder = () => {
  const { id } = useParams();

  const [propdropdownOpen, setpropdropdownOpen] = React.useState(false);
  const [categorydropdownOpen, setcategorydropdownOpen] = React.useState(false);
  const [vendordropdownOpen, setvendordropdownOpen] = React.useState(false);
  const [entrydropdownOpen, setentrydropdownOpen] = React.useState(false);
  const [userdropdownOpen, setuserdropdownOpen] = React.useState(false);
  const [statusdropdownOpen, setstatusdropdownOpen] = React.useState(false);

  const [selectedProp, setSelectedProp] = useState("Select");
  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [selectedVendor, setSelectedVendor] = useState("Select");
  const [selectedEntry, setSelectedEntry] = useState("Select");
  const [selecteduser, setSelecteduser] = useState("Select");
  const [selectedStatus, setSelectedStatus] = useState("Select");

  const [selectedAccount, setSelectedAccount] = useState("");

  const handleAccountSelection = (value, index) => {
    const updatedEntries = [...WorkFormik.values.entries];
    if (updatedEntries[index]) {
      updatedEntries[index].account_type = value;
      WorkFormik.setValues({
        ...WorkFormik.values,
        entries: updatedEntries,
      });
    } else {
      console.error(`Entry at index ${index} is undefined.`);
    }
  };

  const toggle1 = () => setpropdropdownOpen((prevState) => !prevState);
  const toggle2 = () => setcategorydropdownOpen((prevState) => !prevState);
  const toggle3 = () => setvendordropdownOpen((prevState) => !prevState);
  const toggle4 = () => setentrydropdownOpen((prevState) => !prevState);
  const toggle5 = () => setuserdropdownOpen((prevState) => !prevState);
  const toggle6 = () => setstatusdropdownOpen((prevState) => !prevState);

  const [propertyData, setPropertyData] = useState([]);
  const [staffData, setstaffData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    part_qty: "",
    account_type: "",
    description: "",
    part_price: "",
    total_amount: "",
  });
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [allVendors, setAllVendors] = useState([]);



  const handlePropertySelect = (property) => {
    setSelectedProp(property);
  };

  const handleCategorySelection = (value) => {
    setSelectedCategory(value);
    setcategorydropdownOpen(true);
  };

  const handleVendorSelect = (value) => {
    setSelectedVendor(value);
  };

  const handleEntrySelect = (value) => {
    setSelectedEntry(value);
  };

  const handleStaffSelect = (staff) => {
    setSelecteduser(staff);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  let navigate = useNavigate();
  const handleCloseButtonClick = () => {
    navigate("../Workorder");
  };

  const handleAddRow = () => {
    const newEntry = {
      part_qty: "",
      account_type: "",
      description: "",
      part_price: "",
      // total_amount: "",
      dropdownOpen:false,
    };
    if (WorkFormik.values.entries) {
      WorkFormik.setValues({
        ...WorkFormik.values,
        entries: [...WorkFormik.values.entries, newEntry],
      });
    }
  };

  const handleRemoveRow = (index) => {
    const updatedEntries = [...WorkFormik.values.entries];
    updatedEntries.splice(index, 1); // Remove the entry at the specified index
    WorkFormik.setValues({
      ...WorkFormik.values,
      entries: updatedEntries,
    });
  };

  const toggleDropdown = (index) => {
    const updatedEntries = [...WorkFormik.values.entries];
    updatedEntries[index].dropdownOpen = !updatedEntries[index].dropdownOpen;
    WorkFormik.setValues({
      ...WorkFormik.values,
      entries: updatedEntries,
    });
  };
  const setVendorsName = () => {
    axios
      .get("http://64.225.8.160:4000/vendor/vendor_name")
      .then((res) => {
        console.log(res, "res of all vendors");
        console.log(res.data.data, "ressssssss");
        const names = res.data.data.map((item) => {
          return item.vendor_name;
        });
        setAllVendors(names);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [workOrderData, setWorkOrderData] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/workorder/workorder_summary/${id}`)
        .then((response) => {
          const vendorData = response.data.data;
          setWorkOrderData(vendorData); // Use vendorData here
          console.log(vendorData);

          const formattedDueDate = vendorData.due_date
            ? new Date(vendorData.due_date).toISOString().split("T")[0]
            : "";
          setSelectedProp(vendorData.rental_adress || "Select");
          setSelectedCategory(vendorData.work_category || "Select");
          setSelectedVendor(vendorData.vendor || "Select");
          setSelectedEntry(vendorData.entry_allowed || "Select");
          setSelecteduser(vendorData.staffmember_name || "Select");
          setSelectedStatus(vendorData.status);
          setSelectedPriority(vendorData.priority || "Select");
          setSelectedAccount(vendorData.account_type||"Select");

          const entriesData = vendorData.entries || []; // Make sure entries is an array
          WorkFormik.setValues({
            work_subject: vendorData.work_subject || "",
            unit_no: vendorData.unit_no || "",
            invoice_number: vendorData.invoice_number || "",
            work_charge: vendorData.work_charge || "",
            detail: vendorData.detail || "",
            entry_contact: vendorData.entry_contact || "",
            work_performed: vendorData.work_performed || "",
            vendor_note: vendorData.vendor_note || "",
            due_date: formattedDueDate,
            entries: entriesData.map((entry) => ({
              part_qty: entry.part_qty || "",
              account_type: entry.account_type || "Select",
              description: entry.description || "",
              part_price: entry.part_price || "",
              total_amount: entry.total_amount || "",
              dropdownOpen: false,
            })),
          });
        })
        .catch((error) => {
          console.error("Error fetching vendor data:", error);
        });
    }
  }, [id]);

  const { v4: uuidv4 } = require('uuid');

  async function handleSubmit(values, work) {
    try {
      values["rental_adress"] = selectedProp;
      values["work_category"] = selectedCategory;
      values["vendor_name"] = selectedVendor;
      values["entry_allowed"] = selectedEntry;
      values["staffmember_name"] = selecteduser;
      values["status"] = selectedStatus;
      values["priority"] = selectedPriority;
      values["account_type"] = selectedAccount;

      const entries = WorkFormik.values.entries.map((entry) => ({
        part_qty: entry.part_qty,
        account_type: entry.account_type,
        description: entry.description,
        part_price: parseFloat(entry.part_price),
        total_amount: parseFloat(entry.total_amount),
      }));

      values["entries"] = entries;

      const workorder_id = uuidv4();
      values["workorder_id"] = workorder_id;

      const work_subject = values.work_subject;

      if (id === undefined) {
        // Create the work order
        const workOrderRes = await axios.post(
          "http://localhost:4000/workorder/workorder",
          values
        );

        // Check if the work order was created successfully
        if (workOrderRes.status === 200) {
          console.log(workOrderRes.data);
          // Use the work order data from the response to create the notification
          const notificationRes = await axios.post(
            "http://localhost:4000/notification/notification",
            {
              workorder: {
                vendor_name: selectedVendor,
                staffmember_name: selecteduser,
                rental_adress: selectedProp,
                work_subject: work_subject,
                workorder_id: workorder_id,
              },
              notification: {},
            }
          );
          handleResponse(workOrderRes, notificationRes);
        } else {
          console.error("Work Order Error:", workOrderRes.data);
        }
      } else {
        const editUrl = `http://localhost:4000/workorder/workorder/${id}`;
        const res = await axios.put(editUrl, values);
        handleResponse(res);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
    }
  }

  function handleResponse(response) {
    if (response.status === 200) {
      navigate("/admin/Workorder");
      swal(
        "Success!",
        id ? "Workorder updated successfully" : "Workorder added successfully!",
        "success"
      );
    } else {
      alert(response.data.message);
    }
  }

  const WorkFormik = useFormik({
    initialValues: {
      work_subject: "",
      rental_adress: "",
      unit_no: "",
      work_category: "",
      vendor: "",
      invoice_number: "",
      work_charge: "",
      entry_allowed: "",
      detail: "",
      entry_contact: "",
      work_performed: "",
      vendor_note: "",
      staffmember_name: "",
      status: "",
      due_date: "",
      priority: "",
      entries: [
        {
          part_qty: "",
          account_type: selectedAccount, 
          description: "",
          part_price: "",
          total_amount: "",
          dropdownOpen: false,
        },
      ],
    },

    onSubmit: (values) => {
      handleSubmit(values);
      console.log(values, "values");
    },
  });

  React.useEffect(() => {
    // Make an HTTP GET request to your Express API endpoint
    fetch("http://localhost:4000/rentals/allproperty")
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
    setVendorsName();

    // Make an HTTP GET request to your Express API endpoint
    fetch("http://localhost:4000/addstaffmember/find_staffmember")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setstaffData(data.data);
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

  return (
    <>
      <AddWorkorderHeader/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card
              className="bg-secondary shadow"
              onSubmit={WorkFormik.handleSubmit}
            >
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">
                      {" "}
                      {id ? "Edit Work Order" : "New Work Order"}
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-member"
                          >
                            Subject *
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-work-subject"
                            placeholder="Add Subject"
                            type="text"
                            name="work_subject"
                            //name="nput-staffmember-name"
                            onBlur={WorkFormik.handleBlur}
                            onChange={(e) => {
                              // Update the state or Formik values with the new input value
                              WorkFormik.handleChange(e);
                            }}
                            value={WorkFormik.values.work_subject}
                          />
                          {WorkFormik.touched.work_subject &&
                          WorkFormik.errors.work_subject ? (
                            <div style={{ color: "red" }}>
                              {WorkFormik.errors.work_subject}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Property
                          </label>
                          <br />
                          <br />
                          <FormGroup>
                            <Dropdown
                              isOpen={propdropdownOpen}
                              toggle={toggle1}
                            >
                              <DropdownToggle caret style={{ width: "100%" }}>
                                {selectedProp
                                  ? selectedProp
                                  : "Select a property..."}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </DropdownToggle>
                              <DropdownMenu
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                {propertyData.map((property) => (
                                  <DropdownItem
                                    key={property._id}
                                    onClick={() =>
                                      handlePropertySelect(
                                        property.rental_adress
                                      )
                                    }
                                  >
                                    {property.rental_adress}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Unit
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Flat Number"
                            type="text"
                            name="unit_no"
                            //name="nput-staffmember-name"
                            onBlur={WorkFormik.handleBlur}
                            onChange={(e) => {
                              // Update the state or Formik values with the new input value
                              WorkFormik.handleChange(e);
                            }}
                            value={WorkFormik.values.unit_no}
                          />
                          {WorkFormik.touched.unit_no &&
                          WorkFormik.errors.unit_no ? (
                            <div style={{ color: "red" }}>
                              {WorkFormik.errors.unit_no}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Category
                          </label>
                          <br />
                          <br />
                          <Dropdown
                            isOpen={categorydropdownOpen}
                            toggle={toggle2}
                          >
                            <DropdownToggle caret style={{ width: "100%" }}>
                              {selectedCategory} &nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu style={{ width: "100%" }}>
                              <DropdownItem
                                onClick={() =>
                                  handleCategorySelection("Complaint")
                                }
                              >
                                Complaint
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleCategorySelection(
                                    "Contribution Request"
                                  )
                                }
                              >
                                Contribution Request
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleCategorySelection("Feedback/Suggestion")
                                }
                              >
                                Feedback/Suggestion
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleCategorySelection("General Inquiry")
                                }
                              >
                                General Inquiry
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleCategorySelection("Maintenance Request")
                                }
                              >
                                Maintenance Request
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleCategorySelection("Other")}
                              >
                                Other
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Vendor *
                          </label>
                          <br />
                          <br />
                          <Dropdown
                            isOpen={vendordropdownOpen}
                            toggle={toggle3}
                          >
                            <DropdownToggle caret style={{ width: "100%" }}>
                              {selectedVendor} &nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu style={{ width: "100%" }}>
                              {/* <DropdownItem
                                onClick={() =>
                                  handleVendorSelect("302 properties")
                                }
                              >
                                302 properties
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleVendorSelect("Other")}
                              >
                                Other
                              </DropdownItem> */}
                               {allVendors.map((vendor, index) => (
                                <DropdownItem
                                  key={index}
                                  onClick={() => handleVendorSelect(vendor)}
                                >
                                  {vendor}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Invoice Number
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Add Number"
                            type="text"
                            name="invoice_number"
                            //name="nput-staffmember-name"
                            onBlur={WorkFormik.handleBlur}
                            onChange={(e) => {
                              // Update the state or Formik values with the new input value
                              WorkFormik.handleChange(e);
                            }}
                            value={WorkFormik.values.invoice_number}
                          />
                          {WorkFormik.touched.invoice_number &&
                          WorkFormik.errors.invoice_number ? (
                            <div style={{ color: "red" }}>
                              {WorkFormik.errors.invoice_number}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Charge Work To
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder=""
                            type="text"
                            name="work_charge"
                            //name="nput-staffmember-name"
                            onBlur={WorkFormik.handleBlur}
                            onChange={(e) => {
                              // Update the state or Formik values with the new input value
                              WorkFormik.handleChange(e);
                            }}
                            value={WorkFormik.values.work_charge}
                          />
                          {WorkFormik.touched.work_charge &&
                          WorkFormik.errors.work_charge ? (
                            <div style={{ color: "red" }}>
                              {WorkFormik.errors.work_charge}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Entry Allowed
                          </label>
                          <br />
                          <br />
                          <Dropdown isOpen={entrydropdownOpen} toggle={toggle4}>
                            <DropdownToggle caret style={{ width: "100%" }}>
                              {selectedEntry} &nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu style={{ width: "100%" }}>
                              <DropdownItem
                                onClick={() => handleEntrySelect("Yes")}
                              >
                                Yes
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleEntrySelect("No")}
                              >
                                No
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Assigned To *
                          </label>
                          <br />
                          <br />
                          <FormGroup>
                            <Dropdown
                              isOpen={userdropdownOpen}
                              toggle={toggle5}
                            >
                              <DropdownToggle caret>
                                {selecteduser ? selecteduser : "Select"}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </DropdownToggle>
                              <DropdownMenu
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                <DropdownItem header style={{ color: "blue" }}>
                                  Staff
                                </DropdownItem>
                                {staffData.map((user) => (
                                  <DropdownItem
                                    key={user._id}
                                    onClick={() =>
                                      handleStaffSelect(user.staffmember_name)
                                    }
                                  >
                                    {user.staffmember_name}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-member"
                          >
                            Work To Be Performed
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder=""
                            type="textarea"
                            name="work_performed"
                            //name="nput-staffmember-name"
                            onBlur={WorkFormik.handleBlur}
                            onChange={(e) => {
                              // Update the state or Formik values with the new input value
                              WorkFormik.handleChange(e);
                            }}
                            value={WorkFormik.values.work_performed}
                          />
                          {WorkFormik.touched.work_performed &&
                          WorkFormik.errors.work_performed ? (
                            <div style={{ color: "red" }}>
                              {WorkFormik.errors.work_performed}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>

                  <div className="pl-lg-4">
                    <label className="form-control-label" htmlFor="input-desg">
                      Parts and Labor
                    </label>
                    <Col lg="12">
                      <FormGroup>
                        <div className="table-responsive">
                          <Table
                            className="table table-bordered"
                            responsive
                            style={{
                              borderCollapse: "collapse",
                              border: "1px solid #ddd",
                              // width: "100% !important",
                            }}
                          >
                            <thead className="thead-light">
                              <tr>
                                <th>Qty</th>
                                <th>Account</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Total</th>
                                {/* <th scope="col">ACTION</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {
                                WorkFormik.values.entries?.map(
                                  (entry, index) => (
                                    <tr key={index}>
                                      <td>
                                        <Input
                                          className="form-control-alternative"
                                          id="input-unitadd"
                                          placeholder="Description"
                                          type="text"
                                          name={`entries[${index}].part_qty`}
                                          onBlur={WorkFormik.handleBlur}
                                          onChange={WorkFormik.handleChange}
                                          value={entry.part_qty}
                                        />
                                        {WorkFormik.touched.entries &&
                                        WorkFormik.touched.entries[index] &&
                                        WorkFormik.errors.entries &&
                                        WorkFormik.errors.entries[index] &&
                                        WorkFormik.errors.entries[index]
                                          .part_qty ? (
                                          <div style={{ color: "red" }}>
                                            {
                                              WorkFormik.errors.entries[index]
                                                .part_qty
                                            }
                                          </div>
                                        ) : null}
                                      </td>
                                      <td>
                                        
                                        <Dropdown
                                          isOpen={entry.dropdownOpen}
                                          toggle={() => toggleDropdown(index)}
                                        >
                                          <DropdownToggle caret style={{ width: "100%" }}>
                                            {entry.account_type || "Select"} &nbsp;&nbsp;&nbsp;&nbsp;
                                          </DropdownToggle>
                                          <DropdownMenu style={{ width: "100%", maxHeight: "200px", overflowY: "auto" }}>
                                            <DropdownItem
                                          
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Advertising",index
                                                )
                                              }
                                            >
                                              Advertising
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Association Fees",index
                                                )
                                              }
                                            >
                                              Association Fees
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Auto and Travel",index
                                                )
                                              }
                                            >
                                              Auto and Travel
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Bank Fees",index
                                                )
                                              }
                                            >
                                              Bank Fees
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Cleaning and Maintenance",index
                                                )
                                              }
                                            >
                                              Cleaning and Maintenance
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Commissions",index
                                                )
                                              }
                                            >
                                              Commissions
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Depreciation Expense",index
                                                )
                                              }
                                            >
                                              Depreciation Expense
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Insurance",index
                                                )
                                              }
                                            >
                                              Insurance
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Legal and Professional Fees",index
                                                )
                                              }
                                            >
                                              Legal and Professional Fees
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Licenses and Permits",index
                                                )
                                              }
                                            >
                                              Licenses and Permits
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Management Fees",index
                                                )
                                              }
                                            >
                                              Management Fees
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Mortgage Interest",index
                                                )
                                              }
                                            >
                                              Mortgage Interest
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Other Expenses",index
                                                )
                                              }
                                            >
                                              Other Expenses
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Other Interest Expenses",index
                                                )
                                              }
                                            >
                                              Other Interest Expenses
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Postage and Delivery",index
                                                )
                                              }
                                            >
                                              Postage and Delivery
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Repairs",index
                                                )
                                              }
                                            >
                                              Repairs
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleAccountSelection(
                                                  "Insurance",index
                                                )
                                              }
                                            >
                                              Other Expenses
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </Dropdown>
                                      </td>
                                      <td>
                                        <Input
                                          className="form-control-alternative"
                                          id="input-unitadd"
                                          placeholder="Description"
                                          type="text"
                                          name={`entries[${index}].description`}
                                          onBlur={WorkFormik.handleBlur}
                                          onChange={WorkFormik.handleChange}
                                          value={entry.description}
                                        />
                                        {WorkFormik.touched.entries &&
                                        WorkFormik.touched.entries[index] &&
                                        WorkFormik.errors.entries &&
                                        WorkFormik.errors.entries[index] &&
                                        WorkFormik.errors.entries[index]
                                          .description ? (
                                          <div style={{ color: "red" }}>
                                            {
                                              WorkFormik.errors.entries[index]
                                                .description
                                            }
                                          </div>
                                        ) : null}
                                      </td>
                                      <td>
                                        <Input
                                          className="form-control-alternative"
                                          id="input-unitadd"
                                          placeholder="Price"
                                          type="number"
                                          name={`entries[${index}].part_price`}
                                          onBlur={WorkFormik.handleBlur}
                                          onChange={WorkFormik.handleChange}
                                          value={entry.part_price}
                                        />
                                        {WorkFormik.touched.entries &&
                                        WorkFormik.touched.entries[index] &&
                                        WorkFormik.errors.entries &&
                                        WorkFormik.errors.entries[index] &&
                                        WorkFormik.errors.entries[index]
                                          .part_price ? (
                                          <div style={{ color: "red" }}>
                                            {
                                              WorkFormik.errors.entries[index]
                                                .part_price
                                            }
                                          </div>
                                        ) : null}
                                      </td>
                                      <td>
                                        <Input
                                          className="form-control-alternative"
                                          id="input-unitadd"
                                          placeholder="Total"
                                          type="number"
                                          name={`entries[${index}].total_amount`}
                                          onBlur={WorkFormik.handleBlur}
                                          onChange={WorkFormik.handleChange}
                                          value={entry.total_amount}
                                        />
                                        {WorkFormik.touched.entries &&
                                        WorkFormik.touched.entries[index] &&
                                        WorkFormik.errors.entries &&
                                        WorkFormik.errors.entries[index] &&
                                        WorkFormik.errors.entries[index]
                                          .total_amount ? (
                                          <div style={{ color: "red" }}>
                                            {
                                              WorkFormik.errors.entries[index]
                                                .total_amount
                                            }
                                          </div>
                                        ) : null}
                                      </td>
                                      <td style={{ border: "none" }}>
                                        <ClearIcon
                                          type="button"
                                          style={{
                                            cursor: "pointer",
                                            padding: 0,
                                          }}
                                          onClick={() => handleRemoveRow(index)}
                                        >
                                          Remove
                                        </ClearIcon>
                                      </td>
                                    </tr>
                                  )
                                )
                              }
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="4">
                                  <Button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddRow}
                                  >
                                    Add Row
                                  </Button>
                                </td>
                              </tr>
                            </tfoot>
                          </Table>
                        </div>
                      </FormGroup>
                    </Col>
                    {/* <div>
                                <input
                                type="number"
                                name="qty"
                                placeholder="Qty"
                                value={formData.qty}
                                onChange={handleChange}
                                />
                                <input
                                type="text"
                                name="account"
                                placeholder="Account"
                                value={formData.account}
                                onChange={handleChange}
                                />
                                <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                />
                                <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                />
                                <input
                                type="number"
                                name="total"
                                placeholder="Total"
                                value={formData.total}
                                onChange={handleChange}
                                />
                                <button onClick={handleAddRow}>Add Row</button>
                            </div> */}
                  </div>
                  <br />
                  <br />

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-member"
                          >
                            Vendor Notes
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder=""
                            type="textarea"
                            name="vendor_note"
                            //name="nput-staffmember-name"
                            onBlur={WorkFormik.handleBlur}
                            onChange={(e) => {
                              // Update the state or Formik values with the new input value
                              WorkFormik.handleChange(e);
                            }}
                            value={WorkFormik.values.vendor_note}
                          />
                          {WorkFormik.touched.vendor_note &&
                          WorkFormik.errors.vendor_note ? (
                            <div style={{ color: "red" }}>
                              {WorkFormik.errors.vendor_note}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Priority
                          </label>
                          <br />
                          <br />
                          <div className="pl-lg-4">
                            <Row>
                              <Col xs="3">
                                <Label check>
                                  <Input
                                    type="radio"
                                    name="priority"
                                    value="High"
                                    checked={selectedPriority === "High"}
                                    onChange={handlePriorityChange}
                                  />
                                  High
                                </Label>
                              </Col>
                              &nbsp;
                              <Col xs="4">
                                <Label check>
                                  <Input
                                    type="radio"
                                    name="priority"
                                    value="Medium"
                                    checked={selectedPriority === "Medium"}
                                    onChange={handlePriorityChange}
                                  />
                                  Medium
                                </Label>
                              </Col>
                              &nbsp;
                              <Col xs="4">
                                <Label check>
                                  <Input
                                    type="radio"
                                    name="priority"
                                    value="Low"
                                    checked={selectedPriority === "Low"}
                                    onChange={handlePriorityChange}
                                  />
                                  Low
                                </Label>
                              </Col>
                            </Row>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <br />

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Status
                          </label>
                          <br />
                          <br />
                          <FormGroup>
                            <Dropdown
                              isOpen={statusdropdownOpen}
                              toggle={toggle6}
                            >
                              <DropdownToggle caret>
                                {selectedStatus ? selectedStatus : "Select"}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </DropdownToggle>
                              <DropdownMenu
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                <DropdownItem
                                  onClick={() => handleStatusSelect("New")}
                                >
                                  New
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleStatusSelect("In Progress")
                                  }
                                >
                                  In Progress
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleStatusSelect("On Hold")}
                                >
                                  On Hold
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleStatusSelect("Complete")}
                                >
                                  Complete
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-unitadd"
                          >
                            Due Date
                          </label>
                          <br />
                          <br />
                          {/* <Input
                            className="form-control-alternative"
                            id="input-unitadd"
                            type="date"
                            name="due_date"
                            onBlur={WorkFormik.handleBlur}
                            onChange={WorkFormik.handleChange}
                            value={WorkFormik.values.due_date}
                          /> */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="form-control-alternative"
                              name="due_date"
                              slotProps={{ textField: { size: "small" } }}
                              views={["year", "month", "day"]}
                              id="input-unitadd"
                              placeholder="3000"
                              dateFormat="MM-dd-yyyy"
                              onBlur={WorkFormik.handleBlur}
                              selected={WorkFormik.values.due_date} // Use 'selected' prop instead of 'value'
                              onChange={(date) => {
                                WorkFormik.setFieldValue("due_date", date); // Update the Formik field value
                              }}
                            />
                          </LocalizationProvider>
                          {WorkFormik.touched.due_date &&
                          WorkFormik.errors.due_date ? (
                            <div style={{ color: "red" }}>
                              {WorkFormik.errors.due_date}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <br />
                  </div>
                  <button
                    type="submit"
                    onSubmit={{handleSubmit}}
                    className="btn btn-primary ml-4"
                    style={{ background: "green" }}
                  >
                    {id ? "Update Work Order" : "Add Work Order"}
                  </button>
                  <button
                    color="primary"
                    href="#rms"
                    className="btn btn-primary"
                    onClick={handleCloseButtonClick}
                    size="sm"
                    style={{ background: "white", color: "black" }}
                  >
                    Cancel
                  </button>
                </Form>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddWorkorder;
