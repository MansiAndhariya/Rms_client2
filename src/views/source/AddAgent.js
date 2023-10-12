import React from "react";
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
} from "reactstrap";

import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import AddAgentHeader from "components/Headers/AddAgentHeader";
import swal from "sweetalert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Cookies from "universal-cookie";

const AddAgent = () => {
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();
  const handleCloseButtonClick = () => {
    navigate("../Agent");
  };

  // const handleSubmit = async (values) => {
  //   console.log(values, "values");
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:4000/addagent/addagent",
  //       values
  //     );

  //     if (res.data.statusCode === 200) {
  //       navigate("/admin/Agent");
  //       swal("Success!", "Agent added successfully!", "success");
  //     } else {
  //       alert(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

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

  const AgentFormik = useFormik({
    initialValues: {
      agent_name: "",
      agent_phoneNumber: "",
      agent_email: "",
      agent_password: "",
    },
    validationSchema: yup.object({
      agent_name: yup.string().required("Required"),
      agent_phoneNumber: yup.string().required("Required"),
      agent_email: yup.string().required("Required"),

      agent_password: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),

    onSubmit: (values) => {
      handleSubmit(values);
      console.log(values, "values");
    },
  });

  const [agentData, setagentData] = useState(null);

  React.useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/addagent/agent_summary/${id}`)
        .then((response) => {
          const agentdata = response.data.data;
          setagentData(agentData);
          console.log(agentdata);
          AgentFormik.setValues({
            agent_name: agentdata.agent_name || "",
            agent_phoneNumber: agentdata.agent_phoneNumber || "",
            agent_email: agentdata.agent_email || "",
            agent_password: agentdata.agent_password || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching vendor data:", error);
        });
    }
  }, [id]);

  async function handleSubmit(values) {
    try {
      if (id === undefined) {
        const res = await axios.post(
          "http://localhost:4000/addagent/addagent",
          values
        );
        handleResponse(res);
      } else {
        const editUrl = `http://localhost:4000/addagent/agent/${id}`;
        const res = await axios.put(editUrl, values);
        handleResponse(res);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
      // Handle the error and display an error message to the user if necessary.
    }
  }

  function handleResponse(response) {
    if (response.status === 200) {
      navigate("/admin/Agent");
      swal(
        "Success!",
        id ? "Agent updated successfully" : "Agent added successfully!",
        "success"
      );
    } else {
      alert(response.data.message);
    }
  }
  return (
    <>
      <AddAgentHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card
              className="bg-secondary shadow"
              onSubmit={AgentFormik.handleSubmit}
            >
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{id ? "Edit Agent" : "New Agent"}</h3>
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
                            What is the name of new agent?
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="John William"
                            type="text"
                            name="agent_name"
                            //name="nput-staffmember-name"
                            onBlur={AgentFormik.handleBlur}
                            onChange={(e) => {
                              // Update the state or Formik values with the new input value
                              AgentFormik.handleChange(e);
                            }}
                            value={AgentFormik.values.agent_name}
                          />
                          {AgentFormik.touched.agent_name &&
                          AgentFormik.errors.agent_name ? (
                            <div style={{ color: "red" }}>
                              {AgentFormik.errors.agent_name}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            What is the contact number?
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-number"
                            placeholder="Phone number"
                            type="number"
                            name="agent_phoneNumber"
                            onBlur={AgentFormik.handleBlur}
                            onChange={AgentFormik.handleChange}
                            value={AgentFormik.values.agent_phoneNumber}
                          />
                          {AgentFormik.touched.agent_phoneNumber &&
                          AgentFormik.errors.agent_phoneNumber ? (
                            <div style={{ color: "red" }}>
                              {AgentFormik.errors.agent_phoneNumber}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            What is the E-mail address?
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-mail"
                            placeholder="john@gmail.com"
                            type="text"
                            name="agent_email"
                            onBlur={AgentFormik.handleBlur}
                            onChange={AgentFormik.handleChange}
                            value={AgentFormik.values.agent_email}
                          />
                          {AgentFormik.touched.agent_email &&
                          AgentFormik.errors.agent_email ? (
                            <div style={{ color: "red" }}>
                              {AgentFormik.errors.agent_email}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-desg"
                          >
                            Set password
                          </label>
                          <br />
                          <br />
                          <div style={{ display: "flex" }}>
                            <Input
                              className="form-control-alternative"
                              id="input-password"
                              placeholder="Password"
                              type={showPassword ? "text" : "password"}
                              style={{
                                marginRight: "10px",
                                flex: 1,
                              }}
                              name="agent_password"
                              onBlur={AgentFormik.handleBlur}
                              onChange={AgentFormik.handleChange}
                              value={AgentFormik.values.agent_password}
                            />
                            <Button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {<VisibilityIcon />}
                            </Button>
                          </div>
                          {AgentFormik.touched.agent_password &&
                          AgentFormik.errors.agent_password ? (
                            <div style={{ color: "red" }}>
                              {AgentFormik.errors.agent_password}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary ml-4"
                    style={{ background: "green" }}
                  >
                    {id ? "Update Agent" : "Add Agent"}
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

export default AddAgent;
