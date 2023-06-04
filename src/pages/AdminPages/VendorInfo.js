import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../components/InfoCard";
import Status from "../../components/Status";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { PeriodOption } from "../../utils/constants";
import { useState } from "react";

const VendorInfo = () => {
  const vendorInfo = useSelector((state) => state.vendorModule.vendorInfo);

  const [successValue, setSuccessValue] = useState("Total");
  const [failedValue, setFailedValue] = useState("Total");

  let date = moment(vendorInfo.data.dateAdded).format("DD/MM/YYYY");
  let totalAllSuccess =
    vendorInfo.data.airtimeDataBillerVendorTransactionsAggregate
      .totalAllSuccess;
  let totalAllFailed =
    vendorInfo.data.airtimeDataBillerVendorTransactionsAggregate.totalAllFailed;
  let totalDailySuccess =
    vendorInfo.data.airtimeDataBillerVendorTransactionsAggregate
      .totalDailySuccess;
  let totalDailyFailed =
    vendorInfo.data.airtimeDataBillerVendorTransactionsAggregate
      .totalDailyFailed;
  let totalWeeklySuccess =
    vendorInfo.data.airtimeDataBillerVendorTransactionsAggregate
      .totalWeeklySuccess;
  let totalWeeklyFailed =
    vendorInfo.data.airtimeDataBillerVendorTransactionsAggregate
      .totalWeeklyFailed;
  let totalmonthlySuccess =
    vendorInfo.data.airtimeDataBillerVendorTransactionsAggregate
      .totalmonthlySuccess;
  let totalmonthlyFailed =
    vendorInfo.data.airtimeDataBillerVendorTransactionsAggregate
      .totalmonthlyFailed;

  const telcos = vendorInfo.data.telcos;

  const [cardSuccessValue, setCardSuccessValue] = useState(totalAllSuccess);
  const [cardFailedValue, setCardFailedValue] = useState(totalAllFailed);

  let PeriodOption = [
    {
      id: 0,
      value: "",
      name: "Total",
    },
    {
      id: 1,
      value: "",
      name: "Today",
    },
    {
      id: 2,
      value: "",
      name: "This week",
    },
    {
      id: 3,
      value: "",
      name: "This month",
    },
  ];

  const selectStatus = (status) => {
    if (status === "0") {
      return <Status pending />;
    } else if (status === "1") {
      return <Status active />;
    } else if (status === "2") {
      return <Status inactive />;
    } else if (status === "4") {
      return <Status archived />;
    }
  };

  const handleSuccessChange = (e) => {
    const { value } = e.target;
    setSuccessValue(value);

    if (value === "Total") {
      setCardSuccessValue(totalAllSuccess);
    } else if (value === "Today") {
      setCardSuccessValue(totalDailySuccess);
    } else if (value === "Weekly") {
      setCardSuccessValue(totalWeeklySuccess);
    } else if (value === "Monthly") {
      setCardSuccessValue(totalmonthlySuccess);
    }
  };

  const handleFailedChange = (e) => {
    const { value } = e.target;
    setFailedValue(value);

    if (value === "Total") {
      setCardFailedValue(totalAllFailed);
    } else if (value === "Today") {
      setCardFailedValue(totalDailyFailed);
    } else if (value === "Weekly") {
      setCardFailedValue(totalWeeklyFailed);
    } else if (value === "Monthly") {
      setCardFailedValue(totalmonthlyFailed);
    }
  };

  return (
    <div className="font-circular-std">
      <Breadcrumb
        firstLayer="Manage Vendors"
        secondLayer="Vendor information"
        firstLayerLink="/app/Vendors"
      />

      <h2 className="mt-11 mx-10 text-xl font-bold text-black-secondary pb-6">
        Vendor information
      </h2>
      <hr className="mb-7 mx-10" />
      <div className="bg-white">
        <div className="px-10 pt-6 pb-[4.5rem] block md:grid grid-cols-8">
          <div className="col-span-2">
            <InfoCard
              additionalCardStyle="md:w-[14.375rem]"
              additionalStyle="mb-[-20px]"
              title="Current Status"
              cardValue={selectStatus(vendorInfo.data.status)}
              // linkText="Last disabled on : 04/06/2022"
              additionalSelectStyle="hidden"
              additionalLinkStyle="text-xs"
            />
          </div>

          <div className="col-span-3">
            <InfoCard
              title="Successful Transactions"
              cardValue={cardSuccessValue}
              options={PeriodOption}
              cardLink="/app/reports"
              additionalStyle="text-green-primary pb-4"
              linkText="View more details"
              onChange={handleSuccessChange}
              value={successValue}
            />
          </div>

          <div className="col-span-3">
            <InfoCard
              title="Failed Transactions"
              // cardValue="&#8358;260,000,345"
              cardValue={cardFailedValue}
              options={PeriodOption}
              cardLink="/app/reports"
              additionalStyle="text-red-primary pb-4"
              linkText="View more details"
              onChange={handleFailedChange}
              value={failedValue}
            />
          </div>
        </div>
        <hr className="mx-10 mb-10" />

        <div className="px-10 pt-6 pb-[4.5rem] gap-8 block md:grid grid-cols-8 ">
          <div className="h-56 col-span-6 rounded-lg flex pl-6 pt-6 pr-8 pb-11 justify-between border border-black-secondary border-opacity-5">
            <div>
              <div className="mb-14">
                <p className="text-sm font-medium text-black-70 mb-3 opacity-30">
                  Vendor name
                </p>
                <span className="text-sm font-medium text-black-secondary">
                  {vendorInfo.data.vendorName}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-black-70 mb-3 opacity-30">
                  Date added
                </p>
                <span className="text-sm font-medium text-black-secondary">
                  {/* 04/06/2022 */}
                  {date}
                </span>
              </div>
            </div>

            <div>
              <div className="mb-14">
                <p className="text-sm font-medium text-black-70 mb-3 opacity-30">
                  Platform
                </p>
                <span className="text-sm font-medium text-black-secondary">
                  {vendorInfo.data.platform}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-black-70 mb-3 opacity-30">
                  Current Telco mapping
                </p>
                <span className="text-sm font-medium text-black-secondary">
                  {`${telcos},`}
                </span>
              </div>
            </div>

            {/* <div>
              <div className="mb-14">
                <p className="text-sm font-medium text-black-70 mb-3 opacity-30">
                  Cuurent Vendor Share
                </p>
                <span className="text-sm font-medium text-black-secondary">
                  20%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-black-70 mb-3 opacity-30">
                  Current Bank share
                </p>
                <span className="text-sm font-medium text-black-secondary">
                  10%
                </span>
              </div>
            </div> */}
          </div>
          <div className="bg-vendorInfo rounded-lg h-56 col-span-2 pl-6 pt-6 border border-black-secondary border-opacity-5">
            <div>
              <div className="mb-14">
                <p className="text-sm font-medium text-black-70 mb-3 opacity-30">
                  Added by
                </p>
                <span className="text-sm font-medium text-black-secondary">
                  {/* Best.Omotayo@fcmb.com */}
                  {vendorInfo.data.addedBy}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-black-70 mb-3 opacity-30">
                  Approved by
                </p>
                <span className="text-sm font-medium text-black-secondary">
                  {/* Bright.Odionye@fcmb.com */}
                  {vendorInfo.data.approvedBy}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInfo;
