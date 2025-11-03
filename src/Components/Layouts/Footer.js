import React from "react";

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor:"#0B1120",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="widget">
              <div className="footer-text text-center">
                <a href="/">
                  <img
                    src=""
                    alt=""
                    className="img-fluid"
                  />
                </a>

                <p style={{color:"black"}}>
                Smart System
                </p>
                {/* <a
                  href="https://www.linkedin.com/company/duyurular-org/"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="LinkedIn"
                >
                  <i className="fa fa-linkedin" />
                </a> */}
                <hr className="invis" />
                <div className="newsletter-widget text-center">
                  Dormitory System
                  {/* <SubscriptionCard/> */}
                </div>
                {/* end newsletter */}
              </div>
              {/* end footer-text */}
            </div>

            {/* end widget */}
          </div>
          {/* end col */}
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <br />
            <br />
          </div>
        </div>
      </div>
      {/* end container */}
    </footer>
  );
}

export default Footer;
