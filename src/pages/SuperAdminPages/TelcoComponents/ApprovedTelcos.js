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
	getTelco,
	getAllArchivedTelcos,
	getAllActiveTelcos,
	setApprovedList,
	setDeclinedList,
	setPendingList,
	getAllPendingTelcos,
} from "../../../Redux/Slices/telcoSlice";
import { filterHelper } from "../../../utils/HelperFunction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userSelector } from "../../../Redux/Slices/authSlice";

const Telcos = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { emailAddress, userRole } = useSelector(userSelector);

	const [activeTelcoList, setActiveTelcoList] = useState([]);
	const [pendingTelcoList, setPendingTelcoList] = useState([]);
	const [declinedTelcoList, setDeclinedTelcoList] = useState([]);

	const [page, setPage] = useState(1);
	const resultsPerPage = 5;
	const totalResults = activeTelcoList.length;

	const approvedTelcos = useSelector((state) => state.telcoModule.approvedList);

	let paginatedTelcos = approvedTelcos.slice(
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
		}));
		resetVendorForm();
	}

	function closeCreateModal() {
		setGeneralStates((prevState) => ({
			...prevState,
			isCreateModalOpen: false,
		}));
	}

	function openEditModal(id) {
		setGeneralStates((prevState) => ({
			...prevState,
			isCreateModalOpen: true,
			modalHeader: "Edit Vendor",
			buttonText: "Edit Vendor",
		}));
		resetVendorForm();
		setUserId(id);
	}

	function closeActionModal() {
		setGeneralStates((prevState) => ({
			...prevState,
			isActionModalOpen: false,
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

	// GETTING USER LIST ON PAGE LOAD
	const fetchActiveTelcos = async () => {
		try {
			let responseData = await getAllActiveTelcos(emailAddress, userRole);

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
		fetchActiveTelcos();
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
	const resetVendorForm = () => {
		setTelcoInfo((prevState) => ({
			...prevState,
			vendorName: "",
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
					notificationText: "Telco added successfully",
				}));
				resetVendorForm();
				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Create User",
					}));
					fetchActiveTelcos(getAllTelcos());
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
						buttonText: "Create User",
					}));
					fetchActiveTelcos();
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
			resetVendorForm();
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
				resetVendorForm();

				setTimeout(() => {
					setGeneralStates((prevState) => ({
						...prevState,
						status: "",
						notificationText: "",
						disabled: false,
						isLoading: false,
						buttonText: "Edit Telco",
					}));
					fetchActiveTelcos();
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
					fetchActiveTelcos();
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

			await enableTelco(id, emailAddress, userRole);

			setTimeout(() => {
				setGeneralStates((prevState) => ({
					...prevState,
					status: "",
				}));
			}, 2000);

			fetchActiveTelcos();
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

			fetchActiveTelcos();
			fetchPendingTelcoList();
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

			fetchActiveTelcos();
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

			fetchActiveTelcos();
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

			fetchActiveTelcos();
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
		let filteredResult = filterHelper(activeTelcoList, searchFieldValue);

		if (searchFieldValue !== "") {
			dispatch(setApprovedList(filteredResult));
			setHidePagination(true);
		} else if (searchFieldValue === "") {
			setHidePagination(false);
			fetchActiveTelcos();
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

			<ActionModal
				onClose={closeActionModal}
				show={generalStates.isActionModalOpen}
				modalClose={closeActionModal}
				actionReceiver={generalStates.actionReceiver}
				actionType={generalStates.actionType}
				modalAction={() => actionModalFunction(userId)}
			/>

			{/*   ------------------------------------------- Modals ----------------------------------------------------  */}

			{/* ---------------------------------------------------------ALL TELCO TAB START ------------------------------------------------------------- */}
			<div className={openTab === 1 ? "block" : "hidden"}>
				<div className="flex justify-between w-full h-[4.8125rem] items-center px-6">
					<div className="flex">
						<Searchbar
							onChange={(e) => {
								e.preventDefault();
								filterTelcoList(e.target.value);
							}}
							placeholder="search approved telco"
						/>
					</div>
					<div className="items-end">
						<div className="flex">
							<button
								onClick={() => openCreateModal()}
								className="p-3 border border-purple-secondary rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200 ease-in-out duration-150"
							>
								<p className="linear-gradient-text text-sm font-normal">
									Add new Telco
								</p>
							</button>
						</div>
					</div>
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
							<tr key={telco.id} className="bg-white border-b">
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
												openDisableTelcoModal(telco.id)
											}
											className="text-base font-[450] text-green-primary"
										>
											Disable
										</button>
										<button
											onClick={() =>
												openArchiveTelcoModal(telco.id)
											}
											className="text-base font-[450] text-purple-primary"
										>
											Archive
										</button>
									</div>
								</td>
								<td className="py-6 px-6 text-red-primary text-center">
									<button
										onClick={() =>
											viewTelcoInfo(telco.telcoName)
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
	);
};

export default Telcos;
