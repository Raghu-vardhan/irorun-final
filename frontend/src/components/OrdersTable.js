const OrdersTable = ({ orders }) => {
  return (
    <table className="page-width">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date & Time</th>
          <th>Customer</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Value</th>
          <th>Promo</th>
          <th>Saved</th>

        </tr>
      </thead>
      <tbody>
        {orders.map(o => (
          <tr key={o._id}>
            <td>{o.shopifyOrderId}</td>
             <td>{o.createdAt}</td>
            <td>{o.customerName}</td>
            <td>{o.paymentMode || "Online"}</td>
            <td>{o.paymentStatus || "Paid"}</td>
            <td>₹{o.totalPrice}</td>
            <td>{o.discountCode || "-"}</td>
            <td>₹{o.discountAmount || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
