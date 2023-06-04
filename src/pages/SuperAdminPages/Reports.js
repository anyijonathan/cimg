import React, { useState, useEffect } from "react";
import Notification from "../../components/Notification";
import Button from "../../components/Button";
import FormSelect from "../../components/FormSelect";
import DatePicker from "react-datepicker";
import TransactionStatus from "../../components/TransactionStatus";
import { Pagination } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getTransactionInfo,
	getAuditLogs,
	getAirtimeDataTransactionInfo,
	getAirtimeDataTransaction,
} from "../../Redux/Slices/reportSlice";
import { getAllVendors } from "../../Redux/Slices/vendorSlice";
import { getAllTelcos } from "../../Redux/Slices/telcoSlice";
import moment from "moment/moment";
import { statusOptions } from "../../utils/constants";
import { userSelector } from "../../Redux/Slices/authSlice";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const Reports = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { emailAddress, userRole } = useSelector(userSelector);

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

	const [openTab, setOpenTab] = useState(1);
	const [page, setPage] = useState(1);
	const [data, setData] = useState([]);
	const [auditData, setAuditData] = useState([]);

	const [notificationText, setNotificationText] = useState("");
	const [status, setStatus] = useState("");

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const [auditStartDate, setAuditStartDate] = useState("");
	const [auditEndDate, setAuditEndDate] = useState("");

	const [vendorTag, setVendorTag] = useState("");
	const [telco, setTelco] = useState("");
	const [reportListLength, setReportListLength] = useState(0);
	const [auditLogLength, setAuditLogLength] = useState(0);

	const [vendorOptions, setVendorOptions] = useState(vendorType);
	const [telcoOptions, setTelcoOptions] = useState(telcoType);
	const [statusOption, setStatusOption] = useState("");

	const [excelData, setExcelData] = useState([]);

	// EXPORT TO EXCEL
	const fileType = "xlsx";
	const fileExtension = ".xlsx";

	const exportToExcel = (list) => {
		const ws = XLSX.utils.json_to_sheet(list);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, "Reports_Transactions" + fileExtension);
	};

	// GET AIRTIME DATA TRANSACTION
	const fetchDataTransactions = async () => {
		let convertedStartDate = moment(startDate).format(
			"MM/DD/YYYY HH:MM:SS A"
		);
		let convertedEndDate = moment(endDate).format("MM/DD/YYYY HH:MM:SS A");
		try {
			let responseData = await getAirtimeDataTransaction(
				startDate ? convertedStartDate : "",
				endDate ? convertedEndDate : "",
				vendorTag,
				telco,
				statusOption,
				emailAddress,
				userRole
			);
			setExcelData(responseData.data);
			setReportListLength(responseData.data.length);
			setData(
				responseData.data.slice(
					(page - 1) * resultsPerPage,
					page * resultsPerPage
				)
			);
		} catch (error) {
			setStatus("failure");
			setNotificationText("an error occured");
		}
	};

	// GET AIRTIME DATA TRANSACTION ON PAGE LOAD
	const usefetchDataTransactions = async () => {
		try {
			let responseData = await getAirtimeDataTransaction(
				startDate,
				endDate,
				vendorTag,
				telco,
				statusOption,
				emailAddress,
				userRole
			);
			setExcelData(responseData.data);

			setReportListLength(responseData.data.length);
			setData(
				responseData.data.slice(
					(page - 1) * resultsPerPage,
					page * resultsPerPage
				)
			);
		} catch (error) {
			setStatus("failure");
			setNotificationText(
				"an error occured, unable to retrieve transactions"
			);
		}
	};

	//  GET AUDITLOGS
	const fetchAuditLogs = async () => {
		let covAuditStartDate = moment(auditStartDate).format(
			"MM/DD/YYYY HH:MM:SS A"
		);

		let covAuditEndDate = moment(auditEndDate).format(
			"MM/DD/YYYY HH:MM:SS A"
		);

		try {
			let responseData = await getAuditLogs(
				covAuditStartDate,
				covAuditEndDate,
				emailAddress,
				userRole
			);
			setAuditLogLength(responseData.dataList.length);
			setAuditData(
				responseData.dataList.slice(
					(page - 1) * resultsPerPage,
					page * resultsPerPage
				)
			);
		} catch (error) {
			setStatus("failure");
			setNotificationText("an error occured");
		}
	};

	// GET AUDITLOGS ON PAGE LOAD
	const usefetchAuditLogs = async () => {
		try {
			let responseData = await getAuditLogs(
				auditStartDate,
				auditEndDate,
				emailAddress,
				userRole
			);
			setAuditLogLength(responseData.dataList.length);
			setAuditData(
				responseData.dataList.slice(
					(page - 1) * resultsPerPage,
					page * resultsPerPage
				)
			);
		} catch (error) {
			setStatus("failure");
			setNotificationText(
				"an error occured, unable to retrieve audit logs"
			);
		}
	};

	// pagination setup
	const resultsPerPage = 10;

	// pagination change control
	function onPageChange(p) {
		setPage(p);
	}

	useEffect(() => {
		usefetchDataTransactions();
		fetchVendorList();
		fetchTelcoList();
		usefetchAuditLogs();
	}, [page]);

	const viewInfo = () => {
		history.push("/app/admin/reports/transaction-info");
	};

	const setTabOne = () => {
		setOpenTab(1);
	};

	const setTabTwo = () => {
		setOpenTab(2);
	};

	const fetchVendorList = async () => {
		try {
			let newOptions = {};
			let newVendorOptions = [...vendorType];
			let responseData = await getAllVendors(emailAddress, userRole);
			responseData.dataList.filter((vendor) => {
				newOptions.id = vendor.id;
				newOptions.name = vendor.vendorName;
				newOptions.value = vendor.vendorName;
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
			let responseData = await getAllTelcos(emailAddress, userRole);
			responseData.dataList.filter((telco) => {
				newOptions.id = telco.id;
				newOptions.name = telco.telcoName;
				newOptions.value = telco.telcoName;
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

	const handleApplyFilter = () => {
		fetchDataTransactions();
		setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
	};

	const handleAuditFilter = () => {
		fetchAuditLogs();
		setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
	};

	const handleStatusChange = (e) => {
		let { value } = e.target;
		setStatusOption(value);
	};

	const viewTransactionInfo = async (acntNo, reqId) => {
		try {
			let responseData = await getAirtimeDataTransactionInfo(
				acntNo,
				reqId,
				emailAddress,
				userRole
			);

			dispatch(getTransactionInfo(responseData));
			history.push("/app/admin/reports/transaction-info");
		} catch (error) {
			setStatus("failure");
			setNotificationText("an error occured");
		}
	};

	return (
		<div className="font-circular-std">
			<Notification notificationText={notificationText} status={status} />
			<div className="flex justify-between w-full mb-7">
				<div className="flex">
					<button
						href=""
						onClick={setTabOne}
						className={`${
							openTab === 1
								? "text-black-primary"
								: "text-black-secondary opacity-40"
						} inline-flex items-center pl-6 w-full h-12 text-xl font-normal transition-colors duration-150`}
					>
						Transactions
					</button>

					<button
						href=""
						onClick={setTabTwo}
						className={`${
							openTab === 2
								? "text-black-primary"
								: "text-black-secondary opacity-40"
						} inline-flex items-center pl-6 w-full h-12 text-xl font-normal transition-colors duration-150`}
					>
						Audit logs
					</button>
				</div>
				<div>
					<Button
						className="newfee-button"
						onClick={() => exportToExcel(excelData)}
					>
						Export
					</Button>
				</div>
			</div>

			{/*----------------TRANSACTION TAB START------------------ */}
			<div className={openTab === 1 ? "block" : "hidden"}>
				<div className="rounded-lg px-10 py-6 bg-other-background">
					<div className="flex justify-around">
						<div className="flex justify-around">
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								className="mr-4 border border-opacity-50 border-purple-primary text-black-40 text-sm rounded outline-none focus:border-purple-primary focus:border-opacity-50 focus:ring-purple-200 block pl-4 pr-[0.625rem] md:w-[9rem] md:h-11"
								placeholderText="Start date"
							/>
							<DatePicker
								selected={endDate}
								onChange={(date) => setEndDate(date)}
								className="mr-4 border border-opacity-50 border-purple-primary text-black-40 text-sm rounded outline-none focus:border-purple-primary focus:border-opacity-50 focus:ring-purple-200 block pl-4 pr-[0.625rem] md:w-[9rem] md:h-11"
								placeholderText="End date"
							/>
							<FormSelect
								onChange={(e) => setVendorTag(e.target.value)}
								value={vendorTag}
								options={vendorOptions}
								className=" mr-4 border border-opacity-50 border-purple-primary text-black-40 text-sm rounded outline-none focus:border-purple-primary focus:border-opacity-50 focus:ring-purple-200 pl-4 pr-[0.625rem] md:w-[9rem] md:h-11"
							/>
							<FormSelect
								onChange={(e) => setTelco(e.target.value)}
								value={telco}
								options={telcoOptions}
								className=" mr-4 border border-opacity-50 border-purple-primary text-black-40 text-sm rounded outline-none focus:border-purple-primary focus:border-opacity-50 focus:ring-purple-200 pl-4 pr-[0.625rem] md:w-[9rem] md:h-11"
							/>
							<FormSelect
								onChange={handleStatusChange}
								options={statusOptions}
								className="border border-opacity-50 border-purple-primary text-black-40 text-sm rounded outline-none focus:border-purple-primary focus:border-opacity-50 focus:ring-purple-200 pl-4 pr-[0.625rem] md:w-[9rem] md:h-11"
							/>
						</div>
						<div className="">
							<button
								onClick={() => handleApplyFilter()}
								className=" p-3 w-50 border border-purple-secondary rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200 ease-in-out duration-150"
							>
								<p className="linear-gradient-text text-sm font-normal">
									Apply Filters
								</p>
							</button>
						</div>
					</div>
					<hr className="mt-4 mb-10 w-full" />
				</div>

				<div className="w-full overflow-x-auto relative">
					<table className="w-full text-left">
						<thead className=" w-full text-sm text-black-primary opacity-70 bg-gray-100">
							<tr>
								<th scope="col" className="py-3 px-6">
									Purchase type
								</th>
								<th scope="col" className="py-3 px-6">
									Amount(&#8358;)
								</th>
								<th scope="col" className="py-3 px-6">
									Vendor
								</th>
								<th scope="col" className="py-3 px-6">
									Telco
								</th>
								<th scope="col" className="py-3 px-6">
									Date
								</th>
								<th scope="col" className="py-3 px-6">
									Status
								</th>
								<th scope="col" className="py-3 px-6">
									Action
								</th>
							</tr>
						</thead>

						<tbody className="text-sm bg-other-background">
							{data.map((user, i) => (
								<tr
									key={i}
									className="bg-white text-black-secondary border-b py-4 px-6"
								>
									<td className="py-6 px-6 font-medium whitespace-nowrap">
										{user.transType}
									</td>
									<td className="py-6 px-6">{user.amount}</td>
									<td className="py-6 px-6">
										{user.vendortag}
									</td>
									<td className="py-6 px-6">
										{user.network}
									</td>
									<td className="py-6 px-6">
										{new Date(
											user.tranDate
										).toLocaleDateString()}
									</td>
									<td className="py-6 px-6">
										{
											<TransactionStatus
												status={user.flag}
											/>
										}
									</td>
									<td className="py-6 px-6">
										<button
											onClick={() =>
												viewTransactionInfo(
													user.sourceAccount,
													user.requestid
												)
											}
											className="text-base font-[450] text-purple-primary opacity-70"
										>
											View
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="mt-8 mb-10">
						<Pagination
							totalResults={reportListLength}
							resultsPerPage={resultsPerPage}
							label="Table navigation"
							onChange={onPageChange}
						/>
					</div>
				</div>
				{/*----------------TRANSACTION TAB END------------------ */}
			</div>

			{/*----------------AUDIT TAB START------------------ */}
			<div className={openTab === 2 ? "block" : "hidden"}>
				<div className="rounded-lg px-10 py-6 bg-other-background">
					<div className="flex p-2 justify-between">
						<div className="flex justify-between">
							<DatePicker
								selected={auditStartDate}
								onChange={(date) => setAuditStartDate(date)}
								className="mr-4 border border-opacity-50 border-purple-primary text-black-40 text-sm rounded outline-none focus:border-purple-primary focus:border-opacity-50 focus:ring-purple-200 block pl-4 pr-[0.625rem] md:w-[11.375rem] md:h-11"
								placeholderText="Select Start Date"
							/>
							<DatePicker
								selected={auditEndDate}
								onChange={(date) => setAuditEndDate(date)}
								className="mr-4 border border-opacity-50 border-purple-primary text-black-40 text-sm rounded outline-none focus:border-purple-primary focus:border-opacity-50 focus:ring-purple-200 block pl-4 pr-[0.625rem] md:w-[11.375rem] md:h-11"
								placeholderText="Select End Date"
							/>
						</div>
						<div className="">
							<button
								onClick={() => handleAuditFilter()}
								className=" p-3 w-50 border border-purple-secondary rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200 ease-in-out duration-150"
								// className="p-3 pl-5 pr-5 border border-purple-secondary rounded font-circular-std outline-none focus:border-purple-secondary focus:ring-purple-200 ease-in-out duration-150"
							>
								<p className="linear-gradient-text text-sm font-normal">
									Apply Filters
								</p>
							</button>
						</div>
					</div>
					<hr className="mt-4 mb-8 w-full" />
				</div>
				<div className="w-full overflow-x-auto relative">
					<table className="w-full text-left">
						<thead className=" w-full text-sm text-black-primary opacity-70 bg-gray-100">
							<tr>
								<th scope="col" className="py-3 px-6">
									ID
								</th>
								<th scope="col" className="py-3 px-6">
									Action
								</th>
								<th scope="col" className="py-3 px-6">
									Type
								</th>
								<th scope="col" className="py-3 px-6">
									Environment
								</th>
								<th scope="col" className="py-3 px-6">
									Timestamp
								</th>
							</tr>
						</thead>

						<tbody className="text-sm bg-other-background">
							{auditData.map((audit, i) => (
								<tr
									key={i}
									className="bg-white text-black-secondary border-b py-4 px-6"
								>
									<td className="py-6 px-6">
										{audit.userEmail}
									</td>
									<td className="py-6 px-6">
										{audit.auditAction}
									</td>
									<td className="py-6 px-6">
										{audit.module}
									</td>
									<td className="py-6 px-6">
										{audit.userRole}
									</td>
									<td className=" flex py-6 px-6">
										<button className="text-base font-[450] text-black-primary opacity-70 mr-6">
											{moment(audit.dateCreated).format(
												"MM/DD/YYYY"
											)}
										</button>
										<button className="text-base font-[450] text-purple-primary opacity-70">
											{moment(audit.dateCreated).format(
												"HH:MM a"
											)}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="mt-8 mb-10">
						<Pagination
							totalResults={auditLogLength}
							resultsPerPage={resultsPerPage}
							label="Table navigation"
							onChange={onPageChange}
						/>
					</div>
				</div>
				{/*----------------AUDIT TAB END------------------ */}
			</div>
		</div>
	);
};

export default Reports;
