import React, { useEffect, useState } from "react";
import Status from "../../../components/Status";
import Notification from "../../../components/Notification";
import { Modal } from "flowbite-react";
import Button from "../../../components/Button";
import FormSelect from "../../../components/FormSelect";
import Searchbar from "../../../components/Searchbar";
import PendingVendorTelco from "./PendingVendorTelco";
import ApprovedVendorTelco from "./ApprovedVendorTelco";
import RejectedTelcoVendor from "./RejectedTelcoVendor";
import {
	CreateVendorTelcoMap,
	getAllPendingMapping,
	setPendingList,
	SwitchTelcoToVendor,
} from "../../../Redux/Slices/mappingSlice";
import { userSelector } from "../../../Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../components/FormInput";
import { getAllActiveVendors } from "../../../Redux/Slices/vendorSlice";
import { getAllActiveTelcos } from "../../../Redux/Slices/telcoSlice";
import { Pagination } from "@windmill/react-ui";

const VendorTelco = () => {
	let telcoType = [
		{
			id: 0,
			value: "",
			name: "Select Telco",
		},
	];

	let vendorType = [
		{
			id: 0,
			value: "",
			name: "Select Vendor",
		},
	];

	const dispatch = useDispatch;
	const { emailAddress, userRole } = useSelector(userSelector);

	
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [notificationText, setNotificationText] = useState("")
  const [status, setStatus] = useState("");
  const [modalNotificationText, setModalNotificationText] = useState("")
  const [modalStatus, setModalStatus] = useState("");
  const [openTab, setOpenTab] = useState(1);
  const [mappingList, setMappingList] = useState([])
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

	const [vendorOptions, setVendorOptions] = useState(vendorType);
	const [telcoOptions, setTelcoOptions] = useState(telcoType);
	const [vendorId, setVendorId] = useState();
	const [telcoId, setTelcoId] = useState();
	const [telcoName, setTelcoName] = useState("");
	const [page, setPage] = useState(1);

  function openMapModal() {
    setVendorId("")
    setTelcoId("")
    setIsCreateModalOpen(true)
    setModalNotificationText("")
    setModalStatus("")
  }

	function closeMapModal() {
		setIsCreateModalOpen(false);
	}

	function openUpdateModal(id, telcoName) {
		setIsUpdateModalOpen(true)
		setTelcoId(id)
		setTelcoName(telcoName)
	  }

	function closeUpdateModal() {
		setIsUpdateModalOpen(false);
	}

	const setTabOne = () => {
		setOpenTab(1);
	};

	const setTabTwo = () => {
		setOpenTab(2);
	};

	const setTabThree = () => {
		setOpenTab(3);
	};

	const handleVendorChange = (e) => {
		let { value } = e.target;
		setVendorId(value);
	};

	const handleTelcoChange = (e) => {
		let { value } = e.target;
		setTelcoId(value);
	};

	
	const getPendingMappings = async () => {
		try {
			const response = await getAllPendingMapping(emailAddress, userRole);
			if (response.code === "00") {
				dispatch(setPendingList(response.dataList));
			} else {
				setStatus("failure");
				setNotificationText("error fetching pending mappings");
			}
		} catch (error) {
	
		}
	};

   const createMap = async () =>{
    const data = {
      "telcoId": telcoId,
      "vendorId": vendorId
  }
    try{
      setDisabled(true)
      setIsLoading(true)
 
      let response =  await CreateVendorTelcoMap(data, emailAddress, userRole)
      if (response.code === "00"){
       setModalStatus("success")
      setModalNotificationText("Telco/vendor map created successfully, refresh to view new mapping")
      setDisabled(false)
      setIsLoading(false)
	  getPendingMappings()
 

      setTimeout(() => {
        setModalStatus("")
        setModalNotificationText("")
        setIsCreateModalOpen(false)
        setVendorId("")
        setTelcoId("")
      }, 2000); 
    }
    else {
      setModalStatus("failure")
      setModalNotificationText(response.description)
      setDisabled(false)
      setIsLoading(false)
    }
    
  }

    catch(error){
      setDisabled(false)
      setIsLoading(false)
      setModalStatus("failure")
      setModalNotificationText("an error occured, please try again")
    }
  } 

  const switchVendor = async () =>{
    const data = {
      "telcoId": telcoId,
      "vendorId": vendorId
  }
    try{
      setDisabled(true)
      setIsLoading(true)
 
      let response =  await SwitchTelcoToVendor(data, emailAddress, userRole)
      setModalStatus("success")
      setModalNotificationText("vendor switch successful")
      setDisabled(false)
      setIsLoading(false)
      getPendingMappings()
 

      setTimeout(() => {
        setModalStatus("")
        setModalNotificationText("")
        setIsUpdateModalOpen(false)
        setVendorId("")
        setTelcoId("")
      }, 2000);
    }

  
    catch(error){
      setDisabled(false)
      setIsLoading(false)
      setModalStatus("failure")
      setModalNotificationText("an error occured, please try again")
    }
  }

  const fetchVendorList = async () => {

    try {
		let newOptions = {};
		let newVendorOptions = [...vendorType];
      let responseData = await getAllActiveVendors(emailAddress, userRole);
      responseData.dataList.filter((vendor) => {
        newOptions.id = vendor.id;
        newOptions.name = vendor.vendorName;
        newOptions.value = vendor.id;
        newVendorOptions.push(newOptions);
        newOptions = {};
        return newVendorOptions;
      });
      setVendorOptions(newVendorOptions);
    } catch (error) {
      setStatus("failure");
      setNotificationText("an error occured");
    }
  };

	const fetchTelcoList = async () => {
	
		try {
			let newOptions = {};
			let newTelcoOptions = [...telcoType];
			let responseData = await getAllActiveTelcos();
			responseData.dataList.filter((telco) => {
				newOptions.id = telco.id;
				newOptions.name = telco.telcoName;
				newOptions.value = telco.id;
				newTelcoOptions.push(newOptions);
				newOptions = {};
				return newTelcoOptions;
			});
			setTelcoOptions(newTelcoOptions);
		} catch (error) {
			setStatus("failure");
			setNotificationText("an error occured");
		}
	};



	useEffect(() => {
		fetchVendorList();
		fetchTelcoList();
	}, []);



	// pagination change control
	function onPageChange(p) {
		setPage(p);
	}

	return (
		<div className="font-circular-std">
			<Notification notificationText={notificationText} status={status} />
			<h2 className="text-xl font-bold text-black-secondary pb-9">
				Telco/Vendor Mapping
			</h2>

			{/* ---------------------------------------------- Modals ------------------------------------------- */}
			<Modal
				show={isCreateModalOpen}
				onClose={closeMapModal}
				popup="true"
				size="lg"
				position="center"
			>
				<Modal.Header>
					<div className="p-6">
						<h3 className="w-[90%] text-lg font-bold text-black-secondary">
							Create a new mapping
						</h3>
					</div>
					<div className="md:w-[27.75rem] pb-10">
						<hr />
					</div>
					<Notification
						className="md:sticky md:ml-8"
						notificationText={modalNotificationText}
						status={modalStatus}
					/>
				</Modal.Header>

				<Modal.Body>
					<div className="space-y-6">
						<FormSelect
							className="w-full md:w-[27.25rem] h-12"
							label="Select a Telco"
							onChange={handleTelcoChange}
							options={telcoOptions}
							value={telcoId}
						/>
						<FormSelect
							className="w-full md:w-[27.25rem] h-12"
							label="Select a Vendor"
							onChange={handleVendorChange}
							options={vendorOptions}
							value={vendorId}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex justify-between w-full">
						<Button
							isLoading={isLoading}
							disabled={disabled}
							onClick={createMap}
						>
							Create Mapping
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			{/* ------------------------------------------------------------------------------------------------------------------------------- */}

			<Modal
				show={isUpdateModalOpen}
				onClose={closeUpdateModal}
				popup={true}
				size="lg"
				position="center"
			>
				<Modal.Header>
					<div className="p-6">
						<h3 className="w-[90%] text-lg font-bold text-black-secondary">
							Update Mapping
						</h3>
					</div>
					<Notification
						className="md:sticky md:ml-8"
						notificationText={modalNotificationText}
						status={modalStatus}
					/>
					<div className="md:w-[27.75rem] pb-10">
						<hr />
					</div>
				</Modal.Header>

				<Modal.Body>
					<div className="space-y-6">
						<FormInput
							className="w-full md:w-[27.25rem] h-12 mb-12 text-black-40"
							label="Telco Name"
							value={telcoName || ""}
							readOnly
						/>

						<FormSelect
							className="w-full md:w-[27.25rem] h-12 mt-4"
							label="Select a Vendor"
							value={vendorId}
							onChange={handleVendorChange}
							options={vendorOptions}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex justify-between w-full">
						<Button
							isLoading={isLoading}
							disabled={disabled}
							onClick={switchVendor}
						>
							Update Mapping
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			{/*   ------------------------------------------- Modals ----------------------------------------------------  */}

			<div className="col-span-6 h-[27.1875rem] bg-white">
				{/*   --------------------------------------------- TAB Header ------------------------------------------------------------- */}
				<div className="w-full  pt-8">
					<div className="flex justify-end pr-4">
						<button
							onClick={openMapModal}
							className="p-3 border border-purple-secondary rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200 ease-in-out duration-150"
						>
							<p className="linear-gradient-text text-sm font-normal">
								Create a new mapping
							</p>
						</button>
					</div>
				</div>
				<div className="w-full px-4 pb-4">
					<ul className="pt-4 pl-4 flex justify-between">
	
						<li>
							<button
								href=""
								onClick={setTabOne}
								className={`${
									openTab === 1
										? "text-purple-primary"
										: "text-black-secondary opacity-70"
								}  inline-flex items-center pl-6 w-full h-12 text-sm font-normal transition-colors duration-150`}
							>
								Pending Approvals
							</button>
							<hr
								className={`${
									openTab === 1
										? "border-purple-900 ml-6"
										: ""
								}`}
							/>
						</li>

						<li>
							<button
								href=""
								onClick={setTabTwo}
								className={`${
									openTab === 2
										? "text-purple-primary"
										: "text-black-secondary opacity-70"
								}  inline-flex items-center pl-6 w-full h-12 text-sm font-normal transition-colors duration-150`}
							>
								Approved Changes
							</button>
							<hr
								className={`${
									openTab === 2
										? "border-purple-900 ml-6"
										: ""
								}`}
							/>
						</li>

						<li>
							<button
								href=""
								onClick={setTabThree}
								className={`${
									openTab === 3
										? "text-purple-primary"
										: "text-black-secondary opacity-70"
								}  inline-flex items-center pl-6 w-full h-12 text-sm font-normal transition-colors duration-150`}
							>
								Declined Changes
							</button>
							<hr
								className={`${
									openTab === 3
										? "border-purple-900 ml-6"
										: ""
								}`}
							/>
						</li>
						<hr />
					</ul>
					<hr className="px-6" />
				</div>


				{/* ---------------------------------------------------------pending approvals Tab START ------------------------------------------------------------- */}
				<div className={openTab === 1 ? "block" : "hidden"}>
					<PendingVendorTelco />
				</div>
				{/* --------------------------------------------------------------------Pending approval------------------------------------------ */}

				{/* ---------------------------------------------------------approved Tab START ------------------------------------------------------------- */}
				<div className={openTab === 2 ? "block" : "hidden"}>
					<ApprovedVendorTelco />
				</div>
				{/* --------------------------------------------------------------------approved end------------------------------------------ */}

				{/* ---------------------------------------------------------declined start ------------------------------------------------------------- */}
				<div className={openTab === 3 ? "block" : "hidden"}>
					<RejectedTelcoVendor />
				</div>
				{/* --------------------------------------------------------------------declined end------------------------------------------ */}
			</div>
		</div>
	);
};

export default VendorTelco;
