import { useState } from "react";

const OrdersTable = ({ orders = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(orders.length / rowsPerPage);

  const start = (currentPage - 1) * rowsPerPage;
  const currentOrders = orders.slice(start, start + rowsPerPage);

  return (
    <>
      <div className="table-wrapper page-width">
        <table className="orders-table">
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
            {currentOrders.map(o => (
              <tr key={o._id}>
                <td>{o.shopifyOrderId}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>{o.customerName}</td>
                <td>{o.paymentMode || "Online"}</td>
                <td>{o.paymentStatus || "Paid"}</td>
                <td>₹{o.totalPrice}</td>
                <td>{o.discountCode || "-"}</td>
                <td>₹{o.discountAmount || 0}</td>
              </tr>
            ))}

            {currentOrders.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default OrdersTable;
