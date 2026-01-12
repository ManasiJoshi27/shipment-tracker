import { useState } from "react";
import shipmentData from "../data/shipments";
import ShipmentCard from "../components/ShipmentCard";

function ShipmentList() {
  const [shipments, setShipments] = useState(shipmentData);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ FILTER + SEARCH
  const filteredShipments = shipments.filter((shipment) => {
    const statusMatch =
      filterStatus === "All" || shipment.status === filterStatus;

    const searchMatch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  // ✅ SAVE STATUS
  const handleSaveStatus = () => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === selectedShipment.id
          ? { ...s, status: currentStatus }
          : s
      )
    );
    setSelectedShipment(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Shipment Tracker</h1>

      {/* FILTER */}
      <label><b>Filter by Status:</b></label>{" "}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
      </select>

      <br /><br />

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by ID or Customer"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "6px", width: "260px" }}
      />

      <br /><br />

      {/* LIST */}
      {filteredShipments.map((item) => (
        <ShipmentCard
          key={item.id}
          shipment={item}
          onView={(s) => {
            setSelectedShipment(s);
            setCurrentStatus(s.status);
          }}
        />
      ))}

      {/* MODAL */}
      {selectedShipment && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <h2>Shipment Details</h2>

            <p><b>ID:</b> {selectedShipment.id}</p>
            <p><b>Customer:</b> {selectedShipment.customerName}</p>
            <p><b>Phone:</b> {selectedShipment.phone}</p>
            <p><b>Email:</b> {selectedShipment.email}</p>
            <p>
              <b>Route:</b> {selectedShipment.pickup} →{" "}
              {selectedShipment.destination}
            </p>
            <p><b>Date:</b> {selectedShipment.date}</p>

            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>

            <br /><br />

            <button onClick={handleSaveStatus}>Save</button>{" "}
            <button onClick={() => setSelectedShipment(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContent = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "340px",
};

export default ShipmentList;