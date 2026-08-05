
import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryAction } from "../../Redux/Actions/categoryAction";
import { getAllReviewsAction } from "../../Redux/Actions/reviewsAction";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

import featureImg1 from "../../Assets/Images/feature-img-1.png";
import featureImg2 from "../../Assets/Images/feature-img-2.png";
import featureImg3 from "../../Assets/Images/feature-img-3.png";

const Home = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { loading: userLoading } = useSelector((state) => state.user);
  const { loading: categoryLoading, Categories } = useSelector((state) => state.getAllCategory);
  const { reviews, loading: reviewsLoading } = useSelector((state) => state.getAllReviews);

  const [recentProductLoading, setRecentLoading] = useState(false);
  const [recentProductsError, setRecentProductsError] = useState(false);
  const [recentProductsSuccess, setRecentProductsSuccess] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);

  const getRecentProducts = async () => {
    try {
      setRecentLoading(true);
      const { data } = await api.get("/product/recent/products");
      setRecentProducts(data.products);
      setRecentProductsSuccess(true);
      setRecentLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setRecentLoading(false);
      setRecentProductsError(true);
    }
  };

  useEffect(() => {
    document.title = "Home";
    dispatch(getAllCategoryAction());
    dispatch(getAllReviewsAction());
    getRecentProducts();
  }, [dispatch]);

  const options = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: { delay: 5000 },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 40 },
      1024: { slidesPerView: 3, spaceBetween: 50 },
    },
    modules: [Autoplay, Navigation],
    className: "mySwiper",
  };

  return (
    <>
      <Header />

      {userLoading || categoryLoading || reviewsLoading || recentProductLoading ? (
        <Loader LoadingName={"Loading Home"} />
      ) : (
        <>
          <div className="main-home">
            <section className="home">
              <div className="content">
                <h3>
                  Fresh And <span>Organic</span> Products For You
                </h3>
                <p>
                  We respect your taste and tradition and so we are proud to say
                  that we are a local company. We do not sell products which are
                  of low quality but highly priced.
                </p>
                <Link to="/products">
                  <button className="shopNowBtn">Shop Now</button>
                </Link>
              </div>
            </section>
          </div>

          <section className="features" id="features">
            <h1 className="Heading">
              Our <span>Features</span>
            </h1>
            <div className="box-container">
              <div className="box">
                <img src={featureImg1} alt="" />
                <h3>Fresh And Organic</h3>
                <p>
                  We deliver grocery, fruits, and dairy products with quality,
                  convenience and love.
                </p>
              </div>
              <div className="box">
                <img src={featureImg2} alt="" />
                <h3>Free Delivery</h3>
                <p>
                  We offer free shipping across India. No hidden fees, just fresh products.
                </p>
              </div>
              <div className="box">
                <img src={featureImg3} alt="" />
                <h3>Cash On Delivery</h3>
                <p>
                  Pay only when your products arrive—easy and secure!
                </p>
              </div>
            </div>
          </section>

          <section className="top-products">
            <h1 className="Heading">
              New <span>Products</span>
            </h1>
            <div className="product-slider">
              <Swiper {...options}>
                <div className="wrapper">
                  {recentProductsSuccess && recentProducts.length > 0 ? (
                    recentProducts.map((item) => (
                      <SwiperSlide key={item._id}>
                        <div className="box">
                          <img src={item.url} alt="" />
                          <h1>{item.name}</h1>
                          <div className="price">Rate: ₹ {item.rate}</div>
                          <button
                            className="shopNowBtn"
                            onClick={() => Navigate(`/products/${item.name}`)}
                          >
                            View Product
                          </button>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p> </p>
                  )}
                </div>
              </Swiper>
            </div>
          </section>

          <section className="categories" id="categories">
            <h1 className="Heading">
              Product <span>Categories</span>
            </h1>
            <div className="category-box-container">
              {Categories &&
                Categories.map((category) => (
                  <div className="box" key={category._id}>
                    <img src={category.categoryImage} alt="" />
                    <h1>Fresh {category.categoryName}</h1>
                    <Link
                      to={`/products?categoryId=${category._id}&categoryName=${category.categoryName}`}
                      className="shopNowBtn"
                    >
                      Shop Now
                    </Link>
                  </div>
                ))}
            </div>
          </section>

          <section className="top-products" id="reviews">
            <h1 className="Heading">
              Customer <span>Reviews</span>
            </h1>
            <div className="product-slider">
              <Swiper {...options}>
                <div className="wrapper">
                  {Array.isArray(reviews) && reviews.length > 0 ? (
                    reviews.map((review) => (
                      <SwiperSlide key={review._id}>
                        <div className="box reviews-box">
                          <h1>
                            {review.user
                              ? `${review.user.firstName || ""} ${review.user.lastName || ""}`.trim()
                              : "Anonymous User"}
                          </h1>
                          <div className="price">{review.comment}</div>
                         <div className="stars">
  {[...Array(5)].map((_, i) => (
    <i key={i}>
      <FaStar color={i < review.ratings ? "#ffc107" : "#e4e5e9"} />
    </i>
  ))}
</div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p className="flex justify-center"> </p>
                  )}
                </div>
              </Swiper>
            </div>
          </section>

          <br />
          <br />
          <br />
        </>
      )}

      <Footer />
    </>
  );
};

export default Home;