import React, { useEffect, useState } from 'react';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { PropTypes } from "prop-types";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationData, setNotificationData] = useState([]);

  let navigate = useNavigate();
  let cookies = new Cookies();
  let Logout = () => {
    cookies.remove("token");
    // localStorage.removeItem("name");
    // localStorage.removeItem("id");
    // navigate("/login");
  };

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const handlePropertySelect = (property) => {
    setSelectedProp(property);
  };

  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const [selectedProp, setSelectedProp] = useState("Select");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/notification/notification`)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setNotificationData(data.data);
          setNotificationCount(data.data.length); 
          console.log("Notification",data.data);
         
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

  const navigateToDetails = (workorder_id) => {
    // Make a DELETE request to delete the notification
    axios.delete(`http://localhost:4000/notification/notification/${workorder_id}`)
      .then((response) => {
        if (response.status === 200) {
          // Notification deleted successfully, now update the state to remove it from the list
          const updatedNotificationData = notificationData.filter((notification) => notification.workorder_id !== workorder_id);
          setNotificationData(updatedNotificationData);
          setNotificationCount(updatedNotificationData.length);
          console.log(`Notification with workorder_id ${workorder_id} deleted successfully.`);
        } else {
          console.error(`Failed to delete notification with workorder_id ${workorder_id}.`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  
    // Continue with navigating to the details page
    navigate(`/admin/workorderdetail/${workorder_id}`);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    const filteredRoutes = routes.filter(
      (prop) =>
        prop.name === "Rentals" ||
        prop.name === "Dashboard" ||
        prop.name === "Add Property Type" ||
        prop.name === "Add Staff Member" ||
        prop.name === "Add Agent"
    );
    return filteredRoutes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
          {/* <div>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0" onClick={toggleSidebar} style={{ cursor: 'pointer',position: 'relative' }}>
              <NotificationsIcon style={{color:'black',fontSize:'30px'}}/>
              {notificationCount > 0 && (
                <div className="notification-circle" style={{position: 'absolute',top: '-15px',right: '-20px',background: 'red',borderRadius: '50%',padding: '0.1px 8px'}}>
                  <span className="notification-count" style={{color:'white',fontSize:"13px"}}>{notificationCount}</span>
                </div>
              )}
            </FormGroup>
          </Form>
          </div> */}
          {/* <FormGroup className="mb-0" onClick={toggleSidebar} style={{ cursor: 'pointer',position: 'relative' }}>
             <NotificationsIcon style={{color:'black',fontSize:'30px'}}/>
             {notificationCount > 0 && (
              <div className="notification-circle" style={{position: 'absolute',top: '-15px',right: '-20px',background: 'red',borderRadius: '50%',padding: '0.1px 8px'}}>
                <span className="notification-count" style={{color:'white',fontSize:"13px"}}>{notificationCount}</span>
              </div>
               )}
          </FormGroup> */}

        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-4-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem> */}
              {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem> */}
              <DropdownItem divider />
              <DropdownItem
                href="#rms"
                to="/auth/login"
                onClick={() => {
                  Logout();
                }}
                tag={Link}
              >
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          {/* <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form> */}
          {/* Navigation */}
          <Nav navbar>
            {createLinks(routes)}
            <UncontrolledDropdown nav>
              <DropdownToggle nav caret>
                <i className="ni ni-shop text-orange" /> Rentals
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem to="/admin/propertiesTable" tag={Link}>
                  Properties
                </DropdownItem>
                <DropdownItem to="/admin/RentRoll" tag={Link}>
                  Rent Roll
                </DropdownItem>
                <DropdownItem to="/admin/TenantsTable" tag={Link}>
                  Tenants
                </DropdownItem>
                <DropdownItem to="/admin/RentalownerTable" tag={Link}>
                  Rental Owners
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav caret>
                <i className="ni ni-settings text-grey" /> Maintenance
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem to="/admin/vendor" tag={Link}>
                  Vendors
                </DropdownItem>
                <DropdownItem to="/admin/Workorder" tag={Link}>
                  Work Order
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav caret>
                <i className="ni ni-money-coins text-purple" /> Accounting
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem to="/admin/GeneralLedger" tag={Link}>
                  General Ledger
                </DropdownItem>
                <DropdownItem to="/admin/Payment" tag={Link}>
                  Payment
                </DropdownItem>
                <DropdownItem to="/admin/OutstandingBalance" tag={Link}>
                Outstanding Balances
              </DropdownItem>
              </DropdownMenu>
              
            </UncontrolledDropdown>
          </Nav>
          {/* <Nav navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
              <i className="ni ni-pin-3 text-orange" /> Leasing
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem to="/admin/Listings" tag={Link} >
                Listings
              </DropdownItem>
              <DropdownItem to="/admin/Applicants" tag={Link} >
                Applicants
              </DropdownItem>
              <DropdownItem >
                Draft Leases
              </DropdownItem>
              <DropdownItem >
                Lease Renewals
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </Nav> */}

          {/* Divider */}
          {/* <hr className="my-3" /> */}
          {/* Heading */}
          {/* <h6 className="navbar-heading text-muted">Documentation</h6> */}
          {/* Navigation */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav> */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
