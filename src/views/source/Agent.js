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
  Table,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Header from "components/Headers/Header";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { RotatingLines } from "react-loader-spinner";
import Cookies from "universal-cookie";

const Agent = () => {
  const { id } = useParams();
  let [AgentData, setAgentData] = useState();
  let [loader, setLoader] = React.useState(true);
  let navigate = useNavigate();

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

  // Delete selected
  const deleteAgent = (id) => {
    // Show a confirmation dialog to the user
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this agent!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete("http://64.225.8.160:4000/addagent/delete_agent", {
            data: { _id: id },
          })
          .then((response) => {
            if (response.data.statusCode === 200) {
              swal("Success!", "Agent deleted successfully!", "success");
              getAgentData(); // Refresh your agent data or perform other actions
            } else {
              swal("", response.data.message, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting agent:", error);
          });
      } else {
        swal("Cancelled", "Agent is safe :)", "info");
      }
    });
  };

  const getAgentData = async () => {
    try {
      const response = await axios.get(
        "http://64.225.8.160:4000/addagent/addagent"
      );
      setLoader(false);
      setAgentData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getAgentData();
  }, []);

  const editAgent = (id) => {
    navigate(`/admin/AddAgent/${id}`);
    console.log(id);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup className="">
              <h1 style={{ color: "white" }}>Agents</h1>
            </FormGroup>
          </Col>

          <Col className="text-right" xs="12" sm="6">
            <Button
              color="primary"
              href="#rms"
              onClick={() => navigate("/admin/AddAgent")}
              size="sm"
              style={{ background: "white", color: "blue" }}
            >
              Add New Agent
            </Button>
          </Col>
        </Row>
        <br />
        {/* Table */}
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
                  {/* <h3 className="mb-0">Staff Members</h3>    */}
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">NAME</th>
                      <th scope="col">PHONE NUMBER</th>
                      <th scope="col">E-MAIL</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AgentData?.map((agent) => (
                      <tr key={agent._id}>
                        <td>{agent.agent_name}</td>
                        <td>{agent.agent_phoneNumber}</td>
                        <td>{agent.agent_email}</td>
                        <td>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteAgent(agent._id)}
                            >
                              <DeleteIcon />
                            </div>
                            &nbsp; &nbsp; &nbsp;
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => editAgent(agent._id)}
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
      </Container>
    </>
  );
};

export default Agent;
