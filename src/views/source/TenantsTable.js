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
} from "reactstrap";

import Header from "components/Headers/Header";
import * as React from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { RotatingLines } from "react-loader-spinner";
import Cookies from "universal-cookie";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import "jspdf-autotable";
const TenantsTable = ({ tenantDetails }) => {
  // const {tenantId} = useParams();
  let [tentalsData, setTenantsDate] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState("");
  let [loader, setLoader] = React.useState(true);

  function navigateToTenantsDetails(tenantId) {
    const tenantsDetailsURL = `/admin/tenantdetail/${tenantId}`;
    window.location.href = tenantsDetailsURL;
  }

  let navigate = useNavigate();
  let getTenantsDate = async () => {
    let responce = await axios.get("http://localhost:4000/tenant/tenant");
    setLoader(false);
    setTenantsDate(responce.data.data);
  };
  React.useEffect(() => {
    getTenantsDate();
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

  // Delete selected
  const deleteTenants = (id) => {
    // Show a confirmation dialog to the user
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this tenant!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete("http://localhost:4000/tenant/tenant", {
            data: { _id: id },
          })
          .then((response) => {
            if (response.data.statusCode === 200) {
              swal("Success!", "Tenant deleted successfully!", "success");
              getTenantsDate(); // Refresh your tenant data or perform other actions
            } else {
              swal("", response.data.message, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting Tenant:", error);
          });
      } else {
        swal("Cancelled", "Tenant is safe :)", "info");
      }
    });
  };

  const filterTenantsBySearch = () => {
    if (!searchQuery) {
      return tentalsData;
    }

    return tentalsData.filter((tenant) => {
      return (
        `${tenant.tenant_firstName} ${tenant.tenant_lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        tenant.tenant_email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const editLeasing = (id) => {
    navigate(`/admin/Leaseing/${id}`);
    console.log(id);
  };
  function formatDateWithoutTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  }
  const generatePDF = async (tenantId, tenantDetails) => {
    try {
      let tenantData = tenantDetails;
      if (!tenantData || !tenantData._id) {
        const response = await axios.get(
          `http://localhost:4000/tenant/tenant_summary/${tenantId}`
        );
        tenantData = response.data.data;
      }

      const doc = new jsPDF();
      doc.text(`Lease Details`, 10, 10);

      const headers = ["Title", "Value"];
      const data = [
        [
          "Tenant Name",
          `${tenantData.tenant_firstName} ${tenantData.tenant_lastName}`,
        ],
        ["Phone", tenantData.tenant_mobileNumber],
        ["Email", tenantData.tenant_email],
        ["Birthdate", formatDateWithoutTime(tenantData.birth_date)],
        ["Textpayer Id", tenantData.textpayer_id],
        ["Comments", tenantData.comments],
        ["Contact Name", tenantData.contact_name],
        ["Relationship With Tenants", tenantData.relationship_tenants],
        ["Emergency Email", tenantData.email],
        ["Emergench PhoneNumber", tenantData.emergency_PhoneNumber],
        ["Property Type", tenantData.rental_adress],
        ["Lease Type", tenantData.lease_type],
        ["Start Date", formatDateWithoutTime(tenantData.start_date)],
        ["End Date", formatDateWithoutTime(tenantData.end_date)],
        ["Rent Cycle", tenantData.rent_cycle],
        ["Amount", tenantData.amount],
        ["Accout", tenantData.account],
        ["Next Due Date", formatDateWithoutTime(tenantData.nextDue_date)],
        ["Memo", tenantData.memo],
        ["Cosigner Firstname", tenantData.cosigner_firstName],
        ["Cosigner Lastname", tenantData.cosigner_lastName],
        ["Cosigner Mobilenumber", tenantData.cosigner_mobileNumber],
        ["Cosigner Worknumber", tenantData.cosigner_workNumber],
        ["Cosigner HomeNumber", tenantData.cosigner_homeNumber],
        ["Cosigner FaxPhone Number", tenantData.cosigner_faxPhoneNumber],
        ["Cosigner Email", tenantData.cosigner_email],
        ["Cosigner AlternateEmail", tenantData.cosigner_alternateemail],
        ["Cosigner StreeAddress", tenantData.cosigner_streetAdress],
        ["Cosigner City", tenantData.cosigner_city],
        ["Cosigner State", tenantData.cosigner_state],
        ["Cosigner Country", tenantData.cosigner_country],
        ["Cosigner PostalCode", tenantData.cosigner_postalcode],
        ["Recurring Amount", tenantData.recuring_amount],
        ["Recurring Account", tenantData.recuring_account],
        ["Recurring NextDue Date", tenantData.recuringnextDue_date],
        ["Recurring Memo", tenantData.recuringmemo],
        ["Recurring Frequency", tenantData.recuringfrequency],
        ["One Time Amont", tenantData.onetime_amount],
        ["One Time Account", tenantData.onetime_account],
        [
          "One Time Due Date",
          formatDateWithoutTime(tenantData.onetime_Due_date),
        ],
        ["One Time Memo", tenantData.onetime_memo],
      ];

  
      const filteredData = data.filter(
        (row) => row[1] !== undefined && row[1] !== null && row[1] !== ""
      );

      if (filteredData.length > 0) {
        doc.autoTable({
          head: [headers],
          body: filteredData,
          startY: 20,
        });

        doc.save(`${tenantId}.pdf`);
      } else {
        console.error("No valid data to generate PDF.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup className="">
              <h1 style={{ color: "white" }}>Tenants</h1>
            </FormGroup>
          </Col>

          <Col className="text-right" xs="12" sm="6">
            <Button
              color="primary"
              href="#rms"
              onClick={() => navigate("/admin/Leaseing")}
              size="sm"
              style={{ background: "white", color: "blue" }}
            >
              Add New Lease
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
                  <Row>
                    <Col xs="12" sm="6">
                      <FormGroup className="">
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
                      <th scope="col">FIRST NAME</th>
                      {/* <th scope="col">LAST NAME</th> */}
                      <th scope="col">PHONE</th>
                      <th scope="col">Property Type</th>
                      <th scope="col">Lease Type</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterTenantsBySearch()?.map((tenant) => (
                      <tr
                        key={tenant._id}
                        onClick={() => navigateToTenantsDetails(tenant._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>
                          {tenant.tenant_firstName} {tenant.tenant_lastName}
                        </td>
                        <td>{tenant.tenant_mobileNumber}</td>
                        <td>{tenant.rental_adress}</td>
                        <td>{tenant.lease_type}</td>
                        <td style={{}}>
                          <div style={{ display: "flex", gap: "5px" }}>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTenants(tenant._id);
                              }}
                            >
                              <DeleteIcon />
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                editLeasing(tenant._id);
                              }}
                            >
                              <EditIcon />
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                generatePDF(tenant._id, tenantDetails);
                              }}
                            >
                              <PictureAsPdfIcon />
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

export default TenantsTable;
