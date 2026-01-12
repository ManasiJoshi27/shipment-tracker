function StatusBadge({ status }) {
    const getColor = () => {
      if (status === "Pending") return "#f59e0b";
      if (status === "In Transit") return "#3b82f6";
      if (status === "Delivered") return "#22c55e";
      return "#999";
    };
  
    return (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "12px",
          backgroundColor: getColor(),
          color: "#fff",
          fontSize: "12px",
        }}
      >
        {status}
      </span>
    );
  }
  
  export default StatusBadge;
  