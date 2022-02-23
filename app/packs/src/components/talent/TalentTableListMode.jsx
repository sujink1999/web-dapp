import React, { useState } from "react";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowDimensionsHook } from "src/utils/window";
import Modal from "react-bootstrap/Modal";
import { OrderBy } from "src/components/icons";

import TalentProfilePicture from "./TalentProfilePicture";
import Table from "src/components/design_system/table";
import Tag from "src/components/design_system/tag";
import Button from "src/components/design_system/button";
import { P1, P2, P3, Caption } from "src/components/design_system/typography";

import cx from "classnames";

const MobileTalentTableDropdown = ({
  show,
  hide,
  mode,
  selectedOption,
  order,
  onOptionClick,
}) => {
  const selectedClass = (option) =>
    option == selectedOption ? " text-primary" : "text-black";
  return (
    <Modal
      show={show}
      fullscreen="true"
      onHide={hide}
      dialogClassName={"m-0 mw-100 table-options-dropdown"}
    >
      <Modal.Body className="d-flex flex-column p-0 pb-5">
        <P3 bold className="text-primary-04 py-3 px-4" text="View" />
        <div className={`divider mb-2 ${mode}`}></div>
        <Button
          onClick={() => onOptionClick("Supporters")}
          type="white-ghost"
          mode={mode}
          className="d-flex flex-row justify-content-between px-4"
        >
          <P1
            className={cx(selectedClass("Supporters"))}
            bold
            text="Supporters"
          />
          {selectedOption == "Supporters" && (
            <OrderBy className={order == "asc" ? "" : "rotate-180"} />
          )}
        </Button>
        <Button
          onClick={() => onOptionClick("Occupation")}
          type="white-ghost"
          mode={mode}
          className="d-flex flex-row justify-content-between px-4"
        >
          <P1
            className={cx(selectedClass("Occupation"))}
            bold
            text="Occupation"
          />
          {selectedOption == "Occupation" && (
            <OrderBy className={order == "asc" ? "" : "rotate-180"} />
          )}
        </Button>
        <Button
          onClick={() => onOptionClick("Circulating Supply")}
          type="white-ghost"
          mode={mode}
          className="d-flex flex-row justify-content-between px-4"
        >
          <P1
            className={cx(selectedClass("Circulating Supply"))}
            bold
            text="Market Cap"
          />
          {selectedOption == "Circulating Supply" && (
            <OrderBy className={order == "asc" ? "" : "rotate-180"} />
          )}
        </Button>
        <Button
          onClick={() => onOptionClick("Alphabetical Order")}
          type="white-ghost"
          mode={mode}
          className="d-flex flex-row justify-content-between px-4"
        >
          <P1
            className={cx(selectedClass("Alphabetical Order"))}
            bold
            text="Alphabetical Order"
          />
          {selectedOption == "Alphabetical Order" && (
            <OrderBy className={order == "asc" ? "" : "rotate-180"} />
          )}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

const TalentTableListMode = ({
  talents,
  theme,
  getProgress,
  getCirculatingSupply,
  getSupporterCount,
  watchlistOnly,
  updateFollow,
  selectedSort,
  setSelectedSort,
  compareCirculatingSupply,
}) => {
  const [sortDirection, setSortDirection] = useState("asc");
  const { mobile } = useWindowDimensionsHook();
  const [showDropdown, setShowDropdown] = useState(false);

  const compareUsername = (talent1, talent2) => {
    if (talent1.user.username > talent2.user.username) {
      return 1;
    } else if (talent1.user.username < talent2.user.username) {
      return -1;
    } else {
      return 0;
    }
  };

  const compareOccupation = (talent1, talent2) => {
    if (talent1.occupation < talent2.occupation) {
      return 1;
    } else if (talent1.occupation > talent2.occupation) {
      return -1;
    } else {
      return 0;
    }
  };

  const compareSupporters = (talent1, talent2) =>
    getSupporterCount(talent1.token.contractId) -
    getSupporterCount(talent2.token.contractId);

  const filteredTalents = () => {
    let desiredTalent = talents;
    if (watchlistOnly) {
      desiredTalent = talents.filter((talent) => talent.isFollowing);
    }
    let comparisonFunction;

    switch (selectedSort) {
      case "Supporters":
        comparisonFunction = compareSupporters;
        break;
      case "Occupation":
        comparisonFunction = compareOccupation;
        break;
      case "Circulating Supply":
        comparisonFunction = compareCirculatingSupply;
        break;
      case "Alphabetical Order":
        comparisonFunction = compareUsername;
        break;
    }
    desiredTalent.sort(comparisonFunction);

    if (sortDirection != "asc") {
      desiredTalent.reverse();
    }

    return desiredTalent;
  };

  const toggleDirection = () => {
    if (sortDirection == "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };

  const onOptionClick = (option) => {
    if (option == selectedSort) {
      toggleDirection();
    } else {
      setSortDirection("asc");
      setSelectedSort(option);
    }
    setShowDropdown(false);
  };

  const getSelectedOptionValue = (talent) => {
    switch (selectedSort) {
      case "Supporters":
        return getSupporterCount(talent.contractId);
      case "Occupation":
        return talent.occupation;
      case "Circulating Supply":
        return getCirculatingSupply(talent.contractId);
      case "Alphabetical Order":
        return talent.occupation;
    }
  };

  const sortIcon = (option) => {
    if (option == selectedSort) {
      return sortDirection == "asc" ? " ▼" : " ▲";
    } else {
      return "";
    }
  };

  if (mobile) {
    return (
      <div className="pl-4">
        <MobileTalentTableDropdown
          show={showDropdown}
          hide={() => setShowDropdown(false)}
          mode={theme.mode()}
          selectedOption={selectedSort}
          order={sortDirection}
          onOptionClick={onOptionClick}
        />
        <div className="w-100 talent-table-tabs mt-3 d-flex flex-row align-items-center">
          <Button
            onClick={() => setShowDropdown(true)}
            type="white-ghost"
            mode={theme.mode()}
            className=""
          >
            {selectedSort} <OrderBy black={true} />
          </Button>
        </div>
        <Table mode={theme.mode()} className="horizontal-scroll">
          <Table.Body>
            {filteredTalents().map((talent) => (
              <Table.Tr key={`talent-${talent.id}`}>
                <Table.Td>
                  <div className="d-flex flex-row align-items-center">
                    <button
                      className="border-0 text-warning button-link"
                      onClick={() => updateFollow(talent)}
                    >
                      {talent.isFollowing ? (
                        <FontAwesomeIcon icon={faStar} />
                      ) : (
                        <FontAwesomeIcon icon={faStarOutline} />
                      )}
                    </button>
                    <div
                      className="d-flex flex-row align-items-center"
                      onClick={() =>
                        (window.location.href = `/talent/${talent.user.username}`)
                      }
                    >
                      <TalentProfilePicture
                        src={talent.profilePictureUrl}
                        height="24"
                      />
                      <P2 text={talent.user.username} bold className="ml-2" />
                    </div>
                  </div>
                </Table.Td>
                <Table.Td
                  className="text-right pr-3"
                  onClick={() =>
                    (window.location.href = `/talent/${talent.user.username}`)
                  }
                >
                  <P2 text={getSelectedOptionValue(talent)} />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

  return (
    <Table mode={theme.mode()} className="px-3 horizontal-scroll">
      <Table.Head>
        <Table.Th>
          <Caption bold text="" />
        </Table.Th>
        <Table.Th>
          <Caption
            onClick={() => onOptionClick("Alphabetical Order")}
            bold
            text={`TALENT${sortIcon("Alphabetical Order")}`}
            className="cursor-pointer"
          />
        </Table.Th>
        <Table.Th>
          <Caption
            onClick={() => onOptionClick("Occupation")}
            bold
            text={`OCCUPATION${sortIcon("Occupation")}`}
            className="cursor-pointer"
          />
        </Table.Th>
        <Table.Th>
          <Caption
            onClick={() => onOptionClick("Supporters")}
            bold
            text={`SUPPORTERS${sortIcon("Supporters")}`}
            className="cursor-pointer"
          />
        </Table.Th>
        <Table.Th>
          <Caption
            onClick={() => onOptionClick("Circulating Supply")}
            bold
            text={`MARKET CAP${sortIcon("Circulating Supply")}`}
            className="cursor-pointer"
          />
        </Table.Th>
      </Table.Head>
      <Table.Body>
        {filteredTalents().map((talent) => (
          <Table.Tr key={`talent-${talent.id}`}>
            <Table.Td>
              <button
                className="border-0 text-warning button-link"
                onClick={() => updateFollow(talent)}
              >
                {talent.isFollowing ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faStarOutline} />
                )}
              </button>
            </Table.Td>
            <Table.Td
              onClick={() =>
                (window.location.href = `/talent/${talent.user.username}`)
              }
            >
              <div className="d-flex">
                <TalentProfilePicture
                  src={talent.profilePictureUrl}
                  height="24"
                />
                <P2 text={talent.user.name} bold className="ml-2" />
                {talent.token.ticker ? (
                  <P2
                    text={`$${talent.token.ticker}`}
                    bold
                    className="text-primary-03 ml-2"
                  />
                ) : (
                  <Tag className="coming-soon-tag ml-2">
                    <P3 className="current-color" bold text="Coming Soon" />
                  </Tag>
                )}
              </div>
            </Table.Td>
            <Table.Td
              onClick={() =>
                (window.location.href = `/talent/${talent.user.username}`)
              }
            >
              <P2 text={talent.occupation} />
            </Table.Td>
            <Table.Td
              onClick={() =>
                (window.location.href = `/talent/${talent.user.username}`)
              }
            >
              <P2
                text={
                  !talent.token.ticker
                    ? "-"
                    : `${getSupporterCount(talent.token.contractId)}`
                }
              />
            </Table.Td>
            <Table.Td
              className={
                (cx("pr-3"),
                talent.token.ticker ? "" : "d-flex justify-content-center")
              }
              onClick={() =>
                (window.location.href = `/talent/${talent.user.username}`)
              }
            >
              <P2
                text={
                  !talent.token.ticker
                    ? "-"
                    : `${getCirculatingSupply(talent.token.contractId)} ${
                        talent.token.ticker || ""
                      }`
                }
              />
              <div className="progress" style={{ height: 6 }}>
                <div
                  className="progress-bar bg-secondary"
                  role="progressbar"
                  aria-valuenow={getProgress(talent.token.contractId)}
                  style={{ width: `${getProgress(talent.token.contractId)}%` }}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TalentTableListMode;