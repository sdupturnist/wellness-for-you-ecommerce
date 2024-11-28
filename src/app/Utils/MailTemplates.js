'use client'




export let OrderPlacedEmailTemplate = ({ siteLogo }) => {
    
    const item = `<!-- Header -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#fff">
  <tr><td height="20"></td></tr>
  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
     <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tr>
                <td>
                  <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                    <tr><td align="left"><img src="${siteLogo}" height="50" alt="logo" border="0" /></td></tr>
                    <tr class="hiddenMobile"><td height="40"></td></tr>
                    <tr class="visibleMobile"><td height="20"></td></tr>
                    <tr>
                      <td style="font-size: 12px; color: #333; font-family: 'Open Sans', sans-serif; line-height: 18px; text-align: left;">
                        Hello, Philip Brooks.<br> Thank you for shopping from our store and for your order.
                      </td>
                    </tr>
                  </table>
                  <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                    <tr class="visibleMobile"><td height="20"></td></tr>
                    <tr>
                      <td height="5"></td>
                    </tr>
                    <tr>
                      <td style="font-size: 21px; color: #111; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; text-align: right;">
                        Invoice
                      </td>
                    </tr>
                    <tr class="hiddenMobile"><td height="50"></td></tr>
                    <tr class="visibleMobile"><td height="20"></td></tr>
                    <tr>
                      <td style="font-size: 12px; color: #333; font-family: 'Open Sans', sans-serif; line-height: 18px; text-align: right;">
                        <small>ORDER</small> #800000025<br />
                        <small>MARCH 4TH 2016</small>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- /Header -->

<!-- Order Details -->
<table width="100%" border="0" style="padding-bottom:50px" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#fff">
  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
        <tr class="hiddenMobile"><td height="60"></td></tr>
        <tr class="visibleMobile"><td height="40"></td></tr>
        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tr>
                <th style="font-size: 12px; color: #333; font-family: 'Open Sans', sans-serif; font-weight: normal; line-height: 1; padding: 0 10px 7px 0;" width="52%" align="left">Item</th>
                <th style="font-size: 12px; color: #333; font-family: 'Open Sans', sans-serif; font-weight: normal; line-height: 1; padding: 0 0 7px;" align="left"><small>SKU</small></th>
                <th style="font-size: 12px; color: #333; font-family: 'Open Sans', sans-serif; font-weight: normal; line-height: 1; padding: 0 0 7px;" align="center">Quantity</th>
                <th style="font-size: 12px; color: #111; font-family: 'Open Sans', sans-serif; font-weight: normal; line-height: 1; padding: 0 0 7px;" align="right">Subtotal</th>
              </tr>
              <tr><td height="1" style="background: #ECECEC;" colspan="4"></td></tr>
              <tr><td height="10" colspan="4"></td></tr>
              <tr>
                <td style="font-size: 12px; color: #111; font-family: 'Open Sans', sans-serif; line-height: 18px; padding:10px 0;" class="article">Beats Studio Over-Ear Headphones</td>
                <td style="font-size: 12px; color: #646a6e; font-family: 'Open Sans', sans-serif; line-height: 18px; padding:10px 0;"><small>MH792AM/A</small></td>
                <td style="font-size: 12px; color: #646a6e; font-family: 'Open Sans', sans-serif; line-height: 18px; padding:10px 0;" align="center">1</td>
                <td style="font-size: 12px; color: #111; font-family: 'Open Sans', sans-serif; line-height: 18px; padding:10px 0;" align="right">$299.95</td>
              </tr>
              <tr><td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td></tr>
              <tr>
                <td style="font-size: 12px; color: #111; font-family: 'Open Sans', sans-serif; line-height: 18px; padding:10px 0;" class="article">Beats RemoteTalk Cable</td>
                <td style="font-size: 12px; color: #646a6e; font-family: 'Open Sans', sans-serif; line-height: 18px; padding:10px 0;"><small>MHDV2G/A</small></td>
                <td style="font-size: 12px; color: #646a6e; font-family: 'Open Sans', sans-serif; line-height: 18px; padding:10px 0;" align="center">1</td>
                <td style="font-size: 12px; color: #111; font-family: 'Open Sans', sans-serif; line-height: 18px; padding:10px 0;" align="right">$29.95</td>
              </tr>
              <tr><td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td></tr>
              <tr><td height="25" colspan="4"></td></tr>
              <tr>
                <td colspan="2"></td>
                <td colspan="2">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td height="1" style="background:#dddddd;"></td>
                    </tr>
                    <tr><td height="10"></td></tr>
                    <tr>
                      <td colspan="2" style="font-size: 12px; color: #333; font-family: 'Open Sans', sans-serif; font-weight: normal; text-align: right; padding-right: 10px;">Subtotal</td>
                      <td style="font-size: 12px; color: #111; font-family: 'Open Sans', sans-serif; text-align: right; padding-right: 10px;">$329.90</td>
                    </tr>
                    <tr><td height="10"></td></tr>
                    <tr>
                      <td colspan="2" style="font-size: 12px; color: #333; font-family: 'Open Sans', sans-serif; font-weight: normal; text-align: right; padding-right: 10px;">Shipping</td>
                      <td style="font-size: 12px; color: #111; font-family: 'Open Sans', sans-serif; text-align: right; padding-right: 10px;">$5.00</td>
                    </tr>
                    <tr><td height="10"></td></tr>
                    <tr>
                      <td colspan="2" style="font-size: 12px; color: #333; font-family: 'Open Sans', sans-serif; font-weight: normal; text-align: right; padding-right: 10px;">Tax</td>
                      <td style="font-size: 12px; color: #111; font-family: 'Open Sans', sans-serif; text-align: right; padding-right: 10px;">$20.88</td>
                    </tr>
                    <tr><td height="10"></td></tr>
                    <tr>
                      <td colspan="2" style="font-size: 14px; color: #111; font-family: 'Open Sans', sans-serif; font-weight: bold; text-align: right; padding-right: 10px;">Total</td>
                      <td style="font-size: 14px; color: #111; font-family: 'Open Sans', sans-serif; font-weight: bold; text-align: right; padding-right: 10px;">$355.78</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- /Order Details -->
`
    
    return item
}