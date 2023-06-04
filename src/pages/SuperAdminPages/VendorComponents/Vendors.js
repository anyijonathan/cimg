import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Searchbar from "../../../components/Searchbar";
import Status from "../../../components/Status";
import { Pagination } from "@windmill/react-ui";
import CreateModal from "../../../components/Modals/CreateModal";
import ActionModal from "../../../components/Modals/ActionModal";
import Notification from "../../../components/Notification";
import {
	getAllVendors,
	addVendor,
	editVendor,
	enableVendor,
	disableVendor,
	archiveVendor,
	unArchiveVendor,
	getVendorInfo,
	setAllVendorsList,
	setPendingVendorsList,
	setApprovedVendorsList,
	setDeclinedVendorsList,
	getAllPendingVendors,
	getAllActiveVendors,
	getAllArchivedVendors,
} from "../../../Redux/Slices/vendorSlice";
import { filterHelper } from "../../../utils/HelperFunction";
import { getVendor } from "../../../Redux/Slices/vendorSlice";
import { useDispatch, useSelector } from "react-redux";
import PendingVendors from "./PendingVendors";
import ApprovedVendors from "./ApprovedVendors";
import DeclinedVendors from "./DeclinedVendors";
import { userSelector } from "../../../Redux/Slices/authSlice";
import { setAllTelcosList } from "../../../Redux/Slices/telcoSlice";

const Vendors = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { emailAddress, userRole } = useSelector(userSelector);

	const [vendorList, setVendorList] = useState([]);
	const [pendingVendorList, setPendingVendorList] = useState([]);
	const [activeVendorList, setActiveVendorList] = useState([]);
	const [declinedVendorList, setDeclinedVendorList] = useState([]);

	const [page, setPage] = useState(1);
	const resultsPerPage = 5;
	const totalResults = vendorList.length;

	const allVendors = useSelector(
		(state) => state.vendorModule.allVendorsList
	);

	let paginatedVendors = allVendors.slice(
		(page - 1) * resultsPerPage,
		page * resultsPerPage
	);

	const [generalStates, setGeneralStates] = useState({
		isCreateModalOpen: false,
		isActionModalOpen: false,
		actionReceiver: "",
		actionType: "",
		modalHeader: "Add Vendor",
		notificationText: "",
		status: "",
		isLoading: false,
		buttonText: "Add vendor",
		disabled: false,
		totalResults: 0,
	});

	const [data, setData] = useState([]);
	const [id, setId] = useState(null);
	const [openTab, setOpenTab] = useState(1);

	const [vendorInfo, setVendorInfo] = useState({
		vendorName: "",
		description: "",
	});

	const [userId, setUserId] = useState(null);
	const [hidePagination, setHidePagination] = useState(false);

	function openCreateModal() {
		setGeneralStates((prevState) => ({
			...prevState,
			isCreateModalOpen: true,
		}));
		resetVendorForm();
	}

	function closeCreateModal() {
		setGeneralStates((prevState) => ({
			...prevState,
			isCreateModalOpen: false,
		}));
	}

	async function openEditModal(id, vendorTag) {
		setUserId(id);
		try {
			let responseData = await getVendorInfo(
				vendorTag,
				emailAddress,
				userRole
			);
			setVendorInfo((prevState) => ({
				...prevState,
				vendorName: responseData.data.vendorName,
				description: responseData.data.vendorDescription,
			}));
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText:
					"couldn't get Vendor Info, kindly refresh page",
			}));
		}
		setGeneralStates((prevState) => ({
			...prevState,
			isCreateModalOpen: true,
			modalHeader: "Edit Vendor",
			buttonText: "Edit Vendor",
		}));
		// resetVendorForm();
	}

	function openEnableVendorModal(id) {
		setUserId(id);

		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "enable",
			actionReceiver: "vendor",
			isActionModalOpen: true,
		}));
	}

	function openDisableVendorModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "disable",
			actionReceiver: "vendor",
			isActionModalOpen: true,
		}));
	}

	function openArchiveVendorModal(id) {
		setUserId(id);

		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "archive",
			actionReceiver: "vendor",
			isActionModalOpen: true,
		}));
	}

	function openUnarchiveVendorModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "unarchive",
			actionReceiver: "vendor",
			isActionModalOpen: true,
		}));
	}

	function closeActionModal() {
		setGeneralStates((prevState) => ({
			...prevState,
			isActionModalOpen: false,
		}));
	}

	function openApproveViewModal(id) {
		setUserId(id);

		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "approve",
			actionReceiver: "vendor",
			isActionModalOpen: true,
		}));
	}

	function openDeclineViewModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "decline",
			actionReceiver: "vendor",
			isActionModalOpen: true,
		}));
	}
	// GETTING DATA ON PAGE LOAD
	const fetchVendorList = async () => {
		try {
			let responseData = await getAllVendors(emailAddress, userRole);

			setVendorList(responseData.dataList);
			dispatch(setAllVendorsList(responseData.dataList));
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				setStatus: "failure",
				setNotificationText:
					"couldn't fetch User list, kindly refresh page",
			}));
		}
	};

	// GETTING PENDING VENDORS ON PAGE LOAD
	const fetchPendingVendorList = async () => {
		try {
			let responseData = await getAllPendingVendors(
				emailAddress,
				userRole
			);
			setPendingVendorList(responseData.dataList);

			dispatch(setPendingVendorsList(responseData.dataList));
			setData(
				responseData.dataList.slice(
					(page - 1) * resultsPerPage,
					page * resultsPerPage
				)
			);
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				setStatus: "failure",
				setNotificationText:
					"couldn't fetch User list, kindly refresh page",
			}));
		}
	};

	// GETTING APPROVED VENDORS ON PAGE LOAD
	const fetchApprovedVendorList = async () => {
		try {
			let responseData = await getAllActiveVendors(
				emailAddress,
				userRole
			);
			setActiveVendorList(responseData.dataList);

			setGeneralStates((prevState) => ({
				...prevState,
				totalResults: responseData.dataList.length,
			}));

			dispatch(setApprovedVendorsList(responseData.dataList));
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				setStatus: "failure",
				setNotificationText:
					"couldn't fetch User list, kindly refresh page",
			}));
		}
	};

	// GETTING DECLINED DATA ON PAGE LOAD
	const fetchDeclinedVendorList = async () => {
		try {
			let responseData = await getAllArchivedVendors(
				emailAddress,
				userRole
			);
			setDeclinedVendorList(responseData.dataList);

			dispatch(setDeclinedVendorsList(responseData.dataList));
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				setStatus: "failure",
				setNotificationText:
					"couldn't fetch User list, kindly refresh page",
			}));
		}
	};

	useEffect(() => {
		fetchVendorList();
	}, [page]);

	// pagination change control
	function onPageChange(p) {
		setPage(p);
	}

	const handleVendorInfoChange = (e) => {
		const { value } = e.target;
		setVendorInfo({
			...vendorInfo,
			[e.target.name]: value,
		});
	};

	// FUNCTION TO RESET VENDOR FORM FIELDS TO EMPTY STRING
	const resetVendorForm = () => {
		setVendorInfo((prevState) => ({
			...prevState,
			vendorName: "",
			description: "",
		}));
	};

	// FUNCTION HANDLING NEW VENDOR CREATION
	async function createVendor(id) {
		const data = {
			vendorName: vendorInfo.vendorName,
			description: vendorInfo.description,
			approvedStatus: 2, //default approvedStatus for new vendor is 2 i.e inactive
		};

		try {
			setGeneralStates((prevState) => ({
				...prevState,
				disabled: true,
				isLoading: true,
				buttonText: "creating new user...",
			}));

			const responseData = await addVendor(data, emailAddress, userRole);
			if (responseData.code === "00") {
				setGeneralStates((prevState) => ({
					...prevState,
					isCreateModalOpen: false,
					status: "success",
					notificationText: "Vendor added successfully",
				}));
				resetVendorForm();
				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Add vendor",
					}));
					fetchVendorList();
					fetchPendingVendorList();
				}, 4000);
			} else {
				setGeneralStates((prevState) => ({
					...prevState,
					isCreateModalOpen: false,
					status: "failure",
					notificationText: responseData.description,
				}));

				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Add vendor",
					}));
					fetchVendorList();
				}, 4000);
			}
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText: error,
			}));
		}
	}

	// FUNCTION HANDLING EDIT VENDOR
	async function editCreatedVendor(id) {
		const data = {
			id: id,
			vendorName: vendorInfo.vendorName,
			description: vendorInfo.description,
			// approvedStatus: 2, //default approvedStatus for new vendor is 2
		};

		try {
			resetVendorForm();
			setGeneralStates((prevState) => ({
				...prevState,
				disabled: true,
				isLoading: false,
				buttonText: "saving changes...",
			}));

			const responseData = await editVendor(data, emailAddress, userRole);
			if (responseData.code === "00") {
				setGeneralStates((prevState) => ({
					...prevState,
					isCreateModalOpen: false,
					status: "success",
					notificationText: "Vendor edited successfully",
				}));
				resetVendorForm();

				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Edit Vendor",
					}));
					fetchVendorList();
					fetchPendingVendorList();
				}, 2000);
			} else {
				setGeneralStates((prevState) => ({
					...prevState,
					isCreateModalOpen: false,
					status: "failure",
					notificationText: responseData.description,
				}));
				resetVendorForm();

				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Edit Vendor",
					}));
					fetchVendorList();
					fetchPendingVendorList();
				}, 2000);
			}
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText: error,
			}));
		}
	}

	// FUNCTION HANDLING ENABLE VENDOR
	async function enableCreatedVendor(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await enableVendor(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchVendorList();
			fetchPendingVendorList();
			fetchApprovedVendorList();
		} catch (error) {
			console.log(error);
		}
	}

	// FUNCTION HANDLING DISABLE VENDOR
	async function disableCreatedVendor(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await disableVendor(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchVendorList();
			fetchPendingVendorList();
		} catch (error) {
			console.log(error);
		}
	}

	// FUNCTION HANDLING ARCHIVE VENDOR
	async function archiveCreatedVendor(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await archiveVendor(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchVendorList();
			fetchDeclinedVendorList();
		} catch (error) {
			console.log(error);
		}
	}

	// FUNCTION HANDLING UNARCHIVE VENDOR
	async function unArchiveCreatedVendor(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await unArchiveVendor(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchVendorList();
			fetchPendingVendorList();
		} catch (error) {
			console.log(error);
		}
	}

	//FUNCTION TO SELECT CREATE MODAL FUNCTION
	const createModalFunction = async (id) => {
		if (generalStates.modalHeader === "Edit Vendor") {
			await editCreatedVendor(id);
		} else if (generalStates.modalHeader === "Add Vendor") {
			await createVendor(id);
		}
	};

	//FUNCTION TO SELECT ACTION MODAL FUNCTION
	const actionModalFunction = async (id) => {
		if (generalStates.actionType === "enable") {
			await enableCreatedVendor(id);
		} else if (generalStates.actionType === "disable") {
			await disableCreatedVendor(id);
		} else if (generalStates.actionType === "archive") {
			await archiveCreatedVendor(id);
		} else if (generalStates.actionType === "unarchive") {
			await unArchiveCreatedVendor(id);
		}
	};

	const setTabOne = () => {
		setOpenTab(1);
	};

	const setTabTwo = () => {
		setOpenTab(2);
	};

	const setTabThree = () => {
		setOpenTab(3);
	};

	const setTabFour = () => {
		setOpenTab(4);
	};

	// FUNCTION TO VIEW VENDOR INFO
	const viewVendorInfo = async (vendorTag) => {
		try {
			let responseData = await getVendorInfo(
				vendorTag,
				emailAddress,
				userRole
			);
			dispatch(getVendor(responseData));
			history.push("/app/admin/vendors/vendor-info");
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText:
					"couldn't get Vendor Info, kindly refresh page",
			}));
		}
	};

	// FUNCTION TO GET EDIT VENDOR INFO
	const editVendorInfo = async (vendorTag) => {};

	// FUNCTION TO FILTER VENDOR LISt by SEARCH iNPUT

	const filterVendorList = (searchFieldValue) => {
		let filteredResult = filterHelper(vendorList, searchFieldValue);

		if (searchFieldValue !== "") {
			dispatch(setAllVendorsList(filteredResult));
			setHidePagination(true);
		} else if (searchFieldValue === "") {
			setHidePagination(false);
			fetchVendorList();
		}
	};

	return (
		<div className="font-circular-std">
			<Notification
				notificationText={generalStates.notificationText}
				status={generalStates.status}
			/>
			<h2 className="text-xl font-bold text-black-secondary pb-9">
				Manage Vendors
			</h2>
			{/* ---------------------------------------------- Modals ------------------------------------------- */}

			<CreateModal
				label="Vendor Name"
				onClose={closeCreateModal}
				show={generalStates.isCreateModalOpen}
				modalHeader={generalStates.modalHeader}
				placeholderLabel="Description"
				buttonText={generalStates.buttonText}
				placeholderDescription="Enter description"
				modalAction={() => createModalFunction(userId)}
				onFormChange={handleVendorInfoChange}
				onTextAreaChange={handleVendorInfoChange}
				isLoading={generalStates.isLoading}
				disabled={generalStates.disabled}
				inputName="vendorName"
				textareaName="description"
				inputValue={vendorInfo.vendorName}
				textAreaValue={vendorInfo.description}
			/>

			<ActionModal
				onClose={closeActionModal}
				show={generalStates.isActionModalOpen}
				modalClose={closeActionModal}
				actionReceiver={generalStates.actionReceiver}
				actionType={generalStates.actionType}
				modalAction={() => actionModalFunction(userId)}
				objectId={id}
			/>
			{/*   ------------------------------------------- Modals ----------------------------------------------------  */}

			<div className="col-span-6 h-[27.1875rem] bg-white">
				{/*   --------------------------------------------- TAB Header ------------------------------------------------------------- */}
				<div className="flex w-full justify-end p-4">
					<div className="flex">
						<button
							onClick={openCreateModal}
							className="p-3 border border-purple-secondary rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200 ease-in-out duration-150"
						>
							<p className="linear-gradient-text text-sm font-normal">
								Add new vendor
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
								All Vendors
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
								Pending Approvals
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
								Approved Changes
							</button>
							<hr
								className={`${
									openTab === 3
										? "border-purple-900 ml-6"
										: ""
								}`}
							/>
						</li>

						<li>
							<button
								href=""
								onClick={setTabFour}
								className={`${
									openTab === 4
										? "text-purple-primary"
										: "text-black-secondary opacity-70"
								}  inline-flex items-center pl-6 w-full h-12 text-sm font-normal transition-colors duration-150`}
							>
								Declined Changes
							</button>
							<hr
								className={`${
									openTab === 4
										? "border-purple-900 ml-6"
										: ""
								}`}
							/>
						</li>
						<hr />
					</ul>
					<hr className="px-6" />
				</div>

				{/* ---------------------------------------------------------ALL VENDORS Tab START ------------------------------------------------------------- */}
				<div className={openTab === 1 ? "block" : "hidden"}>
					<div className="flex justify-between w-full h-[4.8125rem] items-center px-6">
						<div className="flex">
							<Searchbar
								onChange={(e) => {
									e.preventDefault();
									filterVendorList(e.target.value);
								}}
								placeholder="Search vendor"
							/>
						</div>
					</div>
					<div className="overflow-x-auto relative bg-white pl-6 pr-14 pb-2 rounded-lg">
						<table className="w-full text-sm text-left text-gray-500">
							<thead className="text-sm text-black-primary opacity-70 bg-dashboard-background">
								<tr>
									<th scope="col" className="py-3 px-6">
										Vendor name
									</th>
									<th scope="col" className="py-3 px-6">
										Status
									</th>
									<th scope="col" className="py-3 px-6">
										Actions
									</th>
									<th scope="col" className="py-3 px-6"></th>
								</tr>
							</thead>
							<tbody>
								{paginatedVendors.map((vendor) => (
									<tr
										key={vendor.id}
										className="bg-white border-b"
									>
										<td className="py-6 px-6 font-sm text-black-secondary whitespace-nowrap">
											{vendor.vendorName}
										</td>

										<td className="py-6 px-6 text-green-primary">
											{vendor.approvedStatus === 0 && (
												<Status pending />
											)}
											{vendor.approvedStatus === 1 && (
												<Status active />
											)}
											{vendor.approvedStatus === 2 && (
												<Status inactive />
											)}
											{vendor.approvedStatus === 4 && (
												<Status archived />
											)}
										</td>
										<td className="py-6 px-6 text-red-primary">
											<section className="flex justify-between">
												<button
													onClick={() =>
														openEditModal(
															vendor.id,
															vendor.vendorName
														)
													}
													className="text-base font-[450] text-purple-primary"
												>
													Edit
												</button>
												{/*  --------------------------------------------------------------------------------------------------------------------------------   */}
												{vendor.approvedStatus === 0 ||
												vendor.approvedStatus === 4 ? (
													<button
														disabled
														onClick={() =>
															vendor.approvedStatus ===
															2
																? openEnableVendorModal(
																		vendor.id
																  )
																: openDisableVendorModal(
																		vendor.id
																  )
														}
														className={`text-base font-[450] text-black-secondary opacity-30`}
													>
														{vendor.approvedStatus ===
														2
															? "Enable"
															: "Disable"}
													</button>
												) : (
													<button
														onClick={() =>
															vendor.approvedStatus ===
															2
																? openEnableVendorModal(
																		vendor.id
																  )
																: openDisableVendorModal(
																		vendor.id
																  )
														}
														className={`text-base font-[450] text-green-primary`}
													>
														{vendor.approvedStatus ===
														2
															? "Enable"
															: "Disable"}
													</button>
												)}

												{/* ------------------------------------------------------------------------------------------------------------------------------- */}
												<button
													onClick={() =>
														vendor.approvedStatus ===
														4
															? openUnarchiveVendorModal(
																	vendor.id
															  )
															: openArchiveVendorModal(
																	vendor.id
															  )
													}
													className="text-base font-[450] text-purple-primary"
												>
													{vendor.approvedStatus === 4
														? "Unarchive"
														: "Archive"}
												</button>
											</section>
										</td>
										<td className="py-6 px-6 text-red-primary text-center">
											<button
												onClick={() =>
													viewVendorInfo(
														vendor.vendorName
													)
												}
												className="text-base font-[450] underline linear-gradient-text"
											>
												View vendor info
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{hidePagination === false && (
							<Pagination
								totalResults={totalResults}
								resultsPerPage={resultsPerPage}
								label="Table navigation"
								onChange={onPageChange}
							/>
						)}
					</div>
				</div>
				{/* --------------------------------------------------------------------ALL VENDORS TAB END------------------------------------------ */}

				{/* ---------------------------------------------------------PENDING APPROVAL START TAB ------------------------------------------------------------- */}
				<div className={openTab === 2 ? "block" : "hidden"}>
					<PendingVendors />
				</div>
				{/* -------------------------------------------------------------------PENDING APPROVAL TAB END-------------------------------------- */}

				{/* ---------------------------------------------------------APPROVED Tab START ------------------------------------------------------------- */}
				<div className={openTab === 3 ? "block" : "hidden"}>
					<ApprovedVendors />
				</div>
				{/*  ................................................................................................................................... */}
				<div className={openTab === 4 ? "block" : "hidden"}>
					<DeclinedVendors />
				</div>
				{/* ------------------------------------------------------------APPROVED TAB END-------------------------------------- */}
			</div>
		</div>
	);
};

export default Vendors;
