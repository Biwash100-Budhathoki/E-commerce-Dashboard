import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const EsewaPage = () => {
  const location = useLocation();
  const { pid, tAmt, amt } = location.state;

  // console.log(apiUrl);
  // const { amt, pid, tAmt, su, fu } = props.location.state.bookingData;props
  useEffect(() => {
    document.forms["payForm"].submit();
  }, []);
  return (
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <label>Esewa</label>
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header"></div>
                <div className="box-body">
                  <h3 style={{ color: "darkgreen" }}>Please Wait...</h3>
                  <form
                    name="payForm"
                    id="payForm"
                    action="https://uat.esewa.com.np/epay/main"
                    method="POST"
                  >
                    <input value={tAmt} name="tAmt" type="hidden" />
                    <input value={amt} name="amt" type="hidden" />
                    <input value="0" name="txAmt" type="hidden" />
                    <input value="0" name="psc" type="hidden" />
                    <input value="0" name="pdc" type="hidden" />
                    <input value="EPAYTEST" name="scd" type="hidden" />
                    <input value={pid} name="pid" type="hidden" />
                    <input
                      value="http://localhost:3000/payment/success"
                      type="hidden"
                      name="su"
                    />
                    <input
                      value="http://localhost:3000/payment/failed"
                      type="hidden"
                      name="fu"
                    />
                    {/* <input value= { apiUrl+"/payment/success"} type="hidden" name="su" />
                  <input value={ apiUrl+"/payment/failed"} type="hidden" name="fu" />                
                                    //for backend use localhost:5000 instead of 3000. For the recording of the transaction detail we hit the backend api.
 */}
                  </form>
                  <h4 style={{ color: "green" }}>Processing...</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EsewaPage;
