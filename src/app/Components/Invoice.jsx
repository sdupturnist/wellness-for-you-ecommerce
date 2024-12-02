"use client";

export default function Invoice({ data }) {
  return (
    <table
      role="presentation"
      width="100%"
      cellSpacing="0"
      cellpadding="0"
      style={{ borderCollapse: "collapse", backgroundColor: "#fff" }}>
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: "#137e43",
              color: "#fff",
              textAlign: "center",
              padding: "20px",
              fontSize: "28px",
              fontWeight: "600",
            }}>
            <img
              src="https://ci3.googleusercontent.com/meips/ADKq_NYRZkJBYseDIdDZ3-mGN3FXWZ7q17kPjiUsESEbIvsqESzcBRw9Zbc5_hcmr-rCe2u3clzGdBMYKz-T09PCrphYtY6VKti_iRHJEswfTv7jZH01R7SotNPdmQM=s0-d-e1-ft#https://admin.wellness4u.in/wp-content/uploads/2024/11/logo-white.png"
              alt="Logo"
              style={{ display: "block", height: "40px" }}
            />
          </td>
        </tr>

        <tr>
          <td style={{ padding: "20px", color: "#15181e" }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                borderTop: "1px solid #dddddd",
                borderLeft: "1px solid #dddddd",
                marginBottom: "20px",
              }}>
              <thead>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      backgroundColor: "#efefef",
                      fontWeight: "bold",
                      textAlign: "left",
                      padding: "7px",
                      color: "#222222",
                    }}
                    colSpan="2">
                    Order Details
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "left",
                      padding: "7px",
                    }}>
                    <b>Order ID:</b> COD
                    <br />
                    <b>Date Added:</b> December 2, 2024
                    <br />
                    <b>Payment Method:</b> Cash on Delivery
                    <br />
                    <b>Shipping Method:</b> Free Shipping
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "left",
                      padding: "7px",
                    }}>
                    <b>E-mail:</b>{" "}
                    <a
                      href="mailto:upturnistuae@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer">
                      upturnistuae@gmail.com
                    </a>
                    <br />
                    <b>Telephone:</b> 911234567890
                    <br />
                    <b>Order Status:</b> Processing
                  </td>
                </tr>
              </tbody>
            </table>

            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                borderTop: "1px solid #dddddd",
                borderLeft: "1px solid #dddddd",
                marginBottom: "20px",
              }}>
              <thead>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      backgroundColor: "#efefef",
                      fontWeight: "bold",
                      textAlign: "left",
                      padding: "7px",
                      color: "#222222",
                    }}>
                    Instructions
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "left",
                      padding: "7px",
                    }}>
                    Payment Successful. Cash on Delivery
                  </td>
                </tr>
              </tbody>
            </table>

            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                borderTop: "1px solid #dddddd",
                borderLeft: "1px solid #dddddd",
                marginBottom: "20px",
              }}>
              <thead>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      backgroundColor: "#efefef",
                      fontWeight: "bold",
                      textAlign: "left",
                      padding: "7px",
                      color: "#222222",
                    }}>
                    Payment Address
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      backgroundColor: "#efefef",
                      fontWeight: "bold",
                      textAlign: "left",
                      padding: "7px",
                      color: "#222222",
                    }}>
                    Shipping Address
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "left",
                      padding: "7px",
                    }}>
                    Rajesh, KK
                    <br />
                    Flat No. 203, Green View Apartments Kalamassery Road, Mavoor
                    Kozhikode, Kerala, 673004 India
                    <br />
                    <br />
                    Kozhikode 673004
                    <br />
                    Kerala
                    <br />
                    India
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "left",
                      padding: "7px",
                    }}>
                    Rajesh, KK
                    <br />
                    Flat No. 203, Green View Apartments Kalamassery Road, Mavoor
                    Kozhikode, Kerala, 673004 India
                    <br />
                    <br />
                    Kozhikode 673004
                    <br />
                    Kerala
                    <br />
                    India
                  </td>
                </tr>
              </tbody>
            </table>

            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                borderTop: "1px solid #dddddd",
                borderLeft: "1px solid #dddddd",
                marginBottom: "20px",
              }}>
              <thead>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      backgroundColor: "#efefef",
                      fontWeight: "bold",
                      textAlign: "left",
                      padding: "7px",
                      color: "#222222",
                    }}>
                    Product
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      backgroundColor: "#efefef",
                      fontWeight: "bold",
                      textAlign: "right",
                      padding: "7px",
                      color: "#222222",
                    }}>
                    Quantity
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      backgroundColor: "#efefef",
                      fontWeight: "bold",
                      textAlign: "right",
                      padding: "7px",
                      color: "#222222",
                    }}>
                    Price
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      backgroundColor: "#efefef",
                      fontWeight: "bold",
                      textAlign: "right",
                      padding: "7px",
                      color: "#222222",
                    }}>
                    Total
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "left",
                      padding: "7px",
                    }}>
                    Vitaminberry Joint Repair - Buy1 Get 1 Free (+₹325.00)
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}>
                    1
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}>
                    ₹1299
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}>
                    ₹1299.00
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}
                    colSpan="3">
                    <b>Sub-Total:</b>
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}>
                    ₹1299.00
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}
                    colSpan="3">
                    <b>Free Shipping:</b>
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}>
                    ₹0.00
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}
                    colSpan="3">
                    <b>Total:</b>
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      borderRight: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      textAlign: "right",
                      padding: "7px",
                    }}>
                    ₹1299.00
                  </td>
                </tr>
              </tfoot>
            </table>

            <p style={{ marginTop: "0px", marginBottom: "20px" }}>
              Please reply to this e-mail if you have any questions.
            </p>
          </td>
        </tr>

        <tr>
          <td
            style={{
              backgroundColor: "#15181e",
              color: "#fff",
              textAlign: "center",
              padding: "15px",
              fontSize: "14px",
            }}>
            <p style={{ margin: "0" }}>wellness4u © 2024</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
