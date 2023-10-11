// reactstrap components
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
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
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { colors } from "@mui/material";
import swal from "sweetalert";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  let navigate = useNavigate();
  let cookies = new Cookies();
  const [isLoading, setIsLoading] = useState(false);


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }; 


  const handleSubmit = async (values) => {
    try {
      setIsLoading(true); // Set loading state to true

      // Admin login
      const adminRes = await axios.post(
        "http://64.225.8.160:4000/register/login",
        values
      );

      if (adminRes.data.statusCode === 200) {
        // Admin login successful
        swal("Success!", "Admin Login Successful!", "success").then((value) => {
          if (value) {
            cookies.set("token", adminRes.data.token);
            navigate("/admin/index");
            console.log("Admin ID:", adminRes.data.data._id);
          }
        });
      } else {
        // Admin login failed, try tenant login
        const tenantRes = await axios.post(
          "http://64.225.8.160:4000/tenant/login",
          {
            tenant_email: values.email,
            tenant_password: values.password,
          }
        );

        if (tenantRes.data.statusCode === 200) {
          // Tenant login successful
          const tenantData = tenantRes.data.data; // Assuming the API response structure

          // Check if tenantData contains _id
          if (tenantData && tenantData._id) {
            console.log("Tenant ID:", tenantData._id);
            swal("Success!", "Tenant Login Successful!", "success").then(
              (value) => {
                if (value) {
                  cookies.set("token", tenantRes.data.token);
                  cookies.set("Tenant ID", tenantData._id);
                  localStorage.setItem("ID", tenantData._id);
                  navigate("/tenant/tenantdashboard");
                }
              }
            );
          } else {
            // Tenant login succeeded, but no _id found
            swal("Error!", "Invalid tenant data", "error");
          }
        } else {
          // Admin and tenant login failed, try agent login
          const agentRes = await axios.post(
            "http://64.225.8.160:4000/addagent/login",
            {
              agent_email: values.email,
              agent_password: values.password,
            }
          );

          if (agentRes.data.statusCode === 200) {
            // Agent login successful
            const agentData = agentRes.data.data; // Assuming the API response structure
            console.log("Agent ID:", agentData._id);

            // Check if agentData contains _id
            if (agentData && agentData._id) {
              console.log("Agent ID:", agentData._id);
              swal("Success!", "Agent Login Successful!", "success").then(
                (value) => {
                  if (value) {
                    cookies.set("token", agentRes.data.token);
                    cookies.set("Agent ID", agentData._id);
                    localStorage.setItem("ID", agentData._id);
                    navigate("/agent/AgentdashBoard");
                  }
                }
              );
            } else {
              // Agent login succeeded, but no _id found
              swal("Error!", "Invalid agent data", "error");
            }
          } else {
            // All login attempts failed, try staff login
            const staffRes = await axios.post(
              "http://64.225.8.160:4000/addstaffmember/login",
              {
                staffmember_email: values.email,
                staffmember_password: values.password,
              }
            );

            if (staffRes.data.statusCode === 200) {
              // Staff login successful
              const staffData = staffRes.data.data; // Assuming the API response structure
              console.log("Staff ID:", staffData._id);

              // Check if staffData contains _id
              if (staffData && staffData._id) {
                console.log("Staff ID:", staffData._id);
                swal("Success!", "Staff Login Successful!", "success").then(
                  (value) => {
                    if (value) {
                      cookies.set("token", staffRes.data.token);
                      cookies.set("Staff ID", staffData._id);
                      localStorage.setItem("ID", staffData._id);
                      navigate("/staff/staffdashboard");
                    }
                  }
                );
              } else {
                // Staff login succeeded, but no _id found
                swal("Error!", "Invalid staff data", "error");
              }
            } else {
              // All login attempts failed, try vendor login
              const vendorRes = await axios.post(
                "http://64.225.8.160:4000/vendor/login",
                {
                  vendor_email: values.email,
                  vendor_password: values.password,
                }
              );

              if (vendorRes.data.statusCode === 200) {
                // Vendor login successful
                const vendorData = vendorRes.data.data; // Assuming the API response structure
                console.log("Vendor ID:", vendorData._id);

                // Check if vendorData contains _id
                if (vendorData && vendorData._id) {
                  console.log("Vendor ID:", vendorData._id);
                  swal("Success!", "Vendor Login Successful!", "success").then(
                    (value) => {
                      if (value) {
                        cookies.set("token", vendorRes.data.token);
                        cookies.set("Vendor ID", vendorData._id);
                        localStorage.setItem("ID", vendorData._id);
                        navigate("/vendor/vendordashboard");
                      }
                    }
                  );
                } else {
                  // Vendor login succeeded, but no _id found
                  swal("Error!", "Invalid vendor data", "error");
                }
              } else {
                // All login attempts failed
                swal("Error!", "Invalid credentials", "error");
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading state to false after API call completes
    }
  };

  let loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Required"),
      password: yup
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
    },
  });

  return (
    <>
      <Col lg="5" md="7">
        <Card
          className="bg-secondary shadow border-0"
          onSubmit={loginFormik.handleSubmit}
        >
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with your credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onBlur={loginFormik.handleBlur}
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.email}
                  />
                  {loginFormik.touched.email && loginFormik.errors.email ? (
                    <div style={{ color: "red" }}>
                      {loginFormik.errors.email}
                    </div>
                  ) : null}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="standard-adornment-password"
                    autoComplete="new-password"
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onBlur={loginFormik.handleBlur}
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.password}
                  />

                  <IconButton
                    type="button"
                    style={{ padding: "7px" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {<VisibilityIcon />}
                  </IconButton>

                </InputGroup>
                  {loginFormik.touched.password &&
                  loginFormik.errors.password ? (
                    <div style={{ color: "red" }}>
                      {loginFormik.errors.password}
                    </div>
                  ) : null}
              </FormGroup>

              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                {/* <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label> */}
              </div>
              <br />
              <br />
              <div className="text-center">
                {/* <Button className="my-4" color="primary" type="button">
                    Sign in
                  </Button> */}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  color="primary"
                >
                  {isLoading ? <CircularProgress size={24} /> : "Login"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#rms"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#rms"
                onClick={(e) => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row> */}
      </Col>
    </>
  );
};

export default Login;
