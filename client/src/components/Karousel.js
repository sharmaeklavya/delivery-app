import React, { useState, useEffect } from "react";
import Counter from "../resuables/Counter";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";
// Swiper modules
SwiperCore.use([Pagination, Navigation]);

const Karousel = (props) => {
  const [perView, setPerView] = useState(0);

  const handleResize = () => {
    if (window.innerWidth <= "375") {
      setPerView(1.8);
    } else if (window.innerWidth <= "540") {
      setPerView(2);
    } else if (window.innerWidth <= "768") {
      setPerView(3);
    } else if (window.innerWidth <= "992") {
      setPerView(4);
    } else if (window.innerWidth <= "1200") {
      setPerView(5);
    } else {
      setPerView(6.5);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className="px-3 py-2">
      <div className="d-flex justify-content-between">
        <hr className="straight-line" />
        <h5 className="section-title text-right">Toppings &amp; Beverages</h5>
      </div>
      <Swiper
        spaceBetween={15}
        slidesPerView={perView}
        loop={false}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper mt-3"
      >
        {props.meals
          .filter((m) => m.mealType === "topping" || m.mealType === "beverage")
          .map((m, i) => (
            <SwiperSlide key={i}>
              <div className="card topping border-0">
                <h5 className="meal-subtitle p-2 mb-0">{m.mealName}</h5>
                <img className="topping-img" src={m.mealImg} alt={m.mealName} />
                <div className="d-flex justify-content-between align-items-center rounded-bottom py-2">
                  <p className="meal-text">
                    Rs. <span>{m.mealPrice}</span>
                  </p>
                  <div className="text-center">
                    <Counter
                      id={m._id}
                      name={m.mealName}
                      desc={m.mealDesc}
                      type={m.mealType}
                      image={m.mealImg}
                      price={m.mealPrice}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </aside>
  );
};

export default Karousel;
