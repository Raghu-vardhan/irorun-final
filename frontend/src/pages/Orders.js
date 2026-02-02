import Layout from "../components/layout/Layout";

const Orders = () => {
  return (
    <Layout>
      <h1 style={{ marginBottom: "1.5rem" }}>Order History</h1>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Coupon</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {/* Sample static rows (API later) */}
            <tr>
              <td>#1001</td>
              <td>Raghu</td>
              <td>OFF15</td>
              <td>₹1200</td>
              <td>12 Feb 2026</td>
            </tr>

            <tr>
              <td>#1002</td>
              <td>Anil</td>
              <td>-</td>
              <td>₹850</td>
              <td>13 Feb 2026</td>
            </tr>

            <tr>
              <td>#1003</td>
              <td>Suresh</td>
              <td>NEW10</td>
              <td>₹950</td>
              <td>14 Feb 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Orders;
