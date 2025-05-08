import React from "react";

const MainTop = () => {
  return (
    <>
      <div className="header-section" style={{marginTop:-40}}>
                  <img
                    src="https://cdn.imweb.me/thumbnail/20240923/efac60a53f9f7.png"
                    alt="Logo"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                <div
                  className="overlay-text"
                  style={{
                    position: "absolute",
                    top: "80%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    color: "#6a9d67", // Yazı rengi
                    fontSize: "30px", // Yazı boyutu
                    fontWeight: "bold",
                    textAlign: "center",
                    zIndex: 10, // Yazıyı ön plana almak için
                    lineHeight: "1.2", // Yazıyı düzenlemek için
                  }}
                >
                  정밀한 기술과 <br />
                  오랜 경험으로 <br />
                  완벽한 수리 솔루션을 <br />
                  제공합니다.
                </div>
        <style>
          {`
      @media (max-width: 767px) {  /* Mobil cihazlar için */
        .logo img {
          width: 100% !important;  /* Mobilde logo genişliğini %100 yap */
        }
        .overlay-text {
          font-size: 16px !important; /* Mobilde yazı boyutunu küçült */
        }
      }
      @media (max-width: 768px) {  /* Ekran genişliği 768px ve üzeri için */
        .search-container {
          margin-right: 20px !important;  /* Arama ikonu için marginRight'i 420px yap */
        }
      }
      @media (max-width: 768px) {  /* Ekran genişliği 768px ve üzeri için */
        .deneme {
          margin-right: 40px !important;
          margin-left: 10px !important;  /* Arama ikonu için marginRight'i 420px yap */
        }
      }
    `}
        </style>
      </div>

      <section className="section first-section">
        <div className="container-fluid">
          <div className="masonry-blog clearfix">
            <div className="left-side">
              <div className="masonry-box post-media">
                <img
                  src="https://cdn.imweb.me/thumbnail/20241114/974b51e91d3aa.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="shadoweffect">
                  <div className="shadow-desc">
                    <div className="blog-meta">
                      <span className="bg-aqua">
                        <a href="blog-category-01.html" title="">
                          Gardening
                        </a>
                      </span>
                      <h4>
                        <a href="garden-single.html" title="">
                          How to choose high quality soil for your gardens
                        </a>
                      </h4>
                      <small>
                        <a href="garden-single.html" title="">
                          21 July, 2017
                        </a>
                      </small>
                      <small>
                        <a href="/" title="">
                          by Amanda
                        </a>
                      </small>
                    </div>
                    {/* end meta */}
                  </div>
                  {/* end shadow-desc */}
                </div>
                {/* end shadow */}
              </div>
              {/* end post-media */}
            </div>
            {/* end left-side */}
            <div className="center-side">
              <div className="masonry-box post-media">
                <img
                  src="https://cdn.imweb.me/thumbnail/20241114/974b51e91d3aa.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="shadoweffect">
                  <div className="shadow-desc">
                    <div className="blog-meta">
                      <span className="bg-aqua">
                        <a href="blog-category-01.html" title="">
                          Outdoor
                        </a>
                      </span>
                      <h4>
                        <a href="garden-single.html" title="">
                          You can create a garden with furniture in your home
                        </a>
                      </h4>
                      <small>
                        <a href="garden-single.html" title="">
                          19 July, 2017
                        </a>
                      </small>
                      <small>
                        <a href="/" title="">
                          by Amanda
                        </a>
                      </small>
                    </div>
                    {/* end meta */}
                  </div>
                  {/* end shadow-desc */}
                </div>
                {/* end shadow */}
              </div>
              {/* end post-media */}
            </div>
            {/* end left-side */}
            <div className="right-side hidden-md-down">
              <div className="masonry-box post-media">
                <img
                  src="https://cdn.imweb.me/thumbnail/20241114/974b51e91d3aa.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="shadoweffect">
                  <div className="shadow-desc">
                    <div className="blog-meta">
                      <span className="bg-aqua">
                        <a href="blog-category-01.html" title="">
                          Indoor
                        </a>
                      </span>
                      <h4>
                        <a href="garden-single.html" title="">
                          The success of the 10 companies in the vegetable
                          sector
                        </a>
                      </h4>
                      <small>
                        <a href="garden-single.html" title="">
                          03 July, 2017
                        </a>
                      </small>
                      <small>
                        <a href="/" title="">
                          by Jessica
                        </a>
                      </small>
                    </div>
                    {/* end meta */}
                  </div>
                  {/* end shadow-desc */}
                </div>
                {/* end shadow */}
              </div>
              {/* end post-media */}
            </div>
            {/* end right-side */}
          </div>
          {/* end masonry */}
        </div>
      </section>
    </>
  );
};

export default MainTop;
