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
  Collapse,
  Label,
} from "reactstrap";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
// import RentalHeader from "components/Headers/RentalHeader.js";
// import TenantsHeader from "components/Headers/TenantsHeader";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
// import HomeIcon from "@mui/icons-material/Home";
// import BusinessIcon from "@mui/icons-material/Business";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormControlLabel, Switch } from "@mui/material";
import LeaseHeader from "components/Headers/LeaseHeader.js";
// import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Leaseing.css";
import swal from "sweetalert";
// import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "universal-cookie";
import AccountDialog from "components/AccountDialog";

const RentRollLeaseig = () => {
  const { id } = useParams();
  const [tenantData, setTenantData] = useState([]);
  const [selectedTenantData, setSelectedTenantData] = useState([]);
  const [checkedCheckbox, setCheckedCheckbox] = useState();

  const [cosignerData, setCosignerData] = useState([]);
  const [recurringData, setRecurringData] = useState([]);
  const [oneTimeData, setOneTimeData] = useState([]);
  // const [selectedAccountLevel, setSelectedAccountLevel] =
  //   useState("Parent Account");

  const [alignment, setAlignment] = React.useState("web");
  const [leasedropdownOpen, setLeaseDropdownOpen] = React.useState(false);
  const [rentdropdownOpen, setrentDropdownOpen] = React.useState(false);
  const [rentincdropdownOpen, setrentincDropdownOpen] = React.useState(false);
  const [rentdropdownOpen1, setrentDropdownOpen1] = React.useState(false);
  const [rentdropdownOpen2, setrentDropdownOpen2] = React.useState(false);
  const [rentdropdownOpen3, setrentDropdownOpen3] = React.useState(false);
  const [selectAccountDropDown, setSelectAccountDropDown] =
    React.useState(false);
  const [selectAccountLevelDropDown, setSelectAccountLevelDropDown] =
    React.useState(false);
  const [AddBankAccountDialogOpen, setAddBankAccountDialogOpen] =
    useState(false);
  const [selectFundTypeDropDown, setSelectFundtypeDropDown] =
    React.useState(false);
  // const [bankdropdownOpen, setbankDropdownOpen] = React.useState(false);

  const [openTenantsDialog, setOpenTenantsDialog] = useState(false);
  const [openOneTimeChargeDialog, setOpenOneTimeChargeDialog] = useState(false);
  const [openRecurringDialog, setOpenRecurringDialog] = useState(false);
  // const [openSplitRentDialog, setOpenSplitRentDialog] = useState(false);
  const [rentincdropdownOpen1, setrentincDropdownOpen1] = React.useState(false);
  const [rentincdropdownOpen2, setrentincDropdownOpen2] = React.useState(false);
  const [rentincdropdownOpen3, setrentincDropdownOpen3] = React.useState(false);
  const [rentincdropdownOpen4, setrentincDropdownOpen4] = React.useState(false);

  const [showTenantTable, setShowTenantTable] = useState(false);

  const [selectedAgent, setSelectedAgent] = useState("");

  const [agentdropdownOpen, setagentDropdownOpen] = React.useState(false);
  // const [selectedAccountLevel, setselectedAccountLevel] = useState("");
  const [agentData, setAgentData] = useState([]);

  const [collapseper, setCollapseper] = useState(false);
  const [collapsecont, setCollapsecont] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Tenant");
  // const [selectedValue, setSelectedValue] = useState(null);
  const [showForm, setShowForm] = useState("Tenant");

  const [accountNames, setAccountNames] = useState([]);
  const [RecAccountNames, setRecAccountNames] = useState([]);
  const [oneTimeCharges, setOneTimeCharges] = useState([]);
  const [accountTypeName, setAccountTypeName] = useState([]);
  // const [selectedProp, setSelectedProp] = useState("");
  const [propertyData, setPropertyData] = useState([]);

  const [userdropdownOpen, setuserDropdownOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [selectedTenants, setSelectedTenants] = useState([]);

  const [toggleApiCall, setToggleApiCall] = useState(false);

  const toggle = () => setagentDropdownOpen((prevState) => !prevState);
  const toggle1 = () =>
    setSelectAccountLevelDropDown((prevState) => !prevState);
  const toggle2 = () => setLeaseDropdownOpen((prevState) => !prevState);
  const toggle3 = () => setrentDropdownOpen((prevState) => !prevState);
  const toggle4 = () => setrentincDropdownOpen((prevState) => !prevState);
  const toggle5 = () => setrentDropdownOpen1((prevState) => !prevState);
  const toggle6 = () => setrentDropdownOpen2((prevState) => !prevState);
  const toggle7 = () => setrentDropdownOpen3((prevState) => !prevState);
  const toggle8 = () => setSelectAccountDropDown((prevState) => !prevState);
  const toggle9 = () => setuserDropdownOpen((prevState) => !prevState);
  const toggle10 = () => setSelectFundtypeDropDown((prevState) => !prevState);

  const handleClick = (event) => {
    setrentincDropdownOpen1((current) => !current);
  };

  const handleChange = () => {
    setShowTenantTable(!showTenantTable);
  };

  const handleClick1 = (event) => {
    setrentincDropdownOpen2((current) => !current);
  };

  const handleClick2 = (event) => {
    setrentincDropdownOpen3((current) => !current);
  };

  const handleClick3 = (event) => {
    setrentincDropdownOpen4((current) => !current);
  };

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent.agent_name);
  };

  const handleClickOpenOneTimeCharge = () => {
    setOpenOneTimeChargeDialog(true);
  };

  const handleClickOpenRecurring = () => {
    setOpenRecurringDialog(true);
  };

  const toggleAddBankDialog = () => {
    setAddBankAccountDialogOpen((prevState) => !prevState);
  };
  const handleCloseDialog = () => {
    setAddBankAccountDialogOpen(false);
  };
  const handleClose = () => {
    setOpenTenantsDialog(false);
    setOpenOneTimeChargeDialog(false);
    setOpenRecurringDialog(false);
    // setOpenSplitRentDialog(false);
  };

  const toggleper = () => {
    setCollapseper(!collapseper);
  };

  const togglecont = () => {
    setCollapsecont(!collapsecont);
  };

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setShowForm(true);
  // };

  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  // console.log(selectedPropertyType, "selectedPropertyType")
  const handlePropertyTypeSelect = (propertyType) => {
    setSelectedPropertyType(propertyType);
    // localStorage.setItem("propertyType", propertyType);
  };

  const [selectedLeaseType, setselectedLeaseType] = useState("");

  const handleLeaseTypeSelect = (leasetype) => {
    setselectedLeaseType(leasetype);
    // localStorage.setItem("leasetype", leasetype);
  };

  const [selectedRentCycle, setselectedRentCycle] = useState("");
  const handleselectedRentCycle = (rentcycle) => {
    setselectedRentCycle(rentcycle);
    // localStorage.setItem("leasetype", leasetype);
  };

  const [selectedAccount, setselectedAccount] = useState("");
  const hadleselectedAccount = (account) => {
    setselectedAccount(account);
    // localStorage.setItem("leasetype", leasetype);
  };

  const [selectedOneTimeAccount, setselectedOneTimeAccount] = useState("");
  const hadleselectedOneTimeAccount = (account) => {
    setselectedOneTimeAccount(account);
    // localStorage.setItem("leasetype", leasetype);
  };

  const [selectedRecuringAccount, setselectedRecuringAccount] = useState("");
  const hadleselectedRecuringAccount = (account) => {
    setselectedRecuringAccount(account);
    // localStorage.setItem("leasetype", leasetype);
  };

  const [selectedFrequency, setselectedFrequency] = useState("");
  const hadleselectedFrequency = (frequency) => {
    setselectedFrequency(frequency);
    // localStorage.setItem("leasetype", leasetype);
  };

  const [selectedAccountType, setselectedAccountType] = useState("");
  const hadleselectedAccountType = (frequency) => {
    setselectedAccountType(frequency);
    // localStorage.setItem("leasetype", leasetype);
  };

  const [selectedAccountLevel, setselectedAccountLevel] = useState("");
  const hadleselectedAccountLevel = (level) => {
    setselectedAccountLevel(level);
  };

  const [selectedFundType, setselectedFundType] = useState("");
  const hadleselectedFundType = (level) => {
    setselectedFundType(level);
  };

  const handleCloseButtonClick = () => {
    // Use history.push to navigate to the PropertiesTable page
    navigate("../TenantsTable");
  };

  const handleAddTenant = () => {
    if (selectedTenants.length === 0) {
      const newTenantDetails = {
        firstName: leaseFormik.values.tenant_firstName,
        lastName: leaseFormik.values.tenant_lastName,
        mobileNumber: leaseFormik.values.tenant_mobileNumber,
      };
      // setTenantData(newTenantDetails);
      setSelectedTenantData(newTenantDetails);
      swal("Success!", "New tenant added successfully", "success");
    } else {
      setSelectedTenants([]);
      const selectedTenant = selectedTenants[0];
      console.log(selectedTenants, "selectedTenants");
      const tenantParts = selectedTenant.split(" ");
      leaseFormik.setFieldValue("tenant_firstName", tenantParts[0] || "");
      leaseFormik.setFieldValue("tenant_lastName", tenantParts[1] || "");
      leaseFormik.setFieldValue("tenant_mobileNumber", tenantParts[2] || "");
      leaseFormik.setFieldValue("tenant_email", tenantParts[3] || "");
      leaseFormik.setFieldValue("textpayer_id", tenantParts[4] || "");
      leaseFormik.setFieldValue("birth_date", tenantParts[5] || "");
      leaseFormik.setFieldValue("comments", tenantParts[6] || "");
      leaseFormik.setFieldValue("contact_name", tenantParts[7] || "");
      leaseFormik.setFieldValue("relationship_tenants", tenantParts[8] || "");
      leaseFormik.setFieldValue("email", tenantParts[9] || "");
      leaseFormik.setFieldValue("emergency_PhoneNumber", tenantParts[10] || "");
      leaseFormik.setFieldValue("tenant_password", tenantParts[11] || "");
      leaseFormik.setFieldValue("tenant_workNumber", tenantParts[12] || "");
      leaseFormik.setFieldValue("alternate_email", tenantParts[13] || "");

      const tenantDetails = {
        firstName: tenantParts[0],
        lastName: tenantParts[1],
        mobileNumber: tenantParts[2],
        // textpayerid: tenantParts[3],
        // birthdate: tenantParts[4],
        // comments: tenantParts[5],
        // contactname: tenantParts[7],
        // realationwithtenants: tenantParts[8],
        // email: tenantParts[8],
        // realationwithtenants: tenantParts[8],

        // Add other details as needed
      };
      // setTenantData(tenantDetails);
      setSelectedTenantData(tenantDetails);

      swal("Success!", "Tenant details Added", "success");
    }
  };

  const handleAddCosigner = () => {
    const newCosigner = {
      firstName: leaseFormik.values.cosigner_firstName,
      lastName: leaseFormik.values.cosigner_lastName,
      mobileNumber: leaseFormik.values.cosigner_mobileNumber,
    };
    setCosignerData(newCosigner);
    swal("Success!", "Cosigner added successfully", "success");
  };

  const handleAddRecurring = () => {
    const newRecurring = {
      recuring_amount: leaseFormik.values.recuring_amount,
      recuring_account: leaseFormik.values.recuring_account,
      recuringnextDue_date: leaseFormik.values.recuringnextDue_date,
      recuringmemo: leaseFormik.values.recuringmemo,
      recuringfrequency: leaseFormik.values.recuringfrequency,
    };
    setRecurringData(newRecurring);
    swal("Success!", "Recurring added successfully", "success");
  };

  const handleAddOneTime = () => {
    const newOneTime = {
      onetime_amount: leaseFormik.values.onetime_amount,
      onetime_account: leaseFormik.values.onetime_account,
      onetime_Due_date: leaseFormik.values.onetime_Due_date,
      onetime_memo: leaseFormik.values.onetime_memo,
    };
    setOneTimeData(newOneTime);
    swal("Success!", "One Time added successfully", "success");
  };

  const handleTenantDelete = () => {
    // setTenantData({});
    setSelectedTenantData({});
    leaseFormik.setValues({
      tenant_firstName: "",
      tenant_lastName: "",
      tenant_mobileNumber: "",
    });
  };

  const handleCosignerDelete = () => {
    setCosignerData({});
    leaseFormik.setValues({
      cosigner_firstName: "",
      cosigner_lastName: "",
      cosigner_mobileNumber: "",
    });
  };

  const handleRecurringDelete = () => {
    setRecurringData({});
    leaseFormik.setValues({
      recuring_amount: "",
      recuring_account: "",
      recuringnextDue_date: "",
      recuringmemo: "",
      recuringfrequency: "",
    });
  };

  const handleOnetimeDelete = () => {
    setOneTimeData({});
    leaseFormik.setValues({
      onetime_amount: "",
      onetime_account: "Select",
      onetime_Due_date: "",
      onetime_memo: "",
    });
  };
  // Define a function to handle closing the dialog and navigating
  const handleDialogClose = () => {
    // navigate("/admin/Leaseing");
    setOpenTenantsDialog(false);
    setOpenOneTimeChargeDialog(false);
    setOpenRecurringDialog(false);
    // setOpenSplitRentDialog(false);
  };

  // <button type="submit" className="btn btn-primary" onClick={handleDialogClose}>
  //   Add Tenant
  // </button>

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setselectedAccountLevel(value);
  };

  const [file, setFile] = useState("");
  let navigate = useNavigate();

  // const handleSubmit = async (values) => {
  //   values["rental_adress"] = selectedPropertyType;
  //   values["leasing_agent"] = selectedAgent;
  //   values["account_name "] = selectedAccount;
  //   values["lease_type"] = selectedLeaseType;
  //   values["rent_cycle"] = selectedRentCycle;
  //   values["account"] = selectedAccount;
  //   values["onetime_account"] = selectedOneTimeAccount;
  //   values["recuringfrequency"] = selectedFrequency;
  //   values["upload_file"] = file;
  //   values["recuring_account"] = selectedRecuringAccount;

  //   console.log(values, "values");
  //   try {
  //     // values["property_type"] = localStorage.getItem("propertyType");
  //     const res = await axios.post(
  //       "http://localhost:4000/tenant/tenant",
  //       values
  //     );
  //     if (res.data.statusCode === 200) {
  //       swal("", res.data.message, "success");
  //       navigate("/admin/TenantsTable");
  //     } else {
  //       swal("", res.data.message, "error");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAdd = async (values) => {
    values["account_name "] = selectedAccount;
    values["account_type"] = selectedAccountType;
    values["parent_account"] = selectedAccountLevel;
    values["fund_type"] = selectedFundType;

    console.log(values, "values");
    try {
      // values["property_type"] = localStorage.getItem("propertyType");
      const res = await axios.post(
        "http://localhost:4000/addaccount/addaccount",
        values
      );
      if (res.data.statusCode === 200) {
        swal("", res.data.message, "success");
        navigate("/admin/Leaseing");
      } else {
        swal("", res.data.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const fileData = (file) => {
  //   //setImgLoader(true);
  //   const dataArray = new FormData();
  //   dataArray.append("b_video", file);

  //   let url = "https://cdn.brandingprofitable.com/image_upload.php/";
  //   axios
  //     .post(url, dataArray, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       //setImgLoader(false);
  //       const imagePath = res?.data?.iamge_path; // Correct the key to "iamge_path"
  //       console.log(imagePath, "imagePath");
  //       setFile(imagePath);
  //     })
  //     .catch((err) => {
  //       //setImgLoader(false);
  //       console.log("Error uploading image:", err);
  //     });
  // };

  const fileData = (files) => {
    //setImgLoader(true);
    // console.log(files, "file");
    const filesArray = [...files];

    if (filesArray.length <= 10 && file.length === 0) {
      setFile([...filesArray]);
    } else if (
      file.length >= 0 &&
      file.length <= 10 &&
      filesArray.length + file.length > 10
    ) {
      setFile([...file]);
    } else {
      setFile([...file, ...filesArray]);
    }

    // console.log(file, "fileanaadsaa");

    const dataArray = new FormData();
    dataArray.append("b_video", files);

    let url = "https://cdn.brandingprofitable.com/image_upload.php/";
    axios
      .post(url, dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        //setImgLoader(false);
        const imagePath = res?.data?.iamge_path; // Correct the key to "iamge_path"
        console.log(imagePath, "imagePath");
        // setFile(imagePath);
      })
      .catch((err) => {
        //setImgLoader(false);
        console.log("Error uploading image:", err);
      });
  };
  const deleteFile = (index) => {
    const newFile = [...file];
    newFile.splice(index, 1);
    setFile(newFile);
  };

  const handleOpenFile = (item) => {
    // console.log(file,"fike")
    // const fileToOpen = file.filter((file) => {
    //   return file.name === item.name
    // })
    // console.log(fileToOpen, "fileToOpen");
    console.log(item, "item");
    const url = URL.createObjectURL(item);
    window.open(url, "_blank");
  };

  useEffect(() => {
    // Make an HTTP GET request to your Express API endpoint
    fetch("http://localhost:4000/rentals/property")
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

  const fetchingAccountNames = async () => {
    console.log("fetching account names");
    fetch("http://localhost:4000/addaccount/find_accountname")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          // console.log(data.data,'Data from adding the account'); // Add this line to check the data
          setAccountNames(data.data);
        } else {
          // Handle error
          console.error("Error:", data.message);
        }
      })
      .catch((error) => {
        // Handle network error
        console.error("Network error:", error);
      });
  };

  const fetchingRecAccountNames = async () => {
    console.log("fetching rec accounr names");
    fetch("http://localhost:4000/recurringAcc/find_accountname")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          // console.log(data.data,'Data from adding the account'); // Add this line to check the data
          setRecAccountNames(data.data);
        } else {
          // Handle error
          console.error("Error:", data.message);
        }
      })
      .catch((error) => {
        // Handle network error
        console.error("Network error:", error);
      });
  };

  const fetchingOneTimeCharges = async () => {
    console.log("fetcjhiine pne rime charges");
    fetch("http://localhost:4000/onetimecharge/find_accountname")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          // console.log(data.data,'Data from adding the account'); // Add this line to check the data
          setOneTimeCharges(data.data);
        } else {
          // Handle error
          console.error("Error:", data.message);
        }
      });
  };

  const AddNewAccountName = async (accountName) => {
    toggleAddBankDialog();
    setAccountTypeName(accountName);
  };

  useEffect(() => {
    // Make an HTTP GET request to your Express API endpoint
    fetchingAccountNames();
    fetchingRecAccountNames();
    fetchingOneTimeCharges();
  }, [toggleApiCall]);

  // console.log(accountNames, "accountNames after handle add");

  useEffect(() => {
    // Make an HTTP GET request to your Express API endpoint
    fetchingAccountNames();
    fetchingRecAccountNames();
    fetchingOneTimeCharges();
  }, []);

  // useEffect(() => {
  //   // Make an HTTP GET request to your Express API endpoint
  //   fetch("http://localhost:4000/addaccount/find_accountname")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.statusCode === 200) {
  //         console.log(data.data); // Add this line to check the data
  //         setAccountNames(data.data);
  //       } else {
  //         // Handle error
  //         console.error("Error:", data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle network error
  //       console.error("Network error:", error);
  //     });
  // }, []);

  useEffect(() => {
    // Make an HTTP GET request to your Express API endpoint
    fetch("http://localhost:4000/addagent/find_agentname")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setAgentData(data.data);
          console.log(data);
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

  const handleCheckboxChange = (event, tenantInfo, mobileNumber) => {
    if (checkedCheckbox === mobileNumber) {
      // If the checkbox is already checked, uncheck it
      setCheckedCheckbox(null);
    } else {
      // Otherwise, check the checkbox
      setCheckedCheckbox(mobileNumber);
    }

    // Toggle the selected tenants in the state when their checkboxes are clicked
    if (event.target.checked) {
      setSelectedTenants([tenantInfo, ...selectedTenants]);
    } else {
      setSelectedTenants(
        selectedTenants.filter((tenant) => tenant !== tenantInfo)
      );
    }
  };

  useEffect(() => {
    // Make an HTTP GET request to your Express API endpoint
    fetch("http://localhost:4000/tenant/tenant")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setTenantData(data.data);
          console.log("here is my data", data.data);
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

  let accountFormik = useFormik({
    initialValues: {
      // add account
      account_name: "",
      account_type: "",
      parent_account: "",
      account_number: "",
      fund_type: "",
      cash_flow: "",
      notes: "",

      //account level (sub account)
    },
    validationSchema: yup.object({
      account_name: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleAdd(values);
      console.log(values, "values");
    },
  });

  let leaseFormik = useFormik({
    initialValues: {
      // add Tenants

      rental_adress: "",
      lease_type: "",
      start_date: "",
      end_date: "",
      leasing_agent: "",
      rent_cycle: "",
      amount: "",
      account: "",
      nextDue_date: "",
      memo: "",

      birth_date: "",
      textpayer_id: "",
      comments: "",

      contact_name: "",
      relationship_tenants: "",
      email: "",
      emergency_PhoneNumber: "",

      tenant_firstName: "",
      tenant_lastName: "",
      tenant_mobileNumber: "",
      tenant_email: "",
      tenant_password: "",
      tenant_workNumber: "",
      alternate_email: "",

      Due_date: "",
      Security_amount: "",
      // add cosigner

      cosigner_firstName: "",
      cosigner_lastName: "",
      cosigner_mobileNumber: "",
      cosigner_workNumber: "",
      cosigner_homeNumber: "",
      cosigner_faxPhoneNumber: "",
      cosigner_email: "",
      cosigner_alternateemail: "",
      cosigner_streetAdress: "",
      cosigner_city: "",
      cosigner_state: "",

      cosigner_country: "",
      cosigner_postalcode: "",

      // add recuring charge

      recuring_amount: "",
      recuring_account: "",
      recuringnextDue_date: "",
      recuringmemo: "",
      recuringfrequency: "",

      //add one time charge

      onetime_amount: "",
      onetime_account: "",
      onetime_Due_date: "",
      onetime_memo: "",

      // add account
      account_name: "",
    },
    validationSchema: yup.object({
      // property_type: yup.string().required("Required"),
      // lease_type: yup.string().required("Required"),
      // tenant_firstName: yup.string().required("Required"),
      // tenant_lastName: yup.string().required("Required"),
      // tenant_mobileNumber: yup.string().required("Required"),
      // tenant_email: yup.string().required("Required"),
      tenant_password: yup
        .string()
        // .required("No Password Provided")
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

  const [leasingData, setleasingData] = useState(null);

  // Fetch vendor data if editing an existing vendor
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/tenant/tenant_summary/${id}`)
        .then((response) => {
          const laesingdata = response.data.data;
          setleasingData(leasingData);
          console.log(laesingdata);

          const formattedStartDate = laesingdata.start_date
            ? new Date(laesingdata.start_date).toISOString().split("T")[0]
            : "";
          const formattedEndDate = laesingdata.end_date
            ? new Date(laesingdata.end_date).toISOString().split("T")[0]
            : "";
          const formattedNextDueDate = laesingdata.nextDue_date
            ? new Date(laesingdata.nextDue_date).toISOString().split("T")[0]
            : "";

          const formattedBirthDate = laesingdata.birth_date
            ? new Date(laesingdata.birth_date).toISOString().split("T")[0]
            : "";

          const formattedDueDate = laesingdata.Due_date
            ? new Date(laesingdata.Due_date).toISOString().split("T")[0]
            : "";

          const formattedRecuringNextDueDate = laesingdata.recuringnextDue_date
            ? new Date(laesingdata.recuringnextDue_date)
                .toISOString()
                .split("T")[0]
            : "";

          const formattedOnetimeDueDate = laesingdata.onetime_Due_date
            ? new Date(laesingdata.onetime_Due_date).toISOString().split("T")[0]
            : "";

          setSelectedPropertyType(laesingdata.rental_adress || "Select");
          setselectedLeaseType(laesingdata.lease_type || "Select");
          setselectedRentCycle(laesingdata.rent_cycle || "Select");
          setselectedAccount(laesingdata.account || "Select");
          setselectedAccount(laesingdata.account_name || "Select");
          setselectedOneTimeAccount(laesingdata.onetime_account || "Select");
          setselectedRecuringAccount(laesingdata.recuring_account);
          setselectedFrequency(laesingdata.recuringfrequency || "Select");
          setselectedAccountType(laesingdata.account_type || "Select");
          setselectedAccountLevel(laesingdata.parent_account || "Select");
          setselectedFundType(laesingdata.fund_type || "Select");
          setSelectedAgent(laesingdata.leasing_agent || "Select");
          // const arrayOfObjects = laesingdata.upload_file.map((innerArray) => innerArray[0])

          // setFile(arrayOfObjects || "Select");
          console.log(laesingdata.upload_file, "upload_file");
          const data = laesingdata.upload_file.map((item) => {
            return {
              name: item[0],
            };
          });
          console.log(data, "data");
          setFile(data);
          leaseFormik.setValues({
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            amount: laesingdata.amount || "",
            nextDue_date: formattedNextDueDate,
            memo: laesingdata.memo || "",
            birth_date: formattedBirthDate,
            textpayer_id: laesingdata.textpayer_id || "",
            comments: laesingdata.comments || "",
            contact_name: laesingdata.contact_name || "",
            relationship_tenants: laesingdata.relationship_tenants || "",
            email: laesingdata.email || "",
            emergency_PhoneNumber: laesingdata.emergency_PhoneNumber || "",
            Due_date: formattedDueDate,
            amount: laesingdata.amount || "",
            tenant_firstName: laesingdata.tenant_firstName || "",
            tenant_lastName: laesingdata.tenant_lastName || "",
            tenant_mobileNumber: laesingdata.tenant_mobileNumber || "",
            tenant_email: laesingdata.tenant_email || "",
            tenant_password: laesingdata.tenant_password || "",
            tenant_workNumber: laesingdata.tenant_workNumber || "",
            alternate_email: laesingdata.alternate_email || "",
            cosigner_firstName: laesingdata.cosigner_firstName || "",
            cosigner_lastName: laesingdata.cosigner_lastName || "",
            cosigner_mobileNumber: laesingdata.cosigner_mobileNumber || "",
            cosigner_workNumber: laesingdata.cosigner_workNumber || "",
            cosigner_homeNumber: laesingdata.cosigner_homeNumber || "",
            cosigner_faxPhoneNumber: laesingdata.cosigner_faxPhoneNumber || "",
            cosigner_email: laesingdata.cosigner_email || "",
            cosigner_alternateemail: laesingdata.cosigner_alternateemail || "",
            cosigner_streetAdress: laesingdata.cosigner_streetAdress || "",
            cosigner_city: laesingdata.cosigner_city || "",
            cosigner_state: laesingdata.cosigner_state || "",
            cosigner_country: laesingdata.cosigner_country || "",
            cosigner_postalcode: laesingdata.cosigner_postalcode || "",
            recuring_amount: laesingdata.recuring_amount || "",
            recuringnextDue_date: formattedRecuringNextDueDate,
            recuringmemo: laesingdata.recuringmemo || "",
            onetime_amount: laesingdata.onetime_amount || "",
            onetime_Due_date: formattedOnetimeDueDate,
            onetime_memo: laesingdata.onetime_memo || "",
            Security_amount: laesingdata.Security_amount || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching vendor data:", error);
        });
    }
  }, [id]);
  const handleSubmit = async (values) => {
    console.log(file, "values");

    if (Array.isArray(file)) {
      const arrayOfNames = file.map((item) => {
        return item.name;
      });
      console.log("array of names", arrayOfNames);
      values["upload_file"] = arrayOfNames;
    } else {
      console.error("file is not an array");

      console.log(values, "values");
    }

    // if(Array.isArray(file)){

    //   const arrayOfObject = file.map((item) => {
    //     return {
    //       name: item.name,
    //       type: item.type,
    //       size: item.size,
    //       lastModified: item.lastModified,
    //       lastModifiedDate: item.lastModifiedDate,
    //       webkitRelativePath: item.webkitRelativePath,
    //       // file: item
    //     };
    //   })
    //   console.log(arrayOfObject, "array of object");

    //   values["upload_file"] = arrayOfObject;

    // }
    values["rental_adress"] = selectedPropertyType;
    values["leasing_agent"] = selectedAgent;
    values["account_name "] = selectedAccount;
    values["lease_type"] = selectedLeaseType;
    values["rent_cycle"] = selectedRentCycle;
    values["account"] = selectedAccount;
    values["onetime_account"] = selectedOneTimeAccount;
    values["recuringfrequency"] = selectedFrequency;
    values["recuring_account"] = selectedRecuringAccount;

    try {
      console.log(id, "id from parameter");
      if (id === undefined) {
        const res = await axios.post(
          "http://localhost:4000/tenant/tenant",
          values
        );
        if (res.data.statusCode === 200) {
          swal("", res.data.message, "success");
          navigate("/admin/TenantsTable");
        } else {
          swal("", res.data.message, "error");
        }
        handleResponse(res);
      } else {
        const editUrl = `http://localhost:4000/tenant/tenant/${id}`;
        console.log(values, "updated values");
        const res = await axios.put(editUrl, values);
        handleResponse(res);
      }
      // values["property_type"] = localStorage.getItem("propertyType");
    } catch (error) {
      console.log(error);
    }
  };

  function handleResponse(response) {
    if (response.status === 200) {
      navigate("/admin/TenantsTable");
      swal(
        "Success!",
        id ? "Tenant updated successfully" : "Tenant added successfully!",
        "success"
      );
    } else {
      alert(response.data.message);
    }
  }
  return (
    <>
      <LeaseHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card
              className="bg-secondary shadow"
              onSubmit={leaseFormik.handleSubmit}
            >
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{id ? "Edit Lease" : "New Lease"}</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">Signature</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            Signature Status
                          </label>
                          <br />
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <ToggleButtonGroup
                              color="primary"
                              value={alignment}
                              exclusive
                              onChange={handleChange}
                              aria-label="Platform"
                              style={{ width: "100%" }}
                            >
                              <ToggleButton
                                value="Signed"
                                style={{
                                  width: "100rem",
                                  textTransform: "capitalize",
                                }}
                              >
                                Signed
                              </ToggleButton>
                              <ToggleButton
                                value="Unsigned"
                                style={{
                                  width: "100rem",
                                  textTransform: "capitalize",
                                }}
                              >
                                Unsigned
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <br />

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-property"
                        >
                          Property*
                        </label>
                        <FormGroup>
                          <Dropdown isOpen={userdropdownOpen} toggle={toggle9}>
                            <DropdownToggle caret style={{ width: "100%" }}>
                              {selectedPropertyType
                                ? selectedPropertyType
                                : "Select Property"}
                            </DropdownToggle>
                            <DropdownMenu
                              style={{
                                width: "100%",
                                maxHeight: "200px",
                                overflowY: "auto",
                              }}
                            >
                              <DropdownItem value="">Select</DropdownItem>
                              {propertyData.map((property) => (
                                <DropdownItem
                                  key={property._id}
                                  onClick={() =>
                                    handlePropertyTypeSelect(
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
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            Lease Type
                          </label>
                          <br />
                          <Dropdown isOpen={leasedropdownOpen} toggle={toggle2}>
                            <DropdownToggle caret style={{ width: "100%" }}>
                              {selectedLeaseType
                                ? selectedLeaseType
                                : "Select Lease"}{" "}
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu
                              style={{ width: "100%" }}
                              name="lease_type"
                              onBlur={leaseFormik.handleBlur}
                              onChange={leaseFormik.handleChange}
                              value={leaseFormik.values.lease_type}
                            >
                              {leaseFormik.touched.lease_type &&
                              leaseFormik.errors.lease_type ? (
                                <div style={{ color: "red" }}>
                                  {leaseFormik.errors.lease_type}
                                </div>
                              ) : null}
                              <DropdownItem
                                onClick={() => handleLeaseTypeSelect("Fixed")}
                              >
                                Fixed
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleLeaseTypeSelect("Fixed wirollover")
                                }
                              >
                                Fixed wirollover
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleLeaseTypeSelect("At-will")}
                              >
                                At-will
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-unitadd"
                          >
                            Start Date *
                          </label>
                          {/* <Input
                            className="form-control-alternative"
                            id="input-unitadd"
                            placeholder="3000"
                            type="date"
                            name="start_date"
                            onBlur={leaseFormik.handleBlur}
                            onChange={leaseFormik.handleChange}
                            value={leaseFormik.values.start_date}
                          /> */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="form-control-alternative"
                              slotProps={{ textField: { size: 'small' } }}
                              name="start_date"
                              id="input-unitadd"
                              placeholder="3000"
                              dateFormat="MM-dd-yyyy"
                              views={['year', 'month', 'day']}
                              onBlur={leaseFormik.handleBlur}
                              selected={leaseFormik.values.start_date} // Use 'selected' prop instead of 'value'
                              onChange={(date) => {
                                leaseFormik.setFieldValue("start_date", date); // Update the Formik field value
                              }}
                            />
                          </LocalizationProvider>
                          {leaseFormik.touched.start_date &&
                          leaseFormik.errors.start_date ? (
                            <div style={{ color: "red" }}>
                              {leaseFormik.errors.start_date}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      &nbsp; &nbsp; &nbsp;
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-unitadd"
                          >
                            End Date *
                          </label>
                          {/* <Input
                            className="form-control-alternative"
                            id="input-unitadd"
                            placeholder="3000"
                            type="date"
                            name="end_date"
                            onBlur={leaseFormik.handleBlur}
                            onChange={leaseFormik.handleChange}
                            value={leaseFormik.values.end_date}
                          /> */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="form-control-alternative"
                              name="end_date"
                              id="input-unitadd"
                              views={['year', 'month', 'day']}
                              slotProps={{ textField: { size: 'small' } }}
                              placeholder="3000"
                              dateFormat="MM-dd-yyyy"
                              onBlur={leaseFormik.handleBlur}
                              selected={leaseFormik.values.end_date} // Use 'selected' prop instead of 'value'
                              onChange={(date) => {
                                leaseFormik.setFieldValue("end_date", date); // Update the Formik field value
                              }}
                            />
                          </LocalizationProvider>
                          {leaseFormik.touched.end_date &&
                          leaseFormik.errors.end_date ? (
                            <div style={{ color: "red" }}>
                              {leaseFormik.errors.end_date}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-property"
                        >
                          Leasing Agent
                        </label>
                        <FormGroup>
                          <Dropdown isOpen={agentdropdownOpen} toggle={toggle}>
                            <DropdownToggle caret style={{ width: "100%" }}>
                              {selectedAgent ? selectedAgent : "Select Agent"}{" "}
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu style={{ width: "100%" }}>
                              <DropdownItem value="">Select</DropdownItem>
                              {agentData.map((agent) => (
                                <DropdownItem
                                  key={agent._id}
                                  onClick={() => handleAgentSelect(agent)}
                                >
                                  {agent.agent_name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Tenants and Cosigner
                  </h6>
                  <div className="pl-lg-4"></div>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <span
                          onClick={() => {
                            setShowTenantTable(false);
                            setOpenTenantsDialog(true);
                          }}
                          style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            fontFamily: "monospace",
                            color: "blue",
                          }}
                        >
                          <b style={{ fontSize: "20px" }}>+</b> Add Tenant or
                          Consigner
                        </span>

                        <Dialog open={openTenantsDialog} onClose={handleClose}>
                          <DialogTitle style={{ background: "#F0F8FF" }}>
                            Add tenant or cosigner
                          </DialogTitle>
                          <DialogContent
                            style={{ width: "100%", maxWidth: "500px" }}
                          >
                            <div
                              style={{
                                // display: "flex",
                                alignItems: "center",
                                margin: "30px 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <ToggleButtonGroup
                                  color="primary"
                                  value={alignment}
                                  exclusive
                                  onChange={handleChange}
                                  aria-label="Platform"
                                  style={{ width: "100%" }}
                                >
                                  <ToggleButton
                                    value="Tenant"
                                    onClick={() => {
                                      setSelectedOption("Tenant");
                                      setShowForm(true);
                                    }}
                                    style={{
                                      width: "15rem",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Tenant
                                  </ToggleButton>
                                  <ToggleButton
                                    value="Cosigner"
                                    onClick={() => {
                                      setSelectedOption("Cosigner");
                                      setShowForm(true);
                                    }}
                                    style={{
                                      width: "15rem",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Cosigner
                                  </ToggleButton>
                                </ToggleButtonGroup>
                              </div>
                              <br />

                              {showForm && (
                                <div>
                                  {selectedOption === "Tenant" && (
                                    <div className="tenant">
                                      <div>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Checkbox
                                            onChange={handleChange}
                                            style={{ marginRight: "10px" }}
                                            checked={showTenantTable === true}
                                          />
                                          <label className="form-control-label">
                                            Choose an existing tenant
                                          </label>
                                        </div>
                                        <br />
                                      </div>

                                      {showTenantTable &&
                                        tenantData.length > 0 && (
                                          <div className="TenantTable">
                                            <table
                                              style={{
                                                width: "100%",
                                                borderCollapse: "collapse",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th>Tenant Name</th>
                                                  <th>Select</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {Array.isArray(tenantData) &&
                                                  tenantData?.map(
                                                    (tenant, index) => (
                                                      <tr
                                                        key={index}
                                                        style={{
                                                          border:
                                                            "1px solid #ddd",
                                                        }}
                                                      >
                                                        <td>
                                                          {
                                                            tenant.tenant_firstName
                                                          }
                                                          {
                                                            tenant.tenant_lastName
                                                          }
                                                        </td>
                                                        <td>
                                                          {/* <FormControlLabel
                                                          control={  */}
                                                          <Checkbox
                                                            type="checkbox"
                                                            name="tenant"
                                                            id={
                                                              tenant.tenant_mobileNumber
                                                            }
                                                            checked={
                                                              tenant.tenant_mobileNumber ===
                                                              checkedCheckbox
                                                            }
                                                            onChange={(
                                                              event
                                                            ) => {
                                                              setCheckedCheckbox(
                                                                tenant.tenant_mobileNumber
                                                              );
                                                              const tenantInfo = `${
                                                                tenant.tenant_firstName ||
                                                                ""
                                                              } ${
                                                                tenant.tenant_lastName ||
                                                                ""
                                                              } ${
                                                                tenant.tenant_mobileNumber ||
                                                                ""
                                                              } ${
                                                                tenant.tenant_email ||
                                                                ""
                                                              } ${
                                                                tenant.textpayer_id ||
                                                                ""
                                                              } ${
                                                                tenant.birth_date ||
                                                                ""
                                                              } ${
                                                                tenant.comments ||
                                                                ""
                                                              } ${
                                                                tenant.contact_name ||
                                                                ""
                                                              } ${
                                                                tenant.relationship_tenants ||
                                                                ""
                                                              } ${
                                                                tenant.email ||
                                                                ""
                                                              } ${
                                                                tenant.emergency_PhoneNumber ||
                                                                ""
                                                              } ${
                                                                tenant.tenant_password ||
                                                                ""
                                                              } ${
                                                                tenant.tenant_workNumber ||
                                                                ""
                                                              } ${
                                                                tenant.alternate_email ||
                                                                ""
                                                              }`;
                                                              handleCheckboxChange(
                                                                event,
                                                                tenantInfo,
                                                                tenant.tenant_mobileNumber
                                                              );
                                                            }}
                                                            // checked={selectedTenants.includes(
                                                            //   `${
                                                            //     tenant.tenant_firstName ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.tenant_lastName ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.tenant_mobileNumber ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.tenant_email ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.textpayer_id ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.birth_date ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.comments ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.contact_name ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.relationship_tenants ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.email ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.emergency_PhoneNumber ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.tenant_password ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.tenant_workNumber ||
                                                            //     ""
                                                            //   } ${
                                                            //     tenant.alternate_email ||
                                                            //     ""
                                                            //   }`
                                                            // )}
                                                          />
                                                          {/* }
                                                          
                                                          /> */}
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                              </tbody>
                                            </table>
                                            <br />
                                          </div>
                                        )}
                                      {!showTenantTable && (
                                        <div
                                          className="TenantDetail"
                                          style={{ margin: "10px 10px" }}
                                        >
                                          <span
                                            style={{
                                              marginBottom: "1rem",
                                              display: "flex",
                                              background: "grey",
                                              cursor: "pointer",
                                            }}
                                          >
                                            &nbsp;Contact information
                                          </span>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            <div
                                              style={{
                                                flex: 1,
                                                marginRight: "10px",
                                              }}
                                            >
                                              <label
                                                className="form-control-label"
                                                htmlFor="tenant_firstName"
                                                // style={{
                                                //   fontFamily: "monospace",
                                                //   fontSize: "14px",
                                                // }}
                                              >
                                                First Name *
                                              </label>
                                              <br />
                                              <Input
                                                id="tenant_firstName"
                                                className="form-control-alternative"
                                                variant="standard"
                                                type="text"
                                                placeholder="First Name"
                                                style={{
                                                  marginRight: "10px",
                                                  flex: 1,
                                                }} // Adjust flex property
                                                name="tenant_firstName"
                                                onBlur={leaseFormik.handleBlur}
                                                onChange={
                                                  leaseFormik.handleChange
                                                }
                                                value={
                                                  leaseFormik.values
                                                    .tenant_firstName
                                                }
                                              />
                                              {leaseFormik.touched
                                                .tenant_firstName &&
                                              leaseFormik.errors
                                                .tenant_firstName ? (
                                                <div style={{ color: "red" }}>
                                                  {
                                                    leaseFormik.errors
                                                      .tenant_firstName
                                                  }
                                                </div>
                                              ) : null}
                                            </div>

                                            <div
                                              style={{
                                                flex: 1,
                                                marginRight: "10px",
                                              }}
                                            >
                                              <label
                                                className="form-control-label"
                                                htmlFor="tenant_lastName"
                                                // style={{
                                                //   fontFamily: "monospace",
                                                //   fontSize: "14px",
                                                // }}
                                              >
                                                Last Name *
                                              </label>
                                              <br />
                                              <Input
                                                id="tenant_lastName"
                                                className="form-control-alternative"
                                                variant="standard"
                                                type="text"
                                                placeholder="Last Name"
                                                style={{
                                                  marginRight: "10px",
                                                  flex: 1,
                                                }} // Adjust flex property
                                                name="tenant_lastName"
                                                onBlur={leaseFormik.handleBlur}
                                                onChange={
                                                  leaseFormik.handleChange
                                                }
                                                value={
                                                  leaseFormik.values
                                                    .tenant_lastName
                                                }
                                              />
                                              {leaseFormik.touched
                                                .tenant_lastName &&
                                              leaseFormik.errors
                                                .tenant_lastName ? (
                                                <div style={{ color: "red" }}>
                                                  {
                                                    leaseFormik.errors
                                                      .tenant_lastName
                                                  }
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br />

                                          <div
                                            style={{
                                              // display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                            }}
                                          >
                                            <div
                                              style={{
                                                flex: 1,
                                                marginRight: "10px",
                                              }}
                                            >
                                              <label
                                                className="form-control-label"
                                                htmlFor="tenant_mobileNumber"
                                                // style={{
                                                //   fontFamily: "monospace",
                                                //   fontSize: "14px",
                                                // }}
                                              >
                                                Phone Number*
                                              </label>
                                              <br />
                                              <Input
                                                id="tenant_mobileNumber"
                                                className="form-control-alternative"
                                                variant="standard"
                                                type="text"
                                                placeholder="phoneNumber"
                                                style={{
                                                  marginRight: "10px",
                                                  flex: 1,
                                                }} // Adjust flex property
                                                name="tenant_mobileNumber"
                                                onBlur={leaseFormik.handleBlur}
                                                onChange={
                                                  leaseFormik.handleChange
                                                }
                                                value={
                                                  leaseFormik.values
                                                    .tenant_mobileNumber
                                                }
                                              />
                                              {leaseFormik.touched
                                                .tenant_mobileNumber &&
                                              leaseFormik.errors
                                                .tenant_mobileNumber ? (
                                                <div style={{ color: "red" }}>
                                                  {
                                                    leaseFormik.errors
                                                      .tenant_mobileNumber
                                                  }
                                                </div>
                                              ) : null}
                                            </div>
                                            {/* <span
                                              onClick={setOpenTenantsDialog}
                                              style={{
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontFamily: "monospace",
                                                color: "blue",
                                              }}
                                            >
                                              <b style={{ fontSize: "20px" }}>
                                                +
                                              </b>{" "}
                                              Add alternative Phone
                                            </span> */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <span
                                                onClick={handleClick}
                                                style={{
                                                  cursor: "pointer",
                                                  fontSize: "14px",
                                                  fontFamily: "monospace",
                                                  color: "blue",
                                                  paddingTop: "3%",
                                                }}
                                              >
                                                <b style={{ fontSize: "20px" }}>
                                                  +
                                                </b>
                                                Add alternative Phone
                                              </span>
                                              {rentincdropdownOpen1 && (
                                                <div
                                                  style={{
                                                    flex: 1,
                                                    marginRight: "10px",
                                                  }}
                                                >
                                                  <label
                                                    className="form-control-label"
                                                    htmlFor="tenant_workNumber"
                                                    style={{
                                                      paddingTop: "3%",
                                                    }}
                                                  >
                                                    Work Number*
                                                  </label>
                                                  <br />
                                                  <Input
                                                    id="tenant_workNumber"
                                                    className="form-control-alternative"
                                                    variant="standard"
                                                    type="text"
                                                    placeholder="Alternative Number"
                                                    style={{
                                                      marginRight: "10px",
                                                      flex: 1,
                                                    }} // Adjust flex property
                                                    name="tenant_workNumber"
                                                    onBlur={
                                                      leaseFormik.handleBlur
                                                    }
                                                    onChange={
                                                      leaseFormik.handleChange
                                                    }
                                                    value={
                                                      leaseFormik.values
                                                        .tenant_workNumber
                                                    }
                                                  />
                                                  {leaseFormik.touched
                                                    .tenant_workNumber &&
                                                  leaseFormik.errors
                                                    .tenant_workNumber ? (
                                                    <div
                                                      style={{ color: "red" }}
                                                    >
                                                      {
                                                        leaseFormik.errors
                                                          .tenant_workNumber
                                                      }
                                                    </div>
                                                  ) : null}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <br />
                                          <div
                                            style={{
                                              // display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                            }}
                                          >
                                            <div
                                              style={{
                                                flex: 1,
                                                marginRight: "10px",
                                              }}
                                            >
                                              <label
                                                className="form-control-label"
                                                htmlFor="tenant_email"
                                                // style={{
                                                //   fontFamily: "monospace",
                                                //   fontSize: "14px",
                                                // }}
                                              >
                                                Email*
                                              </label>
                                              <br />
                                              <Input
                                                id="tenant_email"
                                                className="form-control-alternative"
                                                variant="standard"
                                                type="text"
                                                placeholder="Email"
                                                style={{
                                                  marginRight: "10px",
                                                  flex: 1,
                                                }} // Adjust flex property
                                                name="tenant_email"
                                                onBlur={leaseFormik.handleBlur}
                                                onChange={
                                                  leaseFormik.handleChange
                                                }
                                                value={
                                                  leaseFormik.values
                                                    .tenant_email
                                                }
                                              />
                                              {leaseFormik.touched
                                                .tenant_email &&
                                              leaseFormik.errors
                                                .tenant_email ? (
                                                <div style={{ color: "red" }}>
                                                  {
                                                    leaseFormik.errors
                                                      .tenant_email
                                                  }
                                                </div>
                                              ) : null}
                                            </div>
                                            {/* <span
                                                onClick={setOpenTenantsDialog}
                                                style={{
                                                  cursor: "pointer",
                                                  fontSize: "14px",
                                                  fontFamily: "monospace",
                                                  color: "blue",
                                                  marginLeft: "10px", // Add this to create space between the input and the link
                                                }}
                                              >
                                                <b style={{ fontSize: "20px" }}>
                                                  +
                                                </b>{" "}
                                                Add alternative Email
                                              </span> */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <span
                                                onClick={handleClick1}
                                                style={{
                                                  cursor: "pointer",
                                                  fontSize: "14px",
                                                  fontFamily: "monospace",
                                                  color: "blue",
                                                  paddingTop: "3%", // Add this to create space between the input and the link
                                                }}
                                              >
                                                <b style={{ fontSize: "20px" }}>
                                                  +
                                                </b>
                                                Add alternative Email
                                              </span>
                                              {rentincdropdownOpen2 && (
                                                <div
                                                  style={{
                                                    flex: 1,
                                                    marginRight: "10px",
                                                  }}
                                                >
                                                  <label
                                                    className="form-control-label"
                                                    htmlFor="alternate_email"
                                                    style={{
                                                      paddingTop: "3%",
                                                    }}
                                                  >
                                                    Alternative Email*
                                                  </label>
                                                  <br />
                                                  <Input
                                                    id="tenant_email"
                                                    className="form-control-alternative"
                                                    variant="standard"
                                                    type="text"
                                                    placeholder="Alternative Email"
                                                    style={{
                                                      marginRight: "10px",
                                                      flex: 1,
                                                    }} // Adjust flex property
                                                    name="alternate_email"
                                                    onBlur={
                                                      leaseFormik.handleBlur
                                                    }
                                                    onChange={
                                                      leaseFormik.handleChange
                                                    }
                                                    value={
                                                      leaseFormik.values
                                                        .alternate_email
                                                    }
                                                  />
                                                  {leaseFormik.touched
                                                    .alternate_email &&
                                                  leaseFormik.errors
                                                    .alternate_email ? (
                                                    <div
                                                      style={{ color: "red" }}
                                                    >
                                                      {
                                                        leaseFormik.errors
                                                          .alternate_email
                                                      }
                                                    </div>
                                                  ) : null}
                                                </div>
                                              )}
                                            </div>
                                            <div
                                              style={{
                                                flex: 1,
                                                marginRight: "10px",
                                                marginTop: "20px",
                                              }}
                                            >
                                              <label
                                                className="form-control-label"
                                                htmlFor="tenant_password"
                                                // style={{
                                                //   fontFamily: "monospace",
                                                //   fontSize: "14px",
                                                // }}
                                              >
                                                Password*
                                              </label>
                                              <br />
                                              <div style={{ display: "flex" }}>
                                                <Input
                                                  id="tenant_password"
                                                  className="form-control-alternative"
                                                  variant="standard"
                                                  type={
                                                    showPassword
                                                      ? "text"
                                                      : "password"
                                                  }
                                                  placeholder="Password"
                                                  style={{
                                                    marginRight: "10px",
                                                    flex: 1,
                                                  }} // Adjust flex property
                                                  name="tenant_password"
                                                  onBlur={
                                                    leaseFormik.handleBlur
                                                  }
                                                  onChange={
                                                    leaseFormik.handleChange
                                                  }
                                                  value={
                                                    leaseFormik.values
                                                      .tenant_password
                                                  }
                                                />
                                                <Button
                                                  type="button"
                                                  onClick={() =>
                                                    setShowPassword(
                                                      !showPassword
                                                    )
                                                  }
                                                >
                                                  {<VisibilityIcon />}
                                                </Button>
                                              </div>
                                              {leaseFormik.touched
                                                .tenant_password &&
                                              leaseFormik.errors
                                                .tenant_password ? (
                                                <div style={{ color: "red" }}>
                                                  {
                                                    leaseFormik.errors
                                                      .tenant_password
                                                  }
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <hr />
                                          <div>
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-email"
                                            >
                                              Address*
                                            </label>
                                          </div>

                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Checkbox
                                              //onClick={handleChange}
                                              style={{ marginRight: "10px" }}
                                            />
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-unitadd"
                                            >
                                              {" "}
                                              Same as Unit Address
                                            </label>
                                          </div>
                                          {/* <div>
                                              <span
                                                onClick={setOpenTenantsDialog}
                                                style={{
                                                  cursor: "pointer",
                                                  fontSize: "14px",
                                                  fontFamily: "monospace",
                                                  color: "blue",
                                                  marginLeft: "10px", // Add this to create space between the input and the link
                                                }}
                                              >
                                                <b style={{ fontSize: "20px" }}>
                                                  +
                                                </b>{" "}
                                                Add alternative Address
                                              </span>
                                            </div> */}
                                          <br />
                                          <div>
                                            <span
                                              onClick={toggleper}
                                              style={{
                                                marginBottom: "1rem",
                                                display: "flex",
                                                background: "grey",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <b>+ </b>&nbsp; Personal
                                              information
                                            </span>
                                            <Collapse isOpen={collapseper}>
                                              <Card>
                                                <CardBody>
                                                  <Row>
                                                    <Col lg="5">
                                                      <FormGroup>
                                                        <label
                                                          className="form-control-label"
                                                          htmlFor="input-unitadd"
                                                        >
                                                          Date of Birth
                                                        </label>
                                                        <Input
                                                          className="form-control-alternative"
                                                          id="input-unitadd"
                                                          placeholder="3000"
                                                          type="date"
                                                          name="birth_date"
                                                          onBlur={
                                                            leaseFormik.handleBlur
                                                          }
                                                          onChange={
                                                            leaseFormik.handleChange
                                                          }
                                                          value={
                                                            leaseFormik.values
                                                              .birth_date
                                                          }
                                                        />
                                                        {leaseFormik.touched
                                                          .birth_date &&
                                                        leaseFormik.errors
                                                          .birth_date ? (
                                                          <div
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            {
                                                              leaseFormik.errors
                                                                .birth_date
                                                            }
                                                          </div>
                                                        ) : null}
                                                      </FormGroup>
                                                    </Col>
                                                    <Col lg="7">
                                                      <FormGroup>
                                                        <label
                                                          className="form-control-label"
                                                          htmlFor="input-unitadd"
                                                        >
                                                          TextPayer ID
                                                        </label>
                                                        <Input
                                                          className="form-control-alternative"
                                                          id="input-unitadd"
                                                          type="text"
                                                          name="textpayer_id"
                                                          onBlur={
                                                            leaseFormik.handleBlur
                                                          }
                                                          onChange={
                                                            leaseFormik.handleChange
                                                          }
                                                          value={
                                                            leaseFormik.values
                                                              .textpayer_id
                                                          }
                                                        />
                                                        {leaseFormik.touched
                                                          .textpayer_id &&
                                                        leaseFormik.errors
                                                          .textpayer_id ? (
                                                          <div
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            {
                                                              leaseFormik.errors
                                                                .textpayer_id
                                                            }
                                                          </div>
                                                        ) : null}
                                                      </FormGroup>
                                                    </Col>
                                                  </Row>
                                                  <Row>
                                                    <Col lg="7">
                                                      <FormGroup>
                                                        <label
                                                          className="form-control-label"
                                                          htmlFor="input-unitadd"
                                                        >
                                                          Comments
                                                        </label>
                                                        <Input
                                                          className="form-control-alternative"
                                                          id="input-address"
                                                          type="textarea"
                                                          style={{
                                                            height: "90px",
                                                            width: "100%",
                                                            maxWidth: "25rem",
                                                          }}
                                                          name="comments"
                                                          onBlur={
                                                            leaseFormik.handleBlur
                                                          }
                                                          onChange={
                                                            leaseFormik.handleChange
                                                          }
                                                          value={
                                                            leaseFormik.values
                                                              .comments
                                                          }
                                                        />
                                                        {leaseFormik.touched
                                                          .comments &&
                                                        leaseFormik.errors
                                                          .comments ? (
                                                          <div
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            {
                                                              leaseFormik.errors
                                                                .comments
                                                            }
                                                          </div>
                                                        ) : null}
                                                      </FormGroup>
                                                    </Col>
                                                  </Row>
                                                </CardBody>
                                              </Card>
                                            </Collapse>
                                          </div>
                                          <div>
                                            <span
                                              onClick={togglecont}
                                              style={{
                                                marginBottom: "1rem",
                                                display: "flex",
                                                background: "grey",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <b>+ </b>&nbsp; Emergency Contact
                                            </span>
                                            <Collapse isOpen={collapsecont}>
                                              <Card>
                                                <CardBody>
                                                  <Row>
                                                    <Col lg="6">
                                                      <FormGroup>
                                                        <label
                                                          className="form-control-label"
                                                          htmlFor="input-unitadd"
                                                        >
                                                          Contact Name
                                                        </label>
                                                        <Input
                                                          className="form-control-alternative"
                                                          id="input-unitadd"
                                                          type="text"
                                                          name="contact_name"
                                                          onBlur={
                                                            leaseFormik.handleBlur
                                                          }
                                                          onChange={
                                                            leaseFormik.handleChange
                                                          }
                                                          value={
                                                            leaseFormik.values
                                                              .contact_name
                                                          }
                                                        />
                                                        {leaseFormik.touched
                                                          .contact_name &&
                                                        leaseFormik.errors
                                                          .contact_name ? (
                                                          <div
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            {
                                                              leaseFormik.errors
                                                                .contact_name
                                                            }
                                                          </div>
                                                        ) : null}
                                                      </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                      <FormGroup>
                                                        <label
                                                          className="form-control-label"
                                                          htmlFor="input-unitadd"
                                                        >
                                                          Relationship to Tenant
                                                        </label>
                                                        <Input
                                                          className="form-control-alternative"
                                                          id="input-unitadd"
                                                          type="text"
                                                          name="relationship_tenants"
                                                          onBlur={
                                                            leaseFormik.handleBlur
                                                          }
                                                          onChange={
                                                            leaseFormik.handleChange
                                                          }
                                                          value={
                                                            leaseFormik.values
                                                              .relationship_tenants
                                                          }
                                                        />
                                                        {leaseFormik.touched
                                                          .relationship_tenants &&
                                                        leaseFormik.errors
                                                          .relationship_tenants ? (
                                                          <div
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            {
                                                              leaseFormik.errors
                                                                .relationship_tenants
                                                            }
                                                          </div>
                                                        ) : null}
                                                      </FormGroup>
                                                    </Col>
                                                  </Row>
                                                  <Row>
                                                    <Col lg="6">
                                                      <FormGroup>
                                                        <label
                                                          className="form-control-label"
                                                          htmlFor="input-unitadd"
                                                        >
                                                          E-Mail
                                                        </label>
                                                        <Input
                                                          className="form-control-alternative"
                                                          id="input-unitadd"
                                                          type="text"
                                                          name="email"
                                                          onBlur={
                                                            leaseFormik.handleBlur
                                                          }
                                                          onChange={
                                                            leaseFormik.handleChange
                                                          }
                                                          value={
                                                            leaseFormik.values
                                                              .email
                                                          }
                                                        />
                                                        {leaseFormik.touched
                                                          .email &&
                                                        leaseFormik.errors
                                                          .email ? (
                                                          <div
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            {
                                                              leaseFormik.errors
                                                                .email
                                                            }
                                                          </div>
                                                        ) : null}
                                                      </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                      <FormGroup>
                                                        <label
                                                          className="form-control-label"
                                                          htmlFor="input-unitadd"
                                                        >
                                                          Phone Number
                                                        </label>
                                                        <Input
                                                          className="form-control-alternative"
                                                          id="input-unitadd"
                                                          type="number"
                                                          name="emergency_PhoneNumber"
                                                          onBlur={
                                                            leaseFormik.handleBlur
                                                          }
                                                          onChange={
                                                            leaseFormik.handleChange
                                                          }
                                                          value={
                                                            leaseFormik.values
                                                              .emergency_PhoneNumber
                                                          }
                                                        />
                                                        {leaseFormik.touched
                                                          .emergency_PhoneNumber &&
                                                        leaseFormik.errors
                                                          .emergency_PhoneNumber ? (
                                                          <div
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            {
                                                              leaseFormik.errors
                                                                .emergency_PhoneNumber
                                                            }
                                                          </div>
                                                        ) : null}
                                                      </FormGroup>
                                                    </Col>
                                                  </Row>
                                                </CardBody>
                                              </Card>
                                            </Collapse>
                                          </div>
                                        </div>
                                      )}

                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={() => {
                                          setShowTenantTable(false);
                                          handleAddTenant();
                                          handleDialogClose(); // Call this function to close the dialog
                                        }}
                                        // style={{ background: "green" }}
                                      >
                                        Add Tenant
                                      </button>
                                      <Button
                                        // className="btn btn-primary"
                                        // style={{ background: "blue" }}

                                        onClick={handleClose}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  )}
                                  {selectedOption === "Cosigner" && (
                                    <div className="cosigner">
                                      <div>
                                        <span
                                          style={{
                                            marginBottom: "1rem",
                                            display: "flex",
                                            background: "grey",
                                            cursor: "pointer",
                                          }}
                                        >
                                          &nbsp;Contact information
                                        </span>
                                      </div>

                                      <div
                                        className="formInput"
                                        style={{ margin: "10px 10px" }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-firstname"
                                            >
                                              First Name
                                            </label>
                                            <Input
                                              className="form-control-alternative"
                                              id="cosigner_firstName"
                                              placeholder="First Name"
                                              type="text"
                                              name="cosigner_firstName"
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values
                                                  .cosigner_firstName
                                              }
                                            />
                                            {leaseFormik.touched
                                              .cosigner_firstName &&
                                            leaseFormik.errors
                                              .cosigner_firstName ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .cosigner_firstName
                                                }
                                              </div>
                                            ) : null}
                                          </div>
                                          <div style={{ flex: 1 }}>
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-lastname"
                                            >
                                              Last Name
                                            </label>
                                            <Input
                                              className="form-control-alternative"
                                              id="cosigner_lastName"
                                              placeholder="Last Name"
                                              type="text"
                                              name="cosigner_lastName"
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values
                                                  .cosigner_lastName
                                              }
                                            />
                                            {leaseFormik.touched
                                              .cosigner_lastName &&
                                            leaseFormik.errors
                                              .cosigner_lastName ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .cosigner_lastName
                                                }
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                        <br />
                                        <div
                                          style={{
                                            // display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-lastname"
                                            >
                                              Phone Number
                                            </label>
                                            <br />
                                            <Input
                                              className="form-control-alternative"
                                              id="cosigner_mobileNumber"
                                              placeholder="Phone Number"
                                              type="number"
                                              name="cosigner_mobileNumber"
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values
                                                  .cosigner_mobileNumber
                                              }
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <PhoneIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                            {leaseFormik.touched
                                              .cosigner_mobileNumber &&
                                            leaseFormik.errors
                                              .cosigner_mobileNumber ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .cosigner_mobileNumber
                                                }
                                              </div>
                                            ) : null}
                                          </div>
                                          {/* <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Phone
                                          </span> */}
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                            }}
                                          >
                                            <span
                                              onClick={handleClick2}
                                              style={{
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontFamily: "monospace",
                                                color: "blue",
                                                paddingTop: "3%",
                                              }}
                                            >
                                              <b style={{ fontSize: "20px" }}>
                                                +
                                              </b>
                                              Add alternative Phone
                                            </span>
                                            {rentincdropdownOpen3 && (
                                              <div
                                                style={{
                                                  flex: 1,
                                                  marginRight: "10px",
                                                }}
                                              >
                                                <label
                                                  className="form-control-label"
                                                  htmlFor="tenant_workNumber"
                                                  style={{
                                                    paddingTop: "3%",
                                                  }}
                                                >
                                                  Work Number*
                                                </label>
                                                <br />
                                                <Input
                                                  id="cosigner_workNumber"
                                                  className="form-control-alternative"
                                                  variant="standard"
                                                  type="text"
                                                  placeholder="Alternative Number"
                                                  style={{
                                                    marginRight: "10px",
                                                    flex: 1,
                                                  }} // Adjust flex property
                                                  name="cosigner_workNumber"
                                                  onBlur={
                                                    leaseFormik.handleBlur
                                                  }
                                                  onChange={
                                                    leaseFormik.handleChange
                                                  }
                                                  value={
                                                    leaseFormik.values
                                                      .cosigner_workNumber
                                                  }
                                                />
                                                {leaseFormik.touched
                                                  .cosigner_workNumber &&
                                                leaseFormik.errors
                                                  .cosigner_workNumber ? (
                                                  <div style={{ color: "red" }}>
                                                    {
                                                      leaseFormik.errors
                                                        .cosigner_workNumber
                                                    }
                                                  </div>
                                                ) : null}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <br />
                                        <div
                                          style={{
                                            // display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-email"
                                            >
                                              Email
                                            </label>
                                            <br />
                                            <Input
                                              className="form-control-alternative"
                                              id="cosigner_email"
                                              placeholder="Email"
                                              type="text"
                                              name="cosigner_email"
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values
                                                  .cosigner_email
                                              }
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <EmailIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                            {leaseFormik.touched
                                              .cosigner_email &&
                                            leaseFormik.errors
                                              .cosigner_email ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .cosigner_email
                                                }
                                              </div>
                                            ) : null}
                                          </div>
                                          {/* <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                              marginLeft: "10px", // Add this to create space between the input and the link
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Email
                                          </span> */}
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                            }}
                                          >
                                            <span
                                              onClick={handleClick3}
                                              style={{
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontFamily: "monospace",
                                                color: "blue",
                                                paddingTop: "3%", // Add this to create space between the input and the link
                                              }}
                                            >
                                              <b style={{ fontSize: "20px" }}>
                                                +
                                              </b>
                                              Add alternative Email
                                            </span>
                                            {rentincdropdownOpen4 && (
                                              <div
                                                style={{
                                                  flex: 1,
                                                  marginRight: "10px",
                                                }}
                                              >
                                                <label
                                                  className="form-control-label"
                                                  htmlFor="input-firstname"
                                                  style={{
                                                    paddingTop: "3%",
                                                  }}
                                                >
                                                  Alternative Email*
                                                </label>
                                                <br />
                                                <Input
                                                  id="cosigner_alternateemail"
                                                  className="form-control-alternative"
                                                  variant="standard"
                                                  type="text"
                                                  placeholder="Alternative Email"
                                                  style={{
                                                    marginRight: "10px",
                                                    flex: 1,
                                                  }} // Adjust flex property
                                                  name="cosigner_alternateemail"
                                                  onBlur={
                                                    leaseFormik.handleBlur
                                                  }
                                                  onChange={
                                                    leaseFormik.handleChange
                                                  }
                                                  value={
                                                    leaseFormik.values
                                                      .cosigner_alternateemail
                                                  }
                                                />
                                                {leaseFormik.touched
                                                  .cosigner_alternateemail &&
                                                leaseFormik.errors
                                                  .cosigner_alternateemail ? (
                                                  <div style={{ color: "red" }}>
                                                    {
                                                      leaseFormik.errors
                                                        .cosigner_alternateemail
                                                    }
                                                  </div>
                                                ) : null}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <hr />
                                        <div>
                                          <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                          >
                                            Address
                                          </label>
                                        </div>

                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <FormGroup>
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-unitadd"
                                            >
                                              Street Address
                                            </label>
                                            <Input
                                              className="form-control-alternative"
                                              id="cosigner_streetAdress"
                                              placeholder="Address"
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                maxWidth: "25rem",
                                              }}
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values
                                                  .cosigner_streetAdress
                                              }
                                            />
                                            {leaseFormik.touched
                                              .cosigner_streetAdress &&
                                            leaseFormik.errors
                                              .cosigner_streetAdress ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .cosigner_streetAdress
                                                }
                                              </div>
                                            ) : null}
                                          </FormGroup>
                                        </div>
                                        <div>
                                          <Row>
                                            <Col lg="4">
                                              <FormGroup>
                                                <label
                                                  className="form-control-label"
                                                  htmlFor="input-city"
                                                >
                                                  City
                                                </label>
                                                <Input
                                                  className="form-control-alternative"
                                                  id="cosigner_city"
                                                  placeholder="New York"
                                                  type="text"
                                                  name="cosigner_city"
                                                  onBlur={
                                                    leaseFormik.handleBlur
                                                  }
                                                  onChange={
                                                    leaseFormik.handleChange
                                                  }
                                                  value={
                                                    leaseFormik.values
                                                      .cosigner_city
                                                  }
                                                />
                                                {leaseFormik.touched
                                                  .cosigner_city &&
                                                leaseFormik.errors
                                                  .cosigner_city ? (
                                                  <div style={{ color: "red" }}>
                                                    {
                                                      leaseFormik.errors
                                                        .cosigner_city
                                                    }
                                                  </div>
                                                ) : null}
                                              </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                              <FormGroup>
                                                <label
                                                  className="form-control-label"
                                                  htmlFor="input-country"
                                                >
                                                  Country
                                                </label>
                                                <Input
                                                  className="form-control-alternative"
                                                  id="cosigner_country"
                                                  placeholder="United States"
                                                  type="text"
                                                  name="cosigner_country"
                                                  onBlur={
                                                    leaseFormik.handleBlur
                                                  }
                                                  onChange={
                                                    leaseFormik.handleChange
                                                  }
                                                  value={
                                                    leaseFormik.values
                                                      .cosigner_country
                                                  }
                                                />
                                                {leaseFormik.touched
                                                  .cosigner_country &&
                                                leaseFormik.errors
                                                  .cosigner_country ? (
                                                  <div style={{ color: "red" }}>
                                                    {
                                                      leaseFormik.errors
                                                        .cosigner_country
                                                    }
                                                  </div>
                                                ) : null}
                                              </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                              <FormGroup>
                                                <label
                                                  className="form-control-label"
                                                  htmlFor="input-country"
                                                >
                                                  Postal code
                                                </label>
                                                <Input
                                                  className="form-control-alternative"
                                                  id="cosigner_postalcode"
                                                  placeholder="Postal code"
                                                  type="number"
                                                  name="cosigner_postalcode"
                                                  onBlur={
                                                    leaseFormik.handleBlur
                                                  }
                                                  onChange={
                                                    leaseFormik.handleChange
                                                  }
                                                  value={
                                                    leaseFormik.values
                                                      .cosigner_postalcode
                                                  }
                                                />
                                                {leaseFormik.touched
                                                  .cosigner_postalcode &&
                                                leaseFormik.errors
                                                  .cosigner_postalcode ? (
                                                  <div style={{ color: "red" }}>
                                                    {
                                                      leaseFormik.errors
                                                        .cosigner_postalcode
                                                    }
                                                  </div>
                                                ) : null}
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                        </div>

                                        {/* <div>
                                          <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Address
                                          </span>
                                        </div> */}
                                        <br />
                                      </div>
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        // onClick={handleDialogClose}
                                        // setOpenRecurringDialog={handleAddCosigner}
                                        onClick={() => {
                                          handleAddCosigner();
                                          handleDialogClose(); // Call this function to close the dialog
                                        }}
                                        // style={{ background: "green" }}
                                      >
                                        Add Cosigner
                                      </button>
                                      <Button
                                        // className="btn btn-primary"
                                        // style={{ background: "blue" }}
                                        onClick={handleClose}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </DialogContent>

                          {/* <DialogActions>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ background: "green" }}
                            >
                              Add Tenant
                            </button>
                          
                            <Button onClick={handleClose}>Cancel</Button>
                          </DialogActions>
                          */}
                        </Dialog>

                        {/* {console.log(
                          "tenantData length:",
                          Object.keys(tenantData).length
                        )}
                        {console.log("tenantData length",Object.keys(tenantData).length)} */}
                        {/* { cosignerData || tenantData.length>0   ? ( */}
                        {Object.keys(selectedTenantData).length > 0 ? (
                          <div>
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                marginTop: "2%",
                              }}
                            >
                              <thead>
                                <tr style={{ background: "#f2f2f2" }}>
                                  <th
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    First Name
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Last Name
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Phone Number
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {selectedTenantData.firstName}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {selectedTenantData.lastName}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {selectedTenantData.mobileNumber}
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    <EditIcon
                                      onClick={() => {
                                        setShowTenantTable(false);
                                        setOpenTenantsDialog(true);
                                      }}
                                    />

                                    <DeleteIcon
                                      onClick={() => {
                                        setShowTenantTable(false);
                                        handleTenantDelete();
                                      }}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        ) : null}
                        {cosignerData &&
                          Object.keys(cosignerData).length > 0 && (
                            <div>
                              <h3 style={{ marginTop: "2%" }}>
                                Cosigner Information
                              </h3>
                              <table
                                style={{
                                  borderCollapse: "collapse",
                                  width: "100%",
                                  marginTop: "2%",
                                }}
                              >
                                <thead>
                                  <th
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    FirstName
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    LastName
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Mobile Number
                                  </th>
                                  <th
                                    style={{
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Action
                                  </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        padding: "8px",
                                        textAlign: "left",
                                      }}
                                    >
                                      {cosignerData.firstName}
                                    </td>
                                    <td
                                      style={{
                                        padding: "8px",
                                        textAlign: "left",
                                      }}
                                    >
                                      {cosignerData.lastName}
                                    </td>
                                    <td
                                      style={{
                                        padding: "8px",
                                        textAlign: "left",
                                      }}
                                    >
                                      {cosignerData.mobileNumber}
                                    </td>
                                    <td
                                      style={{
                                        padding: "8px",
                                        textAlign: "left",
                                      }}
                                    >
                                      <EditIcon
                                        onClick={setOpenTenantsDialog}
                                      />
                                      <DeleteIcon
                                        onClick={handleCosignerDelete}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* /================================================================================================================================================= */}

                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Rent (Optional)
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            Rent cycle
                          </label>
                          <FormGroup>
                            <Dropdown
                              isOpen={rentdropdownOpen}
                              toggle={toggle3}
                            >
                              <DropdownToggle caret style={{ width: "100%" }}>
                                {selectedRentCycle
                                  ? selectedRentCycle
                                  : "Select"}
                              </DropdownToggle>
                              <DropdownMenu
                                style={{ width: "100%" }}
                                name="rent_cycle"
                                onBlur={leaseFormik.handleBlur}
                                onChange={leaseFormik.handleChange}
                                value={leaseFormik.values.rent_cycle}
                              >
                                {leaseFormik.touched.rent_cycle &&
                                leaseFormik.errors.rent_cycle ? (
                                  <div style={{ color: "red" }}>
                                    {leaseFormik.errors.rent_cycle}
                                  </div>
                                ) : null}
                                <DropdownItem
                                  onClick={() =>
                                    handleselectedRentCycle("Daily")
                                  }
                                >
                                  Daily
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleselectedRentCycle("Weekly")
                                  }
                                >
                                  Weekly
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleselectedRentCycle("Every two weeks")
                                  }
                                >
                                  Every two weeks
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleselectedRentCycle("Monthly")
                                  }
                                >
                                  Monthly
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleselectedRentCycle("Every two months")
                                  }
                                >
                                  Every two months
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleselectedRentCycle("Quarterly")
                                  }
                                >
                                  Quarterly
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleselectedRentCycle("Yearly")
                                  }
                                >
                                  Yearly
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {/* <hr className="my-4" /> */}
                  {/* Address */}

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="7">
                        <FormGroup>
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Amount
                                </label>
                                <br />
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-reserve"
                                    placeholder="$0.00"
                                    type="number"
                                    name="amount"
                                    onBlur={leaseFormik.handleBlur}
                                    onChange={leaseFormik.handleChange}
                                    value={leaseFormik.values.amount}
                                  />
                                  {leaseFormik.touched.amount &&
                                  leaseFormik.errors.amount ? (
                                    <div style={{ color: "red" }}>
                                      {leaseFormik.errors.amount}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </FormGroup>
                            </Col>
                            <Col lg="5">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-property"
                                >
                                  Account
                                </label>
                                <br />
                                <FormGroup>
                                  <Dropdown
                                    isOpen={rentincdropdownOpen}
                                    toggle={toggle4}
                                  >
                                    <DropdownToggle
                                      caret
                                      style={{ width: "100%" }}
                                    >
                                      {selectedAccount
                                        ? selectedAccount
                                        : "Select"}
                                    </DropdownToggle>
                                    <DropdownMenu style={{ width: "100%" }}>
                                      {leaseFormik.touched.account &&
                                      leaseFormik.errors.account ? (
                                        <div style={{ color: "red" }}>
                                          {leaseFormik.errors.account}
                                        </div>
                                      ) : null}
                                      <DropdownItem
                                        header
                                        style={{ color: "blue" }}
                                      >
                                        Income Account
                                      </DropdownItem>
                                      {accountNames.map((item) => {
                                        const accountName =
                                          item.account_name || ""; // Use an empty string if account_name is missing
                                        return (
                                          <DropdownItem
                                            key={item._id}
                                            onClick={() =>
                                              hadleselectedAccount(accountName)
                                            }
                                          >
                                            {accountName}
                                          </DropdownItem>
                                        );
                                      })}
                                      <DropdownItem
                                        onClick={() =>
                                          AddNewAccountName("rentAccountName")
                                        }
                                      >
                                        Add new account..
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                  <AccountDialog
                                    AddBankAccountDialogOpen={
                                      AddBankAccountDialogOpen
                                    }
                                    handleCloseDialog={handleCloseDialog}
                                    selectAccountDropDown={
                                      selectAccountDropDown
                                    }
                                    toggle8={toggle8}
                                    setAddBankAccountDialogOpen={
                                      setAddBankAccountDialogOpen
                                    }
                                    toggle1={toggle1}
                                    selectAccountLevelDropDown={
                                      selectAccountLevelDropDown
                                    }
                                    selectFundTypeDropDown={
                                      selectFundTypeDropDown
                                    }
                                    toggle10={toggle10}
                                    selectedAccount={selectedAccount}
                                    accountTypeName={accountTypeName}
                                    setToggleApiCall={setToggleApiCall}
                                    toggleApiCall={toggleApiCall}
                                  />
                                  {/* <Dialog
                                    open={AddBankAccountDialogOpen}
                                    onClose={handleCloseDialog}
                                  >
                                    <DialogTitle
                                      style={{ background: "#F0F8FF" }}
                                    >
                                      Add account
                                    </DialogTitle>
                                    <DialogContent
                                      style={{
                                        width: "100%",
                                        maxWidth: "500px",
                                      }}
                                    >
                                      <div
                                        className="formInput"
                                        style={{ margin: "10px 10px" }}
                                      >
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-address"
                                        >
                                          Account Name *
                                        </label>
                                        <br />
                                        <Input
                                          className="form-control-alternative"
                                          id="input-accname"
                                          placeholder="Account Name"
                                          type="text"
                                          name="account_name"
                                          onBlur={accountFormik.handleBlur}
                                          onChange={accountFormik.handleChange}
                                          value={
                                            accountFormik.values.account_name
                                          }
                                        />
                                        {accountFormik.touched.account_name &&
                                        accountFormik.errors.account_name ? (
                                          <div style={{ color: "red" }}>
                                            {accountFormik.errors.account_name}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div
                                        className="formInput"
                                        style={{ margin: "30px 10px" }}
                                      >
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-address"
                                        >
                                          Account Type
                                        </label>
                                        <br />
                                        <Dropdown
                                          isOpen={selectAccountDropDown}
                                          toggle={toggle8}
                                        >
                                          <DropdownToggle
                                            caret
                                            style={{ width: "100%" }}
                                          >
                                            {selectedAccountType
                                              ? selectedAccountType
                                              : "Select"}
                                          </DropdownToggle>
                                          <DropdownMenu
                                            style={{ width: "100%" }}
                                            name="rent_cycle"
                                            onBlur={accountFormik.handleBlur}
                                            onChange={
                                              accountFormik.handleChange
                                            }
                                            value={
                                              accountFormik.values.account_type
                                            }
                                          >
                                            {accountFormik.touched
                                              .account_type &&
                                            accountFormik.errors
                                              .account_type ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  accountFormik.errors
                                                    .account_type
                                                }
                                              </div>
                                            ) : null}
                                            <DropdownItem
                                              onClick={() =>
                                                hadleselectedAccountType(
                                                  "Income"
                                                )
                                              }
                                            >
                                              Income
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                hadleselectedAccountType(
                                                  "Non Operating Income"
                                                )
                                              }
                                            >
                                              Non Operating Income
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </Dropdown>
                                      </div>
                                      <div
                                        className="formInput"
                                        style={{ margin: "30px 10px" }}
                                      >
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-address"
                                        >
                                          Account Level
                                        </label>
                                        <br />
                                        <FormGroup check>
                                          <Label
                                            check
                                            style={{
                                              fontSize: "15px",
                                              fontFamily: "sans-serif",
                                            }}
                                          >
                                            <Input
                                              type="radio"
                                              name="radio1"
                                              value="Parent Account"
                                              onChange={handleRadioChange}
                                            />{" "}
                                            Parent Account
                                          </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                          <Label
                                            check
                                            style={{
                                              fontSize: "15px",
                                              fontFamily: "sans-serif",
                                            }}
                                          >
                                            <Input
                                              type="radio"
                                              name="radio1"
                                              value="Sub Account"
                                              onChange={handleRadioChange}
                                            />{" "}
                                            Sub Account
                                          </Label>
                                        </FormGroup>
                                        {selectedAccountLevel ===
                                          "Sub Account" && (
                                          <div
                                            className="formInput"
                                            style={{ margin: "30px 10px" }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-address"
                                            >
                                              Parent Account
                                            </label>
                                            <br />
                                            <Dropdown
                                              isOpen={
                                                selectAccountLevelDropDown
                                              } // Control the open/closed state
                                              toggle={toggle1}
                                            >
                                              <DropdownToggle
                                                caret
                                                style={{ width: "100%" }}
                                              >
                                                {selectedAccountLevel
                                                  ? selectedAccountLevel
                                                  : "Select"}
                                              </DropdownToggle>
                                              <DropdownMenu
                                                style={{ width: "100%" }}
                                              >
                                                <DropdownItem
                                                  onClick={() =>
                                                    hadleselectedAccountLevel(
                                                      "Income"
                                                    )
                                                  }
                                                >
                                                  Income
                                                </DropdownItem>
                                                <DropdownItem
                                                  onClick={() =>
                                                    hadleselectedAccountLevel(
                                                      "Non Operating Income"
                                                    )
                                                  }
                                                >
                                                  Non Operating Income
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>
                                          </div>
                                        )}
                                      </div>
                                      <div
                                        className="formInput"
                                        style={{ margin: "30px 10px" }}
                                      >
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-address"
                                        >
                                          Account Number
                                        </label>
                                        <br />
                                        <Input
                                          className="form-control-alternative"
                                          id="input-no"
                                          placeholder=""
                                          type="number"
                                          name="account_number"
                                          onBlur={accountFormik.handleBlur}
                                          onChange={accountFormik.handleChange}
                                          value={
                                            accountFormik.values.account_number
                                          }
                                        />
                                        {accountFormik.touched.account_number &&
                                        accountFormik.errors.account_number ? (
                                          <div style={{ color: "red" }}>
                                            {
                                              accountFormik.errors
                                                .account_number
                                            }
                                          </div>
                                        ) : null}
                                      </div>
                                      <div
                                        className="formInput"
                                        style={{ margin: "30px 10px" }}
                                      >
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-address"
                                        >
                                          Fund Type
                                        </label>
                                        <br />
                                        <Dropdown
                                          isOpen={selectFundTypeDropDown}
                                          toggle={toggle10}
                                        >
                                          <DropdownToggle
                                            caret
                                            style={{ width: "100%" }}
                                          >
                                            {selectedFundType
                                              ? selectedFundType
                                              : "Select"}
                                          </DropdownToggle>
                                          <DropdownMenu
                                            style={{ width: "100%" }}
                                            name="fund_type"
                                            onBlur={accountFormik.handleBlur}
                                            onChange={
                                              accountFormik.handleChange
                                            }
                                            value={
                                              accountFormik.values.fund_type
                                            }
                                          >
                                            {accountFormik.touched.fund_type &&
                                            accountFormik.errors.fund_type ? (
                                              <div style={{ color: "red" }}>
                                                {accountFormik.errors.fund_type}
                                              </div>
                                            ) : null}
                                            <DropdownItem
                                              onClick={() =>
                                                hadleselectedFundType("Reserve")
                                              }
                                            >
                                              Reserve
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                hadleselectedFundType(
                                                  "Operating"
                                                )
                                              }
                                            >
                                              Operating
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </Dropdown>
                                      </div>
                                      <div />
                                      <div
                                        className="formInput"
                                        style={{ margin: "10px 10px" }}
                                      >
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-address"
                                        >
                                          Notes
                                        </label>
                                        <br />
                                        <Input
                                          className="form-control-alternative"
                                          id="input-accname"
                                          placeholder="Notes"
                                          type="text"
                                          name="notes"
                                          onBlur={accountFormik.handleBlur}
                                          onChange={accountFormik.handleChange}
                                          value={accountFormik.values.notes}
                                        />
                                        {accountFormik.touched.notes &&
                                        accountFormik.errors.notes ? (
                                          <div style={{ color: "red" }}>
                                            {leaseFormik.errors.notes}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div
                                        className="formInput"
                                        style={{ margin: "30px 10px" }}
                                      >
                                        We stores this information{" "}
                                        <b
                                          style={{
                                            color: "blue",
                                            fontSize: "15px",
                                          }}
                                        >
                                          Privately
                                        </b>{" "}
                                        and{" "}
                                        <b
                                          style={{
                                            color: "blue",
                                            fontSize: "15px",
                                          }}
                                        >
                                          Securely
                                        </b>
                                        .
                                      </div>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleCloseDialog}>
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          handleAdd(accountFormik.values); // Call handleAdd with the form values
                                          handleCloseDialog();
                                        }}
                                        color="primary"
                                      >
                                        Add
                                      </Button>
                                    </DialogActions>
                                  </Dialog> */}
                                </FormGroup>
                              </FormGroup>
                            </Col>

                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-unitadd"
                                >
                                  Next Due Date
                                </label>
                                {/* <Input
                                  className="form-control-alternative"
                                  id="input-unitadd"
                                  placeholder="3000"
                                  type="date"
                                  name="nextDue_date"
                                  onBlur={leaseFormik.handleBlur}
                                  onChange={leaseFormik.handleChange}
                                  value={leaseFormik.values.tenant_nextDue_date}
                                /> */}

                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    className="form-control-alternative"
                                    name="nextDue_date"
                                    id="input-unitadd"
                                    slotProps={{ textField: { size: 'small' } }}
                                    placeholder="3000"
                                    dateFormat="MM-dd-yyyy"
                                    onBlur={leaseFormik.handleBlur}
                              views={['year', 'month', 'day']}

                                    selected={leaseFormik.values.tenant_nextDue_date} // Use 'selected' prop instead of 'value'
                                    onChange={(date) => {
                                      leaseFormik.setFieldValue(
                                        "tenant_nextDue_date",
                                        date
                                      ); // Update the Formik field value
                                    }}
                                  />
                                </LocalizationProvider>
                                {leaseFormik.touched.nextDue_date &&
                                leaseFormik.errors.nextDue_date ? (
                                  <div style={{ color: "red" }}>
                                    {leaseFormik.errors.nextDue_date}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Col>

                            <Col lg="5">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-unitadd"
                                >
                                  Memo
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-unitadd"
                                  placeholder="if left blank , will show Rent "
                                  type="text"
                                  name="memo"
                                  onBlur={leaseFormik.handleBlur}
                                  onChange={leaseFormik.handleChange}
                                  value={leaseFormik.values.memo}
                                />
                                {leaseFormik.touched.memo &&
                                leaseFormik.errors.memo ? (
                                  <div style={{ color: "red" }}>
                                    {leaseFormik.errors.memo}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">
                    Security Deposite (Optional)
                  </h6>
                  <div className="pl-lg-2">
                    <FormGroup>
                      {/* <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Security Deposite (Optional)
                      </label> */}
                      <br />
                      <Row>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-unitadd"
                            >
                              Next Due Date
                            </label>
                            {/* <Input
                              className="form-control-alternative"
                              id="input-unitadd"
                              placeholder="3000"
                              type="date"
                              name="Due_date"
                              onBlur={leaseFormik.handleBlur}
                              onChange={leaseFormik.handleChange}
                              value={leaseFormik.values.Due_date}
                            /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="form-control-alternative"
                              name="Due_date"
                              slotProps={{ textField: { size: 'small' } }}
                              id="input-unitadd"
                              placeholder="3000"
                              views={['year', 'month', 'day']}
                              dateFormat="MM-dd-yyyy"
                              onBlur={leaseFormik.handleBlur}
                              selected={leaseFormik.values.Due_date} // Use 'selected' prop instead of 'value'
                              onChange={(date) => {
                                leaseFormik.setFieldValue("Due_date", date); // Update the Formik field value
                              }}
                            />
                          </LocalizationProvider>
                            {leaseFormik.touched.tenant_start_date &&
                            leaseFormik.errors.Due_date ? (
                              <div style={{ color: "red" }}>
                                {leaseFormik.errors.Due_date}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Amount
                            </label>
                            <br />
                            <FormGroup>
                              <Input
                                className="form-control-alternative"
                                id="input-reserve"
                                placeholder="$0.00"
                                type="number"
                                name="Security_amount"
                                onBlur={leaseFormik.handleBlur}
                                onChange={leaseFormik.handleChange}
                                value={leaseFormik.values.Security_amount}
                              />
                              {leaseFormik.touched.Security_amount &&
                              leaseFormik.errors.Security_amount ? (
                                <div style={{ color: "red" }}>
                                  {leaseFormik.errors.Security_amount}
                                </div>
                              ) : null}
                            </FormGroup>
                          </FormGroup>
                        </Col>

                        <Col lg="7">
                          <FormGroup>
                            <br />
                            <label
                              className="form-control-label"
                              htmlFor="input-unitadd"
                            >
                              Don't forget to record the panyment once you have
                              connected the deposite
                            </label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </FormGroup>
                  </div>

                  <hr />
                  <h6 className="heading-small text-muted mb-4">
                    Charges (Optional)
                  </h6>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Add Charges
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="2">
                      <FormGroup>
                        <span
                          onClick={handleClickOpenRecurring}
                          style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            fontFamily: "monospace",
                            color: "blue",
                          }}
                        >
                          <b style={{ fontSize: "20px" }}>+</b> Add Recurring
                        </span>
                        <Dialog
                          open={openRecurringDialog}
                          onClose={handleClose}
                        >
                          <DialogTitle style={{ background: "#F0F8FF" }}>
                            Add Recurring content
                          </DialogTitle>

                          <div>
                            <div
                              style={{ marginLeft: "4%", marginRight: "4%" }}
                            >
                              <br />
                              <div className="grid-container resp-header">
                                <div>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-unitadd"
                                  >
                                    Account*
                                  </label>
                                  <FormGroup>
                                    <Dropdown
                                      isOpen={rentdropdownOpen1}
                                      toggle={toggle5}
                                    >
                                      <DropdownToggle caret>
                                        {selectedRecuringAccount
                                          ? selectedRecuringAccount
                                          : "Select"}
                                      </DropdownToggle>
                                      <DropdownMenu
                                        style={{ width: "100%" }}
                                        name="account"
                                        onBlur={leaseFormik.handleBlur}
                                        onChange={leaseFormik.handleChange}
                                        value={
                                          leaseFormik.values.recuring_account
                                        }
                                      >
                                        {leaseFormik.touched.recuring_account &&
                                        leaseFormik.errors.recuring_account ? (
                                          <div style={{ color: "red" }}>
                                            {
                                              leaseFormik.errors
                                                .recuring_account
                                            }
                                          </div>
                                        ) : null}
                                        {/* <DropdownItem
                                          onClick={() =>
                                            hadleselectedRecuringAccount(
                                              "Application Fee Income"
                                            )
                                          }
                                        >
                                          Application Fee Income
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedRecuringAccount(
                                              "Account Fee Income"
                                            )
                                          }
                                        >
                                          Account Fee Income
                                        </DropdownItem> */}
                                        {RecAccountNames.map((item) => {
                                          const accountName =
                                            item.account_name || ""; // Use an empty string if account_name is missing
                                          return (
                                            <DropdownItem
                                              key={item._id}
                                              onClick={() =>
                                                hadleselectedRecuringAccount(
                                                  accountName
                                                )
                                              }
                                            >
                                              {accountName}
                                            </DropdownItem>
                                          );
                                        })}
                                        <DropdownItem
                                          onClick={() =>
                                            AddNewAccountName("recAccountName")
                                          }
                                        >
                                          Add new account..
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </Dropdown>
                                  </FormGroup>
                                </div>
                                <div>
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-unitadd"
                                    >
                                      Next Due Date*
                                    </label>
                                    {/* <Input
                                      className="form-control-alternative"
                                      id="recuringnextDue_date"
                                      placeholder="3000"
                                      type="date"
                                      name="recuringnextDue_date"
                                      onBlur={leaseFormik.handleBlur}
                                      onChange={leaseFormik.handleChange}
                                      value={
                                        leaseFormik.values.recuringnextDue_date
                                      }
                                    /> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="form-control-alternative"
                              name="recuringnextDue_date"
                              slotProps={{ textField: { size: 'small' } }}
                              id="input-unitadd"
                              views={['year', 'month', 'day']}
                              placeholder="3000"
                              dateFormat="MM-dd-yyyy"
                              onBlur={leaseFormik.handleBlur}
                              selected={leaseFormik.values.recuringnextDue_date} // Use 'selected' prop instead of 'value'
                              onChange={(date) => {
                                leaseFormik.setFieldValue("recuringnextDue_date", date); // Update the Formik field value
                              }}
                            />
                          </LocalizationProvider>
                                    {leaseFormik.touched.recuringnextDue_date &&
                                    leaseFormik.errors.recuringnextDue_date ? (
                                      <div style={{ color: "red" }}>
                                        {
                                          leaseFormik.errors
                                            .recuringnextDue_date
                                        }
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </div>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-address"
                                  >
                                    Amount*
                                  </label>
                                  <br />
                                  <FormGroup>
                                    <Input
                                      className="form-control-alternative"
                                      id="recuring_amount"
                                      placeholder="$0.00"
                                      type="number"
                                      name="recuring_amount"
                                      onBlur={leaseFormik.handleBlur}
                                      onChange={leaseFormik.handleChange}
                                      value={leaseFormik.values.recuring_amount}
                                    />
                                    {leaseFormik.touched.recuring_amount &&
                                    leaseFormik.errors.recuring_amount ? (
                                      <div style={{ color: "red" }}>
                                        {leaseFormik.errors.recuring_amount}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-unitadd"
                                  >
                                    Memo*
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="recuringmemo"
                                    type="text"
                                    name="recuringmemo"
                                    onBlur={leaseFormik.handleBlur}
                                    onChange={leaseFormik.handleChange}
                                    value={leaseFormik.values.recuringmemo}
                                  />
                                  {leaseFormik.touched.recuringmemo &&
                                  leaseFormik.errors.recuringmemo ? (
                                    <div style={{ color: "red" }}>
                                      {leaseFormik.errors.recuringmemo}
                                    </div>
                                  ) : null}
                                </FormGroup>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-unitadd"
                                  >
                                    Frequent*
                                  </label>
                                  <FormGroup>
                                    <Dropdown
                                      isOpen={rentdropdownOpen2}
                                      toggle={toggle6}
                                    >
                                      <DropdownToggle
                                        caret
                                        style={{ width: "140%" }}
                                      >
                                        {selectedFrequency
                                          ? selectedFrequency
                                          : "Select"}
                                      </DropdownToggle>
                                      <DropdownMenu
                                        style={{ width: "100%" }}
                                        name="recuringfrequency"
                                        onBlur={leaseFormik.handleBlur}
                                        onChange={leaseFormik.handleChange}
                                        value={
                                          leaseFormik.values.recuringfrequency
                                        }
                                      >
                                        {leaseFormik.touched
                                          .recuringfrequency &&
                                        leaseFormik.errors.recuringfrequency ? (
                                          <div style={{ color: "red" }}>
                                            {
                                              leaseFormik.errors
                                                .recuringfrequency
                                            }
                                          </div>
                                        ) : null}
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedFrequency("Daily")
                                          }
                                        >
                                          Daily
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedFrequency("Weekly")
                                          }
                                        >
                                          Weekly
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedFrequency(
                                              "Every two weeks"
                                            )
                                          }
                                        >
                                          Every two weeks
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedFrequency("Monthly")
                                          }
                                        >
                                          Monthly
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedFrequency(
                                              "Every two months"
                                            )
                                          }
                                        >
                                          Every two months
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedFrequency("Quarterly")
                                          }
                                        >
                                          Quarterly
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedFrequency("Yearly")
                                          }
                                        >
                                          Yearly
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </Dropdown>
                                  </FormGroup>
                                </FormGroup>
                              </div>
                            </div>
                            <DialogActions>
                              <Button
                                type="submit"
                                style={{
                                  backgroundColor: "#007bff",
                                  color: "white",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddRecurring();
                                }}
                              >
                                Add
                              </Button>
                              <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                          </div>
                        </Dialog>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <span
                          onClick={handleClickOpenOneTimeCharge}
                          style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            fontFamily: "monospace",
                            color: "blue",
                          }}
                        >
                          <b style={{ fontSize: "20px" }}>+</b> Add one Time
                          charge
                        </span>
                        <Dialog
                          open={openOneTimeChargeDialog}
                          onClose={handleClose}
                        >
                          <DialogTitle style={{ background: "#F0F8FF" }}>
                            Add one Time charge content
                          </DialogTitle>

                          <div>
                            <div style={{ padding: "5%" }}>
                              <div className="grid-container resp-header">
                                <div>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-unitadd"
                                  >
                                    Account*
                                  </label>
                                  <FormGroup>
                                    <Dropdown
                                      isOpen={rentdropdownOpen3}
                                      toggle={toggle7}
                                    >
                                      <DropdownToggle caret>
                                        {selectedOneTimeAccount
                                          ? selectedOneTimeAccount
                                          : "Select"}
                                      </DropdownToggle>
                                      <DropdownMenu
                                        style={{ width: "100%" }}
                                        name="onetime_account"
                                        onBlur={leaseFormik.handleBlur}
                                        onChange={leaseFormik.handleChange}
                                        value={
                                          leaseFormik.values.onetime_account
                                        }
                                      >
                                        {leaseFormik.touched.onetime_account &&
                                        leaseFormik.errors.onetime_account ? (
                                          <div style={{ color: "red" }}>
                                            {leaseFormik.errors.onetime_account}
                                          </div>
                                        ) : null}
                                        {/* <DropdownItem
                                          onClick={() =>
                                            hadleselectedOneTimeAccount(
                                              "Application Fee Income"
                                            )
                                          }
                                        >
                                          Application Fee Income
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() =>
                                            hadleselectedOneTimeAccount(
                                              "Accounts Fee Income"
                                            )
                                          }
                                        >
                                          Accounts Fee Income
                                        </DropdownItem> */}
                                        {oneTimeCharges.map((item) => {
                                          const accountName =
                                            item.account_name || ""; // Use an empty string if account_name is missing
                                          return (
                                            <DropdownItem
                                              key={item._id}
                                              onClick={() =>
                                                hadleselectedOneTimeAccount(
                                                  accountName
                                                )
                                              }
                                            >
                                              {accountName}
                                            </DropdownItem>
                                          );
                                        })}
                                        <DropdownItem
                                          onClick={() =>
                                            AddNewAccountName("oneTimeName")
                                          }
                                        >
                                          Add new account..
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </Dropdown>
                                  </FormGroup>
                                </div>
                                <div>
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-unitadd"
                                    >
                                      Next Due Date*
                                    </label>
                                    {/* <Input
                                      className="form-control-alternative"
                                      id="input-unitadd"
                                      placeholder="3000"
                                      type="date"
                                      name="onetime_Due_date"
                                      onBlur={leaseFormik.handleBlur}
                                      onChange={leaseFormik.handleChange}
                                      value={
                                        leaseFormik.values.onetime_Due_date
                                      }
                                    /> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="form-control-alternative"
                              name="onetime_Due_date"
                              slotProps={{ textField: { size: 'small' } }}
                              id="input-unitadd"
                              placeholder="3000"
                              views={['year', 'month', 'day']}
                              dateFormat="MM-dd-yyyy"
                              onBlur={leaseFormik.handleBlur}
                              selected={leaseFormik.values.onetime_Due_date} // Use 'selected' prop instead of 'value'
                              onChange={(date) => {
                                leaseFormik.setFieldValue("onetime_Due_date", date); // Update the Formik field value
                              }}
                            />
                          </LocalizationProvider>
                                    {leaseFormik.touched.onetime_Due_date &&
                                    leaseFormik.errors.onetime_Due_date ? (
                                      <div style={{ color: "red" }}>
                                        {leaseFormik.errors.onetime_Due_date}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </div>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-address"
                                  >
                                    Amount*
                                  </label>
                                  <br />
                                  <FormGroup>
                                    <Input
                                      className="form-control-alternative"
                                      id="input-reserve"
                                      placeholder="$0.00"
                                      type="number"
                                      name="onetime_amount"
                                      onBlur={leaseFormik.handleBlur}
                                      onChange={leaseFormik.handleChange}
                                      value={leaseFormik.values.onetime_amount}
                                    />
                                    {leaseFormik.touched.onetime_amount &&
                                    leaseFormik.errors.onetime_amount ? (
                                      <div style={{ color: "red" }}>
                                        {leaseFormik.errors.onetime_amount}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-unitadd"
                                  >
                                    Memo*
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-unitadd"
                                    type="text"
                                    name="onetime_memo"
                                    onBlur={leaseFormik.handleBlur}
                                    onChange={leaseFormik.handleChange}
                                    value={leaseFormik.values.onetime_memo}
                                  />
                                  {leaseFormik.touched.onetime_memo &&
                                  leaseFormik.errors.onetime_memo ? (
                                    <div style={{ color: "red" }}>
                                      {leaseFormik.errors.onetime_memo}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </div>
                            </div>
                            <DialogActions>
                              <Button
                                type="submit"
                                style={{
                                  backgroundColor: "#007bff",
                                  color: "white",
                                }}
                                onClick={() => {
                                  handleAddOneTime();
                                  handleDialogClose(); // Call this function to close the dialog
                                }}
                              >
                                Add
                              </Button>
                              <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                          </div>
                        </Dialog>
                      </FormGroup>
                    </Col>
                  </Row>
                  {recurringData && Object.keys(recurringData).length > 0 && (
                    <div>
                      <h3
                        style={{
                          marginTop: "2%",
                        }}
                      >
                        Recurring Information
                      </h3>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          marginTop: "2%",
                        }}
                      >
                        <thead>
                          <tr style={{ background: "#f2f2f2" }}>
                            <th
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Amount
                            </th>

                            <th
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Next Due Date
                            </th>
                            <th
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Memo
                            </th>
                            <th
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {recurringData.recuring_amount}
                            </td>

                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {recurringData.recuringnextDue_date}
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {recurringData.recuringmemo}
                            </td>

                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              <EditIcon onClick={setOpenRecurringDialog} />
                              <DeleteIcon onClick={handleRecurringDelete} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {oneTimeData && Object.keys(oneTimeData).length > 0 && (
                    <div>
                      <h3
                        style={{
                          marginTop: "2%",
                        }}
                      >
                        One Time Information
                      </h3>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          marginTop: "2%",
                        }}
                      >
                        <thead>
                          <tr style={{ background: "#f2f2f2" }}>
                            <th
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Account
                            </th>

                            <th
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Next Due Date
                            </th>
                            <th
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Memo
                            </th>
                            <th
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {oneTimeData.onetime_amount}
                            </td>

                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {oneTimeData.onetime_Due_date}
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {oneTimeData.onetime_memo}
                            </td>

                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              <EditIcon onClick={setOpenOneTimeChargeDialog} />
                              <DeleteIcon onClick={handleOnetimeDelete} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <hr />
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Upload Files (Maximum of 10)
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* <div class="file-upload-wrapper">
                    <input
                      type="file"
                      className="form-control-file d-block"
                      accept="file/*"
                      name="upload_file"
                      onChange={(e) => fileData(e.target.files[0])}
                      // onChange={rentalsFormik.handleChange}
                      value={leaseFormik.values.upload_file}
                    />
                    {leaseFormik.touched.upload_file &&
                    leaseFormik.errors.upload_file ? (
                      <div style={{ color: "red" }}>
                        {leaseFormik.errors.upload_file}
                      </div>
                    ) : null}
                  </div> */}
                  <div class="d-flex">
                    <div class="file-upload-wrapper">
                      <input
                        type="file"
                        className="form-control-file d-none"
                        accept="file/*"
                        name="upload_file"
                        id="upload_file"
                        multiple
                        onChange={(e) => fileData(e.target.files)}
                        // onChange={rentalsFormik.handleChange}
                        // value={leaseFormik.values.upload_file}
                      />
                      <label for="upload_file" class="btn">
                        Upload
                      </label>

                      {leaseFormik.touched.upload_file &&
                      leaseFormik.errors.upload_file ? (
                        <div style={{ color: "red" }}>
                          {leaseFormik.errors.upload_file}
                        </div>
                      ) : null}
                    </div>
                    <div className="d-flex ">
                      {/* {id
                        ? file.length > 0 &&
                          file
                            .map((item) => {
                              return "name:" + item;
                            })
                            .map((file, index) => (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  marginLeft: "50px",
                                }}
                              >
                                <p
                                  // onClick={() => handleOpenFile(file)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {file?.name?.substr(0, 5)}
                                  {file?.name?.length > 5 ? "..." : null}
                                </p>
                                <CloseIcon
                                  style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    left: "64px",
                                    top: "-2px",
                                  }}
                                  onClick={() => deleteFile(index)}
                                />
                              </div>
                            ))
                        : file.length > 0 &&
                          file?.map((file, index) => (
                            <div
                              key={index}
                              style={{
                                position: "relative",
                                marginLeft: "50px",
                              }}
                            >
                              <p
                                onClick={() => handleOpenFile(file)}
                                style={{ cursor: "pointer" }}
                              >
                                {file?.name?.substr(0, 5)}
                                {file?.name?.length > 5 ? "..." : null}
                              </p>
                              <CloseIcon
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  left: "64px",
                                  top: "-2px",
                                }}
                                onClick={() => deleteFile(index)}
                              />
                            </div>
                          ))} */}

                      {file.length > 0 &&
                        file?.map((file, index) => (
                          <div
                            key={index}
                            style={{ position: "relative", marginLeft: "50px" }}
                          >
                            <p
                              onClick={() => handleOpenFile(file)}
                              style={{ cursor: "pointer" }}
                            >
                              {file?.name?.substr(0, 5)}
                              {file?.name?.length > 5 ? "..." : null}
                            </p>
                            <CloseIcon
                              style={{
                                cursor: "pointer",
                                position: "absolute",
                                left: "64px",
                                top: "-2px",
                              }}
                              onClick={() => deleteFile(index)}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <hr />
                  <Row>
                    <Col lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Residents center Welcome Email
                        </label>

                        <label
                          className="heading-small text-muted mb-4"
                          htmlFor="input-address"
                        >
                          we send a welcome Email to anyone without Resident
                          Center access
                        </label>
                      </FormGroup>
                    </Col>

                    <FormGroup>
                      <FormControlLabel
                        control={<Switch color="primary" />}
                        // label="End"
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </Row>
                  {/* <Button
                  color="primary"
                  href="#rms"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                  style={{ background: "green" }}
                >
                  Save

                </Button> */}
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      background: "green",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      leaseFormik.handleSubmit();
                    }}
                  >
                    {id ? "Update Lease" : "Add Lease"}
                  </Button>
                  <Button
                    color="primary"
                    href="#rms"
                    onClick={handleCloseButtonClick}
                    // size="sm"
                    className="btn btn-primary"
                    style={{
                      background: "white",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RentRollLeaseig;
