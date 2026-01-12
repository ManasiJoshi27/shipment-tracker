import StatusBadge from "./StatusBadge";


function ShipmentCard({ shipment, onView }) {
  return (
    <div style={cardStyle}>
      <h3>Shipment ID: {shipment.id}</h3>

      <p><b>Customer:</b> {shipment.customerName}</p>

      <p>
        <b>Route:</b> {shipment.pickup} → {shipment.destination}
      </p>

      {/* ✅ Reusable Status Badge */}
      <StatusBadge status={shipment.status} />

      <br /><br />

      <button onClick={() => onView(shipment)}>
        View Details
      </button>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "16px",
  borderRadius: "8px",
  marginBottom: "16px",
  maxWidth: "600px",
  backgroundColor: "#fff",
};


export default ShipmentCard;