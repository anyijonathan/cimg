import React, { useState, useEffect } from "react";
import Searchbar from "../../../components/Searchbar";
import Status from "../../../components/Status";
import CreateModal from "../../../components/Modals/CreateModal";
import ActionModal from "../../../components/Modals/ActionModal";
import Notification from "../../../components/Notification";
import { Pagination } from "@windmill/react-ui";
import {
	getAllTelcos,
	addTelco,
	editTelco,
	enableTelco,
	disableTelco,
	archiveTelco,
	unArchiveTelco,
	approveCreatedTelco,
	declineCreatedTelco,
	getTelcoInfo,
	getAllPendingTelcos,
	getAllRejectedTelcos,
	getAllArchivedTelcos,
	getAllActiveTelcos,
	getTelco,
	setAllTelcosList,
	setPendingList,
	setApprovedList,
	setDeclinedList,
} from "../../../Redux/Slices/telcoSlice";
import ApprovedTelcos from "./ApprovedTelcos";
import PendingTelcos from "./PendingTelcos";
import DeclinedTelcos from "./DeclinedTelcos";
import { filterHelper } from "../../../utils/HelperFunction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userSelector } from "../../../Redux/Slices/authSlice";

const Telcos = () => {
	const [telcoList, setTelcoList] = useState([]);
	const [pendingTelcoList, setPendingTelcoList] = useState([]);
	const [activeTelcoList, setActiveTelcoList] = useState([]);
	const [declinedTelcoList, setDeclinedTelcoList] = useState([]);

	const [page, setPage] = useState(1);
	const resultsPerPage = 5;
	const totalResults = telcoList.length;

	const history = useHistory();
	const dispatch = useDispatch();
	const { emailAddress, userRole } = useSelector(userSelector);

	const allTelcos = useSelector((state) => state.telcoModule.allTelcoList);

	let paginatedTelcos = allTelcos.slice(
		(page - 1) * resultsPerPage,
		page * resultsPerPage
	);

	const [generalStates, setGeneralStates] = useState({
		isCreateModalOpen: false,
		isActionModalOpen: false,
		actionReceiver: "",
		actionType: "",
		modalHeader: "Add Telco",
		notificationText: "",
		status: "",
		isLoading: false,
		buttonText: "Create User",
		disabled: false,
	});

	const [id, setId] = useState(null);
	const [telcoInfo, setTelcoInfo] = useState({
		telcoName: "",
		description: "",
	});

	const [userId, setUserId] = useState(null);
	const [hidePagination, setHidePagination] = useState(false);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [isActiveViewModalOpen, setIsActiveViewModalOpen] = useState(false);
	const [openTab, setOpenTab] = useState(1);

	function openCreateModal(id) {
		setGeneralStates((prevState) => ({
			...prevState,
			isCreateModalOpen: true,
			modalHeader: "Add Telco",
			buttonText: "Add Telco",
		}));
		resetTelcoForm();
		setUserId(id);
	}

	function closeCreateModal() {
		setGeneralStates((prevState) => ({
			...prevState,
			isCreateModalOpen: false,
		}));
	}

	async function openEditModal(id, telcoTag) {
		setUserId(id);

		try {
			let responseData = await getTelcoInfo(
				telcoTag,
				emailAddress,
				userRole
			);

			setTelcoInfo((prevState) => ({
				...prevState,
				telcoName: responseData.data.telco,
				description: responseData.data.description,
			}));
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText:
					"couldn't get Telco Info, kindly refresh page",
			}));
		}

		setGeneralStates((prevState) => ({
			...prevState,
			isCreateModalOpen: true,
			modalHeader: "Edit Telco",
			buttonText: "Edit Telco",
		}));
		// resetTelcoForm();
	}

	function closeActionModal() {
		setGeneralStates((prevState) => ({
			...prevState,
			isActionModalOpen: false,
		}));
	}

	function openActiveViewModal() {
		setIsActiveViewModalOpen(true);
	}

	function closeActiveViewModal() {
		setIsActiveViewModalOpen(false);
	}

	function openEnableTelcoModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "enable",
			actionReceiver: "telco",
			isActionModalOpen: true,
		}));
	}

	function openDisableTelcoModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "disable",
			actionReceiver: "telco",
			isActionModalOpen: true,
		}));
	}

	function openArchiveTelcoModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "archive",
			actionReceiver: "telco",
			isActionModalOpen: true,
		}));
	}

	function openUnArchiveTelcoModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "unarchive",
			actionReceiver: "telco",
			isActionModalOpen: true,
		}));
	}

	function openViewModal() {
		setIsViewModalOpen(true);
	}

	function closeViewModal() {
		setIsViewModalOpen(false);
	}

	function openApproveViewModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "approve",
			actionReceiver: "telco",
			isActionModalOpen: true,
		}));
	}

	function openDeclineViewModal(id) {
		setUserId(id);
		setGeneralStates((prevState) => ({
			...prevState,
			actionType: "decline",
			actionReceiver: "telco",
			isActionModalOpen: true,
		}));
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

	const setTabFour = () => {
		setOpenTab(4);
	};

	// GETTING ACTIVE TELCOS ON PAGE LOAD
	const fetchTelcoList = async () => {
		try {
			let responseData = await getAllTelcos(emailAddress, userRole);

			setTelcoList(responseData.dataList);
			dispatch(setAllTelcosList(responseData.dataList));
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				setStatus: "failure",
				setNotificationText:
					"couldn't fetch User list, kindly refresh page",
			}));
		}
	};

	// GETTING PENDING TELCOS ON PAGE LOAD
	const fetchPendingTelcoList = async () => {
		try {
			let responseData = await getAllPendingTelcos(
				emailAddress,
				userRole
			);
			setPendingTelcoList(responseData.dataList);
			dispatch(setPendingList(responseData.dataList));
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				setStatus: "failure",
				setNotificationText:
					"couldn't fetch User list, kindly refresh page",
			}));
		}
	};

	// GETTING ALL APPROVED TELCOS ON PAGE LOAD
	const fetchActiveTelcos = async () => {
		try {
			let responseData = await getAllActiveTelcos(emailAddress, userRole);

			console.log(responseData.dataList);
			setActiveTelcoList(responseData.dataList);
			dispatch(setApprovedList(responseData.dataList));
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				setStatus: "failure",
				setNotificationText:
					"couldn't fetch User list, kindly refresh page",
			}));
		}
	};

	// GETTING USER LIST ON PAGE LOAD
	const fetchDeclinedTelcoList = async (telcoList) => {
		try {
			let responseData = await getAllArchivedTelcos(
				emailAddress,
				userRole
			);

			setDeclinedTelcoList(responseData.dataList);
			dispatch(setDeclinedList(responseData.dataList));
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
		fetchTelcoList();
	}, [page]);

	// pagination change control
	function onPageChange(p) {
		setPage(p);
	}

	const handleTelcoInfoChange = (e) => {
		const { value } = e.target;
		setTelcoInfo({
			...telcoInfo,
			[e.target.name]: value,
		});
	};

	// FUNCTION TO RESET VENDOR FORM FIELDS TO EMPTY STRING
	const resetTelcoForm = () => {
		setTelcoInfo((prevState) => ({
			...prevState,
			telcoName: "",
			description: "",
		}));
	};

	// FUNCTION HANDLING CREATION OF NEW TELCO
	async function createTelco(id) {
		const data = {
			telcoName: telcoInfo.telcoName,
			description: telcoInfo.description,
			approvedStatus: 2, //default approvedStatus for new vendor is 2
		};

		try {
			setGeneralStates((prevState) => ({
				...prevState,
				disabled: true,
				isLoading: true,
				buttonText: "creating new user...",
			}));

			const responseData = await addTelco(data, emailAddress, userRole);
			if (responseData.code === "00") {
				setGeneralStates((prevState) => ({
					...prevState,
					isCreateModalOpen: false,
					status: "success",
					notificationText: "Telco1 added successfully",
				}));
				resetTelcoForm();
				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Create User",
					}));
				}, 4000);
				fetchTelcoList();
				fetchPendingTelcoList();
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
						buttonText: "Create User",
					}));
					fetchTelcoList();
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

	// FUNCTION HANDLING EDIT TELCO
	async function editCreatedTelco(id) {
		const data = {
			id: id,
			telcoName: telcoInfo.telcoName,
			description: telcoInfo.description,
			approvedStatus: 2, //default approvedStatus for new vendor is 2
		};

		try {
			resetTelcoForm();
			setGeneralStates((prevState) => ({
				...prevState,
				disabled: true,
				isLoading: false,
				buttonText: "saving changes...",
			}));

			const responseData = await editTelco(data, emailAddress, userRole);
			if (responseData.code === "00") {
				setGeneralStates((prevState) => ({
					...prevState,
					isCreateModalOpen: false,
					status: "success",
					notificationText: "Telco edited successfully",
				}));
				resetTelcoForm();

				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Edit Telco",
					}));
				}, 2000);
				fetchTelcoList();
				fetchPendingTelcoList();
			} else {
				setGeneralStates((prevState) => ({
					...prevState,
					isCreateModalOpen: false,
					status: "failure",
					notificationText: responseData.description,
				}));
				resetTelcoForm();
				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Edit Telco",
					}));
					fetchTelcoList();
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

	// FUNCTION HANDLING ENABLE TELCO
	async function enableCreatedTelco(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await enableTelco(id);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchTelcoList();
			fetchPendingTelcoList();
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText: error,
			}));
		}
	}

	// FUNCTION HANDLING DISABLE TELCO
	async function disableCreatedTelco(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await disableTelco(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchTelcoList();
			fetchDeclinedTelcoList();
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText: error,
			}));
		}
	}

	// FUNCTION HANDLING ARCHIVE TELCO
	async function archiveCreatedTelco(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await archiveTelco(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchTelcoList();
			fetchDeclinedTelcoList();
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText: error,
			}));
		}
	}

	// FUNCTION HANDLING UNARCHIVE TELCO
	async function unArchiveCreatedTelco(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await unArchiveTelco(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchTelcoList();
			fetchPendingTelcoList();
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText: error,
			}));
		}
	}

	// FUNCTION TO HANDLE APPROVE VENDOR
	async function approveTelco(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await approveCreatedTelco(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchTelcoList();
			fetchActiveTelcos();
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText: error,
			}));
		}
	}

	// FUNCTION TO HANDLE DECLINE VENDOR
	async function declineTelco(id) {
		try {
			setGeneralStates((prevState) => ({
				...prevState,
				isActionModalOpen: false,
				status: "success",
				notificationText: `${generalStates.actionReceiver} ${generalStates.actionType}d successfully`,
			}));

			await declineCreatedTelco(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchTelcoList();
			fetchDeclinedTelcoList();
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText: error,
			}));
		}
	}
	//FUNCTION TO SELECT CREATE MODAL FUNCTION
	const createModalFunction = async (id) => {
		if (generalStates.modalHeader === "Edit Telco") {
			await editCreatedTelco(id);
		} else if (generalStates.modalHeader === "Add Telco") {
			await createTelco(id);
		}
	};

	//FUNCTION TO SELECT ACTION MODAL FUNCTION
	const actionModalFunction = async (id) => {
		if (generalStates.actionType === "enable") {
			await enableCreatedTelco(id);
		} else if (generalStates.actionType === "disable") {
			await disableCreatedTelco(id);
		} else if (generalStates.actionType === "archive") {
			await archiveCreatedTelco(id);
		} else if (generalStates.actionType === "unarchive") {
			await unArchiveCreatedTelco(id);
		} else if (generalStates.actionType === "approve") {
			await approveTelco(id);
		} else if (generalStates.actionType === "decline") {
			await declineTelco(id);
		}
	};

	// FUNCTION TO FILTER VENDOR LISt by SEARCH iNPUT

	const filterTelcoList = (searchFieldValue) => {
		let filteredResult = filterHelper(telcoList, searchFieldValue);

		if (searchFieldValue !== "") {
			dispatch(setAllTelcosList(filteredResult));
			setHidePagination(true);
		} else if (searchFieldValue === "") {
			setHidePagination(false);
			fetchTelcoList();
		}
	};

	const viewTelcoInfo = async (telcoTag) => {
		try {
			let responseData = await getTelcoInfo(
				telcoTag,
				emailAddress,
				userRole
			);

			dispatch(getTelco(responseData));
			history.push("/app/admin/telcos/telco-info");
		} catch (error) {
			setGeneralStates((prevState) => ({
				...prevState,
				status: "failure",
				notificationText:
					"couldn't get Telco Info, kindly refresh page",
			}));
		}
	};

	return (
		<div className="font-circular-std">
			<Notification
				notificationText={generalStates.notificationText}
				status={generalStates.status}
			/>
			{/* ---------------------------------------------- Modals ------------------------------------------- */}

			<CreateModal
				label="Telco Name"
				onClose={closeCreateModal}
				show={generalStates.isCreateModalOpen}
				modalHeader={generalStates.modalHeader}
				placeholderLabel="Description"
				buttonText={generalStates.buttonText}
				placeholderDescription="Enter description"
				modalAction={() => createModalFunction(userId)}
				onFormChange={handleTelcoInfoChange}
				onTextAreaChange={handleTelcoInfoChange}
				isLoading={generalStates.isLoading}
				disabled={generalStates.disabled}
				inputName="telcoName"
				textareaName="description"
				inputValue={telcoInfo.telcoName}
				textAreaValue={telcoInfo.description}
			/>

			<ActionModal
				onClose={closeActionModal}
				show={generalStates.isActionModalOpen}
				modalClose={closeActionModal}
				actionReceiver={generalStates.actionReceiver}
				actionType={generalStates.actionType}
				modalAction={() => actionModalFunction(userId)}
			/>

			{/*   ------------------------------------------- Modals ----------------------------------------------------  */}

			<h2 className="text-xl font-bold text-black-secondary pb-9">
				Manage Telcos
			</h2>
			{/* -------------------------------------------------  TAB HEADING--------------------------------------------------------------------- */}
			<div className="flex w-full justify-end p-4">
				<div className="flex">
					<button
						onClick={openCreateModal}
						className="p-3 border border-purple-secondary rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200 ease-in-out duration-150"
					>
						<p className="linear-gradient-text text-sm font-normal">
							Add new telco
						</p>
					</button>
				</div>
			</div>
			<div className="col-span-6 h-[27.1875rem] bg-white">
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
								All Telcos
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
					</ul>
					<hr className="px-6" />
				</div>

				{/* ---------------------------------------------------------ALL TELCO TAB START ------------------------------------------------------------- */}
				<div className={openTab === 1 ? "block" : "hidden"}>
					<div className="flex justify-between w-full h-[4.8125rem] items-center px-6">
						<div className="flex">
							<Searchbar
								onChange={(e) => {
									e.preventDefault();
									filterTelcoList(e.target.value);
								}}
								placeholder="search telco"
							/>
						</div>
					</div>

					<div className="overflow-x-auto relative bg-white pl-6 pr-14 pb-2 rounded-lg">
						<table className="w-full text-sm text-left text-gray-500">
							<thead className="text-sm text-black-primary opacity-70 bg-dashboard-background">
								<tr>
									<th scope="col" className="py-3 px-6">
										Telco name
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
								{paginatedTelcos.map((telco) => (
									<tr
										key={telco.id}
										className="bg-white border-b"
									>
										<td className="py-6 px-6 font-sm text-black-secondary whitespace-nowrap">
											<div className="flex items-center">
												<p className="font-sm text-black-secondary pl-2">
													{telco.telcoName}
												</p>
											</div>
										</td>
										<td className="py-6 px-6 text-green-primary">
											{telco.approvedStatus === 0 && (
												<Status pending />
											)}
											{telco.approvedStatus === 1 && (
												<Status active />
											)}
											{telco.approvedStatus === 2 && (
												<Status inactive />
											)}
											{telco.approvedStatus === 4 && (
												<Status archived />
											)}
										</td>
										<td className="py-6 px-6 text-red-primary">
											<div className="flex justify-between">
												<button
													onClick={() =>
														openEditModal(
															telco.id,
															telco.telcoName
														)
													}
													className="text-base font-[450] text-purple-primary"
												>
													Edit
												</button>
												{/*  --------------------------------------------------------------------------------------------------------------------------------   */}
												{telco.approvedStatus === 0 ||
												telco.approvedStatus === 4 ? (
													<button
														disabled
														onClick={() =>
															telco.approvedStatus ===
															2
																? openEnableTelcoModal(
																		telco.id
																  )
																: openDisableTelcoModal(
																		telco.id
																  )
														}
														className={`text-base font-[450] text-black-secondary opacity-30`}
													>
														{telco.approvedStatus ===
														2
															? "Enable"
															: "Disable"}
													</button>
												) : (
													<button
														onClick={() =>
															telco.approvedStatus ===
															2
																? openEnableTelcoModal(
																		telco.id
																  )
																: openDisableTelcoModal(
																		telco.id
																  )
														}
														className={`text-base font-[450] text-green-primary`}
													>
														{telco.approvedStatus ===
														2
															? "Enable"
															: "Disable"}
													</button>
												)}
												{/* ------------------------------------------------------------------------------------------------------------------------------- */}
												<button
													onClick={() =>
														telco.approvedStatus ===
														4
															? openUnArchiveTelcoModal(
																	telco.id
															  )
															: openArchiveTelcoModal(
																	telco.id
															  )
													}
													className="text-base font-[450] text-purple-primary"
												>
													{telco.approvedStatus === 4
														? "Unarchive"
														: "Archive"}
												</button>
											</div>
										</td>
										<td className="py-6 px-6 text-red-primary text-center">
											<button
												onClick={() =>
													viewTelcoInfo(
														telco.telcoName
													)
												}
												className="text-base font-[450] underline linear-gradient-text"
											>
												View telco info
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
				{/* 
        .................................................................................................................... */}
				<div className={openTab === 2 ? "block" : "hidden"}>
					<PendingTelcos />
				</div>
				{/* -------------------------------------------------------------------PENDING APPROVAL TAB END-------------------------------------- */}

				{/* -------------------------------------------------------------------APPROVED CHANGES TAB START-------------------------------------- */}

				<div className={openTab === 3 ? "block" : "hidden"}>
					<ApprovedTelcos />
				</div>

				{/* -------------------------------------------------------------------DECLINED CHANGES TAB START-------------------------------------- */}

				<div className={openTab === 4 ? "block" : "hidden"}>
					<DeclinedTelcos />
				</div>
				{/* -------------------------------------------------------------------DECLINED CHANGES TAB END-------------------------------------- */}
				{/*  */}
			</div>
		</div>
	);
};

export default Telcos;
