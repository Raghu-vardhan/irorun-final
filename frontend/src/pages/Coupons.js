import Layout from "../components/layout/Layout";

const Coupons = () => {
  return (
    <Layout>
      <h1 style={{ marginBottom: "1.5rem" }}>Coupons</h1>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Total Orders</th>
              <th>Total Revenue</th>
              <th>Total Discount</th>
              <th>Last Used</th>
            </tr>
          </thead>

          <tbody>
            {/* Static data for now (API later) */}
            <tr>
              <td>OFF15</td>
              <td>12</td>
              <td>₹14,400</td>
              <td>₹2,160</td>
              <td>14 Feb 2026</td>
            </tr>

            <tr>
              <td>NEW10</td>
              <td>8</td>
              <td>₹7,600</td>
              <td>₹760</td>
              <td>13 Feb 2026</td>
            </tr>

            <tr>
              <td>SALE20</td>
              <td>5</td>
              <td>₹5,000</td>
              <td>₹1,000</td>
              <td>12 Feb 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Coupons;
